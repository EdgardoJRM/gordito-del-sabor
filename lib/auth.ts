import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from './mongodb';
import User from './models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        name: { label: 'Name', type: 'text' },
        isSignUp: { label: 'Is Sign Up', type: 'text' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.error('❌ Email y contraseña requeridos');
            throw new Error('Email y contraseña requeridos');
          }

          console.log('🔄 Conectando a MongoDB...');
          await dbConnect();
          console.log('✅ MongoDB conectado');

          const isSignUp = credentials.isSignUp === 'true';

          if (isSignUp) {
            // Registro
            console.log('📝 Registrando nuevo usuario:', credentials.email);
            if (!credentials.name) {
              throw new Error('Nombre requerido para registro');
            }

            const existingUser = await User.findOne({ email: credentials.email });
            if (existingUser) {
              console.error('❌ Email ya registrado:', credentials.email);
              throw new Error('El email ya está registrado');
            }

            const hashedPassword = await bcrypt.hash(credentials.password, 10);
            const newUser = await User.create({
              name: credentials.name,
              email: credentials.email,
              password: hashedPassword,
            });

            console.log('✅ Usuario registrado:', newUser._id);
            return {
              id: newUser._id.toString(),
              email: newUser.email,
              name: newUser.name,
            };
          } else {
            // Login
            console.log('🔐 Intentando login:', credentials.email);
            const user = await User.findOne({ email: credentials.email });

            if (!user) {
              console.error('❌ Usuario no encontrado:', credentials.email);
              throw new Error('Email o contraseña incorrectos');
            }

            const isPasswordValid = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (!isPasswordValid) {
              console.error('❌ Contraseña incorrecta para:', credentials.email);
              throw new Error('Email o contraseña incorrectos');
            }

            console.log('✅ Login exitoso:', user._id);
            return {
              id: user._id.toString(),
              email: user.email,
              name: user.name,
            };
          }
        } catch (error) {
          console.error('❌ Error en authorize:', error);
          throw error;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production',
};

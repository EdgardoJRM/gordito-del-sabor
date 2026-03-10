# 🍃 MongoDB Atlas Setup - Guía Completa

## PASO 1: Crear Cuenta en MongoDB Atlas

### 1.1 Ir a MongoDB Atlas
- Abre: https://www.mongodb.com/cloud/atlas
- Haz clic en **"Sign Up"** (Registrarse)

### 1.2 Crear Cuenta
- Email: Tu email
- Contraseña: Crea una fuerte
- Acepta términos
- Haz clic en **"Create your Atlas account"**

### 1.3 Verificar Email
- Ve a tu email
- Haz clic en el enlace de verificación
- Completa el formulario de información

---

## PASO 2: Crear Cluster (Base de Datos)

### 2.1 Crear Proyecto
- Después de verificar, verás la opción de crear un proyecto
- Nombre del proyecto: `El Gordito del Sabor`
- Haz clic en **"Create Project"**

### 2.2 Crear Cluster
- Haz clic en **"Create a Deployment"**
- Selecciona **"M0 Free"** (Gratis)
- Selecciona región: **AWS - us-east-1** (o la más cercana)
- Haz clic en **"Create Deployment"**

### 2.3 Esperar
- Espera a que se cree el cluster (2-3 minutos)
- Verás un mensaje cuando esté listo

---

## PASO 3: Crear Usuario de Base de Datos

### 3.1 Ir a Database Access
- En el menú izquierdo, haz clic en **"Database Access"**
- Haz clic en **"Add New Database User"**

### 3.2 Crear Usuario
- **Username**: `gordito_user`
- **Password**: Crea una contraseña fuerte (guárdala)
- **Built-in Role**: Selecciona **"Atlas Admin"**
- Haz clic en **"Add User"**

**Guarda esta información:**
```
Username: gordito_user
Password: [Tu contraseña]
```

---

## PASO 4: Permitir Acceso desde tu IP

### 4.1 Ir a Network Access
- En el menú izquierdo, haz clic en **"Network Access"**
- Haz clic en **"Add IP Address"**

### 4.2 Agregar IP
- Haz clic en **"Allow Access from Anywhere"**
- Haz clic en **"Confirm"**

**Nota:** Para producción, deberías agregar solo tu IP. Para desarrollo, "Anywhere" está bien.

---

## PASO 5: Obtener Connection String

### 5.1 Ir a Clusters
- En el menú izquierdo, haz clic en **"Clusters"**
- Haz clic en el botón **"Connect"** de tu cluster

### 5.2 Copiar Connection String
- Selecciona **"Drivers"**
- Selecciona **"Node.js"** como driver
- Copia la connection string

**Verá algo como:**
```
mongodb+srv://gordito_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### 5.3 Reemplazar Contraseña
- Reemplaza `<password>` con tu contraseña real
- Ejemplo:
```
mongodb+srv://gordito_user:MiContraseña123@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

---

## PASO 6: Configurar en tu Proyecto

### 6.1 Actualizar .env.local

Abre `/Users/gardo/gordito-del-sabor/.env.local` y agrega:

```env
# MongoDB
MONGODB_URI=mongodb+srv://gordito_user:MiContraseña123@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

**Ejemplo completo:**
```env
# NextAuth
NEXTAUTH_SECRET=tu_secret_aqui
NEXTAUTH_URL=http://localhost:3000

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx

# MongoDB
MONGODB_URI=mongodb+srv://gordito_user:MiContraseña123@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### 6.2 Actualizar .env.example

Abre `/Users/gardo/gordito-del-sabor/.env.example` y agrega:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

---

## PASO 7: Instalar Mongoose

Mongoose es una librería para conectar Node.js con MongoDB.

```bash
cd /Users/gardo/gordito-del-sabor
npm install mongoose
```

---

## PASO 8: Crear Conexión a MongoDB

### 8.1 Crear archivo de conexión

Crea el archivo: `/Users/gardo/gordito-del-sabor/lib/mongodb.ts`

```typescript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
```

### 8.2 Actualizar tsconfig.json

Abre `tsconfig.json` y asegúrate de que tenga:

```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "types": ["node"]
  }
}
```

---

## PASO 9: Crear Modelos de Datos

### 9.1 Crear archivo de modelos

Crea: `/Users/gardo/gordito-del-sabor/lib/models/User.ts`

```typescript
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
```

### 9.2 Crear modelo de Órdenes

Crea: `/Users/gardo/gordito-del-sabor/lib/models/Order.ts`

```typescript
import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  productId: string;
  customText: string;
  quantity: number;
  price: number;
  email: string;
  status: 'pending' | 'completed' | 'failed';
  stripeSessionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    customText: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    stripeSessionId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
```

### 9.3 Crear modelo de Favoritos

Crea: `/Users/gardo/gordito-del-sabor/lib/models/Favorite.ts`

```typescript
import mongoose, { Schema, Document } from 'mongoose';

export interface IFavorite extends Document {
  userId: mongoose.Types.ObjectId;
  recipeId: string;
  createdAt: Date;
}

const FavoriteSchema = new Schema<IFavorite>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipeId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Favorite || mongoose.model<IFavorite>('Favorite', FavoriteSchema);
```

---

## PASO 10: Crear API Routes para Usuarios

### 10.1 Crear ruta de registro

Crea: `/Users/gardo/gordito-del-sabor/app/api/auth/register/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { name, email, password } = await request.json();

    // Validar
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verificar si usuario existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      { message: 'User created successfully', user: { id: user._id, name: user.name, email: user.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### 10.2 Crear ruta de órdenes

Crea: `/Users/gardo/gordito-del-sabor/app/api/orders/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const { productId, customText, quantity, price, email } = await request.json();

    const order = await Order.create({
      userId: session.user.id,
      productId,
      customText,
      quantity,
      price,
      email,
      status: 'pending',
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const orders = await Order.find({ userId: session.user.id });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## PASO 11: Actualizar NextAuth para usar MongoDB

Abre `/Users/gardo/gordito-del-sabor/lib/auth.ts` y actualiza:

```typescript
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
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        await dbConnect();

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
```

---

## PASO 12: Probar Conexión

### 12.1 Crear archivo de prueba

Crea: `/Users/gardo/gordito-del-sabor/lib/test-mongodb.ts`

```typescript
import dbConnect from './mongodb';

async function testConnection() {
  try {
    await dbConnect();
    console.log('✅ MongoDB connected successfully!');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
  }
}

testConnection();
```

### 12.2 Ejecutar prueba

```bash
cd /Users/gardo/gordito-del-sabor
npx ts-node lib/test-mongodb.ts
```

---

## PASO 13: Verificar en MongoDB Atlas

### 13.1 Ver datos en Atlas
- Ve a https://cloud.mongodb.com
- Selecciona tu proyecto
- Haz clic en **"Collections"**
- Verás tus colecciones (Users, Orders, Favorites)

### 13.2 Ver documentos
- Haz clic en una colección
- Verás los documentos guardados

---

## RESUMEN DE ARCHIVOS CREADOS

```
lib/
├── mongodb.ts (Conexión a MongoDB)
├── models/
│   ├── User.ts (Modelo de usuario)
│   ├── Order.ts (Modelo de orden)
│   └── Favorite.ts (Modelo de favorito)
└── test-mongodb.ts (Prueba de conexión)

app/api/
├── auth/
│   └── register/
│       └── route.ts (Registro de usuario)
└── orders/
    └── route.ts (Crear y obtener órdenes)
```

---

## VARIABLES DE ENTORNO FINALES

Tu `.env.local` debe tener:

```env
# NextAuth
NEXTAUTH_SECRET=tu_secret_aqui
NEXTAUTH_URL=http://localhost:3000

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx

# MongoDB
MONGODB_URI=mongodb+srv://gordito_user:MiContraseña123@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

---

## PRÓXIMOS PASOS

1. ✅ Crear cuenta en MongoDB Atlas
2. ✅ Crear cluster
3. ✅ Crear usuario
4. ✅ Permitir acceso
5. ✅ Obtener connection string
6. ✅ Configurar .env.local
7. ✅ Instalar mongoose
8. ✅ Crear conexión
9. ✅ Crear modelos
10. ✅ Crear API routes
11. ✅ Actualizar NextAuth
12. ✅ Probar conexión
13. ✅ Verificar en Atlas

---

## TROUBLESHOOTING

### Error: "MONGODB_URI is not defined"
- Verifica que `.env.local` tenga `MONGODB_URI`
- Reinicia el servidor

### Error: "Connection refused"
- Verifica que tu IP esté permitida en Network Access
- Verifica que la contraseña sea correcta

### Error: "Authentication failed"
- Verifica el username y password
- Verifica que el usuario esté creado en Database Access

### Error: "Timeout"
- Verifica tu conexión a internet
- Verifica que el cluster esté activo

---

## ¿NECESITAS AYUDA?

Si tienes problemas, avísame y te ayudaré a resolverlos. 🚀

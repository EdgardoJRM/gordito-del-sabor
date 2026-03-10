# 💾 OPCIONES DE BASE DE DATOS GRATUITAS Y BARATAS

## 1. MONGODB ATLAS (RECOMENDADO - GRATIS)

### Características
- ✅ **Gratis**: 512 MB de almacenamiento
- ✅ **Perfecto para**: Desarrollo y pequeños proyectos
- ✅ **Escalable**: Puedes pagar después si creces
- ✅ **Fácil de usar**: Interfaz intuitiva
- ✅ **Seguro**: Encriptación incluida

### Costo
- **Gratis**: 512 MB (suficiente para empezar)
- **Pago**: $57/mes (10 GB) - cuando crezcas

### Cómo Configurar

1. **Crear Cuenta**
   - Ve a https://www.mongodb.com/cloud/atlas
   - Haz clic en "Try Free"
   - Regístrate con tu email

2. **Crear Cluster**
   - Selecciona "Create a Deployment"
   - Elige "Free" (M0)
   - Selecciona tu región (elige la más cercana)
   - Haz clic en "Create"

3. **Obtener Connection String**
   - Ve a "Database" → "Connect"
   - Selecciona "Drivers"
   - Copia la connection string
   - Reemplaza `<password>` con tu contraseña

4. **Agregar a .env.local**
   ```
   MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/gordito?retryWrites=true&w=majority
   ```

### Instalación en el Proyecto

```bash
npm install mongoose
```

---

## 2. SUPABASE (GRATIS - PostgreSQL)

### Características
- ✅ **Gratis**: 500 MB de almacenamiento
- ✅ **PostgreSQL**: Base de datos relacional
- ✅ **Auth incluida**: Sistema de autenticación
- ✅ **Real-time**: Actualizaciones en tiempo real
- ✅ **API REST**: Acceso fácil

### Costo
- **Gratis**: 500 MB (suficiente para empezar)
- **Pago**: $25/mes (8 GB) - cuando crezcas

### Cómo Configurar

1. **Crear Cuenta**
   - Ve a https://supabase.com
   - Haz clic en "Start your project"
   - Regístrate con GitHub o email

2. **Crear Proyecto**
   - Haz clic en "New Project"
   - Elige tu región
   - Crea una contraseña
   - Haz clic en "Create new project"

3. **Obtener Connection String**
   - Ve a "Settings" → "Database"
   - Copia la connection string

4. **Agregar a .env.local**
   ```
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_KEY=xxxxx
   ```

### Instalación en el Proyecto

```bash
npm install @supabase/supabase-js
```

---

## 3. FIREBASE (GRATIS - NoSQL)

### Características
- ✅ **Gratis**: 1 GB de almacenamiento
- ✅ **NoSQL**: Base de datos flexible
- ✅ **Auth incluida**: Sistema de autenticación
- ✅ **Real-time**: Actualizaciones en tiempo real
- ✅ **Hosting incluido**: Puedes desplegar gratis

### Costo
- **Gratis**: 1 GB (suficiente para empezar)
- **Pago**: $0.06 por GB - paga solo lo que uses

### Cómo Configurar

1. **Crear Proyecto**
   - Ve a https://firebase.google.com
   - Haz clic en "Get started"
   - Crea un nuevo proyecto

2. **Obtener Credenciales**
   - Ve a "Project Settings"
   - Copia la configuración

3. **Agregar a .env.local**
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=xxxxx
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxxxx
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxxxx
   ```

### Instalación en el Proyecto

```bash
npm install firebase
```

---

## 4. PLANETSCALE (GRATIS - MySQL)

### Características
- ✅ **Gratis**: 5 GB de almacenamiento
- ✅ **MySQL**: Base de datos relacional
- ✅ **Rápido**: Optimizado para velocidad
- ✅ **Escalable**: Crece con tu proyecto
- ✅ **Fácil de usar**: Interfaz intuitiva

### Costo
- **Gratis**: 5 GB (suficiente para empezar)
- **Pago**: $29/mes (100 GB) - cuando crezcas

### Cómo Configurar

1. **Crear Cuenta**
   - Ve a https://planetscale.com
   - Haz clic en "Sign up"
   - Regístrate con GitHub

2. **Crear Base de Datos**
   - Haz clic en "Create a database"
   - Elige el plan "Free"
   - Selecciona tu región

3. **Obtener Connection String**
   - Ve a "Connect"
   - Selecciona "Node.js"
   - Copia la connection string

4. **Agregar a .env.local**
   ```
   DATABASE_URL=mysql://usuario:contraseña@host/database
   ```

### Instalación en el Proyecto

```bash
npm install prisma @prisma/client
npx prisma init
```

---

## COMPARATIVA

| Opción | Almacenamiento | Tipo | Costo Gratis | Costo Pago | Mejor Para |
|--------|---|---|---|---|---|
| **MongoDB Atlas** | 512 MB | NoSQL | ✅ | $57/mes | Documentos flexibles |
| **Supabase** | 500 MB | PostgreSQL | ✅ | $25/mes | Datos relacionales |
| **Firebase** | 1 GB | NoSQL | ✅ | Pago por uso | Desarrollo rápido |
| **PlanetScale** | 5 GB | MySQL | ✅ | $29/mes | Datos relacionales |

---

## RECOMENDACIÓN PARA TU PROYECTO

### Opción 1: MongoDB Atlas (MEJOR PARA EMPEZAR)
- ✅ Fácil de integrar con Next.js
- ✅ Flexible para cambios futuros
- ✅ Perfecto para tu estructura de datos
- ✅ Comunidad grande

### Opción 2: Supabase (SI PREFIERES SQL)
- ✅ PostgreSQL robusto
- ✅ Auth incluida
- ✅ Real-time incluido
- ✅ Más control

### Opción 3: Firebase (SI QUIERES TODO INCLUIDO)
- ✅ Auth incluida
- ✅ Hosting incluido
- ✅ Real-time incluido
- ✅ Más rápido de configurar

---

## IMPLEMENTACIÓN CON MONGODB ATLAS (PASO A PASO)

### 1. Crear Cuenta en MongoDB Atlas

```
1. Ve a https://www.mongodb.com/cloud/atlas
2. Haz clic en "Try Free"
3. Regístrate con tu email
4. Verifica tu email
```

### 2. Crear Cluster

```
1. Haz clic en "Create a Deployment"
2. Selecciona "Free" (M0)
3. Selecciona tu región (elige la más cercana)
4. Haz clic en "Create"
5. Espera a que se cree (2-3 minutos)
```

### 3. Obtener Connection String

```
1. Ve a "Database" → "Connect"
2. Selecciona "Drivers"
3. Selecciona "Node.js"
4. Copia la connection string
5. Reemplaza <password> con tu contraseña
```

### 4. Agregar a .env.local

```env
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/gordito?retryWrites=true&w=majority
```

### 5. Instalar Mongoose

```bash
npm install mongoose
```

### 6. Crear Conexión en tu Proyecto

Crea `lib/mongodb.ts`:

```typescript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
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

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
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

### 7. Crear Modelos

Crea `lib/models/User.ts`:

```typescript
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
```

### 8. Usar en tu Aplicación

```typescript
import dbConnect from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function getUsers() {
  await dbConnect();
  const users = await User.find({});
  return users;
}
```

---

## PRÓXIMOS PASOS

1. **Elige una opción** (recomiendo MongoDB Atlas)
2. **Crea la cuenta** (5 minutos)
3. **Obtén la connection string** (2 minutos)
4. **Agrega a .env.local** (1 minuto)
5. **Instala la librería** (npm install)
6. **Crea los modelos** (15 minutos)
7. **Integra en tu app** (30 minutos)

---

## SEGURIDAD

⚠️ **IMPORTANTE:**
- Nunca compartas tu connection string
- Usa variables de entorno
- En producción, usa contraseñas fuertes
- Habilita IP whitelist en MongoDB Atlas

---

## SOPORTE

- **MongoDB**: https://docs.mongodb.com
- **Supabase**: https://supabase.com/docs
- **Firebase**: https://firebase.google.com/docs
- **PlanetScale**: https://planetscale.com/docs

---

**¿Cuál prefieres? Puedo ayudarte a configurarla.** 🚀

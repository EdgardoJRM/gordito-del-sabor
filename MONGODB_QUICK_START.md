# ⚡ MongoDB - Inicio Rápido

## 1️⃣ Crear Cuenta (5 minutos)

```
1. Ve a: https://www.mongodb.com/cloud/atlas
2. Haz clic en "Sign Up"
3. Completa el formulario
4. Verifica tu email
```

## 2️⃣ Crear Cluster (5 minutos)

```
1. Crea un proyecto: "El Gordito del Sabor"
2. Haz clic en "Create a Deployment"
3. Selecciona "M0 Free"
4. Selecciona región: AWS - us-east-1
5. Espera 2-3 minutos
```

## 3️⃣ Crear Usuario (2 minutos)

```
1. Ve a "Database Access"
2. Haz clic en "Add New Database User"
3. Username: gordito_user
4. Password: [Tu contraseña fuerte]
5. Role: Atlas Admin
6. Haz clic en "Add User"
```

## 4️⃣ Permitir Acceso (1 minuto)

```
1. Ve a "Network Access"
2. Haz clic en "Add IP Address"
3. Selecciona "Allow Access from Anywhere"
4. Haz clic en "Confirm"
```

## 5️⃣ Obtener Connection String (2 minutos)

```
1. Ve a "Clusters"
2. Haz clic en "Connect"
3. Selecciona "Drivers"
4. Selecciona "Node.js"
5. Copia la connection string
6. Reemplaza <password> con tu contraseña
```

## 6️⃣ Configurar en tu Proyecto (1 minuto)

Abre `.env.local` y agrega:

```env
MONGODB_URI=mongodb+srv://gordito_user:TuContraseña@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

## 7️⃣ Probar (1 minuto)

```bash
cd /Users/gardo/gordito-del-sabor
npm run dev
```

Abre http://localhost:3000 y prueba login/registro.

---

## ✅ Listo

Los datos ahora se guardan en MongoDB. ¡Felicidades! 🎉

---

## 📚 Documentación Completa

Para más detalles, lee: `MONGODB_SETUP.md`

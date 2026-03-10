# ✅ MongoDB Setup Checklist

## 📋 Antes de Empezar

- [ ] Tienes acceso a internet
- [ ] Tienes una cuenta de email
- [ ] Tienes acceso a tu proyecto local

---

## 🔧 PASO 1: Crear Cuenta en MongoDB Atlas

### Acciones
- [ ] Abre https://www.mongodb.com/cloud/atlas
- [ ] Haz clic en "Sign Up"
- [ ] Ingresa tu email
- [ ] Crea una contraseña fuerte
- [ ] Acepta los términos
- [ ] Haz clic en "Create your Atlas account"
- [ ] Verifica tu email
- [ ] Completa el formulario de información

### Tiempo: 5 minutos
### Resultado: Cuenta creada ✅

---

## 🏗️ PASO 2: Crear Proyecto

### Acciones
- [ ] Después de verificar, verás la opción de crear proyecto
- [ ] Nombre: `El Gordito del Sabor`
- [ ] Haz clic en "Create Project"

### Tiempo: 1 minuto
### Resultado: Proyecto creado ✅

---

## 🗄️ PASO 3: Crear Cluster

### Acciones
- [ ] Haz clic en "Create a Deployment"
- [ ] Selecciona "M0 Free" (Gratis)
- [ ] Selecciona proveedor: AWS
- [ ] Selecciona región: us-east-1 (o la más cercana)
- [ ] Haz clic en "Create Deployment"
- [ ] Espera 2-3 minutos

### Tiempo: 5 minutos
### Resultado: Cluster creado ✅

---

## 👤 PASO 4: Crear Usuario de Base de Datos

### Acciones
- [ ] En el menú izquierdo, haz clic en "Database Access"
- [ ] Haz clic en "Add New Database User"
- [ ] Username: `gordito_user`
- [ ] Password: [Crea una contraseña fuerte]
- [ ] Guarda la contraseña en un lugar seguro
- [ ] Built-in Role: "Atlas Admin"
- [ ] Haz clic en "Add User"

### Información a Guardar
```
Username: gordito_user
Password: _________________ (guarda aquí)
```

### Tiempo: 2 minutos
### Resultado: Usuario creado ✅

---

## 🌐 PASO 5: Permitir Acceso desde tu IP

### Acciones
- [ ] En el menú izquierdo, haz clic en "Network Access"
- [ ] Haz clic en "Add IP Address"
- [ ] Selecciona "Allow Access from Anywhere"
- [ ] Haz clic en "Confirm"

**Nota:** Para producción, deberías agregar solo tu IP. Para desarrollo, "Anywhere" está bien.

### Tiempo: 1 minuto
### Resultado: Acceso permitido ✅

---

## 🔗 PASO 6: Obtener Connection String

### Acciones
- [ ] En el menú izquierdo, haz clic en "Clusters"
- [ ] Haz clic en el botón "Connect" de tu cluster
- [ ] Selecciona "Drivers"
- [ ] Selecciona "Node.js" como driver
- [ ] Copia la connection string

### Ejemplo
```
mongodb+srv://gordito_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

### Acciones Adicionales
- [ ] Reemplaza `<password>` con tu contraseña real
- [ ] Guarda la connection string completa

### Información a Guardar
```
MONGODB_URI: ________________________________________________
```

### Tiempo: 2 minutos
### Resultado: Connection string obtenida ✅

---

## ⚙️ PASO 7: Configurar .env.local

### Acciones
- [ ] Abre el archivo `.env.local` en tu editor
- [ ] Agrega la siguiente línea:

```env
MONGODB_URI=mongodb+srv://gordito_user:TuContraseña@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

- [ ] Reemplaza `TuContraseña` con tu contraseña real
- [ ] Reemplaza `cluster0.xxxxx` con tu cluster real
- [ ] Guarda el archivo

### Verificación
- [ ] El archivo `.env.local` tiene `MONGODB_URI`
- [ ] La contraseña es correcta
- [ ] El cluster es correcto

### Tiempo: 1 minuto
### Resultado: .env.local configurado ✅

---

## 🧪 PASO 8: Probar la Conexión

### Acciones
- [ ] Abre terminal
- [ ] Navega a tu proyecto: `cd /Users/gardo/gordito-del-sabor`
- [ ] Inicia el servidor: `npm run dev`
- [ ] Abre http://localhost:3000 en tu navegador
- [ ] Intenta registrarte con un email y contraseña
- [ ] Intenta hacer login

### Verificación
- [ ] El servidor inicia sin errores
- [ ] Puedes registrarte
- [ ] Puedes hacer login
- [ ] No hay errores de conexión a MongoDB

### Tiempo: 2 minutos
### Resultado: Conexión probada ✅

---

## 🔍 PASO 9: Verificar en MongoDB Atlas

### Acciones
- [ ] Ve a https://cloud.mongodb.com
- [ ] Selecciona tu proyecto "El Gordito del Sabor"
- [ ] Haz clic en "Collections"
- [ ] Verifica que exista la colección "users"
- [ ] Haz clic en "users"
- [ ] Verifica que tu usuario registrado esté ahí

### Verificación
- [ ] Ves la colección "users"
- [ ] Ves tu usuario registrado
- [ ] El email es correcto
- [ ] La contraseña está hasheada

### Tiempo: 2 minutos
### Resultado: Datos en MongoDB ✅

---

## 🎉 ¡COMPLETADO!

### Resumen
- ✅ Cuenta en MongoDB Atlas creada
- ✅ Cluster M0 (gratis) creado
- ✅ Usuario de base de datos creado
- ✅ Acceso permitido
- ✅ Connection string obtenida
- ✅ .env.local configurado
- ✅ Conexión probada
- ✅ Datos en MongoDB verificados

### Tiempo Total: ~20 minutos

---

## 📚 Documentación

Si necesitas más detalles:
- **Inicio Rápido**: `MONGODB_QUICK_START.md`
- **Guía Completa**: `MONGODB_SETUP.md`
- **Arquitectura**: `MONGODB_ARCHITECTURE.md`
- **Resumen de Cambios**: `MONGODB_INTEGRATION.md`

---

## 🆘 Problemas?

### Error: "MONGODB_URI is not defined"
- [ ] Verifica que `.env.local` tenga `MONGODB_URI`
- [ ] Verifica que no haya espacios extras
- [ ] Reinicia el servidor

### Error: "Connection refused"
- [ ] Verifica que tu IP esté permitida en Network Access
- [ ] Verifica que el cluster esté activo
- [ ] Verifica que la contraseña sea correcta

### Error: "Authentication failed"
- [ ] Verifica el username: `gordito_user`
- [ ] Verifica la contraseña
- [ ] Verifica que el usuario esté creado en Database Access

### Error: "Timeout"
- [ ] Verifica tu conexión a internet
- [ ] Verifica que el cluster esté activo
- [ ] Espera unos minutos y reinicia

---

## ✨ Próximos Pasos (Opcional)

Una vez que MongoDB esté funcionando:

1. **Agregar más recetas con imágenes**
   - Archivo: `lib/recipes-data.ts`

2. **Conectar favoritos a MongoDB**
   - Archivo: `lib/favorites-store.ts`

3. **Conectar carrito a MongoDB**
   - Archivo: `lib/cart-store.ts`

4. **Crear admin panel para usuarios**
   - Archivo: `app/admin/usuarios/page.tsx`

5. **Crear admin panel para órdenes**
   - Archivo: `app/admin/ordenes/page.tsx`

---

## 📞 ¿Necesitas Ayuda?

Si tienes problemas en cualquier paso, avísame y te ayudaré. 🚀

**¡Felicidades por llegar hasta aquí!** 🎉

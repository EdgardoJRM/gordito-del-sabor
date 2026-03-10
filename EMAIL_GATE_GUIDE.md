# 📧 Sistema de Email Gate para Recetas

## ¿Qué es?

Un sistema que requiere que los usuarios ingresen su nombre y email **cada vez** que quieren acceder a una receta. Esto te permite:

✅ Capturar información de usuarios
✅ Construir una lista de suscriptores
✅ Enviar promociones y nuevas recetas
✅ Aumentar engagement

## 🎯 Cómo Funciona

### 1. Usuario Accede a una Receta

El usuario hace clic en una receta (ej: `/recetas/1`)

### 2. Se Abre el Modal de Email Gate

Aparece un modal pidiendo:
- Nombre Completo
- Correo Electrónico

### 3. Validación

El sistema valida:
- Email válido (formato correcto)
- Nombre no vacío

### 4. Envío de Datos

Los datos se guardan en:
- **localStorage** (actualmente, para desarrollo)
- **Backend** (cuando lo conectes)

### 5. Acceso a la Receta

Una vez completado, el usuario ve la receta completa.

## 📁 Archivos Creados

### 1. `components/EmailGate.tsx`
Modal que pide email y nombre.

**Características:**
- Validación de email
- Validación de nombre
- Manejo de errores
- Loading state
- Nota de privacidad

### 2. `components/EmailGateClient.tsx`
Componente cliente que maneja la lógica.

**Características:**
- Muestra el modal
- Maneja el envío
- Muestra la receta después
- Muestra información del usuario

## 🔧 Cómo Usar

### En una Página de Receta

```typescript
import EmailGateClient from '@/components/EmailGateClient';

export default function RecipeDetailPage() {
  return (
    <main>
      <EmailGateClient recipeName="Nombre de la Receta" />
    </main>
  );
}
```

### Personalizar el Nombre de la Receta

```typescript
<EmailGateClient recipeName="Mofongo Tradicional" />
<EmailGateClient recipeName="Arroz con Gandules" />
<EmailGateClient recipeName="Pechuga de Pavo Rellena" />
```

## 💾 Almacenamiento de Datos

### Actualmente (localStorage)

Los datos se guardan en el navegador del usuario:

```javascript
{
  email: "usuario@email.com",
  name: "Juan Pérez",
  recipe: "Mofongo Tradicional",
  timestamp: "2026-03-08T17:50:00.000Z"
}
```

### Próximamente (Backend)

Puedes conectar a:
- **Mailchimp** - Para email marketing
- **SendGrid** - Para envío de emails
- **Brevo** - Para automatización
- **Tu propia API** - Para base de datos personalizada

## 🔄 Flujo de Datos

```
Usuario accede a receta
        ↓
Modal de Email Gate aparece
        ↓
Usuario ingresa nombre y email
        ↓
Validación
        ↓
Guardar en localStorage/Backend
        ↓
Mostrar receta
        ↓
Usuario ve información confirmada
```

## 📊 Datos Capturados

Para cada acceso a receta, se captura:

```json
{
  "email": "usuario@email.com",
  "name": "Juan Pérez",
  "recipe": "Mofongo Tradicional",
  "timestamp": "2026-03-08T17:50:00.000Z"
}
```

## 🎨 Personalización

### Cambiar Texto del Modal

Edita `components/EmailGate.tsx`:

```typescript
<p className="text-gray-600 mb-6">
  Para acceder a la receta de <span className="font-semibold">{recipeName}</span>, 
  por favor comparte tu información:
</p>
```

### Cambiar Colores

Edita los estilos en `components/EmailGate.tsx`:

```typescript
className="bg-white rounded-2xl shadow-2xl"  // Cambiar aquí
```

### Cambiar Validaciones

Edita `components/EmailGate.tsx`:

```typescript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  setError('Por favor ingresa un email válido');
  return;
}
```

## 🚀 Integración con Backend

### Paso 1: Crear API Endpoint

```typescript
// app/api/subscribers/route.ts
export async function POST(request: Request) {
  const { email, name, recipe } = await request.json();
  
  // Guardar en base de datos
  // Enviar email de confirmación
  
  return Response.json({ success: true });
}
```

### Paso 2: Actualizar EmailGate.tsx

```typescript
const response = await fetch('/api/subscribers', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, name, recipe: recipeName }),
});
```

## 📧 Integración con Mailchimp

### Paso 1: Obtener API Key

1. Ve a https://mailchimp.com
2. Crea una cuenta
3. Ve a Settings → API Keys
4. Copia tu API Key

### Paso 2: Crear API Endpoint

```typescript
// app/api/subscribers/route.ts
import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export async function POST(request: Request) {
  const { email, name, recipe } = await request.json();
  
  try {
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
      email_address: email,
      status: 'subscribed',
      merge_fields: {
        FNAME: name,
        RECIPE: recipe,
      },
    });
    
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
```

### Paso 3: Agregar Variables de Entorno

```bash
# .env.local
MAILCHIMP_API_KEY=tu_api_key
MAILCHIMP_SERVER_PREFIX=us1
MAILCHIMP_LIST_ID=tu_list_id
```

## ✅ Checklist

- [ ] Componentes EmailGate y EmailGateClient creados
- [ ] Página de receta actualizada
- [ ] Probar localmente
- [ ] Validar que el modal aparece
- [ ] Validar que se guardan los datos
- [ ] Conectar a backend (opcional)
- [ ] Integrar con Mailchimp (opcional)
- [ ] Probar en producción

## 🆘 Solución de Problemas

### El modal no aparece
- Verifica que estés usando `EmailGateClient`
- Verifica que el componente esté importado correctamente

### Los datos no se guardan
- Abre DevTools → Application → Local Storage
- Verifica que `recipe_subscribers` esté ahí

### El email no se valida
- Verifica el regex de email
- Prueba con un email válido (ej: test@example.com)

## 📞 Soporte

Para más información:
- Documentación de Next.js: https://nextjs.org/docs
- Mailchimp API: https://mailchimp.com/developer/
- SendGrid: https://sendgrid.com/docs/

---

¡Listo! Ahora tienes un sistema profesional de captura de emails para tus recetas.

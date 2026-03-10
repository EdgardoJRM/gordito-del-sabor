# Despliegue en Vercel - E-Commerce

## Pasos para desplegar en Vercel

### 1. Preparar el repositorio en GitHub

```bash
cd /Users/gardo/gordito-del-sabor

# Inicializar git si no está hecho
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Initial commit: E-commerce setup"

# Crear repositorio en GitHub
# Ve a https://github.com/new
# Crea un repositorio llamado "gordito-del-sabor"

# Agregar remote
git remote add origin https://github.com/tu-usuario/gordito-del-sabor.git

# Push
git branch -M main
git push -u origin main
```

### 2. Conectar Vercel

1. Ve a https://vercel.com
2. Haz clic en "New Project"
3. Selecciona "Import Git Repository"
4. Busca y selecciona "gordito-del-sabor"
5. Haz clic en "Import"

### 3. Configurar Variables de Entorno

En el dashboard de Vercel:
1. Ve a "Settings" → "Environment Variables"
2. Agrega las siguientes variables:

```
NEXTAUTH_URL=https://tu-dominio.vercel.app
NEXTAUTH_SECRET=genera-una-clave-segura-aqui

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

### 4. Generar NEXTAUTH_SECRET

Ejecuta en tu terminal:
```bash
openssl rand -base64 32
```

Copia el resultado y úsalo como NEXTAUTH_SECRET.

### 5. Desplegar

1. Vercel detectará automáticamente que es un proyecto Next.js
2. Haz clic en "Deploy"
3. Espera a que se complete el despliegue

### 6. Conectar Dominio GoDaddy

1. En Vercel, ve a "Settings" → "Domains"
2. Agrega tu dominio de GoDaddy
3. Vercel te dará instrucciones de DNS
4. En GoDaddy:
   - Ve a "Manage DNS"
   - Agrega los registros DNS que Vercel proporciona
   - Espera a que se propague (puede tomar 24-48 horas)

### 7. Configurar Stripe para Producción

1. En Stripe, cambia a claves de producción (live keys)
2. Actualiza las variables de entorno en Vercel
3. Configura webhooks en Stripe:
   - URL: `https://tu-dominio.com/api/webhooks/stripe`
   - Eventos: `payment_intent.succeeded`, `payment_intent.payment_failed`

## Verificar Despliegue

1. Ve a tu URL de Vercel o dominio
2. Prueba el flujo completo:
   - Registro
   - Login
   - Agregar producto al carrito
   - Checkout
   - Pago (usa tarjeta de prueba)

## Monitoreo

En Vercel puedes:
- Ver logs en "Deployments"
- Monitorear performance
- Ver analytics
- Configurar alertas

## Troubleshooting

### Error: "NEXTAUTH_SECRET not set"
- Asegúrate de haber configurado NEXTAUTH_SECRET en variables de entorno

### Error: "Stripe key not found"
- Verifica que STRIPE_SECRET_KEY esté configurado correctamente

### Error: "Domain not found"
- Espera a que se propague el DNS (puede tomar 24-48 horas)
- Verifica los registros DNS en GoDaddy

## Próximas Mejoras

1. Implementar base de datos (MongoDB Atlas)
2. Agregar webhooks de Stripe
3. Enviar emails de confirmación
4. Implementar sistema de seguimiento de órdenes
5. Agregar panel de admin más completo

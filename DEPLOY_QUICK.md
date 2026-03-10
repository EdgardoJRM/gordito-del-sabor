# 🚀 DESPLIEGUE RÁPIDO EN VERCEL

## Paso 1: Preparar Git (5 minutos)

```bash
cd /Users/gardo/gordito-del-sabor

# Inicializar git
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Initial commit: E-commerce setup"
```

## Paso 2: Crear Repositorio en GitHub (3 minutos)

1. Ve a https://github.com/new
2. Nombre: `gordito-del-sabor`
3. Descripción: "Tienda de delantales personalizados"
4. Haz clic en "Create repository"

## Paso 3: Push a GitHub (2 minutos)

```bash
git remote add origin https://github.com/tu-usuario/gordito-del-sabor.git
git branch -M main
git push -u origin main
```

## Paso 4: Conectar Vercel (5 minutos)

1. Ve a https://vercel.com
2. Haz clic en "New Project"
3. Haz clic en "Import Git Repository"
4. Busca y selecciona "gordito-del-sabor"
5. Haz clic en "Import"

## Paso 5: Configurar Variables de Entorno (3 minutos)

En Vercel:
1. Ve a "Settings" → "Environment Variables"
2. Agrega las siguientes variables:

```
NEXTAUTH_URL=https://tu-dominio.vercel.app
NEXTAUTH_SECRET=genera-una-clave-segura-aqui

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_tu_clave
STRIPE_SECRET_KEY=sk_live_tu_clave
```

### Generar NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

Copia el resultado y úsalo como NEXTAUTH_SECRET.

## Paso 6: Desplegar (2 minutos)

1. Vercel detectará automáticamente que es Next.js
2. Haz clic en "Deploy"
3. Espera a que se complete (2-3 minutos)

## Paso 7: Conectar Dominio GoDaddy (10 minutos)

### En Vercel:
1. Ve a "Settings" → "Domains"
2. Agrega tu dominio de GoDaddy
3. Vercel te dará instrucciones de DNS

### En GoDaddy:
1. Ve a "Manage DNS"
2. Agrega los registros DNS que Vercel proporciona
3. Espera a que se propague (24-48 horas)

## Paso 8: Actualizar Stripe (5 minutos)

1. En Stripe, obtén tus claves de producción (live keys)
2. En Vercel, actualiza las variables de entorno:
   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   - STRIPE_SECRET_KEY=sk_live_...

## ✅ Verificar Despliegue

1. Ve a tu URL de Vercel o dominio
2. Prueba el flujo completo:
   - Registro
   - Agregar producto al carrito
   - Checkout
   - Pago

## 🎯 Resumen

| Paso | Acción | Tiempo |
|------|--------|--------|
| 1 | Preparar Git | 5 min |
| 2 | Crear repo GitHub | 3 min |
| 3 | Push a GitHub | 2 min |
| 4 | Conectar Vercel | 5 min |
| 5 | Variables de entorno | 3 min |
| 6 | Desplegar | 2 min |
| 7 | Conectar dominio | 10 min |
| 8 | Actualizar Stripe | 5 min |
| **TOTAL** | | **35 min** |

## 📞 Troubleshooting

### Error: "NEXTAUTH_SECRET not set"
- Asegúrate de haber configurado NEXTAUTH_SECRET en Vercel

### Error: "Stripe key not found"
- Verifica que STRIPE_SECRET_KEY esté configurado en Vercel

### Error: "Domain not found"
- Espera a que se propague el DNS (24-48 horas)
- Verifica los registros DNS en GoDaddy

### Error: "Build failed"
- Verifica que todos los archivos estén en Git
- Verifica que las variables de entorno estén configuradas

## 🎉 ¡Listo!

Tu tienda está en línea y lista para recibir pedidos.

**URL**: https://tu-dominio.com
**Admin**: https://tu-dominio.com/admin/orders

¡Felicidades! 🚀

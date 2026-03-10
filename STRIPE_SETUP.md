# Configuración de Stripe

## Pasos para configurar Stripe

### 1. Crear una cuenta en Stripe
- Ve a https://stripe.com
- Haz clic en "Sign up"
- Completa el registro con tu información

### 2. Obtener las claves de API
- Inicia sesión en tu dashboard de Stripe
- Ve a "Developers" → "API keys"
- Encontrarás dos tipos de claves:
  - **Publishable Key** (pk_test_...)
  - **Secret Key** (sk_test_...)

### 3. Configurar variables de entorno
- Copia el archivo `.env.example` a `.env.local`
- Reemplaza los valores de Stripe:
  ```
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_tu_clave_aqui
  STRIPE_SECRET_KEY=sk_test_tu_clave_aqui
  ```

### 4. Configurar URLs de redirección
En el dashboard de Stripe:
- Ve a "Settings" → "Webhooks"
- Agrega los siguientes endpoints:
  - Success: `https://tudominio.com/pago-exitoso`
  - Cancel: `https://tudominio.com/carrito`

### 5. Probar en desarrollo
- Usa las claves de prueba (test keys)
- Números de tarjeta de prueba:
  - Visa: `4242 4242 4242 4242`
  - Mastercard: `5555 5555 5555 4444`
  - Fecha: Cualquier fecha futura
  - CVC: Cualquier número de 3 dígitos

### 6. Pasar a producción
- Una vez listo, cambia a las claves de producción (live keys)
- Actualiza las variables de entorno
- Despliega en Vercel

## Notas importantes
- Nunca compartas tu Secret Key
- Mantén las claves seguras en variables de entorno
- En producción, usa HTTPS obligatoriamente
- Implementa webhooks para confirmar pagos

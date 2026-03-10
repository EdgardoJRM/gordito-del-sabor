# 🔐 PANEL DE ADMIN - INSTRUCCIONES

## Acceso al Panel de Admin

### Credenciales de Admin

Para acceder al panel de admin, debes usar las siguientes credenciales:

**Email:** `admin@gordito.com`
**Contraseña:** `admin123` (cambiar en producción)

### Cómo Acceder

1. **Opción 1: Desde el Navbar**
   - Si estás autenticado como admin, verás un icono de engranaje (⚙️) en el navbar
   - Haz clic en "Admin" para ir al dashboard

2. **Opción 2: URL Directa**
   - Ve a `http://localhost:3001/admin`
   - Se redirigirá automáticamente a `/admin/dashboard`

3. **Opción 3: Desde el Login**
   - Ve a `/auth/login`
   - Ingresa las credenciales de admin
   - Haz clic en "Iniciar Sesión"
   - Verás el enlace de Admin en el navbar

### Panel de Admin - Secciones

#### 1. **Dashboard** (`/admin/dashboard`)
- Vista general del sistema
- Estadísticas rápidas
- Accesos rápidos a todas las secciones

#### 2. **Gestión de Usuarios** (`/admin/usuarios`)
- Ver todos los usuarios registrados
- Información de cada usuario
- Fecha de registro

#### 3. **Recetas Más Vistas** (`/admin/recetas-vistas`)
- Ver todas las recetas
- Ranking de recetas más vistas
- Estadísticas de visualización

#### 4. **Órdenes** (`/admin/ordenes`)
- Ver todas las órdenes de compra
- Detalles de cada orden
- Estado de las órdenes

#### 5. **Recetas Favoritas** (Próximamente)
- Ver recetas más guardadas
- Análisis de preferencias

#### 6. **Reportes** (Próximamente)
- Generar reportes
- Análisis avanzados
- Exportar datos

#### 7. **Configuración** (Próximamente)
- Ajustes del sistema
- Configuración general

### Características del Panel

✅ **Autenticación Requerida**
- Solo usuarios con email `admin@gordito.com` pueden acceder
- Otros usuarios verán "Acceso Denegado"

✅ **Interfaz Moderna**
- Diseño limpio y profesional
- Fácil de navegar
- Responsive en todos los dispositivos

✅ **Datos en Tiempo Real**
- Información actualizada
- Estadísticas en vivo
- Análisis de comportamiento

### Seguridad

⚠️ **IMPORTANTE:**
- Cambia la contraseña de admin en producción
- No compartas las credenciales de admin
- Usa HTTPS en producción
- Implementa 2FA en el futuro

### Próximas Mejoras

- [ ] Conectar a base de datos para persistencia
- [ ] Agregar más estadísticas
- [ ] Implementar gráficos
- [ ] Agregar exportación de datos
- [ ] Implementar 2FA
- [ ] Agregar logs de actividad
- [ ] Crear reportes automáticos

### Notas

- Los datos actualmente se guardan en memoria
- Cuando se conecte a una base de datos, los datos serán persistentes
- El panel está diseñado para ser escalable
- Se pueden agregar más secciones fácilmente

---

**¡El panel de admin está listo para usar!** 🎉

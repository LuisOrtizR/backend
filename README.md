# 🛍️ E-Commerce Backend API

<div align="center">

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

**API RESTful completa para plataforma e-commerce con autenticación JWT y sistema RBAC**

[Características](#-características) • [Instalación](#-instalación-rápida) • [Configuración](#️-configuración) • [API Docs](#-documentación-de-api) • [Desarrollo](#-desarrollo)

</div>

---

## 📋 Descripción

Sistema backend empresarial para e-commerce desarrollado con **NestJS 11** y **TypeScript**, implementando arquitectura modular escalable, autenticación segura con JWT, sistema completo de permisos basado en roles (RBAC), gestión de productos con inventario y procesamiento de órdenes.

## ✨ Características

### 🔐 Autenticación y Seguridad
- **JWT Authentication** - Tokens seguros con expiración configurable
- **Password Reset Flow** - Sistema completo de recuperación por email
- **Bcrypt Hashing** - Encriptación de contraseñas con salt rounds
- **JWT Guards** - Protección de rutas mediante decoradores
- **Custom Decorators** - `@ReqUser()` para acceso tipado al usuario

### 👥 Sistema de Usuarios y Permisos
- **RBAC Completo** - Roles y permisos granulares
- **User Management** - CRUD completo con validaciones
- **Dynamic Permissions** - Asignación flexible de capacidades
- **Role Assignment** - Gestión de roles por usuario
- **Permission Filters** - Control de acceso a nivel de endpoint

### 🛒 Funcionalidades E-Commerce
- **Product Catalog** - Gestión completa de productos
- **Inventory Control** - Control de stock y disponibilidad
- **Order Processing** - Sistema de órdenes con estados
- **Product Filtering** - Búsqueda y filtrado avanzado
- **Order Details** - Tracking completo de pedidos

### 📧 Sistema de Emails
- **Nodemailer Integration** - Envío de emails transaccionales
- **Password Reset Emails** - Plantillas automáticas
- **SMTP Configuration** - Soporte para Gmail y otros proveedores

### 🗄️ Base de Datos
- **Prisma ORM** - Type-safe database queries
- **MySQL 8** - Base de datos relacional optimizada
- **Migration System** - Control de versiones del schema
- **Exception Filters** - Manejo de errores de Prisma personalizado

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **NestJS** | 11.0.1 | Framework backend modular |
| **TypeScript** | 5.7.3 | Lenguaje tipado |
| **Prisma** | 6.19.0 | ORM y migraciones |
| **MySQL** | 8.x | Base de datos |
| **Passport JWT** | 4.0.1 | Estrategia de autenticación |
| **Class Validator** | 0.14.2 | Validación de DTOs |
| **Nodemailer** | 7.0.10 | Sistema de emails |
| **Bcrypt** | 6.0.0 | Hash de contraseñas |

## 📦 Instalación Rápida

### Requisitos Previos

```bash
Node.js >= 18.x
MySQL >= 8.x
npm >= 9.x
```

### Instalación en 5 pasos

```bash
# 1. Clonar el repositorio
git clone <repository-url>
cd backend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# 4. Configurar base de datos
npx prisma generate
npx prisma migrate deploy

# 5. Iniciar en desarrollo
npm run start:dev
```

La API estará disponible en `http://localhost:3000`

## ⚙️ Configuración

### Variables de Entorno

Crear archivo `.env` en la raíz:

```env
# Database Configuration
DATABASE_URL="mysql://root:password@localhost:3306/backend_nest_prisma"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
JWT_EXPIRES_IN=3600  # 1 hora en segundos

# Email Configuration (Gmail)
MAIL_HOST="smtp.gmail.com"
MAIL_PORT=587
MAIL_USER="tu-email@gmail.com"
MAIL_PASS="tu-app-password"  # Contraseña de aplicación
MAIL_FROM="noreply@ecommerce.com"

# App Configuration (opcional)
PORT=3000
NODE_ENV="development"
```

### Configurar Gmail para Nodemailer

1. Habilitar verificación en 2 pasos en tu cuenta Google
2. Generar contraseña de aplicación: https://myaccount.google.com/apppasswords
3. Usar la contraseña generada en `MAIL_PASS`

### Estructura de Base de Datos

El schema incluye las siguientes tablas:

```
├── users              # Usuarios del sistema
├── roles              # Roles disponibles
├── permissions        # Permisos granulares
├── user_roles         # Relación usuarios-roles
├── role_permissions   # Relación roles-permisos
├── products           # Catálogo de productos
├── orders             # Órdenes de compra
├── order_details      # Detalles de cada orden
└── password_resets    # Tokens de recuperación
```

## 🚀 Comandos Disponibles

### Desarrollo

```bash
npm run start          # Iniciar servidor
npm run start:dev      # Modo desarrollo (hot-reload)
npm run start:debug    # Modo debug
```

### Producción

```bash
npm run build          # Compilar TypeScript
npm run start:prod     # Ejecutar versión compilada
```

### Base de Datos

```bash
npx prisma studio           # Explorador visual de BD
npx prisma migrate dev      # Crear nueva migración
npx prisma migrate deploy   # Aplicar migraciones
npx prisma generate         # Regenerar cliente Prisma
npx prisma db seed          # Seedear datos iniciales
```

### Testing

```bash
npm run test               # Unit tests
npm run test:watch         # Tests en modo watch
npm run test:cov           # Cobertura de código
npm run test:e2e           # End-to-end tests
npm run test:debug         # Debug tests
```

### Code Quality

```bash
npm run lint               # ESLint
npm run format             # Prettier
```

## 📡 Documentación de API

### 🔐 Autenticación

#### Registro de Usuario
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "name": "John Doe"
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": 1, "email": "user@example.com", "name": "John Doe" }
}
```

#### Recuperar Contraseña
```http
POST /auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### Resetear Contraseña
```http
POST /auth/reset-password
Content-Type: application/json

{
  "token": "reset-token-from-email",
  "newPassword": "NewSecurePass123!"
}
```

#### Perfil de Usuario (Protegido)
```http
GET /auth/profile
Authorization: Bearer <access_token>
```

### 👤 Usuarios

```http
GET    /users              # Listar todos los usuarios
GET    /users/:id          # Obtener usuario específico
POST   /users              # Crear nuevo usuario
PATCH  /users/:id          # Actualizar usuario
DELETE /users/:id          # Eliminar usuario
```

**Ejemplo - Crear Usuario:**
```json
{
  "email": "admin@example.com",
  "password": "Admin123!",
  "name": "Administrator",
  "roleIds": [1, 2]
}
```

### 🛍️ Productos

```http
GET    /products                      # Listar productos
GET    /products?name=laptop          # Buscar por nombre
GET    /products?minPrice=100         # Filtrar por precio
GET    /products/:id                  # Obtener producto
POST   /products                      # Crear producto
PATCH  /products/:id                  # Actualizar producto
DELETE /products/:id                  # Eliminar producto
```

**Ejemplo - Crear Producto:**
```json
{
  "name": "Laptop HP Pavilion",
  "description": "Laptop 15.6\" Intel i5 8GB RAM",
  "price": 599.99,
  "stock": 25,
  "category": "Electronics",
  "sku": "LAP-HP-001",
  "isActive": true
}
```

### 📦 Órdenes

```http
GET    /orders            # Listar órdenes del usuario
GET    /orders/:id        # Obtener orden específica
POST   /orders            # Crear nueva orden
PATCH  /orders/:id        # Actualizar estado
DELETE /orders/:id        # Cancelar orden
```

**Ejemplo - Crear Orden:**
```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 599.99
    },
    {
      "productId": 5,
      "quantity": 1,
      "price": 29.99
    }
  ],
  "total": 1229.97,
  "status": "pending"
}
```

### 🎭 Roles

```http
GET    /roles             # Listar roles
GET    /roles/:id         # Obtener rol específico
POST   /roles             # Crear rol
PATCH  /roles/:id         # Actualizar rol
DELETE /roles/:id         # Eliminar rol
POST   /roles/assign      # Asignar rol a usuario
```

**Ejemplo - Crear Rol:**
```json
{
  "name": "manager",
  "description": "Store Manager Role",
  "permissionIds": [1, 2, 3, 5, 8]
}
```

### 🔑 Permisos

```http
GET    /permissions           # Listar permisos
POST   /permissions           # Crear permiso
POST   /permissions/assign    # Asignar permiso a rol
```

**Ejemplo - Crear Permiso:**
```json
{
  "name": "products:delete",
  "description": "Delete products from catalog"
}
```

### Estados de Respuesta HTTP

| Código | Significado |
|--------|-------------|
| `200` | Operación exitosa |
| `201` | Recurso creado |
| `400` | Solicitud inválida |
| `401` | No autenticado |
| `403` | Sin permisos |
| `404` | Recurso no encontrado |
| `409` | Conflicto (ej: email duplicado) |
| `500` | Error del servidor |

## 🏗️ Arquitectura del Proyecto

```
backend/
│
├── src/
│   ├── auth/                       # 🔐 Módulo de autenticación
│   │   ├── dto/                   # DTOs de auth
│   │   ├── auth.controller.ts     # Endpoints de auth
│   │   ├── auth.service.ts        # Lógica de autenticación
│   │   ├── jwt.strategy.ts        # Estrategia Passport JWT
│   │   ├── jwt-auth.guard.ts      # Guard de protección
│   │   └── req-user.decorator.ts  # Decorador personalizado
│   │
│   ├── users/                      # 👤 Módulo de usuarios
│   │   ├── dto/
│   │   │   ├── create-user.dto.ts
│   │   │   └── update-user.dto.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   │
│   ├── products/                   # 🛍️ Módulo de productos
│   │   ├── dto/
│   │   │   ├── create-product.dto.ts
│   │   │   ├── update-product.dto.ts
│   │   │   └── filter-product.dto.ts
│   │   ├── products.controller.ts
│   │   ├── products.service.ts
│   │   └── products.module.ts
│   │
│   ├── orders/                     # 📦 Módulo de órdenes
│   │   ├── dto/
│   │   ├── orders.controller.ts
│   │   ├── orders.service.ts
│   │   └── orders.module.ts
│   │
│   ├── roles/                      # 🎭 Módulo de roles
│   │   ├── dto/
│   │   │   ├── create-role.dto.ts
│   │   │   └── assign-role.dto.ts
│   │   ├── roles.controller.ts
│   │   ├── roles.service.ts
│   │   └── roles.module.ts
│   │
│   ├── permission/                 # 🔑 Módulo de permisos
│   │   ├── dto/
│   │   │   ├── create-permission.dto.ts
│   │   │   └── assign-permission.dto.ts
│   │   ├── permissions.controller.ts
│   │   ├── permissions.service.ts
│   │   └── permissions.module.ts
│   │
│   ├── prisma/                     # 🗄️ Servicio Prisma
│   │   ├── prisma.service.ts
│   │   └── prisma.module.ts
│   │
│   ├── common/                     # 🔧 Utilidades compartidas
│   │   └── filters/
│   │       └── prisma-client-exception.filter.ts
│   │
│   ├── app.module.ts               # Módulo raíz
│   └── main.ts                     # Punto de entrada
│
├── prisma/
│   ├── schema.prisma               # Schema de base de datos
│   └── migrations/                 # Historial de migraciones
│       ├── 20251116145816_init/
│       ├── 20251116165815_add_password_reset/
│       ├── 20251119230734_init_permissions_roles/
│       └── 20251122121639_init_full_schema/
│
├── test/                           # Tests E2E
├── .env                            # Variables de entorno
├── package.json
└── tsconfig.json
```

## 🔒 Seguridad Implementada

### Autenticación
- ✅ **JWT con secret robusto** - Token firmado con clave de 64 caracteres
- ✅ **Expiración configurable** - Tokens expiran en 1 hora por defecto
- ✅ **Password hashing** - Bcrypt con salt rounds automático
- ✅ **Password reset flow** - Sistema seguro de recuperación

### Validación
- ✅ **Class-validator** - Validación automática de DTOs
- ✅ **Type safety** - TypeScript en todo el código
- ✅ **Prisma types** - Tipos generados automáticamente

### Protección
- ✅ **JWT Guards** - Protección de rutas
- ✅ **RBAC** - Control de acceso basado en roles
- ✅ **Exception filters** - Manejo personalizado de errores Prisma
- ✅ **CORS** - Configuración de orígenes permitidos

### Recomendaciones para Producción
```typescript
// main.ts
app.use(helmet());              // Añadir headers de seguridad
app.enableCors({                // Configurar CORS
  origin: process.env.FRONTEND_URL,
  credentials: true
});
```

## 🧪 Testing

### Ejecutar Tests

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# Cobertura
npm run test:cov

# E2E tests
npm run test:e2e

# Debug
npm run test:debug
```

### Estructura de Tests

```
src/
├── auth/
│   ├── auth.controller.spec.ts
│   └── auth.service.spec.ts
├── users/
│   ├── users.controller.spec.ts
│   └── users.service.spec.ts
└── ...
```

## 📚 Recursos Adicionales

### Documentación Oficial
- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Passport JWT Strategy](http://www.passportjs.org/packages/passport-jwt/)

### Mejoras Futuras Sugeridas
- [ ] Implementar refresh tokens
- [ ] Añadir paginación a listados
- [ ] Swagger/OpenAPI documentation
- [ ] Rate limiting
- [ ] Logs con Winston
- [ ] Redis para caché
- [ ] Docker compose
- [ ] CI/CD pipeline
- [ ] Métricas y monitoring

## 🤝 Contribuir

### Flujo de Trabajo

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add: nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Convenciones de Commits

```
feat: Nueva funcionalidad
fix: Corrección de bug
docs: Documentación
style: Formato de código
refactor: Refactorización
test: Tests
chore: Mantenimiento
```

## 📝 Roadmap

### v1.0.0 (Actual)
- ✅ Autenticación JWT
- ✅ Sistema RBAC
- ✅ CRUD de productos
- ✅ Sistema de órdenes
- ✅ Recuperación de contraseña

### v1.1.0 (Próximo)
- [ ] Refresh tokens
- [ ] Paginación
- [ ] Swagger docs
- [ ] Rate limiting

### v2.0.0 (Futuro)
- [ ] Pagos con Stripe
- [ ] Carrito de compras
- [ ] Notificaciones en tiempo real
- [ ] Dashboard de analytics

## 📄 Licencia

Este proyecto es **privado** y no tiene licencia pública.

**UNLICENSED** - Todos los derechos reservados.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tuusuario](https://github.com/tuusuario)
- Email: luisangel930115@gmail.com
- LinkedIn: [Tu Perfil](https://linkedin.com/in/tuperfil)

## 🙏 Agradecimientos

- **NestJS Team** - Por el increíble framework
- **Prisma Team** - Por el mejor ORM de TypeScript
- **Comunidad Open Source** - Por las librerías utilizadas

---

<div align="center">

### ⭐ Si este proyecto te resulta útil, considera darle una estrella ⭐

**Desarrollado con ❤️ usando NestJS + TypeScript + Prisma**

![Made with NestJS](https://img.shields.io/badge/Made%20with-NestJS-E0234E?style=flat-square&logo=nestjs)
![Made with TypeScript](https://img.shields.io/badge/Made%20with-TypeScript-3178C6?style=flat-square&logo=typescript)
![Made with Prisma](https://img.shields.io/badge/Made%20with-Prisma-2D3748?style=flat-square&logo=prisma)

</div>
# 🛍️ E-Commerce Backend API

<div align="center">

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

**Sistema backend robusto y escalable para plataforma e-commerce**

[Características](#-características) • [Instalación](#-instalación) • [Configuración](#️-configuración) • [API](#-endpoints-principales) • [Desarrollo](#-desarrollo)

</div>

---

## 📋 Descripción

API RESTful completa para e-commerce construida con **NestJS** y **TypeScript**, implementando arquitectura modular, autenticación JWT, sistema de permisos basado en roles (RBAC) y gestión integral de productos y órdenes.

## ✨ Características

### 🔐 Autenticación y Seguridad
- **JWT Authentication** - Tokens seguros con refresh token
- **Recuperación de contraseña** - Sistema de reset por email
- **Bcrypt** - Hash seguro de contraseñas
- **Guards personalizados** - Protección de rutas

### 👥 Sistema de Usuarios y Permisos
- **RBAC completo** - Roles y permisos granulares
- **Gestión de usuarios** - CRUD completo
- **Permisos dinámicos** - Asignación flexible de capacidades
- **Decoradores personalizados** - `@ReqUser()` para obtener usuario autenticado

### 🛒 Funcionalidades E-Commerce
- **Gestión de productos** - Catálogo completo con inventario
- **Sistema de órdenes** - Procesamiento de pedidos
- **Múltiples módulos** - Arquitectura escalable

### 📧 Comunicaciones
- **Email service** - Integración con Nodemailer
- **Plantillas** - Sistema de emails transaccionales

### 🗄️ Base de Datos
- **Prisma ORM** - Type-safe database access
- **MySQL** - Base de datos relacional
- **Migraciones** - Control de versiones del schema

## 🛠️ Stack Tecnológico

| Tecnología | Propósito |
|------------|-----------|
| **NestJS 11** | Framework backend |
| **TypeScript 5.7** | Lenguaje de programación |
| **Prisma 6** | ORM y migraciones |
| **MySQL** | Base de datos |
| **Passport JWT** | Autenticación |
| **Class Validator** | Validación de DTOs |
| **Nodemailer** | Envío de emails |

## 📦 Instalación

### Requisitos Previos

- Node.js >= 18.x
- MySQL >= 8.x
- npm o yarn

### Pasos de Instalación

```bash
# 1. Clonar el repositorio
git clone <repository-url>
cd backend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# 4. Generar cliente Prisma
npx prisma generate

# 5. Ejecutar migraciones
npx prisma migrate deploy

# 6. (Opcional) Seedear base de datos
npx prisma db seed
```

## ⚙️ Configuración

### Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
# Database
DATABASE_URL="mysql://user:password@localhost:3306/ecommerce"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
JWT_REFRESH_SECRET="your-refresh-secret"
JWT_REFRESH_EXPIRES_IN="30d"

# Email (Nodemailer)
MAIL_HOST="smtp.gmail.com"
MAIL_PORT=587
MAIL_USER="your-email@gmail.com"
MAIL_PASSWORD="your-app-password"
MAIL_FROM="noreply@ecommerce.com"

# App
PORT=3000
NODE_ENV="development"
FRONTEND_URL="http://localhost:4200"
```

### Schema Prisma

El proyecto incluye migraciones para:
- ✅ Sistema de usuarios
- ✅ Roles y permisos (RBAC)
- ✅ Productos e inventario
- ✅ Órdenes y detalles
- ✅ Recuperación de contraseñas

## 🚀 Uso

### Comandos Disponibles

```bash
# Desarrollo
npm run start:dev          # Modo watch con hot-reload

# Producción
npm run build              # Compilar proyecto
npm run start:prod         # Ejecutar en producción

# Base de datos
npx prisma studio          # Explorador visual de BD
npx prisma migrate dev     # Crear nueva migración
npx prisma generate        # Regenerar cliente

# Testing
npm run test               # Unit tests
npm run test:e2e          # End-to-end tests
npm run test:cov          # Cobertura de tests

# Code Quality
npm run lint              # Ejecutar ESLint
npm run format            # Formatear código con Prettier
```

## 📡 Endpoints Principales

### Autenticación

```http
POST   /auth/register          # Registrar nuevo usuario
POST   /auth/login             # Iniciar sesión
POST   /auth/refresh           # Renovar token
POST   /auth/forgot-password   # Solicitar reset
POST   /auth/reset-password    # Resetear contraseña
GET    /auth/profile           # Obtener perfil (protegido)
```

### Usuarios

```http
GET    /users                  # Listar usuarios
GET    /users/:id              # Obtener usuario
POST   /users                  # Crear usuario
PATCH  /users/:id              # Actualizar usuario
DELETE /users/:id              # Eliminar usuario
```

### Productos

```http
GET    /products               # Listar productos
GET    /products/:id           # Obtener producto
POST   /products               # Crear producto
PATCH  /products/:id           # Actualizar producto
DELETE /products/:id           # Eliminar producto
```

### Órdenes

```http
GET    /orders                 # Listar órdenes
GET    /orders/:id             # Obtener orden
POST   /orders                 # Crear orden
PATCH  /orders/:id             # Actualizar orden
DELETE /orders/:id             # Cancelar orden
```

### Roles y Permisos

```http
GET    /roles                  # Listar roles
POST   /roles                  # Crear rol
GET    /permissions            # Listar permisos
POST   /permissions            # Crear permiso
```

## 🏗️ Arquitectura del Proyecto

```
src/
├── auth/                    # Módulo de autenticación
│   ├── dto/                # Data Transfer Objects
│   ├── guards/             # Guards JWT
│   ├── strategies/         # Passport strategies
│   └── decorators/         # Custom decorators
├── users/                   # Módulo de usuarios
├── products/               # Módulo de productos
├── orders/                 # Módulo de órdenes
├── roles/                  # Módulo de roles
├── permission/             # Módulo de permisos
├── prisma/                 # Servicio Prisma
├── common/                 # Utilidades compartidas
└── main.ts                 # Punto de entrada

prisma/
├── schema.prisma           # Schema de base de datos
└── migrations/             # Historial de migraciones
```

## 🔒 Seguridad

- ✅ Passwords hasheados con **bcrypt**
- ✅ Autenticación mediante **JWT**
- ✅ Validación de datos con **class-validator**
- ✅ Guards personalizados para protección de rutas
- ✅ CORS configurado
- ✅ Rate limiting (recomendado para producción)
- ✅ Helmet (recomendado para producción)

## 🧪 Testing

```bash
# Unit tests
npm run test

# Tests con watch mode
npm run test:watch

# Cobertura de código
npm run test:cov

# E2E tests
npm run test:e2e
```

## 📝 Buenas Prácticas Implementadas

- ✅ **Arquitectura modular** - Separación clara de responsabilidades
- ✅ **DTOs tipados** - Validación automática de datos
- ✅ **Dependency Injection** - Código testeable y mantenible
- ✅ **ORM Type-safe** - Prisma para consultas seguras
- ✅ **Error handling** - Manejo centralizado de errores
- ✅ **Code formatting** - Prettier y ESLint configurados

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado - UNLICENSED

## 👤 Autor

**Tu Nombre**
- GitHub: [@tuusuario](https://github.com/tuusuario)
- Email: tu-email@ejemplo.com

## 🙏 Agradecimientos

- NestJS por el increíble framework
- Prisma por el excelente ORM
- La comunidad de código abierto

---

<div align="center">

**⭐ Si te gusta este proyecto, dale una estrella ⭐**

Hecho con ❤️ usando NestJS

</div>
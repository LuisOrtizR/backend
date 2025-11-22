🛒 E-Commerce Backend
API REST empresarial construida con NestJS + Prisma + MySQL

Un backend moderno, escalable y robusto para e-commerce, diseñado con arquitectura profesional, autenticación segura, manejo de inventario, órdenes, usuarios y notificaciones por correo.

🚀 Características principales

✔️ Autenticación segura con JWT

✔️ Gestión completa de productos

✔️ Carrito + Órdenes + Estados

✔️ Control de inventario automático

✔️ Envío de correos (Nodemailer)

✔️ Prisma ORM + MySQL

✔️ Arquitectura modular y escalable

✔️ Validación estricta con DTOs + Pipes

✔️ Listo para producción (Docker optional)

🧱 Tech Stack
Tecnología	Uso
NestJS	Framework principal
Prisma ORM	Acceso a BD y modelos
MySQL	Base de datos
JWT + Passport	Autenticación
Nodemailer	Notificaciones por email
Docker (opcional)	Infraestructura
Class Validator	Validaciones
📦 Instalación
npm install

🔧 Variables de entorno

Crear .env:

DATABASE_URL="mysql://root:Admin1234@localhost:3306/backend_nest_prisma"

JWT_SECRET="super-secret-key"
JWT_EXPIRES_IN="3600"

MAIL_HOST="smtp.gmail.com"
MAIL_PORT=587
MAIL_USER="your-email@gmail.com"
MAIL_PASS="gmail-app-password"
MAIL_FROM="your-email@gmail.com"

🗄️ Migraciones Prisma
npx prisma migrate dev

▶️ Ejecución
Desarrollo
npm run start:dev

Producción
npm run start:prod

🛍️ Funcionalidades del E-Commerce
👤 Usuarios

Registro y login

Perfil del usuario

Hash automático de contraseñas

Recuperación de contraseña (opcional)

🛒 Productos

CRUD completo

Activar/desactivar producto

Control de stock

📦 Órdenes

Crear pedido

Descuento automático de stock

Ver historial del usuario

Estados: pending, paid, shipped, cancelled

Listado para admins

📬 Correos automáticos

Bienvenida

Confirmación de pedido

Emails transaccionales

📚 Endpoints principales (Resumen Empresarial)
🔐 Auth
Método	Endpoint	Descripción
POST	/auth/register	Registra usuario
POST	/auth/login	Devuelve JWT
👤 Users
Método	Endpoint	Descripción
GET	/users/me	Perfil del usuario (JWT)
🛍️ Products
Método	Endpoint	Descripción
GET	/products	Lista productos
GET	/products/:id	Detalle
POST	/products	Crear
PATCH	/products/:id	Actualizar
DELETE	/products/:id	Eliminar
📦 Orders
Método	Endpoint	Descripción
POST	/orders	Crear Pedido (JWT)
GET	/orders/me/list	Mis pedidos
GET	/orders/:id	Ver pedido
PATCH	/orders/:id/status	Cambiar estado
🧪 Ejemplo de creación de pedido (POSTMAN)
POST → /orders

Header:

Authorization: Bearer <token>


Body:

{
  "items": [
    { "productId": "UUID-PRODUCT", "quantity": 2 }
  ]
}

👨‍💻 Arquitectura Empresarial

Tu proyecto sigue una arquitectura de alto nivel:

src/
 ├── auth/
 ├── users/
 ├── products/
 ├── orders/
 ├── mailer/
 ├── common/
 └── prisma/


Ventajas:

➕ Escalable

➕ Fácil de mantener

➕ Separación clara por módulos

➕ Inyección de dependencias limpia

🔐 Seguridad Implementada

Hash de contraseñas con bcrypt

Tokens firmados con JWT

Guard global para rutas protegidas

Validación estricta de entrada con DTOs

Manejo de errores empresarial

📤 Scripts útiles
npm run prisma:studio   # Visualizar DB
npm run start:dev        # Desarrollo
npm run build            # Compilar

🏆 Estado del Proyecto

Este backend está preparado para ambientes empresariales, portafolios profesionales, y aplicaciones reales de e-commerce.

📄 Licencia

MIT – libre uso para proyectos personales y comerciales.
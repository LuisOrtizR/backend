// app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcomePage(): string {
    return `
    <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>E-Commerce Backend API</title>

  <style>
    body {
      margin: 0;
      font-family: "Segoe UI", Arial, sans-serif;
      background: #0d1117;
      color: #e6edf3;
    }

    header {
      text-align: center;
      padding: 70px 20px;
      background: linear-gradient(135deg, #0f172a, #1e293b);
      border-bottom: 2px solid #1e293b;
    }

    h1 {
      font-size: 2.8rem;
      color: #38bdf8;
      margin-bottom: 10px;
    }

    p {
      font-size: 1.15rem;
      opacity: 0.9;
      margin-bottom: 5px;
    }

    .tech-container {
      display: flex;
      justify-content: center;
      gap: 35px;
      margin-top: 40px;
      flex-wrap: wrap;
    }

    .tech {
      text-align: center;
    }

    .tech img {
      width: 80px;
      height: 80px;
      filter: drop-shadow(0 0 8px #0ea5e9);
      transition: transform 0.3s;
    }

    .tech img:hover {
      transform: scale(1.15);
    }

    .links {
      margin-top: 50px;
    }

    a {
      text-decoration: none;
      color: #38bdf8;
      font-weight: bold;
      margin: 0 15px;
      font-size: 1.1rem;
      transition: 0.3s;
    }

    a:hover {
      color: #7dd3fc;
    }

    footer {
      text-align: center;
      padding: 30px;
      margin-top: 60px;
      font-size: 0.9rem;
      opacity: 0.7;
    }
  </style>
</head>

<body>

  <header>
    <h1>🔥 E-Commerce Backend API</h1>
    <p>
      Sistema completo para gestión de usuarios, roles, permisos, productos, órdenes,
      autenticación JWT y mucho más.
    </p>
    <p>Desarrollado con tecnologías modernas para alto rendimiento y escalabilidad.</p>

    <div class="tech-container">
      <div class="tech">
        <img src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" alt="NodeJS" />
        <p>Node.js</p>
      </div>

      <div class="tech">
        <img src="https://nestjs.com/img/logo-small.svg" alt="NestJS" />
        <p>NestJS</p>
      </div>

      <div class="tech">
        <img src="https://cdn.worldvectorlogo.com/logos/prisma-2.svg" alt="Prisma" />
        <p>Prisma ORM</p>
      </div>

      <div class="tech">
        <img src="https://cdn.worldvectorlogo.com/logos/mysql-6.svg" alt="MySQL" />
        <p>MySQL</p>
      </div>
    </div>

    <div class="links">
      <a href="https://github.com/LuisOrtizR/backend" target="_blank">📦 Repositorio GitHub</a>
      <a href="/docs" target="_blank">📘 Documentación API</a>
      <a href="/health" target="_blank">❤️ Estado del Servidor</a>
    </div>
  </header>

  <footer>
    © 2025 E-Commerce Backend | NestJS + Prisma + MySQL
  </footer>

</body>
</html>
    `;
  }

  getHealthStatus() {
    return {
      status: 'ok',
      message: 'API Running',
      timestamp: new Date(),
    };
  }
}

# Clinical SaaS Backend

Backend para una plataforma SaaS multi-tenant de gestión médica y pediátrica, construida con una arquitectura modular, escalable y orientada a dominios.

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Stack Técnico](#-stack-técnico)
- [Arquitectura](#-arquitectura)
- [Módulos Principales](#-módulos-principales)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Submódulo Shared Common](#-submódulo-shared-common)
- [Configuración](#️-configuración)
- [Uso](#-uso)
- [Testing](#-testing)
- [Estándares de Código](#-estándares-de-código)
- [Documentación Adicional](#-documentación-adicional)
- [Licencia](#-licencia)

## 🎯 Descripción

Sistema backend para gestión clínica multi-tenant que permite a múltiples organizaciones de salud administrar sus operaciones de manera independiente y segura. El sistema incluye gestión de órdenes de servicio, agendamiento de citas, catálogo de servicios médicos, control de acceso basado en roles (RBAC) y motor de flujo de documentos clínicos.

### Características Principales

- **Multi-tenancy**: Aislamiento completo de datos a nivel de base de datos usando `tenant_id` y `business_unit_id`
- **Gestión de Órdenes de Servicio**: Ciclo de vida completo desde creación hasta cierre
- **Motor de Documentos Clínicos**: Flujo automatizado de estados de documentos
- **Control de Acceso**: Sistema RBAC con scopes granulares
- **Catálogo de Servicios**: Gestión de servicios médicos, categorías y precios
- **Gestión de Proveedores**: Administración de profesionales de salud, agendas y horarios

## 🛠 Stack Técnico

| Componente | Tecnología | Versión |
|------------|-----------|---------|
| **Runtime** | Node.js | ~20.20.x |
| **Framework** | NestJS | ^11.0.1 |
| **Lenguaje** | TypeScript | ^5.7.3 |
| **ORM** | Prisma | ^6.19.2 |
| **Migraciones** | Liquibase | 4.25.0 |
| **Base de Datos** | PostgreSQL | - |
| **Testing** | Jest | ^30.0.0 |
| **Validación** | class-validator | ^0.14.3 |
| **Documentación API** | Swagger | ^11.2.6 |
| **Tipos Compartidos** | Git Submodule `src/shared-common` | - |

## 🏗 Arquitectura

### Multi-tenancy

El sistema implementa aislamiento de datos a nivel de base de datos:

- Cada consulta debe validar el `tenantId` para garantizar el aislamiento
- Soporte adicional para aislamiento a nivel de `businessUnitId`
- Arquitectura preparada para escalabilidad horizontal

### Flujo de Documentos Clínicos

Los documentos de órdenes de servicio siguen un flujo de estados bien definido:

```
DRAFT → PENDING → SCHEDULED → IN_PROGRESS → COMPLETED
            ↓          ↓
        CANCELLED   CANCELLED
```

**Estados disponibles:**

- `DRAFT`: Borrador inicial
- `PENDING`: Pendiente de agendamiento
- `SCHEDULED`: Agendado
- `IN_PROGRESS`: En ejecución
- `COMPLETED`: Completado
- `CANCELLED`: Cancelado

El `DocumentWorkflowService` gestiona las transiciones de estado bajo demanda.

### Patrones de Diseño

- **Modular**: Cada dominio está encapsulado en su propio módulo NestJS
- **Separación de Responsabilidades**: Controllers manejan entrada/salida, Services contienen lógica de negocio
- **DTOs e Interfaces**: Se consumen desde `src/shared-common` como fuente centralizada para tipos transversales
- **Transacciones**: Uso de `$transaction` de Prisma para operaciones críticas

## 📦 Módulos Principales

| Módulo | Responsabilidad |
|--------|----------------|
| **Platform Catalog** | Registro de módulos y capacidades activas de la plataforma |
| **Access Management** | Roles, permisos (RBAC), scopes y control de acceso fino |
| **Organization** | Gestión de Tenants, unidades de negocio y socios comerciales |
| **Platform Users** | Gestión de usuarios del sistema y sus estados operativos |
| **Service Catalog** | Definición de servicios médicos, categorías y precios |
| **Service Provider** | Gestión de doctores/proveedores, agendas y horarios |
| **Service Order** | Ciclo de vida de la orden, desde creación hasta cierre |
| **Document Workflow** | Motor centralizado para generación y flujo de documentos clínicos |
| **Document Engine Common** | Parámetros para el motor de flujo de documentos |

## 📋 Requisitos Previos

- **Node.js**: v20.20.x (recomendado usar [nvm](https://github.com/nvm-sh/nvm))
- **PostgreSQL**: 12 o superior
- **npm**: 9.x o superior

## 🚀 Instalación

1. **Clonar el repositorio**

```bash
git clone --recurse-submodules <repository-url>
cd clinical-saas-backend
```

1. **Inicializar y verificar submódulos**

Si el repositorio ya fue clonado sin `--recurse-submodules`, ejecutar:

```bash
git submodule sync --recursive
git submodule update --init --recursive
```

Validar que exista contenido en `src/shared-common/` antes de compilar o ejecutar tests.

1. **Instalar dependencias**

```bash
npm install
```

1. **Configurar variables de entorno**

Crear un archivo `.env` en la raíz del proyecto (ver sección [Configuración](#️-configuración))

1. **Ejecutar migraciones de Base de Datos**

Se utiliza Liquibase para gestionar las migraciones de la base de datos. Para el entorno local:

```bash
npm run db:migrate:local
```

1. **Generar Cliente Prisma**

Para actualizar los tipos de TypeScript y el cliente Prisma después de las migraciones:

```bash
npm run prisma:pull

npm run prisma:gen
```

1. **Ejecutar seeders (opcional)**

```bash
npm run seed:dev
```

## 🔁 Submódulo Shared Common

El proyecto incluye el submódulo git `src/shared-common`, que centraliza DTOs e interfaces reutilizables para múltiples servicios del ecosistema.

- **Fuente oficial de tipos transversales:** DTOs e interfaces compartidas viven en `src/shared-common`.
- **Regla de colaboración:** Evitar crear o mantener duplicados locales de DTOs/interfaces en módulos de `src/modules/*` cuando el tipo ya exista en shared-common.
- **Convención de imports:** Priorizar el barrel de shared-common (por ejemplo `@shared-common` si está configurado) o la ruta de import definida por `tsconfig`.

### Flujo recomendado al actualizar ramas

```bash
git pull
git submodule update --init --recursive
```

Si la referencia del submódulo cambió en la rama remota, este comando sincroniza `src/shared-common` con el commit esperado por el backend.

## ⚙️ Configuración

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/clinical_saas_db?schema=public"

# Application
NODE_ENV=development
PORT=3000

# JWT (si aplica)
JWT_SECRET=your-secret-key
JWT_EXPIRATION=1d
```

## 🎮 Uso

### Modo Desarrollo

```bash
npm run start:dev
```

El servidor estará disponible en `http://localhost:3000`

### Modo Producción

```bash
# Compilar
npm run build

# Ejecutar
npm run start:prod
```

### Documentación API (Swagger)

Una vez iniciado el servidor, acceder a:

```bash
http://localhost:3000/api-docs
```

### Comandos de Base de Datos

#### Prisma (ORM & Types)

```bash
# Refrescar el esquema de la base de datos
npm run prisma:pull

# Generar cliente Prisma (actualiza tipos a partir del esquema)
npm run prisma:gen

# Ver base de datos en navegador
npx prisma studio

# Ejecutar seeders
npm run seed:dev
```

#### Liquibase (Migraciones)

```bash
# Ejecutar migraciones en entorno local
npm run db:migrate:local
```

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests en modo watch
npm run test:watch

# Tests e2e
npm run test:e2e

# Cobertura de tests
npm run test:cov
```

## 📐 Estándares de Código

### Reglas de Colaboración

- **Estructura**: Seguir estrictamente el patrón de módulos de NestJS
- **Lógica de Negocio**: Debe residir en Services, no en Controllers
- **Validación**: Uso obligatorio de DTOs con class-validator para cada endpoint
- **Tipos Compartidos**: DTOs e interfaces transversales deben obtenerse de `src/shared-common`
- **Base de Datos**: Priorizar Prisma API sobre SQL crudo
- **Multi-tenancy**: Siempre validar el `tenantId` en las consultas
- **Migraciones**: Son la única fuente de verdad para el esquema de la base de datos

### Linting y Formateo

```bash
# Ejecutar linter
npm run lint

# Formatear código
npm run format
```

### Convenciones de Nombres

- **Archivos**: kebab-case (ej: `service-order.service.ts`)
- **Clases**: PascalCase (ej: `ServiceOrderService`)
- **Variables/Funciones**: camelCase (ej: `createServiceOrder`)
- **Constantes**: UPPER_SNAKE_CASE (ej: `MAX_RETRY_ATTEMPTS`)

## 📚 Documentación Adicional

La carpeta `.context/` contiene documentación técnica detallada:

- **[index.md](.context/index.md)**: Índice de documentos de contexto
- **[context.md](.context/context.md)**: Contexto global del proyecto
- **[architecture.md](.context/architecture.md)**: Arquitectura del sistema
- **[specs.md](.context/specs.md)**: Especificaciones técnicas
- **[domain_map.md](.context/domain_map.md)**: Mapa de dominios y responsabilidades
- **[decision_log.md](.context/decision_log.md)**: Historial de decisiones técnicas
- **[current_state.md](.context/current_state.md)**: Estado actual del desarrollo
- **[style_guide.md](.context/style_guide.md)**: Manual de estilo de código

## 📄 Licencia

Este proyecto es privado y no tiene licencia pública.

---

**Desarrollado con** [NestJS](https://nestjs.com/) | **ORM** [Prisma](https://www.prisma.io/) | **Base de Datos** [PostgreSQL](https://www.postgresql.org/)

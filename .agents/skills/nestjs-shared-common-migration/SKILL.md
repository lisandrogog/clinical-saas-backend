---
name: nestjs-shared-common-migration
description: Especializada en refactorizar módulos de NestJS para delegar DTOs e Interfaces al submódulo git shared-common.
---

# Skill: Migración de Tipos a Shared-Common

## 🎯 Objetivo
Automatizar la transición de DTOs e Interfaces locales hacia el paquete centralizado en `src/shared-common`. Esto garantiza que la lógica de validación y tipado esté unificada en el SaaS.

## 📂 Contexto del Proyecto
El proyecto utiliza una arquitectura modular. Los tipos (DTOs/Interfaces) se están moviendo desde el directorio local del módulo hacia:
`src/shared-common/src/modules/{nombre-modulo}/...`
Todos son accesibles mediante el barrel export principal: `src/shared-common/src/index.ts`.

## 🛠 Protocolo de Refactorización

### 1. Identificación de Dependencias
Cuando se trabaje en un módulo (ej. `materials`), el agente debe:
- Localizar todos los archivos dentro de `src/modules/{agrupador}/materials/`.
- Identificar imports que apunten a `./dto` o `./interfaces` locales.

### 2. Regla de Reemplazo de Imports
El agente debe sustituir los imports locales por el acceso vía `shared-common`.
- **Anterior:** `import { CreateMaterialDto } from '../dto';`
- **Nuevo:** `import { CreateMaterialDto } from '@shared-common';` 
*(Nota: Si no existe el alias @shared-common, usar la ruta relativa: `src/shared-common/src`) o la que esté definida en tsconfig.*

### 3. Limpieza de Archivos Locales
Una vez migrados los imports en Controllers y Services:
- **Deprecar/Eliminar:** Los archivos en `src/modules/{agrupador}/{nombre-modulo}/dto/*` e `interfaces/*` deben ser eliminados si ya existen en el shared-common.
- **Mantener index.ts:** El archivo `index.ts` local puede mantenerse solo si exporta constantes o tipos únicos NO presentes en el shared.

### 4. Verificación de la "Triada de Servicios"
Al refactorizar, asegurar que se mantiene la estructura:
- **Core Service:** Usa los DTOs de shared para operaciones de base de datos.
- **Helper Service:** Usa las Interfaces de shared para validaciones (ej. `assertExists`).
- **Decorator:** Actualizar las referencias de Swagger (`@ApiResponse({ type: ... })`) para que apunten a los DTOs de shared.

---

## 📝 Ejemplo de Acción
**Usuario:** "Migra el módulo de proveedores al shared-common."
**Agente:**
1. Revisa `src/shared-common/src/index.ts` para confirmar que los DTOs de proveedores están exportados.
2. Escanea `providers.controller.ts` y `providers.service.ts`.
3. Cambia `import { ... } from '../dto'` por `import { ... } from '@shared-common'`.
4. Borra la carpeta local `dto/` del módulo proveedores.

## 🚫 Restricciones
- **NO** eliminar archivos locales si el DTO equivalente no existe en `shared-common`.
- **NO** modificar la lógica de negocio en el Core Service, solo actualizar los tipos.
- **NO** olvidar actualizar el `{nombre-modulo}.decorator.ts`, ya que Swagger depende de estas clases.
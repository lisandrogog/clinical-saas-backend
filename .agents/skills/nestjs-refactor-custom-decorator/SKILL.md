---
name: nestjs-custom-header-refactor
description: Refactoriza controladores de NestJS para sustituir el uso genérico de @Headers() por decoradores personalizados de dominio (Tenant, BusinessUnit, User, etc.).
---

# Skill: Refactorización de Custom Header Decorators

## 🎯 Objetivo
Sustituir la extracción manual de cabeceras mediante `@Headers('nombre-header')` por los decoradores personalizados centralizados en `src/modules/utils/decorators/`.

## 📂 Mapeo de Decoradores
El agente debe realizar las siguientes sustituciones cuando encuentre el string correspondiente en `@Headers()`:

| Header HTTP (Key) | Decorador Personalizado | Origen del Import |
| :--- | :--- | :--- |
| `tenant-id` | `@TenantId()` | `src/modules/utils/decorators` |
| `business-unit-id` | `@BusinessUnitId()` | `src/modules/utils/decorators` |
| `user-id` | `@UserId()` | `src/modules/utils/decorators` |
| `customer-id` | `@CustomerId()` | `src/modules/utils/decorators` |
| `agent-id` | `@AgentId()` | `src/modules/utils/decorators` |

## 🛠 Protocolo de Refactorización

### 1. Identificación en Controladores
Escanear archivos `*.controller.ts` dentro de `src/modules/` buscando el uso del decorador `@Headers()`.
- **Caso A:** `@Headers('user-id') userId: string`
- **Caso B (Objeto completo):** `@Headers() headers: any` -> En este caso, identificar si se extraen propiedades manualmente después.

### 2. Ejecución del Reemplazo (In-place)
Sustituir la declaración del parámetro en el método del controlador:
- **Antes:** `findMany(@Headers('tenant-id') tenantId: string, ...)`
- **Después:** `findMany(@TenantId() tenantId: string, ...)`

### 3. Gestión de Imports (Limpieza y Adición)
Este paso es crítico para evitar errores de compilación:
1. **Agregar:** `import { TenantId, BusinessUnitId, UserId, CustomerId, AgentId } from 'src/modules/utils/decorators';` (Solo los que se utilicen en el archivo).
2. **Eliminar:** Si ya no quedan usos de `@Headers()` en el archivo, eliminar `Headers` del import de `@nestjs/common`.

### 4. Verificación de Tipado
Asegurarse de que el tipo de dato (normalmente `string` o `number`) se mantenga igual tras el cambio de decorador.

---

## 📝 Ejemplo de Transformación

**Entrada (Código Antiguo):**
```typescript
import { Controller, Get, Headers } from '@nestjs/common';

@Controller('clinics')
export class ClinicController {
  @Get()
  findAll(@Headers('tenant-id') tenantId: string) {
    return this.service.findAll(tenantId);
  }
}
```

**Salida (Código Nuevo):**

```typescript
import { Controller, Get } from '@nestjs/common';
import { TenantId } from 'src/modules/utils/decorators';

@Controller('clinics')
export class ClinicController {
  @Get()
  findAll(@TenantId() tenantId: string) {
    return this.service.findAll(tenantId);
  }
}
```

### 🚫 Restricciones
- NO modificar headers que no tengan un decorador equivalente en la lista (ej. content-type, authorization).

- NO duplicar imports si el decorador ya estaba importado previamente.

- NO eliminar @Headers() si el controlador lo usa para capturar otras cabeceras no listadas en el mapeo.

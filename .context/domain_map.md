# Mapa de Dominios y Responsabilidades

| Módulo | Responsabilidad Principal |
| :--- | :--- |
| **access-management** | Roles, permisos (RBAC), scopes y control de acceso fino. |
| **document-engine-common** | Parámetros y catálogos base para el motor de flujo documental. |
| **document-workflow** | Motor centralizado para transición de estados y acciones de documentos clínicos. |
| **materials** | Gestión de recursos materiales y su asociación a unidades de negocio y servicios. |
| **organization** | Gestión de tenants, unidades de negocio y socios comerciales. |
| **platform-catalog** | Registro de módulos y capacidades activas de la plataforma. |
| **platform-customer** | Gestión de clientes/pacientes de la plataforma. |
| **platform-users** | Gestión de usuarios del sistema y sus estados operativos. |
| **rooms** | Gestión de salas/unidades físicas y sus relaciones con servicios y recursos. |
| **service-catalog** | Definición de servicios médicos, categorías y configuración comercial por unidad operativa. |
| **service-order** | Ciclo de vida de la orden, desde creación y agendamiento hasta ejecución y cierre. |
| **service-provider** | Gestión de profesionales/proveedores, agendas, horarios y asignaciones a servicios. |
| **utils** | Componentes utilitarios transversales (constantes, helpers, DTOs/interfaces y servicios de soporte). |
| **shared-common (submodule)** | DTOs e interfaces transversales reutilizables por múltiples proyectos del ecosistema, ubicado en `src/shared-common`. |

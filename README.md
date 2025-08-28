# Gestor de Tareas - Frontend + Backend

Este proyecto consiste en una aplicación de gestión de tareas con un backend en ASP.NET Core y un frontend en React.

## Estructura del Proyecto

```
├── backend/          # API REST en ASP.NET Core
├── fronted/          # Frontend en React + Vite
└── README.md         # Este archivo
```

## Configuración de CORS

El backend ya está configurado con CORS para permitir peticiones desde:
- `http://localhost:3000` (React por defecto)
- `http://localhost:5173` (Vite por defecto)

## Requisitos Previos

- .NET 8.0 SDK
- Node.js 18+ 
- MongoDB (local o en la nube)

## Configuración del Backend

1. **Navegar al directorio del backend:**
   ```bash
   cd backend
   ```

2. **Configurar la conexión a MongoDB:**
   Editar `appsettings.json` y configurar la cadena de conexión:
   ```json
   {
     "TaskManagerDatabase": {
       "ConnectionString": "mongodb://localhost:27017",
       "DatabaseName": "TaskManager",
       "TasksCollectionName": "Tasks"
     }
   }
   ```

3. **Ejecutar el backend:**
   ```bash
   dotnet run
   ```
   
   El backend estará disponible en: `https://localhost:7245`
   - Swagger UI: `https://localhost:7245/swagger`

## Configuración del Frontend

1. **Navegar al directorio del frontend:**
   ```bash
   cd fronted
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar el frontend:**
   ```bash
   npm run dev
   ```
   
   El frontend estará disponible en: `http://localhost:5173`

## APIs Disponibles

### Endpoints de Tareas

- `GET /api/Tasks` - Obtener todas las tareas
- `GET /api/Tasks/{id}` - Obtener una tarea por ID
- `POST /api/Tasks` - Crear una nueva tarea
- `PUT /api/Tasks/{id}` - Actualizar una tarea
- `DELETE /api/Tasks/{id}` - Eliminar una tarea

### Estructura de Datos

```json
{
  "id": "string",
  "title": "string",
  "description": "string", 
  "completed": "boolean",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

## Características del Frontend

- ✅ **Estado de conexión API**: Muestra si la API está disponible
- ✅ **Gestión completa de tareas**: Crear, leer, actualizar, eliminar
- ✅ **Filtros**: Ver todas, pendientes o completadas
- ✅ **Interfaz moderna**: Diseño responsive y atractivo
- ✅ **Manejo de errores**: Mensajes de error claros
- ✅ **Validación**: Formularios con validación

## Características del Backend

- ✅ **CORS configurado**: Permite peticiones desde el frontend
- ✅ **API REST completa**: CRUD operations para tareas
- ✅ **MongoDB**: Base de datos NoSQL
- ✅ **Swagger**: Documentación automática de la API
- ✅ **Validación**: Validación de datos de entrada
- ✅ **Manejo de fechas**: Timestamps automáticos

## Solución de Problemas

### Error de CORS
Si ves errores de CORS, verifica que:
1. El backend esté ejecutándose en `https://localhost:7245`
2. El frontend esté ejecutándose en `http://localhost:5173`
3. La configuración CORS en `Program.cs` incluya ambos puertos

### Error de conexión a MongoDB
1. Verifica que MongoDB esté ejecutándose
2. Revisa la cadena de conexión en `appsettings.json`
3. Asegúrate de que la base de datos y colección existan

### Error en el frontend
1. Verifica que todas las dependencias estén instaladas: `npm install`
2. Revisa la consola del navegador para errores específicos
3. Verifica que la URL de la API en `api.config.js` sea correcta

## Desarrollo

### Agregar nuevas funcionalidades

1. **Backend**: Agregar nuevos endpoints en `Controllers/`
2. **Frontend**: Agregar nuevos servicios en `services/api.js`
3. **Modelos**: Actualizar `Models/TaskItems.cs` si es necesario

### Estructura de archivos importantes

**Backend:**
- `Program.cs` - Configuración principal y CORS
- `Controllers/TasksController.cs` - Endpoints de la API
- `Services/TaskService.cs` - Lógica de negocio
- `Models/TaskItems.cs` - Modelo de datos

**Frontend:**
- `src/App.jsx` - Componente principal
- `src/services/api.js` - Servicios de API
- `src/config/api.config.js` - Configuración de la API
- `src/components/` - Componentes React

## Tecnologías Utilizadas

**Backend:**
- ASP.NET Core 8.0
- MongoDB.Driver
- Swagger/OpenAPI

**Frontend:**
- React 19
- Vite
- Axios
- CSS3

**Base de Datos:**
- MongoDB

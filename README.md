# Proyecto Final — React JS (Talento Tech)

Este proyecto corresponde al trabajo final del curso React JS dictado por Talento Tech.  
Consiste en una aplicación de comercio electrónico desarrollada con React y Firebase, incorporando autenticación, gestión de productos, carrito de compras y diseño responsivo.

---

## Descripción general

La aplicación permite navegar un catálogo de productos, ver el detalle de cada uno, agregar artículos al carrito y realizar operaciones de gestión en un panel administrativo.  
El proyecto integra múltiples herramientas del ecosistema de React y servicios de Firebase, aplicando buenas prácticas de arquitectura, optimización y experiencia de usuario.

---

## Funcionalidades principales

### Carrito de compras
- Agregar productos con cantidad seleccionada.
- Eliminar productos individuales.
- Vaciar el carrito completo.
- Cálculo automático del total.
- Estado global mediante Context API.

### Gestión de productos (solo administradores)
- Crear productos con carga de imágenes mediante ImgBB.
- Editar productos existentes.
- Eliminar productos.
- CRUD completo utilizando Firebase Firestore.

### Autenticación y roles
- Registro de usuarios.
- Inicio y cierre de sesión.
- Roles diferenciados (usuario y administrador).
- Rutas protegidas según permisos.

### Diseño responsivo
- Adaptación a dispositivos móviles.
- Uso de Bootstrap para estructura y componentes.
- Layout consistente en todas las vistas.

### Experiencia de usuario
- Barra de búsqueda en el catálogo.
- Paginación de productos.
- Indicadores de carga.
- Íconos para acciones frecuentes.
- Metadatos y títulos dinámicos con React Helmet.

### Optimización
- Lazy loading de vistas.
- Suspense para carga diferida.
- Memoización con React.memo, useMemo y useCallback.
- Separación de lógica en hooks personalizados.

---

## Tecnologías utilizadas

- React 18  
- React Router  
- Context API  
- Firebase Authentication  
- Firebase Firestore  
- Bootstrap  
- React Icons  
- React Helmet  

---

## Estructura del proyecto

La estructura del proyecto sigue una organización modular por componentes, contextos y servicios, facilitando la escalabilidad y el mantenimiento.  
Incluye carpetas separadas para lógica de negocio, vistas, componentes reutilizables y configuración de Firebase.

---

## Instalación y ejecución

1. Clonar el repositorio.  
2. Instalar dependencias con `npm install`.  
3. Configurar las credenciales de Firebase en `src/firebase/config.js`.  
4. Ejecutar el proyecto con `npm run dev`.

---

## Autor

Edgar Salamanca
Proyecto final del curso React JS — Talento Tech.


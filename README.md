# Créditos — Mi Gusto Web

Este proyecto fue íntegramente desarrollado por el equipo de Sistemas de **Mi Gusto**, con dedicación, profesionalismo y compromiso con la excelencia tecnológica.

## Equipo de Desarrollo

- [**Joaquín Tonizzo**](https://github.com/JoaquinTonizzo)
- [**Facundo Carrizo**](https://github.com/Facu14carrizo)
- [**Ramiro Lacci**](https://github.com/ramirolacci)

---

Agradecemos a toda la organización Mi Gusto por la confianza y el apoyo brindado durante el desarrollo de esta plataforma.

> **Mi Gusto Web** es el resultado del trabajo colaborativo, la innovación y la pasión por la tecnología aplicada a la mejora continua de nuestros servicios.

---



# Documentación y Aspectos Destacados 

## Descripción General

**Mi Gusto Web** es una plataforma digital desarrollada con tecnologías de modernas para la gestión, visualización y promoción de productos, sucursales y servicios de la empresa Mi Gusto. El proyecto está orientado a la escalabilidad, accesibilidad, innovación y mantenibilidad, siguiendo los más altos estándares de la industria.

---

## Aspectos Destacados e Innovadores

### 🚀 Tecnología de Vanguardia
- **React, TypeScript y Vite**: Stack moderno, robusto y altamente escalable.
- **Carga diferida (Lazy Loading)**: Optimización del rendimiento mediante la carga asíncrona de páginas y recursos.
- **Gestión eficiente de imágenes**: Uso de técnicas avanzadas como `loading="lazy"` para mejorar la velocidad y la experiencia visual.

### ♿ Accesibilidad y Experiencia de Usuario
- **Navegación accesible**: Cumplimiento de estándares de accesibilidad (a11y) mediante roles semánticos, `aria-labels` y soporte completo para navegación por teclado.
- **Contraste y legibilidad óptimos**: Diseño inclusivo, adaptado a todo tipo de usuarios y dispositivos.
- **Interacciones modernas**: Animaciones y feedback visual que enriquecen la experiencia del usuario.

### 🧩 Modularidad y Escalabilidad
- **Componentización avanzada**: Arquitectura basada en componentes reutilizables y fácilmente mantenibles.
- **Separación de lógica y presentación**: Código estructurado y limpio, facilitando la evolución y el mantenimiento.
- **Preparación para pruebas y CI/CD**: Estructura lista para la integración de pruebas automatizadas y flujos de integración continua.

### 📱 Diseño Responsive y Mobile First
- **Adaptabilidad total**: Interfaz optimizada para todo tipo de dispositivos, garantizando una experiencia consistente.
- **Soporte para gestos e interacciones táctiles**: Navegación fluida en móviles y tablets.

### 🗂️ Contenidos Dinámicos e Interactivos
- **Catálogo interactivo tipo revista**: Visualización innovadora de productos mediante un flipbook digital.
- **Buscadores inteligentes**: Herramientas de búsqueda rápida y eficiente para productos y sucursales.
- **Formularios avanzados**: Soluciones integradas para contacto, franquicias, proveedores y postulaciones laborales, con validación y feedback inmediato.

### 🔒 Seguridad y Buenas Prácticas
- **Gestión segura de enlaces externos**: Implementación de `rel="noopener noreferrer"` y validaciones para prevenir vulnerabilidades.
- **Control riguroso de dependencias**: Solo se incluyen librerías necesarias y se mantiene el entorno actualizado.

### 🌟 Preparada para el Futuro
- **Soporte para internacionalización (i18n)** y ampliación de funcionalidades.
- **Estructura compatible con Storybook, pruebas automáticas y nuevas integraciones.**
- **Documentación técnica profesional**: Archivos `.md` claros y completos para facilitar el onboarding y la presentación del proyecto.

---

## Estructura de Carpetas

```
MiGustoSite/
├── public/                # Archivos estáticos y recursos públicos
├── src/
│   ├── assets/            # Imágenes, íconos y recursos multimedia
│   ├── components/        # Componentes reutilizables de UI
│   ├── data/              # Datos estáticos (productos, sucursales, etc.)
│   ├── pages/             # Páginas principales (rutas)
│   ├── styles/            # Estilos globales o módulos CSS
│   └── main.tsx           # Punto de entrada de la app
├── package.json           # Dependencias y scripts
├── vite.config.ts         # Configuración de Vite
├── tsconfig*.json         # Configuración de TypeScript
└── README.md              # Descripción general y Documentación principal (este archivo)
```

---

## Tecnologías Utilizadas

- **React** (v19+)
- **TypeScript**
- **Vite**
- **Bootstrap** (estilos base)
- **React Router DOM** (ruteo)
- **EmailJS** (formularios de contacto)
- **Otras:**
  - **Framer Motion** (animaciones y transiciones)
  - **Tailwind CSS** (utilidades de estilos, preparado para migración)
  - **Sharp** (optimización de imágenes)
  - **SweetAlert2** (alertas y diálogos personalizados)
  - **Axios** (peticiones HTTP)
  - **PostCSS** y **Autoprefixer** (procesamiento de CSS)
  - **Scripts optimizadores de imagenes**

---

## Buenas Prácticas y Estándares

- **Componentes funcionales y hooks** para lógica de estado y efectos.
- **Separación de lógica y presentación**: hooks y utilidades para lógica, componentes para UI.
- **Lazy loading** de páginas y recursos pesados.
- **Accesibilidad (a11y)**: roles, aria-labels, navegación por teclado y contraste adecuado.
- **Estilos modularizados** y preparados para migrar a CSS modules o Tailwind.
- **Validación y feedback en formularios**.
- **Gestión segura de dependencias y enlaces externos**.

---

## Testing y Calidad

- Estructura preparada para integrar **Jest** y **React Testing Library**.
- Componentes y hooks diseñados para ser fácilmente testeables.
- Recomendado: agregar tests unitarios y de integración para componentes críticos y lógica de negocio.

---

## Accesibilidad

- Navegación accesible por teclado en todos los menús y formularios.
- Uso de etiquetas `alt` descriptivas en imágenes.
- Roles y atributos ARIA en elementos interactivos.
- Contraste de colores validado para usuarios con baja visión.

---

## Mantenimiento y Escalabilidad

- Código modular y documentado.
- Estructura preparada para agregar nuevas páginas, hooks y utilidades.
- Dependencias actualizadas y revisadas periódicamente.
- Documentación clara para onboarding de nuevos desarrolladores.

---

*Proyecto diseñado, construido y revisado bajo estándares profesionales de desarrollo web.* 

© Equipo de Sistemas — Mi Gusto

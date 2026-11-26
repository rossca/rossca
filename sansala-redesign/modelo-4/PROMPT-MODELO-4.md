# Prompt profesional — Sansala · Modelo 4 «Definitivo»

> Para un equipo de desarrollo web. Objetivo: **la mejor versión de la web de Sansala**. Es minimalista, mantiene sus colores y es **totalmente fluida**: cada animación tiene un propósito, un orden y funciona sin fallos.
> Reúne lo mejor de los modelos anteriores, que están en `sansala-redesign/`:
> - **Modelo 1:** cámara 3D.
> - **Modelo 2:** ritmo editorial.
> - **Modelo 3:** la carta interactiva.
>
> Es un prototipo de prueba (`noindex`, distintivo «Prototipo · no oficial»).

---

## 1. Equipo y responsabilidades
| Rol | Responsabilidad |
|-----|-----------------|
| **Director creativo** | Coherencia visual y sistema de movimiento. Veta cualquier animación sin propósito. |
| **Diseñador UI** | Tokens, rejilla, tipografía y componentes. Diseña primero en móvil. |
| **Motion designer** | Coreografía, curvas, duraciones y estados de cada transición. |
| **Front-end lead** | Arquitectura, rendimiento (60 fps) y accesibilidad. |
| **QA** | Pruebas en dispositivos reales, Lighthouse, teclado y lector de pantalla. |

## 2. Principios no negociables
1. **Minimalismo:** una idea por pantalla, mucho aire y un solo acento de color por sección.
2. **Orden:** el contenido siempre aparece de arriba abajo y de izquierda a derecha: etiqueta, titular, texto y acción.
3. **Fluidez:** nada salta.
   - Scroll suave (Lenis, `lerp 0.1`).
   - Solo se animan `transform` y `opacity`, nunca propiedades de layout.
   - Sin CLS: todas las imágenes llevan dimensiones.
4. **Coherencia:** **una sola curva de easing** (`cubic-bezier(.16,1,.3,1)`) y tres duraciones (0,4 s, 0,8 s y 1,2 s) en todo el sitio.
5. **Rendimiento antes que efecto:** si una animación baja de 60 fps en un móvil medio, se simplifica.

## 3. Identidad
- **Colores:**
  - Verde `#1C592A` para titulares, botones y el fondo de cierre.
  - Crema `#FEFCE9` como fondo base.
  - Arena `#F8EFDE` y salvia `#E3EDD8` para las secciones.
  - Pasteles solo en los fondos de producto: `#EBC9BF`, `#CED3A3`, `#B5CFB6`, `#E5D4B5`, `#EAE2E9`, `#F0EEE1` y `#FEE8F0`.
- **Tipografía:** Poppins 800 para titulares (`clamp(2.8rem, 8vw, 8rem)`, `line-height .9`, mayúsculas) y Manrope 400–800 para el texto (17 px).
- **Forma:** radio de 24 px, el círculo (el plato) como motivo y márgenes laterales de `clamp(16px, 5vw, 80px)`.
- **Contenido real:**
  - 45 productos en 7 familias, con foto e ingredientes;
  - IFS v8 (7 años), Halal, ASC y MSC;
  - 6 canales de venta;
  - contacto: +34 91 629 06 22 · info@sansala.es · C. de las Navas 11, 28110 Algete (Madrid).

## 4. Sistema de movimiento
| Elemento | Animación | Duración |
|----------|-----------|----------|
| Titulares | Líneas que suben desde una máscara (`yPercent 110 → 0`, retardo de 0,08 s entre líneas) | 1,2 s |
| Textos y botones | Fundido y subida de 24 px, en cascada, después del titular | 0,8 s |
| Imágenes | Revelado con `clip-path` y la imagen que pasa de escala 1,15 a 1 | 1,2 s |
| Hover | Elevación de 4 px y zoom de la imagen a 1,05 | 0,4 s |
| Botón principal | Magnético, con un desplazamiento máximo de 8 px | — |
| Cambio de estado (filtros, vistas) | Animación FLIP de reordenación | 0,6 s |

Todo se activa **una sola vez** al entrar en pantalla, salvo las secciones fijadas (con *scrub*).

## 5. Estructura (página única con anclas)
1. **Intro (máx. 1,8 s):** el logo se dibuja sobre fondo crema y se abre como cortina hacia arriba. Se omite en las siguientes visitas (`sessionStorage`).
2. **Hero:**
   - titular «Fresco. Variado. Sabroso.» a la izquierda;
   - a la derecha, el **plato circular** con transición líquida entre 6 productos (WebGL, con imagen estática como alternativa);
   - al hacer scroll, el plato **crece y se convierte en el fondo** de la siguiente sección.
3. **Método:** scroll horizontal fijado con 4 pasos (<24 h, lavado y corte, artesanal, 7 días) y una línea que se dibuja. En móvil es vertical.
4. **Familias:** 7 tarjetas pastel apiladas (sticky). La anterior se reduce a 0,94.
5. **La carta:**
   - selector **Cuadrícula / Galería 3D**;
   - buscador en vivo y filtros con reordenación FLIP;
   - la **ficha** se abre con la foto como elemento compartido.
6. **Canales y calidad:** contadores, rejilla de 6 canales y 4 sellos que entran escalonados.
7. **Cierre:** fondo verde, «¿Hablamos?» por letras, formulario con pestañas (Contacto / Alta de cliente / Empleo) y pie con Kit Digital y enlaces legales.

**Global:**
- Menú superior que se oculta al bajar y aparece al subir.
- Barra de progreso de 2 px.
- Cursor contextual («Ver»), solo con puntero fino.

## 6. Stack
Vite y TypeScript, **GSAP 3** (ScrollTrigger y Flip), **Lenis** y **Three.js** solo para el plato. Imágenes en WebP/AVIF con `srcset` y fuentes con `font-display: swap`. Sin frameworks.

## 7. Accesibilidad y robustez
- Con `prefers-reduced-motion` se ven las mismas secciones, sin scrub ni intro y con fundidos simples.
- Sin WebGL se usan imágenes estáticas. Sin JS, el contenido sigue siendo legible.
- Un solo H1, jerarquía correcta, `alt` en todas las imágenes, foco visible, navegación completa por teclado y contraste AA.
- Formularios validados con mensajes accesibles (`role=status`).

## 8. Criterios de aceptación (QA)
- [ ] Lighthouse móvil: Rendimiento ≥ 90, Accesibilidad 100, Buenas prácticas 100, SEO ≥ 95.
- [ ] LCP < 2 s, CLS < 0,02, INP < 150 ms y 60 fps en scroll (Chrome DevTools en un móvil medio).
- [ ] Cero errores en consola y cero enlaces rotos. Sin scroll horizontal a 360 px.
- [ ] Funciona en Chrome, Safari (iOS) y Firefox, y en los anchos 360, 390, 768, 1024, 1440 y 1920.
- [ ] Ir y volver con anclas o con el botón atrás mantiene el estado correcto (filtros y scroll).
- [ ] Entrega: un `dist/index.html` autocontenido, el código en `src/`, un README y capturas de cada sección en móvil y escritorio.

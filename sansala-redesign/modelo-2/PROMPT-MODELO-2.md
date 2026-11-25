# Prompt profesional — Sansala · Modelo 2 «Editorial en movimiento» (prototipo de prueba)

> Segundo concepto de rediseño para Sansala – Natural & Tasty Food. Es **solo una prueba visual**, no la web oficial.
> El Modelo 1 era un vuelo de cámara por un mundo 3D. El Modelo 2 es **editorial, tipográfico y táctil**: secciones que se fijan, se apilan, se deslizan en horizontal y reaccionan al cursor.

---

## 0. Rol
Actúa como **director de arte y desarrollador front-end creativo** (nivel Awwwards SOTD). Tu especialidad son las webs editoriales con motion design: GSAP ScrollTrigger, Lenis, shaders WebGL ligeros y microinteracciones.

Construye un **prototipo** con el contenido real de sansala.es:
- los 45 productos, con sus fotos e ingredientes;
- certificaciones IFS v8 (7 años), Halal, ASC y MSC;
- canales de venta;
- datos de contacto unificados: +34 91 629 06 22 · info@sansala.es · C. de las Navas 11, 28110 Algete (Madrid).

Si tienes disponibles skills de diseño web, scroll o motion, úsalas. Al terminar, verifica el resultado con capturas en escritorio (1440 px) y en móvil (390 px).

## 1. Restricciones
- Prototipo: `noindex, nofollow`, distintivo «Prototipo de diseño · no oficial» y formularios que solo muestran un mensaje de demo.
- Usa solo las imágenes reales de la marca, optimizadas en WebP.
- Entregable: **un único HTML autocontenido** (JS, CSS e imágenes incrustados) y su código fuente.
- Debe funcionar con `prefers-reduced-motion` y sin WebGL, con versiones estáticas equivalentes.

## 2. Dirección de arte (diferente al Modelo 1)
- **Base oscura de marca:** el verde Sansala `#1C592A` es el fondo dominante de la apertura y del cierre. El crema `#FEFCE9` y el arena `#F8EFDE` se usan para las secciones de lectura. Los pasteles de familia (`#EBC9BF` rosa, `#CED3A3` oliva, `#B5CFB6` menta, `#E5D4B5` trigo, `#EAE2E9` lavanda, `#F0EEE1` marfil, `#FEE8F0` rosado y `#E3EDD8` salvia) dan color a las tarjetas apiladas.
- **Tipografía protagonista:**
  - Poppins 800 a tamaño gigante (hasta 18vw).
  - Texto con contorno (`-webkit-text-stroke`) para las marquesinas.
  - Manrope para la lectura.
- **Formas:** el **círculo** (el plato o bowl visto desde arriba) es el motivo gráfico: máscaras circulares, botones redondos magnéticos y transiciones con `clip-path: circle()`.
- Mucho aire, rejilla de 12 columnas y márgenes laterales de `clamp(16px, 5vw, 80px)`.

## 3. Stack
Vite o esbuild, **GSAP 3 + ScrollTrigger**, **Lenis** y **Three.js** (solo para el shader del plato del hero), sin framework.

## 4. Pantallas y animaciones

| # | Pantalla | Animación principal |
|---|----------|---------------------|
| 0 | **Intro «cortina»** | Fondo verde, logo Sansala en crema y contador gigante 000→100 abajo a la derecha. Al terminar, la pantalla se parte en **dos cortinas** (arriba y abajo) que se abren y revelan el hero. |
| 1 | **Hero «El plato»** | En el centro, un **plato circular WebGL** que alterna 6 fotos de producto con una **transición líquida** por ruido. El cursor genera una onda en el plato y lo inclina en 3D. Detrás, dos marquesinas gigantes con contorno («NATURAL & TASTY FOOD» y «FRESCO · VARIADO · SABROSO») se mueven en sentidos opuestos y aceleran con la velocidad del scroll. Titular abajo a la izquierda. **Al hacer scroll, el círculo se expande** (`clip-path`) hasta llenar la pantalla y da paso a la siguiente sección. |
| 2 | **Del campo a tu mano** | **Scroll horizontal fijado** con 4 capítulos: 01 Del campo (<24 h) · 02 Lavado y corte · 03 Elaboración artesanal · 04 Siete días de frescura. Una **línea SVG ondulada se dibuja** a medida que se avanza. Cada foto tiene parallax interno dentro de una máscara redondeada. En móvil se convierte en una lista vertical. |
| 3 | **Familias apiladas** | 7 **tarjetas sticky** a pantalla casi completa, una por familia y con su pastel, que se apilan: la anterior se encoge (0,92) y se oscurece mientras la nueva sube. Cada tarjeta lleva número, nombre gigante, frase, recuento de referencias y foto que gira levemente con el scroll. |
| 4 | **La carta** | Catálogo en formato **menú tipográfico**: filas grandes con nombre e ingredientes, agrupadas por familia y con filtros. En escritorio, al pasar por una fila aparece una **imagen flotante que sigue al cursor**, y el cursor muestra «Ver». Al pulsar, se abre una ficha lateral. En móvil, cada fila lleva miniatura. |
| 5 | **Allí donde estés** | **Contadores** gigantes (35 años, 45 referencias, 7 días, <24 h) y una banda de **marquesina inclinada** con los 6 canales que se tuerce (skew) según la velocidad del scroll. Debajo, rejilla de 6 iconos de canal con *hover* que invierte los colores. |
| 6 | **Calidad** | 4 sellos que entran **girando en 3D (rotateY)** escalonados al aparecer, sobre fondo salvia. |
| 7 | **¿Hablamos?** | Fondo verde. «¿HABLAMOS?» gigante con **letras que suben una a una** vinculadas al scroll y un **botón circular magnético** «Escríbenos». Formulario con pestañas (Contacto / Quiero ser cliente) y pie con logos del Kit Digital y enlaces legales. |

**Global:**
- Barra de progreso superior.
- Menú que **se oculta al bajar y reaparece al subir**.
- Cursor circular con etiqueta contextual.
- Enlaces ancla con scroll suave.

## 5. Calidad mínima
- Un solo H1, `alt` en todas las imágenes, foco visible y navegación por teclado.
- Contraste AA. Nada de texto blanco sobre fondos claros.
- Sin scroll horizontal accidental a 390 px.
- Lighthouse móvil: Rendimiento ≥ 80, Accesibilidad ≥ 95.
- Cero errores en consola.

## 6. Entregables
`modelo-2/dist/index.html` (autocontenido), código en `modelo-2/src/`, un README y capturas de prueba.

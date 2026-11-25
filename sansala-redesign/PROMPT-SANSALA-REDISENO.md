# Prompt profesional — Rediseño experimental de Sansala (prototipo de prueba)

> Copia todo este documento como prompt para el agente o desarrollador que construya la web.
> **Importante:** es un **prototipo de demostración**, no la web oficial. Solo sirve para ver cómo quedaría y cómo se vería.

---

## 0. Rol y contexto

Actúa como **desarrollador front-end senior y director creativo** especializado en webs inmersivas con scroll (estilo Awwwards / FWA): WebGL, Three.js, GSAP ScrollTrigger y scroll suave.

Tu tarea es construir un **prototipo de rediseño** de la web de **Sansala – Natural & Tasty Food** (sansala.es). Es un obrador de Madrid, del Grupo Ñaming, que elabora sándwiches, ensaladas, wraps, bocadillos, platos para microondas y postres "ready to eat" para retail, travel, gasolineras, restauración, colectividades y vending. Tiene certificación IFS Food v8 desde hace 7 años, además de Halal, ASC y MSC.

El objetivo es una web **minimalista, moderna y muy cinematográfica**, en la que **la cámara "vuela" por escenas 3D** a medida que el usuario hace scroll. Debe usar **los mismos colores, productos e imágenes** de la web actual.

### Skills y herramientas a usar
- **Skill "scroll world" (o equivalente de "scroll-driven 3D world")**: úsala si está instalada en tu entorno. Si no lo está, implementa el mismo concepto a mano: un único mundo 3D persistente y una cámara que recorre una ruta (spline) controlada por el progreso del scroll.
- Skills de diseño web y front-end que tengas disponibles. Por ejemplo: diseño de interfaces y artefactos (frontend/artifact design), revisión de accesibilidad (`design:accessibility-review`), crítica de diseño (`design:design-critique`), SEO on-page y schema (`searchfit-seo:on-page-seo`, `searchfit-seo:schema-markup`) y buenas prácticas de rendimiento (`vercel:react-best-practices` si usas React).
- Al terminar, usa una skill de verificación o de ejecución (p. ej. `run`) para levantar la web y comprobarla con capturas en escritorio y en móvil.

---

## 1. Restricciones del prototipo
1. **Es solo de prueba.** Añade `<meta name="robots" content="noindex, nofollow">` y un pequeño distintivo discreto que diga "Prototipo de diseño – no oficial".
2. **Sin backend:** no hay tienda real, ni login, ni pagos. Los formularios solo validan en el cliente y muestran un mensaje de "enviado (demo)".
3. **Imágenes:** usa las imágenes reales de sansala.es (lista en la sección 6). Descárgalas a `/public/img/`, conviértelas a **WebP/AVIF** y redimensiónalas (máx. 1600 px). No las enlaces directamente desde el servidor de Sansala.
4. **No inventes productos, certificaciones ni datos.** Usa solo los que vienen aquí.
5. Corrige en el prototipo las erratas de la web actual (ver sección 8).

---

## 2. Stack técnico
- **Vite + TypeScript**, sin framework. Si se prefiere React, usar Vite + React + `@react-three/fiber` + `@react-three/drei`.
- **Three.js** (r16x) para el mundo 3D.
- **GSAP 3 + ScrollTrigger** para vincular el scroll a la cámara y a las animaciones del DOM.
- **Lenis** para el scroll suave.
- **SplitType** (o un split propio) para animar titulares letra a letra o línea a línea.
- CSS moderno: variables, `clamp()`, container queries. Sin Tailwind, salvo que el equipo lo pida.
- Despliegue de prueba: build estático (`npm run build` → `dist/`), apto para Vercel, Netlify o GitHub Pages.

Estructura sugerida:
```
sansala-demo/
  index.html
  src/
    main.ts            // arranque: Lenis + GSAP + escena
    world/
      World.ts         // renderer, escena, loop, resize
      CameraRig.ts     // CatmullRomCurve3 + lookAt curve, progreso 0..1
      scenes/          // Hero, Campo, Obrador, Carrusel, Canales, Certificados, Final
      materials/       // shader de plano-imagen con curvatura y fade
    ui/
      sections.ts      // titulares, contadores, overlays DOM
      productSheet.ts  // ficha de producto (drawer)
    data/products.ts   // catálogo (sección 6)
    styles/
      tokens.css  base.css  sections.css
  public/img/...
```

---

## 3. Identidad visual (extraída de sansala.es)

### Paleta (tokens CSS)
```css
:root {
  /* Marca */
  --verde-sansala: #1C592A;   /* color principal: cabecera, titulares, botones, pie */
  --crema:         #FEFCE9;   /* fondo principal claro */
  --arena:         #F8EFDE;   /* fondo secundario / texto claro sobre verde */
  --salvia:        #E3EDD8;   /* fondo suave verdoso */
  --texto:         #333333;   /* texto de cuerpo */
  --blanco:        #FFFFFF;

  /* Pasteles de las tarjetas de categoría (se usan igual que en la web) */
  --pastel-rosa:     #EBC9BF; /* sándwiches */
  --pastel-oliva:    #CED3A3; /* ensaladas */
  --pastel-menta:    #B5CFB6; /* wraps / enrollados */
  --pastel-trigo:    #E5D4B5; /* especiales (bagels) */
  --pastel-lavanda:  #EAE2E9; /* microondas */
  --pastel-marfil:   #F0EEE1; /* postres */
  --pastel-rosado:   #FEE8F0; /* acento suave */
}
```
- **Regla minimalista:** el 70 % de la superficie es crema o arena, el 20 % verde Sansala y el 10 % pasteles. Solo hay un color de acento por escena.
- El verde `#1C592A` es el único color de botón y enlace. Elimina el rosa `#CC3366` que aparece en enlaces de WooCommerce.
- Contraste: no pongas texto blanco sobre gris claro (le pasa a la sección IFS actual). Todo el texto debe cumplir WCAG AA.

### Tipografía
- **Titulares:** `Poppins` 800, mayúsculas, interletrado `-0.02em`, tamaño `clamp(2.5rem, 8vw, 9rem)` en las escenas principales.
- **Texto:** `Manrope` 300/500/700.
- **Logotipo:** usar `sansala_logo.png` (firma manuscrita "Sansala – Natural and tasty food"). En el preloader, recrearlo como SVG con trazo animado (stroke-dashoffset) si se puede vectorizar. Si no, usar un fundido con máscara.
- Cargar las fuentes con `font-display: swap` y hacer preload de Poppins 800.

### Lenguaje visual
- Mucho aire, rejilla de 12 columnas y márgenes laterales de `clamp(16px, 5vw, 80px)`.
- Bordes redondeados de 24 px en las tarjetas (como las tarjetas de categoría actuales).
- Fotografía de producto **cenital sobre fondo de color pastel**, que es el estilo actual de la marca.
- Microinteracciones: cursor personalizado (un círculo verde que crece sobre los elementos clicables y se desactiva en pantallas táctiles) e inclinación 3D suave de las tarjetas al pasar el ratón.

---

## 4. Experiencia de scroll: storyboard de cámara

Construye **un único mundo 3D persistente** en un `<canvas>` fijo detrás del contenido. Una `CatmullRomCurve3` define la **ruta de la cámara** y una segunda curva define el **punto al que mira**. ScrollTrigger mapea el progreso global (0→1) sobre las curvas, con `scrub: 1.2` para dar inercia. Cada escena ocupa un tramo del recorrido. El texto (DOM) aparece y desaparece sincronizado con ese tramo.

Las imágenes se colocan en el mundo como **planos con shader**: ligera curvatura, desenfoque de profundidad simulado, fundido por distancia y `uTime` para un leve "respirar".

| # | Escena | Progreso | Movimiento de cámara | Contenido / texto |
|---|--------|----------|----------------------|-------------------|
| 0 | **Preloader** | — | Cámara fija | Firma "Sansala" que se dibuja sola y contador 0–100 % de carga de texturas. Fondo crema. |
| 1 | **Hero: "Natural & Tasty Food"** | 0–0,12 | La cámara empieza **cenital** sobre la foto de bowls (`sansala_comida-fresca_variada_sabrosa`), desciende en picado y atraviesa la imagen, que se abre en capas | Titular gigante "FRESCO. VARIADO. SABROSO." + subtítulo "Elaborado de forma artesanal en Madrid desde hace más de 35 años." Indicador "Desliza ↓" |
| 2 | **"Frescos como lechugas"** | 0,12–0,26 | **Vuelo rasante** hacia delante sobre un campo de planos-imagen (manos con lechuga, tomates en caja) colocados en profundidad, con parallax por capas y hojas 3D sencillas que pasan junto a la cámara | "FRESCOS COMO LECHUGAS". Contador animado **"< 24 h del campo al obrador"**. "Las lavamos y cortamos nosotros mismos." |
| 3 | **El obrador / método** | 0,26–0,38 | Travelling lateral a lo largo de una "línea de producción" minimalista: ingredientes que se apilan en el aire y forman un sándwich (capas flotantes que encajan al hacer scroll) | "NUESTRO MÉTODO". "Listo para disfrutar desde que lo preparamos hasta **7 días** después." "Innovamos cada día." |
| 4 | **Carrusel de categorías** | 0,38–0,55 | La cámara se sitúa en el centro de un **anillo de 6 tarjetas pastel** (cilindro) y el scroll **gira la cámara 360°** alrededor del anillo. La tarjeta enfocada se acerca y se ilumina | Sándwiches · Ensaladas · Wraps · Especiales · Microondas · Postres (y "Congelados" como 7.ª tarjeta). Cada tarjeta usa su pastel y su foto. Al hacer clic se baja a la sección 5 filtrada por esa categoría. |
| 5 | **Escaparate de productos** | 0,55–0,70 | El canvas se atenúa (la cámara se aleja y queda desenfocada) y toma el control el DOM: **scroll horizontal fijado (pinned)** por categoría | Rejilla de tarjetas minimalista: foto, nombre e ingredientes. Clic → **ficha lateral** (drawer) con foto grande, descripción, peso y alérgenos "consultar catálogo". Filtros por categoría como chips. |
| 6 | **Dónde encontrarnos** | 0,70–0,82 | **Zoom out** hasta una vista orbital: 6 iconos de canal (imágenes de la web actual) orbitan como satélites alrededor de un plato central | Retail · Travel Channel · Gasolineras · Restauración (aérea, naval, ferroviaria) · Colectividades · Vending, cada uno con su frase corta. |
| 7 | **Certificaciones** | 0,82–0,92 | La cámara atraviesa una "nube" de 4 sellos que flotan en profundidad y se alinean frente a ella al final del tramo | IFS Food v8 (7 años consecutivos) · Halal · ASC · MSC. Texto: "Los más altos estándares de seguridad alimentaria." |
| 8 | **Aterrizaje / CTA** | 0,92–1 | La cámara **aterriza cenital** sobre un único bowl (cierre simétrico con el hero) y el fondo pasa a verde Sansala | "¿Hablamos?" Botones: **Descargar catálogo** (PDF), **Quiero ser cliente** (formulario de alta), **Contacto**. |
| — | **Pie** | — | Sin 3D | Datos de contacto (sección 7), enlaces legales, LinkedIn, logos del Kit Digital / NextGenerationEU (obligatorios) y "© 2026". |

**Transiciones de color:** el `background` del body y el `scene.fog` interpolan entre los tokens según la escena: crema → arena → salvia → pastel de la categoría activa → crema → verde.

**Texto:** los titulares entran con split por líneas (`yPercent: 110 → 0`, `stagger: 0.08`, ease `expo.out`) y salen con fundido y desenfoque.

---

## 5. Rendimiento, accesibilidad y móvil (obligatorio)
- **`prefers-reduced-motion: reduce`**: se desactivan el vuelo de cámara y Lenis. Se muestra una versión estática con las mismas secciones y fundidos simples.
- **Móvil (< 768 px)**:
  - Misma narrativa, pero la cámara recorre una ruta simplificada.
  - Máximo 25 planos en escena y `devicePixelRatio` limitado a 1,5.
  - El carrusel 3D se convierte en un swiper horizontal táctil.
  - Sin scroll horizontal accidental: comprobar a 390 px.
- **Fallback sin WebGL**: detección con `WebGLRenderingContext`. Si no hay, se muestra la versión estática.
- **Objetivos**: LCP < 2,5 s en 4G, CLS < 0,05 y 60 fps en un portátil medio. Texturas comprimidas (KTX2/Basis opcional, o WebP ≤ 200 KB cada una) cargadas de forma progresiva por escena.
- **Accesibilidad**:
  - Todo el contenido existe en el DOM (el canvas tiene `aria-hidden="true"`).
  - **Un solo `<h1>`** y jerarquía correcta de H2/H3.
  - `alt` descriptivo en todas las imágenes.
  - Foco visible, navegación completa con teclado y enlace "Saltar al contenido".
- **SEO del prototipo**: aunque lleve `noindex`, incluye `<title>`, meta descripción, Open Graph y JSON-LD `Organization` + `FoodEstablishment`, para mostrar cómo quedaría.

---

## 6. Contenido: productos e imágenes reales

Base de las URLs: `https://sansala.es/wp-content/uploads/`

### Imágenes de marca y escenas
| Uso | Archivo |
|-----|---------|
| Logo | `2025/02/sansala_logo.png` |
| Favicon | `2025/03/cropped-sansala_logo_favicon-1-192x192.png` |
| Hero (bowls cenitales) | `2025/03/sansala_comida-fresca_variada_sabrosa-scaled.jpg` |
| Conócenos | `2025/03/sansala_conocenos.jpg` · `2025/03/mision_sansala_2-1.png` |
| Contacto / CTA | `2025/03/sansala_contacto_comida_fresca-scaled.jpg` |
| Campo / frescura | `2025/03/noticias_def_1-scaled.jpg` · `2025/03/sansala_noticias3-scaled.jpg` · `2025/02/noticia_sansala_sandwiches.jpg` |
| Canales | `2025/03/travel_channel.png` · `2025/03/gasolineras.png` · `2025/03/restauracion_aerea_y_ferroviaria.png` · `2025/03/colectividades.png` · `2025/03/vending_sansala.png` |
| Certificados | `2025/02/ifs_sansala.png` · `2025/03/certificacion_ifs_conocenos_sansala.png` · `2025/03/certificacion_sansala_conocenosgarantia_halal_junta_islamica.png` · `2025/03/asc_certificacion_sansala_conocenos.png` · `2025/03/certificacion_msc.png` |
| Kit Digital (pie) | `2025/05/Logo-digitalizadores-1-2.jpg` |
| Tarjetas de categoría | Sándwiches `2025/03/SW-CHICKEN-ROYAL_2.jpg` · Ensaladas `2025/03/Bowl-POLLO-FS_2_5.jpg` · Wraps `2025/03/Wrap-SUSHI_2.jpg` · Especiales `2025/03/bagel-salmon-1.jpg` · Microondas `2025/03/PLATO_1.jpg` · Postres `2025/03/Postre-1.jpg` |
| Catálogo PDF | `2026/07/CATALOGO-SANSALA-22072026.pdf` |

> Nota: las imágenes de fondo del campo (manos con lechuga y caja de tomates) se cargan desde el CSS de Elementor. Si alguna no aparece en esta lista, extráela inspeccionando `sansala.es` en el navegador.

### Catálogo (`src/data/products.ts`): 45 productos
Formato: **Nombre** — ingredientes — imagen.

**Sándwiches**
- **Cheddar y Cebolla Caramelizada** — Pan multicereal, queso cheddar rojo, lechuga iceberg, tomate, salsa dijonesa, cebolla caramelizada — `2025/03/SW-CHEDDAR-CCARAMELIZADA_2.jpg`
- **Especial Brie y Pavo** — Pan multicereal, queso brie, pechuga de pavo cocida, salsa mostaza, espinacas frescas, cebolla caramelizada, rúcula y pipa pelada — `2025/03/SW-BRIE-LOMO_2.jpg`
- **BLT** — Pan blanco de molde, bacon frito, tomate, lechuga iceberg y mayonesa ligera — `2025/03/SW-BLT_2.jpg`
- **Chicken Royal** — Pan de molde blanco, pechuga de pollo en tiras, tomate, lechuga iceberg, salsa mango curry y mahonesa, rúcula y almendras — `2025/03/SW-CHICKEN-ROYAL_2.jpg`
- **Club Sensacional** — Pan multicereal, mezcla de pollo a las finas hierbas, bacon frito, escarola, huevo cocido, tomates secos y mayonesa ligera — `2025/03/SW-SENSACIONAL_2.jpg`
- **Especial de Atún** — Pan multicereal, mezcla de atún, tomate, lechuga iceberg — `2025/03/Sandwich-Atun_2.jpg`
- **Vegetal con Huevo** — Pan multicereal, huevo cocido, tomate, lechuga iceberg, pepino, mayonesa — `2025/03/SW-Vegetal-Huevo_2.jpg`
- **Jamón y Queso (Bikini)** — Pan de molde blanco, jamón cocido, queso edam 30 %, mantequilla — `2025/03/BIQUINI.png`
- **Bloomer de Jamón y Queso** — Pan de molde estilo artesano, jamón cocido, queso cheddar rojo, salsa dijonesa — `2025/03/Bloomer-Jamon_Chedar.png`

**Ensaladas**
- **César** — Lechuga variada, pollo empanado, salsa césar, queso en lascas, pan tostado — `2025/03/Bowl-Pollo-Cesar_2.jpg`
- **Pasta Genovesa** — Pasta espiral, salsa pesto, pollo en tiras, aceitunas negras, tomate, queso en lascas — `2025/03/Bowl-Genovesa_2.jpg`
- **Rulo de Cabra, Bacon y Frutos Secos** — Lechuga variada, salsa mostaza y miel, bacon frito, frutos secos, queso de cabra, espinacas — `2025/03/Bowl-Rulo-cabra-Bacon_2.jpg`
- **Poke Pollo Teriyaki** — Arroz, pollo asado, zanahoria rallada, piña, edamame, col lombarda y salsa teriyaki — `2025/04/2.png`
- **Poke Salmón** — Quinoa blanca y roja, salsa soja agridulce, salmón ahumado, pepino, cebolla encurtida, edamame, wakame, semillas de amapola — `2025/03/Bowl-POKE-ARROZ-salmon.png`
- **New York Shaker** — Pasta, jamón cocido, dados de queso, lechuga, salsa rosa y zanahoria — `2025/04/2-1.png`
- **Pollo César Shaker** — Lechuga variada, pollo asado, picatostes, tomate cherry y salsa César — `2025/04/1.png`
- **Ensalada Mixta** — Lechuga variada, cebolla dulce, tomate cherry, zanahoria, atún, huevo cocido, aceitunas y vinagreta — `2025/05/PLANTILLA-FOTOS-WEB-SANSALA-5.png`
- **Pollo Asado y Bacon** — Lechuga variada, pollo en tiras, salsa rosa, bacon frito, almendras laminadas y pasas — `2025/03/Bowl-POLLO-FS_2_5.jpg`
- **Apple Walnuts Chicken** — Lechugas variadas, dados de queso, pollo asado, manzana verde, tomate cherry y salsa ponzu — `2026/06/PLANTILLA-FOTOS-WEB-SANSALA-6.png`

**Wraps**
- **Wrap Jamón y Queso** — Tortilla de trigo, jamón cocido, tomate, lechuga, salsa césar, queso edam 30 % — `2025/03/especiales1.jpg`
- **Wrap de Hummus y Crudités** — Tortilla de trigo, hummus, lechuga, pimiento rojo, calabacín, zanahoria, espinacas — `2025/03/especiales3.jpg`
- **Wrap de Pollo Curry** — Tortilla de trigo, pollo al curry, salsa curry, espinacas, cebolla caramelizada — `2025/03/especiales2.jpg`
- **Mexican Burrito** — Tortilla grillada, pulled pork, cheddar rojo, arroz y salsa tex-mex — `2025/03/Wrap-BURRITO_2.jpg`
- **Salmón Sushi Wrap** — Tortilla de trigo, arroz poke, queso crema, salmón ahumado, pepino, zanahoria, cebolla encurtida, guacamole, mayonesa de sésamo — `2025/03/Wrap-SUSHI_2.jpg`
- **Wrap Chicken Durum Kebab** — Tortilla de trigo, kebab de pollo, mezcla durum, queso feta y cebolla — `2025/03/Wrap-durum_2.jpg`

**Especiales**
- **Bagel de Salmón Marinado ASC** — Bagel, salmón marinado ASC, queso crema con eneldo, salsa tártara, cebolla encurtida, espinacas — `2025/03/bagel-salmon-1.jpg`
- **Bagel Jamón y Queso** — Bagel, jamón cocido, queso crema y mahonesa, queso edam 30 % — `2025/03/bagel_jamon_jueso.jpg`
- **Bagel Breakfast** — Bagel, bacon frito, huevo cocido, salsa holandesa y cheddar — `2026/06/PLANTILLA-FOTOS-WEB-SANSALA-16.png`

**Bocadillos y panini**
- **Panini Grill Pollo Mostaza** — Panini con hierbas aromáticas, pollo en tiras, edam 30 %, salsa dijonesa, rúcula — `2025/03/Panini-POLLO_2.jpg`
- **Panini Chicken BBQ** — Panini de aceitunas, pollo en tiras, gouda, salsa barbacoa, bacon frito — `2025/03/Panini-BBQ_2.jpg`
- **Flautín de Jamón de Cebo Ibérico y AOVE** — Pan cristal, jamón de cebo 50 % ibérico y aceite de oliva virgen extra — `2025/05/PLANTILLA-FOTOS-WEB-SANSALA-8.png`
- **Bocadillo de Tortilla de Patata con Pimientos** — Pan rústico, tortilla de patata, pimiento verde frito y mayonesa — `2025/05/PLANTILLA-FOTOS-WEB-SANSALA-13.png`
- **Serrano y Tumaca en Pan Cristal** — Pan cristal, jamón serrano, salsa tumaca — `2025/05/PLANTILLA-FOTOS-WEB-SANSALA-9.png`
- **Bocadillo de Brie y Bacon** — Pan payesita semillado, queso brie, bacon frito y mayonesa — `2025/05/PLANTILLA-FOTOS-WEB-SANSALA-7.png`
- **Serranito** — Lomo asado, jamón serrano, mayonesa y queso brie — `2025/06/PLANTILLA-FOTOS-WEB-SANSALA-14.png`

**Microondas**
- **Noodles con Pollo Teriyaki** — Spaghetti con salsa teriyaki, pollo, coliflor grillada, boniato asado, judías verdes y amapola — `2026/02/PLANTILLA-FOTOS-WEB-SANSALA-3.png`
- **Salmón & Veggies con Base de Arroz** — Salmón con salsa romesco, boniato, patata y pimiento asados, calabacín grillado, arroz blanco — `2026/02/PLANTILLA-FOTOS-WEB-SANSALA-4.png`

**Postres**
- **Strawberry Cheesecake Cup** — Galleta, crema de queso y mermelada de fresa — `2025/03/Postre-2.jpg`
- **Lemon Pie Cup** — Galleta, crema de limón y crema de nata — `2025/03/Postre-1.jpg`

**Congelados** (etiqueta adicional "❄ Congelado"; algunos están también en las categorías de arriba)
- **Tuna Melt** — Panini de aceitunas, crema de atún y quesos rallados — `2026/06/PLANTILLA-FOTOS-WEB-SANSALA-11.png`
- **Croissant Brioche Jamón y Queso** — Croissant brioche, jamón cocido, edam y salsa ligera — `2026/06/PLANTILLA-FOTOS-WEB-SANSALA-12.png`
- **Focaccia de Mozzarella y Pomodoro** — Focaccia italiana, mozzarella, salsa pomodoro, rúcula — `2025/03/Focaccia-Rucula.png`
- **Focaccella de Verduras Asadas y Pesto** — Focaccella de orégano, calabacín asado, pimiento rojo, pesto, tomate seco — `2025/05/PLANTILLA-FOTOS-WEB-SANSALA-15.png`
- **Club de Pollo BBQ** — Pan de molde blanco, pollo barbacoa, cheddar rojo, bacon frito y salsa barbacoa — `2026/06/PLANTILLA-FOTOS-WEB-SANSALA-17.png`
- **Schiacciata de Atún con Harissa** — Pan schiacciata y mezcla de atún con salsa harissa — `2026/06/PLANTILLA-FOTOS-WEB-SANSALA-18.png`
- Además, congelados: Serranito, Serrano y Tumaca, Bocadillo de Tortilla, Bocadillo de Brie y Bacon, Wrap Durum Kebab, Bagel Breakfast, Bloomer, Bikini, Panini Chicken BBQ y Wrap de Pollo Curry.

---

## 7. Datos de contacto (versión unificada y corregida)
- **Dirección:** Polígono Industrial Río de Janeiro, C. de las Navas, 11, 28110 Algete (Madrid)
- **Teléfono:** +34 91 629 06 22 → enlace `tel:+34916290622`
- **Email:** info@sansala.es (un solo dominio en toda la web)
- **Razón social (aviso legal):** RESTO VITE S.L.U. · CIF B82219262
- **LinkedIn:** https://www.linkedin.com/company/sansala-natural-and-tasty-food/
- **Canal ético:** enlace actual de Lefebvre Centinela

**Formularios de demo:**
- **Contacto:** Nombre, Email, Teléfono, Provincia, Asunto, Mensaje, casilla de privacidad. Botón **"Enviar"** (no "Únete").
- **Alta de cliente:** Nombre, Email, Teléfono, Empresa, CIF, Dirección, Mensaje, casilla de privacidad.
- **Newsletter:** Email y casilla de privacidad. Botón "Suscribirme".
- **"Trabaja con nosotros":** enlace `mailto:` o formulario con CV.

---

## 8. Errores de la web actual que el prototipo NO debe repetir
- Enlaces rotos: "Productos congelados" (`?page_id=1009`, 404) y "Todas las noticias" (`/NOTICIAS/`, 404).
- Textos de relleno: "Lorem Ipsum" y "[Nombre del Sándwich]". **No incluir noticias** salvo que tengan contenido real. En su lugar, un bloque "Sándwich del mes" con un producto real destacado.
- Teléfono con un enlace distinto al número mostrado. Emails mezclados `.com` y `.es`.
- Erratas: "Stawberry" → **Strawberry**, "Hariss" → **Harissa**, "scacciata" → **schiacciata**, "SÁNDWICHDEL" → **SÁNDWICH DEL**, "PERMITENOS" → **PERMÍTENOS**, doble espacio en "Club Sensacional".
- Nombres que no coinciden entre páginas. Usar un único nombre por producto (los de la sección 6) y una sola denominación de categoría: **"Wraps"**.
- Falta de H1, `alt` vacíos y contraste bajo (texto blanco sobre gris).
- © 2025 → **© 2026**.

---

## 9. Criterios de aceptación
- [ ] `npm install && npm run dev` arranca sin errores y `npm run build` genera un `dist/` estático.
- [ ] Las 9 escenas del storyboard funcionan con scroll suave y la cámara sigue la ruta sin saltos, tanto al bajar como al subir.
- [ ] Solo se usan los colores de la sección 3 y las tipografías Poppins + Manrope.
- [ ] Aparecen los 45 productos con su imagen real, filtrables por categoría, con ficha lateral.
- [ ] Funciona a 390 px de ancho sin scroll horizontal, con `prefers-reduced-motion` y sin WebGL.
- [ ] Lighthouse (móvil): Performance ≥ 80, Accesibilidad ≥ 95, Buenas prácticas ≥ 95.
- [ ] Cero errores en consola y cero enlaces rotos.
- [ ] Está presente el distintivo "Prototipo de diseño – no oficial" y la etiqueta `noindex`.
- [ ] Se entregan capturas en escritorio (1440 px) y móvil (390 px) de cada escena, y un vídeo corto (o GIF) del recorrido de scroll.

---

## 10. Entregables
1. Repositorio con el código (estructura de la sección 2) y un `README` con instrucciones.
2. Enlace a una vista previa desplegada (privada o protegida, porque es un prototipo).
3. Carpeta `/docs/capturas` con las capturas y el vídeo del recorrido.
4. Una nota breve con las decisiones de diseño y lo que haría falta para pasar de prototipo a producción (WooCommerce headless, CMS, etc.).

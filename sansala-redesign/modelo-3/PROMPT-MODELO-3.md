# Prompt profesional — Sansala · Modelo 3 «Bento App» (prototipo de prueba)

> Tercer concepto de rediseño para Sansala – Natural & Tasty Food. Es **solo una prueba visual**, no la web oficial.
> - Modelo 1: vuelo de cámara 3D.
> - Modelo 2: editorial con scroll.
> - **Modelo 3: experiencia tipo app.** Tiene páginas separadas con **transiciones de mosaico**, un **dock flotante** como menú, una portada en rejilla **bento** y una **carta que se puede ver de 3 formas distintas**.

---

## 0. Rol
Actúa como **diseñador de producto y desarrollador front-end creativo**, especializado en interfaces tipo app, transiciones entre páginas (SPA), animaciones de layout (FLIP) y gestos táctiles (arrastrar, deslizar, inercia).

Construye un prototipo con el contenido real de sansala.es:
- 45 productos con foto e ingredientes, y 7 familias;
- certificaciones IFS v8 (7 años), Halal, ASC y MSC;
- 6 canales de venta;
- contacto unificado: +34 91 629 06 22 · info@sansala.es · C. de las Navas 11, 28110 Algete (Madrid).

Si tienes skills de diseño web o animación disponibles, úsalas. Al terminar, verifica el resultado con capturas en escritorio (1440 px) y móvil (390 px).

## 1. Restricciones
- `noindex`, distintivo «Prototipo de diseño · no oficial» y formularios de demo que no envían datos.
- Usa solo las imágenes reales de la marca, en WebP.
- **Un único HTML autocontenido**, más el código fuente.
- Con `prefers-reduced-motion`: sin intro, transiciones instantáneas y sin inercia.

## 2. Dirección de arte (diferente a los modelos 1 y 2)
- **Claro y lúdico:** base crema `#FEFCE9`, bloques en arena `#F8EFDE` y salvia `#E3EDD8`, y el verde Sansala `#1C592A` para el texto fuerte, los botones y la transición. Los pasteles de familia colorean las tarjetas.
- **Rejilla bento:** bloques redondeados (radio de 28 px) de distintos tamaños, separados 14 px, con sombras suaves al pasar el ratón.
- **Navegación en dock:** cápsula flotante abajo y centrada, con un indicador que se desliza a la sección activa.
- **Tipografía:** Poppins 800 para los titulares y Manrope para el texto.

## 3. Stack
esbuild, **GSAP 3 + Flip** (para las animaciones de cambio de layout) y **Lenis**. Los gestos (arrastre con inercia y deslizar tarjetas) se programan a mano con Pointer Events, sin plugins de pago.

## 4. Estructura y animaciones

### Global
- **Intro «La pila»:** 7 capas de sándwich ilustradas (pan, lechuga, tomate, queso, jamón, lechuga, pan) **caen y rebotan** hasta apilarse. Aparece «Sansala» y la pila **explota** en todas direcciones para descubrir la portada.
- **Router por hash:** `#/inicio`, `#/carta`, `#/nosotros` y `#/contacto`.
- **Transición de mosaico entre páginas:** una rejilla de baldosas verdes cubre la pantalla, escalando en cascada, y se retira desde otro punto. Cada destino tiene un patrón propio: diagonal, desde el centro, desde los bordes o aleatorio.
- **Dock flotante** con indicador deslizante y logo fijo arriba a la izquierda.

### Inicio (bento)
- Bloque principal verde con un titular que se escribe por palabras.
- **Baraja de productos:** tarjetas apiladas que se **arrastran y se lanzan** a izquierda o derecha (gesto tipo *swipe*), con botones ← → y bucle infinito.
- Bloques de datos con contadores (<24 h, 7 días, 35 años, 45 referencias), una marquesina de familias, el sello IFS, un bloque para descargar el catálogo y un acceso a «Quiero ser cliente».
- Fila de 7 píldoras de familia que se rellenan con su color pastel al pasar el ratón y abren la carta ya filtrada.

### La carta: 3 formas de verla
Selector con indicador deslizante, filtros por familia, filtro «Congelados» y **buscador en vivo**.
1. **Cuadrícula bento:** tamaños variados. Al filtrar o buscar, las tarjetas se **reordenan con animación FLIP**.
2. **Mesa:** un lienzo grande con los 45 productos en círculos, como platos sobre una mesa. Se recorre **arrastrando con inercia** (ratón o dedo). Los productos que no cumplen el filtro se atenúan.
3. **Galería 3D (coverflow):** carrusel con perspectiva y `rotateY`. Se maneja arrastrando, con las flechas, con la rueda o con el teclado. Debajo se muestran el nombre y los ingredientes del producto central.

- **Ficha de producto:** al pulsar cualquier producto, la foto **viaja (FLIP)** desde su posición hasta la cabecera de la ficha a pantalla completa. Los ingredientes aparecen como etiquetas escalonadas. Lleva navegación anterior/siguiente y un botón «Solicitar información».

### Nosotros
- **Texto que se ilumina palabra a palabra** con el scroll.
- **Línea de tiempo** de 4 pasos (campo <24 h, lavado y corte, elaboración artesanal, 7 días) con una línea de progreso que se rellena y fotos que se descubren con `clip-path`.
- Rejilla de los 6 canales y los 4 sellos de calidad flotando.

### Contacto
- Bloque verde con los datos de contacto y formulario con pestañas (Contacto / Quiero ser cliente / Trabaja con nosotros).
- Al enviar, aparece un **sello «¡Recibido!»** que golpea con rotación y rebote.

## 5. Calidad mínima
- Un H1 por vista, `alt` en todas las imágenes y navegación completa por teclado (incluido el coverflow).
- Foco visible y contraste AA.
- Sin scroll horizontal accidental a 390 px.
- Cero errores en consola.

## 6. Entregables
`modelo-3/dist/index.html` (autocontenido), código en `modelo-3/src/` y un README.

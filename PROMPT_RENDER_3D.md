# Brief profesional: fotografía de producto 3D (Velaroma Lumière)

Prompt para dirigir a un artista 3D, a una IA de imagen o para revisar cualquier render del producto.

```text
ROL
Eres un equipo de CGI de producto de nivel agencia (clientes tipo Diptyque, Aesop, Bang & Olufsen):
- Artista 3D de hard-surface (modelado fiel a escala real, biseles en todas las aristas).
- Look-dev / materiales PBR (metal cepillado, pintura en polvo, vidrio grueso, cera, madera).
- Director de fotografía de estudio (iluminación con softboxes, rim light, prácticas).
- Retocador y colorista (etalonado, contraste local, nitidez, grano fotográfico).
El resultado debe ser indistinguible de una fotografía real de catálogo.

PRODUCTO
Lámpara calentadora de velas "Lumière": base redonda con bisel y anillo dorado, mástil
fino con collarín de altura ajustable, brazo curvado, pantalla cónica con labio enrollado y
bombilla halógena GU10 visible. Cable negro con regulador/temporizador en línea.
Acabados: negro mate (pintura en polvo satinada) y dorado cepillado (latón anisótropo).
Vela en tarro de vidrio grueso con etiqueta de papel "VELAROMA · Ámbar Noir".

REGLA DE MARCA (innegociable)
La vela NUNCA lleva llama: el claim es "el aroma de tu vela, sin llama". Se comunica que
está activa con: piscina de cera fundida brillante, resplandor ámbar que atraviesa la cera
desde arriba y la luz cálida de la lámpara sobre la superficie.

ENCUADRE
- La lámpara SIEMPRE completa: de la base a la pantalla, con aire alrededor (márgenes
  >= 6 % del lado menor). Nunca cortar pantalla, base ni vela.
- Producto: 1:1, vista 3/4 a la altura de la vela (cámara 50-85 mm equivalente).
- Hero escritorio 16:9 con el producto en el tercio derecho y espacio negativo a la izquierda
  para el texto. Hero móvil 4:5 con el producto centrado arriba.

ILUMINACIÓN
- Práctica: bombilla 2700 K que proyecta un cono cálido sobre la vela y la base.
- Key: softbox grande lateral-frontal, neutro-cálido, que dibuje el volumen del metal.
- Rim: softbox estrecho a contraluz que separe la silueta del fondo.
- Fondo: ciclorama oscuro sin línea de horizonte, con un halo cálido detrás del producto.
- Sombras de contacto suaves y oclusión ambiental donde los objetos tocan la superficie.

MATERIALES Y DETALLE
Biseles en todas las aristas (nada perfectamente afilado). Rugosidad con microvariación.
Vidrio con grosor, refracción, reflejos de los softbox y borde redondeado. Madera con veta
real y barniz satinado. Texto de etiqueta nítido y legible.

POSTPRODUCCIÓN
Render a 2x y reducción Lanczos (supermuestreo). Bloom sutil solo en la bombilla.
Curva de contraste en S suave, luces cálidas y sombras ligeramente frías, viñeteado leve,
grano fino de película (ISO 100), nitidez de salida (unsharp mask).
Nada de halos blancos quemados, bandas en degradados ni bordes que parezcan recortados.

CONTROL DE CALIDAD (cada imagen, antes de entregar)
[ ] Lámpara completa y centrada según el formato   [ ] Vela sin llama y con cera fundida
[ ] Sin zonas quemadas (máx. solo la bombilla)     [ ] Sin artefactos, moiré ni bandas
[ ] Sombras de contacto presentes                   [ ] Metal con reflejos de softbox
[ ] Etiqueta legible                                [ ] Coherencia de luz entre todas las fotos
[ ] Se lee como fotografía real a 100 % de zoom
```

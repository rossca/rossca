# Sansala · Modelo 2 «Editorial en movimiento» (prototipo no oficial)

Segundo concepto de rediseño para Sansala. El [Modelo 1](../prototype) era un vuelo de cámara 3D; este es **editorial, tipográfico y táctil**. El prompt profesional completo está en [`PROMPT-MODELO-2.md`](PROMPT-MODELO-2.md).

## Ver
Abre `dist/index.html` en el navegador: es un único archivo autocontenido.
- `?static` en la URL fuerza la versión sin animaciones.

## Pantallas
0. **Intro «cortina»**: contador 000→100 y la pantalla verde se abre en dos.
1. **El plato**: plato circular WebGL con transición líquida entre 6 productos, onda al pasar el ratón, inclinación 3D y marquesinas gigantes. Al hacer scroll, el plato crece hasta llenar la pantalla.
2. **Del campo a tu mano**: scroll horizontal fijado en 4 capítulos, con una línea que se dibuja y parallax en las fotos.
3. **Familias apiladas**: 7 tarjetas sticky en colores pastel que se apilan y se encogen.
4. **La carta**: menú tipográfico de 45 productos, con imagen flotante que sigue al cursor, filtros y ficha lateral.
5. **Allí donde estés**: contadores, banda inclinada que se tuerce con la velocidad del scroll y rejilla de canales.
6. **Calidad**: sellos IFS, Halal, ASC y MSC que entran girando en 3D.
7. **¿Hablamos?**: letras que suben una a una, botón magnético y formularios demo.

## Desarrollo
```bash
npm install && npm run build   # usa las imágenes de ../prototype/img/w
```

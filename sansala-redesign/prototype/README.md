# Sansala · Prototipo de rediseño inmersivo (no oficial)

Prototipo de prueba para ver cómo podría ser una web moderna de Sansala, con los productos, imágenes, colores y tipografías de sansala.es. **No es la web oficial**: lleva `noindex` y los formularios no envían nada.

## Ver
Abre `dist/index.html` en el navegador. Es un único archivo autocontenido de unos 2,5 MB, con JS, CSS e imágenes incrustados. Solo necesita conexión para las fuentes de Google (Poppins y Manrope).

- `?static` en la URL fuerza la versión sin animaciones 3D. Esta versión también se activa automáticamente si el sistema tiene activado "reducir movimiento" o si el navegador no tiene WebGL2.

## Recorrido (la cámara vuela por un único mundo 3D)
1. **Inicio**: vista cenital de los bowls y picado de la cámara.
2. **Frescura**: vuelo rasante entre fotos y hojas.
3. **Método**: el sándwich 3D se monta capa a capa mientras la cámara lo rodea.
4. **Familias**: la cámara gira 360° dentro de un anillo con las 7 familias. Al hacer clic en una tarjeta se abre el catálogo filtrado.
5. **Catálogo**: los 45 productos en scroll horizontal fijado, con filtros y ficha lateral.
6. **Canales**: los 6 canales de venta orbitan alrededor de un plato.
7. **Calidad**: los sellos IFS, Halal, ASC y MSC flotan y se alinean.
8. **¿Lo hablamos?**: la cámara aterriza sobre una foto y el fondo pasa a verde Sansala.
9. **Contacto**: formularios de contacto, alta de cliente, empleo y newsletter (demo).

## Desarrollo
```bash
npm install
npm run build      # genera dist/index.html
```
Fuentes en `src/` (`main.js`, `styles.css`, `index.html`, `products.js`). Imágenes optimizadas en `img/w/` (WebP).
Stack: Three.js 0.170, GSAP 3.12 + ScrollTrigger, Lenis y esbuild.

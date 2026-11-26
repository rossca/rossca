# Tienda Velaroma: estado del proyecto

## Hecho
- **Marca:** lujo minimalista (negro #0E0D0B, marfil #F3EDE2, dorado #C9A45C), Playfair Display + Jost.
- **Fotos:** 7 imágenes renderizadas en 3D con three.js (`imagenes/`), subidas a Shopify y asignadas a los productos. El acabado dorado cambia de foto al seleccionarlo.
  - Para regenerarlas: `scene.html` + `run.js` (Playwright). Ej.: `node run.js "velaroma-hero:shot=hero&w=2400&h=1350"`.
- **Portada:** barra de anuncios en movimiento → hero a pantalla completa (entrada en cascada + zoom lento) → franja de confianza → producto estrella → colección → "Así de fácil" → Pack Regalo → garantía → FAQ animada → newsletter → pie de marca.
- **Animaciones:** revelado al hacer scroll (componente `<s-reveal>`), brillo dorado en titulares, destello en botones al pasar el ratón, elevación de tarjetas, acordeones con transición. Todo se desactiva si el usuario tiene activado "reducir movimiento".
- **Ficha de producto:** título grande, botón de compra destacado, iconos de confianza, acordeones (envío, garantía, cuidados) y venta cruzada hacia el Pack Regalo.
- **Navegación en español:** Inicio · Lámpara Lumière · Pack Regalo · Wax melts · Contacto. Pie: colección, envíos y devoluciones, contacto, buscar.
- **Página creada:** "Envíos y devoluciones".

## Pendiente (lo tiene que hacer el propietario en el admin de Shopify)
1. Reclamar la tienda (enlace de guardado) para no perderla.
2. Ajustes → Idiomas: poner **español** como idioma principal (algunos textos del sistema, como "Alphabetically, A-Z" o "Privacy policy", vienen de Shopify).
3. Ajustes → Políticas: aviso legal, privacidad, cookies, devoluciones y envíos (se pueden copiar de la página "Envíos y devoluciones").
4. Activar pagos (Shopify Payments / PayPal) y configurar envíos gratis.
5. Conectar proveedor real (pedir muestras con certificado CE) y, cuando lleguen, sustituir o complementar los renders con fotos y vídeo reales del producto.
6. Dominio propio (p. ej. velaroma.es) y píxeles de Meta/TikTok.

# Tienda Velaroma: estado del proyecto

## Hecho
- **Marca:** lujo minimalista (negro #0E0D0B, marfil #F3EDE2, dorado #C9A45C), Playfair Display + Jost.
- **Fotos v2 (fotorrealistas):** 10 renders 3D (`imagenes/*-v2.jpg`) según el brief `PROMPT_RENDER_3D.md`: modelo a escala con biseles, latón y pintura en polvo PBR, vidrio con grosor, cera fundida sin llama, softboxes, oclusión ambiental, supermuestreo 2x y etalonado (curva S, virado, viñeteado, grano, nitidez). La lámpara aparece siempre completa.
  - Lámpara: 6 fotos en parejas (3/4, frontal, ambiente × negro/dorado). El acabado dorado cambia de foto al seleccionarlo.
  - Hero: versión 16:9 para escritorio y 4:5 para móvil (`snippets/hero-picture.liquid` en el tema).
  - Para regenerarlas: `render/scene2.html` + `render/run2.js` + `render/grade.py` (requiere `npm i three@0.170.0 @fontsource/playfair-display @fontsource/jost` y Playwright). Ej.: `node run2.js "velaroma-hero:shot=hero&w=2400&h=1350&ss=2"` y `python3 grade.py raw/velaroma-hero.png velaroma-hero.jpg 2400 1350`.
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

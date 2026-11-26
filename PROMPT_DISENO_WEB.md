# Brief profesional: tienda Velaroma (dirección de proyecto)

Prompt reutilizable para dirigir el diseño y desarrollo de la tienda con cualquier IA o agencia.

```text
ROL
Eres un estudio de e-commerce de lujo formado por: Director Creativo (ex-Aesop / Diptyque),
Lead Shopify Developer (Liquid, Online Store 2.0, Core Web Vitals), Especialista CRO
(+200 tests A/B en D2C), Motion Designer (microinteracciones sutiles) y Copywriter de marca
en español de España. Entregáis una tienda lista para vender, no un prototipo.

MARCA
- Nombre: Velaroma. Producto estrella: Lámpara Calentadora de Velas "Lumière".
- Oferta: lámpara 44,99 € · Pack Regalo (lámpara + 3 wax melts) 59,99 € · Wax melts 16,99/29,99 €.
- Posicionamiento: objeto de diseño para el hogar; "el aroma de tu vela, sin llama".
- Público: España, 25-55 años, cuida su casa, regala con gusto, compra desde el móvil (75%+).
- Estética: lujo minimalista. Negro profundo #0E0D0B, marfil #F3EDE2, dorado #C9A45C.
  Titulares serif editoriales (Playfair Display), cuerpo sans geométrica (Jost).

OBJETIVOS (por orden)
1. Conversión: tasa objetivo >= 2,5 %, AOV >= 52 € (empujar el Pack Regalo).
2. Confianza: envío gratis, 30 días de devolución, 3 años de garantía, pago seguro, visibles
   sin hacer scroll en la ficha de producto.
3. Velocidad: LCP < 2,5 s en 4G, CLS < 0,1. Imágenes WebP responsive, lazy salvo el hero.
4. Marca memorable: que parezca una marca de 10 M€, no un dropshipping.

ARQUITECTURA DE LA PORTADA
Barra de anuncios animada → Hero a pantalla completa con imagen ambiental y doble CTA →
Franja de confianza → Producto estrella (split imagen/beneficios) → Colección → Cómo funciona
(3 pasos) → Bloque Pack Regalo con ancla de precio → Garantía → FAQ → Newsletter → Footer.

ANIMACIÓN Y MOVIMIENTO (reglas)
- Solo transform y opacity (GPU). Duración 600-900 ms entradas, 200 ms hovers.
- Revelado al hacer scroll con IntersectionObserver, escalonado 80-120 ms.
- Hero: entrada en cascada del titular + zoom lento de la imagen (Ken Burns 12 s).
- Marquee continuo en la barra de anuncios; hover con elevación sutil en tarjetas.
- Todo dentro de prefers-reduced-motion: no-preference. Nada que bloquee la compra.

FICHA DE PRODUCTO
Galería + título + precio con ancla tachada + selector de acabado + CTA dorado a ancho
completo + iconos de confianza + descripción + acordeones (envío, garantía, cuidados).

COPY
Español de España, frases cortas, beneficio antes que característica. Prohibido: claims de
salud, "el mejor del mundo", reseñas o cifras de ventas inventadas, urgencia falsa.

CUMPLIMIENTO
Garantía legal 3 años (España), desistimiento 14 días (ofrecemos 30), precios con IVA,
páginas legales (aviso legal, privacidad, cookies, devoluciones, envíos), marcado CE visible.

ENTREGABLE
Tema funcional y editable desde el editor de Shopify, revisado en móvil y escritorio, con
checklist QA: enlaces, carrito, variantes, accesibilidad (contraste 4,5:1, foco visible),
y lista de tareas pendientes para el propietario.
```

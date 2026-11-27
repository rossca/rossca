# Estrategia SEO de Velaroma (España)

## Diagnóstico honesto
- **Competencia por "lámpara calentadora de velas":** Amazon.es, Leroy Merlin, El Corte Inglés y Flamingueo (marca española muy fuerte en redes). Un dominio nuevo **no va a salir el primero para el término principal en semanas**. Para eso hacen falta meses de autoridad (contenido + enlaces).
- **Oportunidad real:**
  1. Búsquedas de **cola larga** (más específicas, con intención de compra) que esos gigantes no cubren bien.
  2. **Wax melts en España**: poca competencia especializada.
  3. **Contenido informativo** que nadie responde bien ("efecto túnel en velas", "cómo usar wax melts").
  4. **Google Shopping gratuito** (fichas gratuitas de Merchant Center): aparecer en la pestaña Shopping desde la primera semana.
- **Objetivo realista:** top 3 en cola larga y wax melts en 2-4 meses; primera página para "lámpara calentadora de velas" en 6-12 meses con constancia.

## Mapa de palabras clave (una URL por intención, sin canibalización)
Prioridad estimada por intención de compra y nivel de competencia. Los volúmenes exactos se validarán en Search Console tras el lanzamiento.

| URL | Keyword principal | Secundarias / cola larga | Intención |
|---|---|---|---|
| `/` (portada) | lámpara calentadora de velas | lámpara para velas sin llama, calentador de velas eléctrico | Compra (marca) |
| `/products/lampara-calentadora-velas-lumiere` | lámpara calentadora de velas con temporizador | lámpara calienta velas regulable, lámpara para derretir velas, candle warmer lamp | Compra |
| `/products/pack-regalo-lumiere` | regalo lámpara calentadora de velas | regalo original para casa, pack regalo velas aromáticas | Compra / regalo |
| `/products/wax-melts-soja-coleccion-autor` | wax melts de soja | wax melts España, ceras aromáticas para quemador, wax melts ámbar | Compra |
| `/collections/lamparas-calentadoras-de-velas` | lámparas calentadoras de velas | calentador de velas, candle warmer | Compra (categoría) |
| `/collections/wax-melts` | comprar wax melts | ceras aromáticas, wax melts baratos | Compra (categoría) |
| `/collections/ideas-regalo` | regalos originales para el hogar | regalos para mujer casa, regalo amigo invisible 50 € | Regalo |
| `/blogs/guia/lampara-calentadora-de-velas` | qué es una lámpara calentadora de velas | cómo funciona, merece la pena, ventajas | Informativa (pilar) |
| `/blogs/guia/efecto-tunel-velas` | efecto túnel en velas | cómo arreglar una vela con túnel, vela se consume por el centro | Informativa |
| `/blogs/guia/como-usar-wax-melts` | cómo usar wax melts | qué son los wax melts, cuánto duran | Informativa |
| `/blogs/guia/regalos-originales-hogar` | regalos originales para el hogar | regalos navidad casa, regalos con estilo | Regalo / estacional |

## SEO on-page (cada URL)
- **Title:** 50-60 caracteres, con la keyword al principio y la marca al final.
- **Meta description:** 140-155 caracteres, con beneficio, prueba (envío gratis / 30 días / garantía) y una llamada a la acción.
- **Un solo H1** con la keyword. H2 con las secundarias.
- **URL corta** en minúsculas, sin tildes.
- **Imágenes:** nombre de archivo descriptivo (hecho), alt descriptivo (hecho) y formato WebP servido por el CDN de Shopify (automático).
- **Enlazado interno:** blog → producto/colección con anclas descriptivas; producto → producto relacionado (hecho con el bloque "Mejora tu compra").

## SEO técnico (ver `seo-schema.liquid`)
- **Datos estructurados:**
  - **Product**: marca, SKU, precio, disponibilidad, política de devolución y envío (`MerchantReturnPolicy`, `OfferShippingDetails`). Son elegibles para los fragmentos enriquecidos de producto.
  - **Organization** y **WebSite**: logo y nombre de marca en Google.
  - **BreadcrumbList**: migas de pan en los resultados.
  - **FAQPage** en la portada: Google ya casi no muestra el desplegable, pero ayuda a la comprensión del contenido y a los buscadores de IA.
- **Velocidad:**
  - Imágenes responsive y precarga de la imagen principal (LCP): hecho.
  - Animaciones solo con transform/opacity: hecho.
  - Sin apps pesadas: no instalar apps de reseñas, popups o similares que carguen scripts extra sin necesidad.
- **Indexación:**
  - Shopify genera `sitemap.xml` y `robots.txt` automáticamente, y añade `canonical` en productos y colecciones.
  - Evitar duplicados: enlazar siempre a `/products/...`, no a `/collections/x/products/...` (el tema ya lo hace).
- **Idioma:** español como idioma principal y `lang="es"`; el tema lo toma del idioma de la tienda (tarea tuya en Ajustes → Idiomas).

## SEO off-page y visibilidad rápida
1. **Google Search Console:** verificar el dominio y enviar `https://velaroma.es/sitemap.xml`.
2. **Google Merchant Center** (canal "Google & YouTube" de Shopify): **fichas gratuitas en Shopping**. Es la vía más rápida a la primera página para búsquedas de producto.
3. **Bing Webmaster Tools:** importar desde Search Console (2 min). Bing alimenta también a ChatGPT y Copilot.
4. **Pinterest:** cuenta de empresa y pines de cada render y artículo. Es un motor de búsqueda visual muy fuerte en decoración y regalos.
5. **Enlaces (link building) ético:**
   - Enviar la lámpara a 10-20 blogs y cuentas de decoración, velas y "regalos originales" en España a cambio de una reseña honesta. Las colaboraciones pagadas deben marcarse como `rel="sponsored"`.
   - Notas de prensa en guías de regalos de Navidad (revistas de decoración y lifestyle).
   - Directorios de marcas españolas.
6. **Reseñas reales:** activar la app gratuita **Shopify Product Reviews / Judge.me** cuando haya ventas. Las estrellas en Google aumentan mucho el porcentaje de clics (CTR).

## Calendario de contenidos (2 artículos al mes)
- **Mes 1:** pilar "Lámpara calentadora de velas" + "Efecto túnel" (redactados).
- **Mes 2:** "Cómo usar wax melts" + "Regalos originales para el hogar" (redactados).
- **Mes 3:** "Mejores aromas para el otoño/invierno", "Lámpara calentadora vs. difusor de varillas".
- **Mes 4:** "Cómo elegir una vela de soja", "Decorar el salón con luz cálida".

## Medición
Search Console (impresiones, CTR y posición por URL) cada semana. Reescribir el title y la description de las URLs con un CTR inferior al 2 % en la primera página.

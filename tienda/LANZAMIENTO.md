# Velaroma: guía de lanzamiento en Shopify

Marca: **[TÚ]** = lo haces tú en el admin de Shopify · **[CLAUDE]** = lo hago yo en cuanto Shopify vuelva a estar conectado.

---

## FASE 1: Dejar la tienda a tu nombre (hoy, 10 min)

1. **[TÚ] Reclamar la tienda** con el enlace "guardar en tu cuenta" que te paso en el chat. Crea la cuenta con tu email.
2. **[TÚ] Elegir plan:** *Basic* es suficiente para empezar. Shopify suele ofrecer los primeros meses a precio reducido.
3. **[TÚ] Reconectar Shopify con Claude** (claude.ai → Ajustes → Conectores → Shopify → Conectar) para que yo pueda seguir configurando la tienda ya guardada.

## FASE 2: Datos legales y de empresa (30 min)

4. **[TÚ] Ajustes → Información de la tienda:** nombre legal, NIF/CIF, dirección fiscal y email de contacto.
   - Si vendes como persona física, necesitas darte de alta como **autónomo** (modelo 036/037 en Hacienda y alta en la Seguridad Social). Consulta a un gestor: suele costar 40-60 €/mes y te hace las declaraciones trimestrales.
5. **[TÚ] Ajustes → Impuestos y aranceles → España:** activar "Cobrar IVA" (21 %) y marcar "Los precios incluyen impuestos". Si vas a vender a otros países de la UE, registrarte en la **ventanilla única OSS** cuando superes 10.000 €/año en ventas a la UE.
6. **[TÚ] Ajustes → Políticas:** pegar los textos de `LEGAL.md` (devoluciones, privacidad, términos, envíos y aviso legal) después de rellenar tus datos en los `[CORCHETES]`.
7. **[TÚ] Ajustes → Privacidad del cliente:** activar el **banner de cookies** (obligatorio en la UE).

## FASE 3: Cobros (15 min)

8. **[TÚ] Ajustes → Pagos → Shopify Payments:** activar. Acepta tarjeta, Apple Pay y Google Pay. Necesitarás DNI e IBAN.
9. **[TÚ] Activar PayPal y, si quieres, Bizum** (mediante la app de un proveedor de pagos español). Cuantos más métodos de pago, más conversión.
10. **[TÚ] Pedido de prueba:** Ajustes → Pagos → "Modo de prueba", compra el Pack Regalo y comprueba que llega el email de confirmación. Después, desactiva el modo de prueba.

## FASE 4: Envíos (10 min)

11. ✅ **[CLAUDE] Hecho:** tarifa "Envío gratis 24-72 h" a 0 € creada en la zona "España".
    - ✅ Tarifa antigua "Estándar" (6,99 €) eliminada: en España solo queda el envío gratis.
12. **[TÚ] Balears, Canarias, Ceuta y Melilla:** crear una zona aparte con su tarifa, o excluirlas al principio (en Canarias no se aplica IVA y hay aduana).
13. ✅ **[CLAUDE] Hecho: peso de cada producto:** lámpara 1,2 kg, pack 1,6 kg, wax melts 0,25 kg (pack de 3) y 0,5 kg (pack de 6).

## FASE 5: Proveedor y stock

14. **[TÚ] Elegir proveedor:**
    - **Opción A (rápida):** una app de dropshipping con almacén en la UE, como CJdropshipping (almacén en Alemania o España), BigBuy (español) o Spocket. Plazo de 2 a 5 días.
    - **Opción B (más margen):** pedir 30-50 unidades a fábrica (Alibaba), con marcado CE y RoHS, y almacenarlas en casa o en una logística como Cubyn o Outvio.
    - **Pide siempre una muestra** antes de vender. Comprueba la calidad, el CE en la etiqueta y que la bombilla sea GU10 de 35-50 W.
15. **[TÚ] Ajustar el coste por artículo** en cada producto para que Shopify calcule tu margen real.
16. **[TÚ] Grabar 5-10 vídeos verticales** con la muestra real: es lo que más vende en TikTok e Instagram.

## FASE 6: Marketing listo para lanzar

17. ✅ **[CLAUDE] Hecho: código `BIENVENIDA10`:** 10 % en todos los productos, activo desde el 27/11/2026, sin fecha de fin, válido para cualquier cliente y **un solo uso por cliente**. Se puede combinar con descuentos de envío.
18. ✅ **[CLAUDE] Hecho: colecciones automáticas** (se rellenan solas), publicadas en la tienda online y con texto y SEO de `seo/METADATOS.md`:
    - `/collections/lamparas-calentadoras-de-velas`: tipo de producto "Lámpara calentadora de velas".
    - `/collections/wax-melts`: tipo "Wax melts".
    - `/collections/ideas-regalo`: etiqueta `regalo`.
    - `/collections/mas-vendidos`: etiqueta `bestseller` o `mas-vendido`.
19. **[TÚ] Instalar Shopify Email** (gratis hasta 10.000 emails/mes) y crear las automatizaciones con los textos de `EMAILS.md`.
20. **[TÚ] Canales de venta:** conectar **Meta** (Facebook e Instagram), **TikTok** y **Google & YouTube**. Así se instalan los píxeles y el catálogo de productos se sincroniza solo.
21. **[TÚ] Dominio:** comprar `velaroma.es` o `velaroma.com` (Ajustes → Dominios, unos 15 €/año).
22. ✅ **Hecho (28/11/2026): contraseña desactivada.** La tienda está abierta al público en https://vd4w-qz5zyj-k6.myshopify.com.

## FASE 7: Primeros anuncios (ver `ANUNCIOS.md`)

23. **Presupuesto de prueba:** 20-30 €/día durante 7 días, con 3-5 creatividades distintas.
24. **Reglas:**
    - Apaga un anuncio que gaste 25 € sin ninguna venta.
    - Escala un 20 % cada 48 h el que tenga un ROAS (ingresos por cada euro de anuncios) de 2,5 o más.
    - El ROAS mínimo para no perder dinero es aprox. 2,3 (ver `INVESTIGACION_PRODUCTOS.md`).

---

### SEO aplicado en Shopify (27/11/2026)
- **Metadatos** (title y meta description) de `seo/METADATOS.md` en la portada, los 3 productos, las 4 colecciones y la página "Envíos y devoluciones".
- **Blog "Guía Velaroma"** (`/blogs/guia`) con los 4 artículos de `seo/blog/` publicados, cada uno con su title y meta description.
- **Tema:** `snippets/seo-schema.liquid` añadido y cargado en `layout/theme.liquid`. Se han quitado los JSON-LD que ya generaba `snippets/meta-tags.liquid` (Product, WebSite, Organization) para no duplicarlos.
- **H1 real en la portada:** el titular del hero es ahora el H1 e incluye la keyword ("Lámpara calentadora de velas Lumière · El aroma de tu vela. Sin llama."). Se ha quitado el H1 oculto con el nombre de la tienda.
- ✅ **Tema publicado** el 27/11/2026: los cambios ya son visibles en la tienda.
- ✅ **Idioma:** español activado y publicado, y fijado como idioma por defecto del dominio de la tienda. La web se sirve en `es` (`<html lang="es">`, textos del sistema y checkout en español) y el inglés ya no se ofrece. En el admin, el español aparece como idioma por defecto de la tienda online; internamente Shopify sigue guardando el inglés como "idioma principal" de la cuenta, cosa que la API no deja cambiar y que no afecta a lo que ven clientes y Google.

### Lo que YA está hecho
Diseño con animaciones, 3 productos con fotos fotorrealistas, precios, descripciones, SEO de producto, menús en español, página de envíos y devoluciones, FAQ, newsletter, hero adaptado a móvil y venta cruzada hacia el Pack Regalo.

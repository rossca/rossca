# Sansala · Modelo 3 «Bento App» (prototipo no oficial)

Tercer concepto de rediseño para Sansala:
- [Modelo 1](../prototype): vuelo de cámara 3D.
- [Modelo 2](../modelo-2): editorial con scroll.
- **Modelo 3**: experiencia tipo app, con páginas separadas y transiciones de mosaico.

El prompt profesional completo está en [`PROMPT-MODELO-3.md`](PROMPT-MODELO-3.md).

## Ver
Abre `dist/index.html` en el navegador: es un único archivo autocontenido.
- `?static` en la URL desactiva las animaciones.

## Qué tiene
- **Intro «La pila»**: las capas de un sándwich caen, rebotan, se apilan y explotan.
- **Transición de mosaico** entre páginas, con un patrón distinto para cada destino. Las páginas son `#/inicio`, `#/carta`, `#/nosotros` y `#/contacto`.
- **Dock flotante** con indicador deslizante.
- **Inicio bento**: baraja de productos que se arrastra y se lanza, contadores, marquesina, sello IFS y catálogo.
- **La carta, de 3 formas**:
  - **Cuadrícula**: se reordena con animación FLIP al filtrar o buscar.
  - **Mesa**: los productos en platos sobre una mesa que se recorre arrastrando con inercia.
  - **Galería 3D**: carrusel con perspectiva, que se maneja arrastrando, con flechas, con la rueda o con el teclado.
- **Buscador en vivo**, filtros por familia y filtro de congelados.
- **Ficha de producto**: la foto viaja desde la tarjeta hasta la ficha, los ingredientes aparecen como etiquetas y se puede pasar al producto anterior o siguiente.
- **Nosotros**: texto que se ilumina palabra a palabra, línea de tiempo con fotos que se descubren, canales y sellos.
- **Contacto**: formularios con pestañas y sello «¡Recibido!» al enviar (demo, no envía nada).

## Desarrollo
```bash
npm install && npm run build   # usa las imágenes de ../prototype/img/w
```

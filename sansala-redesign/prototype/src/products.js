// Catálogo real de sansala.es (noviembre 2026), con nombres y erratas unificados.
// img = nombre del archivo WebP en /img/w (sin extensión). fz = también disponible congelado.

export const CATS = [
  { id: 'sandwiches', name: 'Sándwiches', pastel: '#EBC9BF', img: 'SW-CHICKEN-ROYAL_2', line: 'Pan tierno, rellenos generosos.' },
  { id: 'ensaladas', name: 'Ensaladas', pastel: '#CED3A3', img: 'Bowl-POLLO-FS_2_5', line: 'Bowls, pokes y shakers recién cortados.' },
  { id: 'wraps', name: 'Wraps', pastel: '#B5CFB6', img: 'Wrap-SUSHI_2', line: 'Enrollados para comer en cualquier parte.' },
  { id: 'especiales', name: 'Especiales', pastel: '#E5D4B5', img: 'bagel-salmon-1', line: 'Bagels y bollería salada con carácter.' },
  { id: 'bocadillos', name: 'Bocadillos', pastel: '#F0EEE1', img: 'Panini-POLLO_2', line: 'Panini, flautines y pan rústico.' },
  { id: 'microondas', name: 'Microondas', pastel: '#EAE2E9', img: 'PLANTILLA-FOTOS-WEB-SANSALA-3', line: 'Platos completos, listos en 2 minutos.' },
  { id: 'postres', name: 'Postres', pastel: '#FEE8F0', img: 'Postre-2', line: 'Un final dulce en formato cup.' },
];

// Tarjetas del anillo 3D (las 7 "familias" de la marca)
export const RING = [
  { id: 'sandwiches' }, { id: 'ensaladas' }, { id: 'wraps' }, { id: 'especiales' },
  { id: 'microondas' }, { id: 'postres' },
  { id: 'congelados', name: 'Congelados', pastel: '#E3EDD8', img: 'PLANTILLA-FOTOS-WEB-SANSALA-17', line: '16 referencias pensadas para tu congelador.' },
];

export const PRODUCTS = [
  // Sándwiches
  { n: 'Cheddar y Cebolla Caramelizada', c: 'sandwiches', d: 'Pan multicereal, queso cheddar rojo, lechuga iceberg, tomate, salsa dijonesa y cebolla caramelizada.', img: 'SW-CHEDDAR-CCARAMELIZADA_2' },
  { n: 'Especial Brie y Pavo', c: 'sandwiches', d: 'Pan multicereal, queso brie, pechuga de pavo cocida, salsa mostaza, espinacas frescas, cebolla caramelizada, rúcula y pipa pelada.', img: 'SW-BRIE-LOMO_2' },
  { n: 'BLT', c: 'sandwiches', d: 'Pan blanco de molde, bacon frito, tomate, lechuga iceberg y mayonesa ligera.', img: 'SW-BLT_2' },
  { n: 'Chicken Royal', c: 'sandwiches', d: 'Pan de molde blanco, pechuga de pollo en tiras, tomate, lechuga iceberg, salsa mango curry y mahonesa, rúcula y almendras.', img: 'SW-CHICKEN-ROYAL_2' },
  { n: 'Club Sensacional', c: 'sandwiches', d: 'Pan multicereal, pollo a las finas hierbas, bacon frito, escarola, huevo cocido, tomates secos y mayonesa ligera.', img: 'SW-SENSACIONAL_2' },
  { n: 'Especial de Atún', c: 'sandwiches', d: 'Pan multicereal, mezcla de atún, tomate y lechuga iceberg.', img: 'Sandwich-Atun_2' },
  { n: 'Vegetal con Huevo', c: 'sandwiches', d: 'Pan multicereal, huevo cocido, tomate, lechuga iceberg, pepino y mayonesa.', img: 'SW-Vegetal-Huevo_2' },
  { n: 'Jamón y Queso (Bikini)', c: 'sandwiches', d: 'Pan de molde blanco, jamón cocido, queso edam 30 % y mantequilla.', img: 'BIQUINI', fz: 1 },
  { n: 'Bloomer de Jamón y Queso', c: 'sandwiches', d: 'Pan de molde estilo artesano, jamón cocido, queso cheddar rojo y salsa dijonesa.', img: 'Bloomer-Jamon_Chedar', fz: 1 },
  { n: 'Club de Pollo BBQ', c: 'sandwiches', d: 'Pan de molde blanco, pollo barbacoa, queso cheddar rojo, bacon frito y salsa barbacoa.', img: 'PLANTILLA-FOTOS-WEB-SANSALA-17', fz: 1 },
  // Ensaladas
  { n: 'César', c: 'ensaladas', d: 'Mezcla de lechugas, pollo empanado, salsa césar, queso en lascas y pan tostado.', img: 'Bowl-Pollo-Cesar_2' },
  { n: 'Pasta Genovesa', c: 'ensaladas', d: 'Pasta espiral con pesto, pollo en tiras, aceitunas negras, tomate y queso en lascas.', img: 'Bowl-Genovesa_2' },
  { n: 'Rulo de Cabra, Bacon y Frutos Secos', c: 'ensaladas', d: 'Lechugas variadas, salsa de mostaza y miel, bacon frito, frutos secos, queso de cabra y espinacas.', img: 'Bowl-Rulo-cabra-Bacon_2' },
  { n: 'Poke Pollo Teriyaki', c: 'ensaladas', d: 'Arroz, pollo asado, zanahoria rallada, piña, edamame, col lombarda y salsa teriyaki.', img: '2' },
  { n: 'Poke Salmón', c: 'ensaladas', d: 'Quinoa blanca y roja, soja agridulce, salmón ahumado, pepino, cebolla encurtida, edamame, wakame y amapola.', img: 'Bowl-POKE-ARROZ-salmon' },
  { n: 'New York Shaker', c: 'ensaladas', d: 'Pasta, jamón cocido, dados de queso, lechuga, salsa rosa y zanahoria.', img: '2-1' },
  { n: 'Pollo César Shaker', c: 'ensaladas', d: 'Lechugas variadas, pollo asado, picatostes, tomate cherry y salsa César.', img: '1' },
  { n: 'Ensalada Mixta', c: 'ensaladas', d: 'Lechugas, cebolla dulce, tomate cherry, zanahoria, atún, huevo cocido, aceitunas y vinagreta.', img: 'PLANTILLA-FOTOS-WEB-SANSALA-5' },
  { n: 'Pollo Asado y Bacon', c: 'ensaladas', d: 'Lechugas variadas, pollo en tiras, salsa rosa, bacon frito, almendras laminadas y pasas.', img: 'Bowl-POLLO-FS_2_5' },
  { n: 'Apple Walnuts Chicken', c: 'ensaladas', d: 'Lechugas, dados de queso, pollo asado, manzana verde, tomate cherry y salsa ponzu.', img: 'PLANTILLA-FOTOS-WEB-SANSALA-6' },
  // Wraps
  { n: 'Wrap Jamón y Queso', c: 'wraps', d: 'Tortilla de trigo, jamón cocido, tomate, lechugas, salsa césar y queso edam 30 %.', img: 'especiales1' },
  { n: 'Wrap de Hummus y Crudités', c: 'wraps', d: 'Tortilla de trigo, hummus, lechugas, pimiento rojo, calabacín, zanahoria y espinacas.', img: 'especiales3' },
  { n: 'Wrap de Pollo Curry', c: 'wraps', d: 'Tortilla de trigo, pollo al curry, salsa curry, espinacas y cebolla caramelizada.', img: 'especiales2', fz: 1 },
  { n: 'Mexican Burrito', c: 'wraps', d: 'Tortilla grillada, pulled pork, queso cheddar rojo, arroz y salsa tex-mex.', img: 'Wrap-BURRITO_2' },
  { n: 'Salmón Sushi Wrap', c: 'wraps', d: 'Tortilla, arroz poke, queso crema, salmón ahumado, pepino, zanahoria, cebolla encurtida, guacamole y mayonesa de sésamo.', img: 'Wrap-SUSHI_2' },
  { n: 'Wrap Chicken Durum Kebab', c: 'wraps', d: 'Tortilla de trigo con kebab de pollo, mezcla durum, queso feta y cebolla.', img: 'Wrap-durum_2', fz: 1 },
  // Especiales
  { n: 'Bagel de Salmón Marinado ASC', c: 'especiales', d: 'Bagel, salmón marinado ASC, queso crema con eneldo, salsa tártara, cebolla encurtida y espinacas.', img: 'bagel-salmon-1' },
  { n: 'Bagel Jamón y Queso', c: 'especiales', d: 'Bagel, jamón cocido, queso crema con mahonesa y queso edam 30 %.', img: 'bagel_jamon_jueso' },
  { n: 'Bagel Breakfast', c: 'especiales', d: 'Bagel, bacon frito, huevo cocido, salsa holandesa y queso cheddar.', img: 'PLANTILLA-FOTOS-WEB-SANSALA-16', fz: 1 },
  { n: 'Croissant Brioche Jamón y Queso', c: 'especiales', d: 'Croissant brioche con jamón cocido, queso edam y salsa ligera.', img: 'PLANTILLA-FOTOS-WEB-SANSALA-12', fz: 1 },
  // Bocadillos
  { n: 'Panini Grill Pollo Mostaza', c: 'bocadillos', d: 'Panini al grill con hierbas, pollo en tiras, queso edam 30 %, salsa dijonesa y rúcula.', img: 'Panini-POLLO_2' },
  { n: 'Panini Chicken BBQ', c: 'bocadillos', d: 'Panini de aceitunas, pollo en tiras, queso gouda, salsa barbacoa y bacon frito.', img: 'Panini-BBQ_2', fz: 1 },
  { n: 'Flautín de Jamón de Cebo Ibérico y AOVE', c: 'bocadillos', d: 'Pan cristal con jamón de cebo 50 % ibérico y aceite de oliva virgen extra.', img: 'PLANTILLA-FOTOS-WEB-SANSALA-8' },
  { n: 'Tortilla de Patata con Pimientos', c: 'bocadillos', d: 'Pan rústico, tortilla de patata, pimiento verde frito y mayonesa.', img: 'PLANTILLA-FOTOS-WEB-SANSALA-13', fz: 1 },
  { n: 'Serrano y Tumaca en Pan Cristal', c: 'bocadillos', d: 'Pan cristal, jamón serrano y salsa tumaca.', img: 'PLANTILLA-FOTOS-WEB-SANSALA-9', fz: 1 },
  { n: 'Brie y Bacon en Pan Rústico', c: 'bocadillos', d: 'Pan payesita semillado, queso brie, bacon frito y mayonesa.', img: 'PLANTILLA-FOTOS-WEB-SANSALA-7', fz: 1 },
  { n: 'Serranito', c: 'bocadillos', d: 'Lomo asado, jamón serrano, mayonesa y queso brie.', img: 'PLANTILLA-FOTOS-WEB-SANSALA-14', fz: 1 },
  { n: 'Tuna Melt', c: 'bocadillos', d: 'Panini de aceitunas, crema de atún y mezcla de quesos rallados.', img: 'PLANTILLA-FOTOS-WEB-SANSALA-11', fz: 1 },
  { n: 'Focaccia de Mozzarella y Pomodoro', c: 'bocadillos', d: 'Focaccia italiana, mozzarella, salsa pomodoro y rúcula.', img: 'Focaccia-Rucula', fz: 1 },
  { n: 'Focaccella de Verduras Asadas y Pesto', c: 'bocadillos', d: 'Focaccella de orégano, calabacín asado, pimiento rojo, pesto y tomate seco.', img: 'PLANTILLA-FOTOS-WEB-SANSALA-15', fz: 1 },
  { n: 'Schiacciata de Atún con Harissa', c: 'bocadillos', d: 'Pan schiacciata con mezcla de atún y salsa harissa.', img: 'PLANTILLA-FOTOS-WEB-SANSALA-18', fz: 1 },
  // Microondas
  { n: 'Noodles con Pollo Teriyaki', c: 'microondas', d: 'Spaghetti con salsa teriyaki, pollo, coliflor grillada, boniato asado, judías verdes y amapola.', img: 'PLANTILLA-FOTOS-WEB-SANSALA-3' },
  { n: 'Salmón & Veggies con Arroz', c: 'microondas', d: 'Salmón con salsa romesco, boniato, patata y pimiento asados, calabacín grillado y arroz blanco.', img: 'PLANTILLA-FOTOS-WEB-SANSALA-4' },
  // Postres
  { n: 'Strawberry Cheesecake Cup', c: 'postres', d: 'Galleta, crema de queso y mermelada de fresa.', img: 'Postre-2' },
  { n: 'Lemon Pie Cup', c: 'postres', d: 'Galleta, crema de limón y crema de nata.', img: 'Postre-1' },
];

export const catById = (id) => CATS.find((c) => c.id === id) || RING.find((r) => r.id === id);

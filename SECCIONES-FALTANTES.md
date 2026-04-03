# Secciones Faltantes - Producer66 vs Imperium Sounds

Comparacion completa de todas las secciones de https://imperiumsounds.com/ contra nuestro sitio.

---

## Estado Actual

| Seccion Imperium | Producer66 | Estado |
|-----------------|------------|--------|
| Header con logo, 8 nav items, search, account, cart | Header con logo texto, 5 nav items, language, auth, cart | PARCIAL |
| Hero banner con IMAGEN + texto descriptivo | Hero con texto animado (sin imagen) | PARCIAL |
| "New Products" - grid 4 productos destacados | BeatsSection - 3 beats hardcoded | PARCIAL |
| "All Products" - grid 12 productos | No existe | FALTA |
| Collection pages con filtros + sort + paginacion | Beats page con search + genre filter basico | PARCIAL |
| Contact page con formulario | No existe | FALTA |
| Newsletter signup en footer | No existe | FALTA |
| Country/Region selector en footer | Language selector en navbar | DIFERENTE |
| Announcement bar (barra superior) | No existe | FALTA |
| Predictive search (busqueda en tiempo real) | No existe | FALTA |
| Cart notification slide-out | Cart sidebar drawer | OK (mejor) |
| Sale badges ("Oferta") en productos | Tags basicos (Hot/New/Free) | PARCIAL |
| Producto con imagen hover secundaria | No existe | FALTA |
| Paginacion en grids de productos | No existe | FALTA |
| Footer social (Instagram + YouTube) | Footer social (Instagram, Twitter, YouTube, Mail) | OK |
| ServicesSection | ServicesSection | OK (ventaja nuestra) |
| Testimonials | Testimonials | OK (ventaja nuestra) |
| Portfolio | Portfolio | OK (ventaja nuestra) |
| i18n (en/es/it) | i18n (en/es/it) | OK (ventaja nuestra) |

---

## 1. ANNOUNCEMENT BAR (Prioridad: Media)

Barra superior fija encima del navbar para promociones, descuentos o avisos.

**Imperium**: Tiene el componente pero vacio actualmente.

**Implementar en**: `src/components/AnnouncementBar.tsx`

```
Ubicacion: Encima del Navbar
Contenido: Texto promocional rotativo o estatico
Ejemplo: "FREE SHIPPING ON ALL ORDERS" | "NEW: Trap Sound Kit - OUT NOW"
Estilo: bg-[#F2EFDD] text-[#020202] text-xs font-bold uppercase tracking-widest py-2 text-center
Cierre: Boton X para dismissar (guardar en localStorage)
```

---

## 2. HERO BANNER CON IMAGEN (Prioridad: Alta)

**Imperium**: Imagen full-width con texto descriptivo del negocio superpuesto a la izquierda.

**Actualmente**: Hero de solo texto con estadisticas.

**Accion**: Agregar soporte para imagen de fondo en el Hero, o crear un componente `HeroBanner.tsx` alternativo que acepte una imagen de Contentful CMS.

```
Props:
  - backgroundImage: string (URL de Contentful o local)
  - title: string
  - description: string (parrafo descriptivo del negocio)
  - alignment: 'left' | 'center'
Estilo: Imagen full-width, overlay oscuro, texto sobre la imagen
```

---

## 3. SECCION "ALL PRODUCTS" EN HOMEPAGE (Prioridad: Alta)

**Imperium**: Despues de "New Products" (4 items), muestra "All Products" (12 items) con link "Ver todo".

**Actualmente**: Solo BeatsSection con 3 beats hardcoded.

**Accion**: Crear `FeaturedProducts.tsx` que consulte beats desde la DB y los muestre en grid.

```
Componente: src/components/FeaturedProducts.tsx
Datos: Fetch desde /api/beats (o server action)
Grid: 2 cols mobile, 3-4 cols desktop
Cantidad: 8-12 productos
Link "View All" -> /beats
Titulo configurable: "New Products", "All Products", "Featured Beats"
```

---

## 4. CONTACT PAGE CON FORMULARIO (Prioridad: Alta)

**Imperium**: `/pages/contact` con formulario de 4 campos.

**Actualmente**: No existe ninguna pagina de contacto.

**Accion**: Crear `src/app/[locale]/contact/page.tsx`

```
Campos:
  - Name (text, opcional)
  - Email (email, requerido)
  - Phone (tel, opcional)
  - Message/Comment (textarea, opcional)
Boton: "Send" / "Enviar" (segun locale)
Backend: API route POST /api/contact que envie email o guarde en DB
Proteccion: Clerk auth o captcha
Traduccion: Agregar keys en messages/{locale}.json
```

---

## 5. NEWSLETTER SIGNUP EN FOOTER (Prioridad: Alta)

**Imperium**: Seccion "Suscribete" con input de email y boton en el footer.

**Actualmente**: Footer sin newsletter.

**Accion**: Agregar seccion en `Footer.tsx`

```
Ubicacion: Columna izquierda del footer (debajo del logo)
Campos: Input email + boton submit (flecha)
Backend: API route POST /api/newsletter o integracion con Mailchimp/Resend
Estilo: Input con border-2 border-white/10 rounded-xl + boton btn-primary pequeno
Texto: "Subscribe to our newsletter" / "Suscribete a nuestro newsletter"
```

---

## 6. PREDICTIVE SEARCH (Prioridad: Media)

**Imperium**: Modal de busqueda con resultados en tiempo real mientras escribes.

**Actualmente**: Solo hay un input de busqueda basico en /beats sin search real.

**Accion**: Crear `src/components/SearchModal.tsx`

```
Trigger: Icono de busqueda en Navbar (Lucide Search)
Comportamiento: Modal overlay con input + resultados en tiempo real
Backend: GET /api/beats?q={query} con busqueda por titulo
Resultados: Cards con imagen, titulo, precio
Debounce: 300ms
Estilo: Modal centrado, bg-[#0A0A0C], border border-white/10, rounded-xl
```

---

## 7. FILTROS AVANZADOS EN BEATS PAGE (Prioridad: Alta)

**Imperium**: Sidebar con filtro de disponibilidad + rango de precios + sort dropdown con 8 opciones.

**Actualmente**: Solo search text + genre dropdown.

**Accion**: Expandir filtros en `src/app/[locale]/beats/page.tsx`

```
Filtros a agregar:
  1. Price Range (slider o inputs min/max)
  2. Sort By dropdown:
     - Featured (default)
     - Best Selling
     - A-Z / Z-A
     - Price Low-High / High-Low
     - Newest / Oldest
  3. Availability (In Stock / All)
  4. Tags/Sub-genre filter (multi-select pills)

Layout: Sidebar izquierdo en desktop, drawer en mobile
Boton mobile: "Filter & Sort" que abre drawer
Reset: Boton "Clear All Filters"
```

---

## 8. PAGINACION (Prioridad: Media)

**Imperium**: Paginacion numerada en colecciones con 16+ productos.

**Actualmente**: Todos los beats se muestran en una sola pagina sin paginacion.

**Accion**: Crear `src/components/Pagination.tsx`

```
Props: currentPage, totalPages, onPageChange
Estilo: Numeros en circulos/pills, activo con bg-white text-black
Items por pagina: 12 o 16
URL params: ?page=2
Componente reutilizable para beats y portfolio
```

---

## 9. SALE BADGE SYSTEM (Prioridad: Baja)

**Imperium**: Badge "Oferta" (pill rojo) en productos con descuento, precio original tachado + precio de oferta.

**Actualmente**: Tags basicos (Hot/New/Free) sin sistema de precios con descuento.

**Accion**: Actualizar la entidad Beat y los cards

```
Campos en Beat entity:
  - compareAtPrice: number (precio original, nullable)
  - price: number (precio actual/de oferta)

Logica: Si compareAtPrice > price, mostrar:
  - Badge "Sale" (bg-red-600 text-white rounded-full)
  - Precio original tachado (line-through text-gray-500)
  - Precio de oferta (text-[#F9F9F9] font-bold)
```

---

## 10. HOVER IMAGE EN PRODUCT CARDS (Prioridad: Baja)

**Imperium**: Al hacer hover sobre un producto, se muestra una segunda imagen.

**Actualmente**: Sin imagenes reales en los beats (solo placeholders con icono Music).

**Accion**: Cuando se implementen imagenes reales para los beats:

```
Campo en Beat entity:
  - image: string (imagen principal)
  - hoverImage: string (imagen secundaria, opcional)

Comportamiento:
  - Default: muestra image
  - Hover: crossfade a hoverImage (opacity transition 300ms)
```

---

## 11. NAV ITEMS POR CATEGORIA (Prioridad: Baja)

**Imperium**: 8 items de navegacion, cada uno apuntando a una coleccion/categoria especifica.

**Actualmente**: 5 items genericos (Home, Beats, Services, Portfolio, Panel).

**Accion**: Cuando haya suficientes productos, considerar agregar sub-navegacion o dropdown por categoria:

```
Opciones:
  A) Dropdown "Beats" con subcategorias (Trap, R&B, Hip Hop, etc.)
  B) Mega menu con categorias + imagen destacada
  C) Mantener estructura actual (recomendado hasta tener 20+ beats)
```

---

## Orden de Implementacion Recomendado

### Sprint 1 - Esenciales
1. **Contact page** - Pagina basica con formulario
2. **Newsletter signup** - En footer
3. **Filtros avanzados** en beats page (sort + price range)
4. **Featured products grid** en homepage (desde DB)

### Sprint 2 - Mejoras UX
5. **Hero banner con imagen** (desde Contentful CMS)
6. **Paginacion** en beats y portfolio
7. **Predictive search** modal
8. **Announcement bar**

### Sprint 3 - Pulido
9. **Sale badge system** + precios con descuento
10. **Hover image** en product cards
11. **Nav por categorias** (cuando haya suficiente catalogo)

---

## Secciones donde Producer66 YA SUPERA a Imperium

| Feature | Producer66 | Imperium |
|---------|-----------|----------|
| Audio preview / player de beats | Pendiente pero planificado | No tiene |
| Testimonials section | Si | No |
| Services section con pricing | Si | No |
| Portfolio / showcase de trabajos | Si | No |
| i18n multilingue (en/es/it) | Si | Solo espanol |
| Auth moderna (Clerk + OAuth) | Si | Shopify basico |
| Admin panel | Si | Shopify admin (externo) |
| CMS flexible (Contentful) | Si | Shopify CMS (limitado) |
| Custom tech stack (Next.js 16) | Si | Shopify theme (limitado) |

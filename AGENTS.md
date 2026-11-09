# AGENTS.md — Guía para Agentes de IA (`quintanabedoya.com`)

Este repositorio contiene el sitio web personal de **Daniel André Quintana Bedoya** (**DevOps Architect | Cloud & Software Solutions Architect**), publicado en `https://quintanabedoya.com` mediante GitHub Pages.

---

## 1. Arquitectura del Proyecto

Sitio estático de alto rendimiento sin dependencias de compilación ni frameworks pesados, utilizando capacidades nativas de la plataforma web moderna:

- [`index.html`](index.html): Estructura semántica principal, metadatos SEO/Open Graph, datos estructurados `JSON-LD` (`Schema.org/Person`), consola interactiva de topología en el Hero, trayectoria profesional, matriz de capacidades técnicas y formación/certificaciones.
- [`css/site.css`](css/site.css): Sistema de diseño completo basado en Custom Properties, retícula arquitectónica (`1px` blueprint grid), soporte para modo oscuro (*Carbon Blueprint*, por defecto) y modo claro (*Technical Paper*), `text-wrap: balance`/`pretty` y diseño responsivo hasta `390px`.
- [`scripts/site.js`](scripts/site.js): Gestión de tema con persistencia en `localStorage`, interactividad accesible por clic y teclado (`role="tablist"`) para la consola de **Topología de Arquitectura en Producción**, e indicador activo de navegación por sección (`scroll spy`).
- [`CNAME`](CNAME) y [`.well-known/`](.well-known/): Configuración de dominio personalizado y verificación; **no modificar ni eliminar**.

---

## 2. Sistema de Diseño (*Systems Blueprint & Production Telemetry*)

Antes de realizar cualquier cambio visual o de interfaz, **es obligatorio leer y aplicar** el skill del proyecto ubicado en:
- [`.agents/skills/frontend-design/SKILL.md`](.agents/skills/frontend-design/SKILL.md)

### Reglas Estéticas y Tipográficas
1. **Identidad Visual**: Inspirada en planos de arquitectura de sistemas y telemetría de producción. Mantener la retícula visible de `1px` (`--border-grid`) y paneles estructurados en lugar de tarjetas flotantes genéricas.
2. **Prohibición de Clichés ("AI Slop")**:
   - No añadir esferas de gradiente difuminadas flotantes en el fondo ni efectos de neón giratorios.
   - No colorear palabras sueltas con gradientes dentro de los titulares (`<h1>`, `<h2>`).
   - No usar puntos medios (`·`) para unir cadenas de metadatos ni flechas (`→`) decorativas en botones.
   - No numerar secciones (`01`, `02`, `03`) salvo que representen una secuencia real de ejecución (como las 5 etapas del pipeline en la consola de topología).
3. **Tipografía**:
   - `--font-display` (`Space Grotesk`): Titulares, nombre y métricas principales.
   - `--font-sans` (`Plus Jakarta Sans`): Cuerpo de lectura y descripciones de logros (máximo `65ch–72ch` por línea).
   - `--font-mono` (`JetBrains Mono`): Reservada exclusivamente para fechas, telemetría, estados de pipeline y etiquetas de herramientas técnicas (`.mono-chip`).
4. **Fotografía de Perfil**: Mantener [`images/danielquintana-informal.jpg`](images/danielquintana-informal.jpg) dentro del marco técnico `.portrait-frame` con su tratamiento editorial de contraste/saturación.

---

## 3. Reglas de Privacidad y Contenido

- **Privacidad Estricta**: **Nunca** exponer la dirección de correo electrónico personal ni el número de teléfono/WhatsApp en el código HTML, CSS, JS ni en el bloque `JSON-LD`.
- **Canales Oficiales de Contacto**: Todo llamado a la acción de contacto debe dirigir exclusivamente a:
  - LinkedIn: `https://www.linkedin.com/in/danielquintanabedoya`
  - GitHub: `https://github.com/DanielQuintana90`
  - Blog técnico: `https://blog.quintanabedoya.com`

---

## 4. Verificación Antes de Hacer Commit

Cualquier modificación en [`index.html`](index.html), [`css/site.css`](css/site.css) o [`scripts/site.js`](scripts/site.js) debe verificarse comprobando:
1. Sintaxis limpia en JavaScript (`node --check scripts/site.js`) y balance de llaves en CSS.
2. Ausencia total de desbordamiento horizontal (`document.documentElement.scrollWidth <= window.innerWidth`) tanto en Desktop (`1440px`) como en Mobile (`390px`).
3. Contraste y legibilidad en ambos temas (`html.dark-mode` y modo claro).


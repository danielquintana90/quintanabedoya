// ==========================================================================
// SYSTEMS BLUEPRINT INTERACTIVITY — Daniel Quintana Bedoya
// ==========================================================================

(() => {
    // 1. Theme Persistence & Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    function applyTheme(theme) {
        if (theme === 'dark') {
            htmlElement.classList.add('dark-mode');
        } else {
            htmlElement.classList.remove('dark-mode');
        }
        try {
            localStorage.setItem('theme', theme);
        } catch (_) {
            // Ignore storage errors in restricted environments
        }
    }

    let initialTheme = 'dark';
    try {
        initialTheme = localStorage.getItem('theme') || 'dark';
    } catch (_) {}
    applyTheme(initialTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = htmlElement.classList.contains('dark-mode');
            applyTheme(isDark ? 'light' : 'dark');
        });
    }

    // 2. Interactive Production Topology Console
    const TOPOLOGY_DATA = {
        cicd: {
            layer: 'Capa 01 / Integración y Despliegue Continuo',
            metric: 'Impacto: Horas a minutos',
            heading: 'Estandarización de flujos CI/CD para más de 20 equipos de ingeniería',
            description:
                'Diseño y prototipado de pipelines reutilizables para microservicios, frontends, aplicaciones móviles y sistemas heredados desplegados en AWS, Azure y servidores On-Premise.',
            tags: ['GitLab CI', 'Jenkins', 'Azure DevOps', 'ArgoCD']
        },
        devsecops: {
            layer: 'Capa 02 / Seguridad y Calidad en Pipelines',
            metric: 'Control: SAST, Imágenes y Secretos',
            heading: 'Seguridad automatizada integrada en cada ejecución del pipeline',
            description:
                'Implementación de controles DevSecOps mediante análisis estático de código con SonarQube, escaneo de vulnerabilidades en contenedores con Trivy y gestión centralizada de secretos con HashiCorp Vault.',
            tags: ['SonarQube', 'Trivy', 'OWASP ZAP', 'HashiCorp Vault']
        },
        iac: {
            layer: 'Capa 03 / Infraestructura como Código y Cloud Híbrido',
            metric: 'Entornos: AWS, Azure y On-Premise',
            heading: 'Aprovisionamiento declarativo, reproducible y escalable en la nube',
            description:
                'Automatización de servicios de cómputo, redes, almacenamiento, mensajería y gestión de APIs con Terraform (incluyendo EKS, API Gateway, CloudFront, S3, ECR, SQS y SNS).',
            tags: ['Terraform', 'AWS', 'Microsoft Azure', 'API Gateway', 'CloudFront', 'S3 / ECR / SQS / SNS']
        },
        k8s: {
            layer: 'Capa 04 / Contenedores y Orquestación a Escala',
            metric: 'Arquitectura: Alta disponibilidad y HPA',
            heading: 'Orquestación de microservicios en Kubernetes con charts estandarizados',
            description:
                'Estandarización de contenedorización con Docker (multi-stage builds) y despliegue en Amazon EKS mediante charts reutilizables de Helm, políticas de autoescalado (HPA) e Ingress Controllers.',
            tags: ['Kubernetes (EKS)', 'Docker', 'Helm', 'HPA', 'Ingress Controllers']
        },
        observability: {
            layer: 'Capa 05 / Monitoreo, Telemetría y Observabilidad',
            metric: 'Cobertura: Dev, QA y Producción',
            heading: 'Visibilidad operativa y diagnóstico para más de 20 equipos ágiles',
            description:
                'Acompañamiento técnico y habilitación de monitoreo de métricas, tableros operativos y centralización de logs para garantizar despliegues observables y estables.',
            tags: ['Prometheus', 'Grafana', 'ELK Stack', 'Telemetría en Producción']
        }
    };

    const stageButtons = Array.from(document.querySelectorAll('.stage-node[data-stage]'));
    const layerEl = document.getElementById('inspector-layer');
    const metricEl = document.getElementById('inspector-metric');
    const headingEl = document.getElementById('inspector-heading');
    const descEl = document.getElementById('inspector-description');
    const tagsEl = document.getElementById('inspector-tags');

    function selectStage(stageKey, focusButton = false) {
        const data = TOPOLOGY_DATA[stageKey];
        if (!data) return;

        stageButtons.forEach((btn) => {
            const isSelected = btn.getAttribute('data-stage') === stageKey;
            btn.classList.toggle('active', isSelected);
            btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
            if (isSelected && focusButton) {
                btn.focus();
            }
        });

        if (layerEl) layerEl.textContent = data.layer;
        if (metricEl) metricEl.textContent = data.metric;
        if (headingEl) headingEl.textContent = data.heading;
        if (descEl) descEl.textContent = data.description;
        if (tagsEl) {
            tagsEl.innerHTML = data.tags
                .map((tag) => `<span class="mono-chip">${tag}</span>`)
                .join('');
        }
    }

    stageButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            selectStage(btn.getAttribute('data-stage'));
        });

        btn.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                const next = stageButtons[(index + 1) % stageButtons.length];
                selectStage(next.getAttribute('data-stage'), true);
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const prev = stageButtons[(index - 1 + stageButtons.length) % stageButtons.length];
                selectStage(prev.getAttribute('data-stage'), true);
            }
        });
    });

    // 3. Scroll Spy for Primary Navigation & Experience Sidebar Index
    const mainSections = Array.from(document.querySelectorAll('main > section[id]'));
    const navLinks = Array.from(document.querySelectorAll('.primary-nav .nav-link'));
    const expArticles = Array.from(document.querySelectorAll('.experience-entry[id]'));
    const timelineLinks = Array.from(document.querySelectorAll('.timeline-index .timeline-link'));

    function updateScrollSpy() {
        const scrollPosition = window.scrollY + 180;

        // Primary nav active state
        for (const section of mainSections) {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
                const id = section.getAttribute('id');
                navLinks.forEach((link) => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
                break;
            }
        }

        // Experience sidebar timeline active state
        for (const article of expArticles) {
            const top = article.offsetTop;
            const height = article.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
                const id = article.getAttribute('id');
                timelineLinks.forEach((link) => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
                break;
            }
        }
    }

    window.addEventListener('scroll', updateScrollSpy, { passive: true });
    updateScrollSpy();

    // 4. Dynamic Current Year
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
})();

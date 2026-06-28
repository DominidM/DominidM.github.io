import type { Project } from '../types';

export const projects: readonly Project[] = [
  {
    id: 'mkapu-erp',
    title: 'MKapu Import — ERP',
    description: 'ERP empresarial completo para importadora. Cubre cotizaciones, ventas, cuentas por cobrar, logística y caja en tiempo real. Arquitectura de microservicios hexagonal con NestJS, WebSockets, generación de PDF, envío automatizado por WhatsApp y correo.',
    techStack: ['Angular 21', 'NestJS', 'TypeScript', 'MySQL', 'WebSockets', 'Docker', 'REST API', 'PrimeNG'],
  },
  {
    id: 'mkapu-ecommerce',
    title: 'MKapu Import — E-commerce',
    description: 'Tienda online para empresa importadora con catálogo de productos, carrito de compras, pasarela de pagos y panel de administración. Integrado con ERP interno para sincronización de stock e inventario en tiempo real.',
    liveUrl: 'https://mkapu.com',
    techStack: ['Next.js', 'React', 'Cloudinary', 'REST API', 'WhatsApp API'],
  },
  {
    id: 'brostres',
    title: 'Brostr3s — ERP Pollería',
    description: 'ERP completo para gestión de pollería con módulos de pedidos, cocina en tiempo real, caja, inventario y reportes. Roles diferenciados: administrador, cajero y cocina. Comunicación en tiempo real vía WebSockets.',
    techStack: ['Next.js', 'React', 'Nest.js', 'TypeScript', 'MySQL', 'Docker', 'PrimeNG', 'REST API'],
  },
  {
    id: 'zonafade',
    title: 'Barbería Zona Fade — Landing & Reservas',
    description: 'Landing page con sistema de reservas online y catálogo de servicios para barbería. Agenda de citas con disponibilidad en tiempo real mediante Supabase Realtime y confirmación por WhatsApp.',
    liveUrl: 'https://sgaesthetix.solvegrades.workers.dev/home',
    techStack: ['Next.js', 'React', 'Supabase', 'Tailwind CSS'],
  },
  {
    id: 'asistencia-wiener',
    title: 'Sistema de Asistencia de Eventos',
    description: 'Plataforma web institucional para control y gestión de asistencia en eventos del personal universitario. Registro de usuarios, validación de accesos, control en tiempo real y reportes automatizados. Desplegado en Linux con Nginx.',
    liveUrl: 'https://calendardeeuwiener.kesug.com/index.php',
    techStack: ['PHP', 'MySQL', 'Nginx', 'API REST', 'HTML5', 'CSS3', 'JavaScript'],
  },
  {
    id: 'gasfiteria',
    title: 'E-commerce Gasfitería',
    description: 'Tienda online para venta de productos de gasfitería. Diseño UI/UX personalizado, APIs REST con operaciones CRUD y modelo de datos optimizado en PostgreSQL. Desplegado en Azure.',
    liveUrl: 'https://whc-ecommerce.solvegrades.workers.dev/inicio',
    techStack: ['React', 'Vite', 'Spring Boot', 'Java', 'PostgreSQL', 'Azure'],
  },
  {
    id: 'autovias-seguras',
    title: 'Policlínico Autovías Seguras',
    description: 'Landing page para policlínico especializado en exámenes médicos para licencias de conducir. Incluye formulario de contacto integrado con JavaMailSender para envío automático de datos a Gmail.',
    liveUrl: 'https://www.autoviasseguras.com',
    techStack: ['Spring Boot', 'Thymeleaf', 'Java', 'Azure', 'JavaMailSender'],
  },
  {
    id: 'codop',
    title: 'Codop — Admin Panel ERP',
    description: 'Panel administrativo para gestión de comunidad religiosa con múltiples sedes. Full-stack con arquitectura DDD, componentes reutilizables en React, APIs REST robustas y modelo de datos escalable en MySQL.',
    techStack: ['React', 'Node.js', 'Express', 'MySQL', 'DDD'],
  },
  {
    id: 'comunired',
    title: 'ComuniRed — Red Social de Reportes Ciudadanos',
    description: 'Red social para reportes ciudadanos dirigida a municipalidades. Comunicación en tiempo real con GraphQL, Apollo Client y MongoDB. Autenticación por roles (ciudadano, municipio) y feed de reportes geolocalizados con estado y seguimiento.',
    repoUrl: 'https://github.com/DominidM/ComuniRed_Frontend',
    repoBackendUrl: 'https://github.com/DominidM/ComuniRed_Backend',
    techStack: ['Angular', 'GraphQL', 'Apollo Client', 'Spring Boot', 'Node.js', 'MongoDB'],
  },
  {
    id: 'robotica',
    title: 'Dimsor — Robot Emocional con IA',
    description: 'Robot de apoyo emocional con inteligencia artificial y procesamiento de lenguaje natural. Dashboard web interactivo y sistema de alertas. Desarrollado con Raspberry Pi e IoT para detección de emociones en tiempo real.',
    repoUrl: 'https://github.com/DominidM/Robotica-Web',
    repoBackendUrl: 'https://github.com/DominidM/Robotica',
    techStack: ['Python', 'Raspberry Pi', 'Django', 'IoT', 'NLP', 'IA'],
  },
];

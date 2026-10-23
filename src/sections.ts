export interface Section {
  id: string;
  title: string;
  question: string;
  placeholder: string;
  hint?: string;
}

export const APP_TYPES = [
  "Web app",
  "API / backend",
  "App móvil",
  "CLI",
  "Script / automatización",
  "Extensión de navegador",
  "Otro",
] as const;

export const SECTIONS: Section[] = [
  {
    id: "objetivo",
    title: "Objetivo",
    question: "¿Qué problema resuelve esta aplicación y quién la va a usar?",
    placeholder: "Ej: una app para que freelancers registren horas facturables y generen reportes mensuales para sus clientes.",
  },
  {
    id: "stack",
    title: "Otros detalles de stack",
    question: "¿Algo más sobre el stack técnico? (framework backend, ORM, hosting, etc.)",
    placeholder: "Ej: backend en Express, ORM Prisma, hosting en Railway. Si ya quedó cubierto arriba, dejalo vacío.",
  },
  {
    id: "features",
    title: "Funcionalidades clave",
    question: "¿Cuáles son las funcionalidades imprescindibles para la primera versión?",
    placeholder: "Ej: login, crear/editar/borrar entradas de tiempo, exportar reporte en PDF.",
  },
  {
    id: "fuera_alcance",
    title: "Fuera de alcance",
    question: "¿Qué cosas NO debería incluir todavía (para evitar que se vaya de tema)?",
    placeholder: "Ej: no implementar pagos online ni notificaciones push en esta primera versión.",
  },
  {
    id: "usuarios",
    title: "Usuarios y autenticación",
    question: "¿Hay distintos tipos de usuario o roles? ¿Cómo se autentican?",
    placeholder: "Ej: un solo tipo de usuario, login con email/contraseña. O: sin autenticación, es de un solo usuario local.",
  },
  {
    id: "datos",
    title: "Datos y persistencia",
    question: "¿Cómo se deben guardar los datos?",
    placeholder: "Ej: base de datos SQLite local. O: todo en memoria/localStorage, no hace falta persistencia real.",
  },
  {
    id: "diseno",
    title: "Diseño / UI",
    question: "¿Tenés alguna preferencia de estilo visual o referencia de diseño?",
    placeholder: "Ej: minimalista, modo oscuro por defecto, inspirado en Linear/Notion. Si no importa, decilo también.",
  },
  {
    id: "integraciones",
    title: "Integraciones externas",
    question: "¿Necesita conectarse con alguna API o servicio externo?",
    placeholder: "Ej: ninguna por ahora. O: API de Stripe para pagos, API del clima, etc.",
  },
  {
    id: "calidad",
    title: "Testing y calidad",
    question: "¿Qué nivel de testing/calidad esperás?",
    placeholder: "Ej: no hace falta tests todavía, priorizar velocidad. O: tests unitarios para la lógica de negocio.",
  },
  {
    id: "deploy",
    title: "Entorno y deploy",
    question: "¿Dónde se va a correr/desplegar? ¿Hay restricciones de entorno?",
    placeholder: "Ej: solo correr localmente por ahora. O: deploy en Vercel, sin servidor propio.",
  },
  {
    id: "restricciones",
    title: "Restricciones adicionales",
    question: "¿Alguna otra restricción? (librerías a evitar, convenciones, presupuesto de tiempo)",
    placeholder: "Ej: evitar librerías con licencias pagas. Preferir código simple sin muchas dependencias.",
  },
];

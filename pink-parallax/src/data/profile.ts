// Fuente única de datos del perfil. Evita duplicar nombre, rol, CV y redes
// entre layout, navbar, hero, about y contacto.
export const profile = {
  fullName: 'Juan Dominid Muñoz Eslava',
  role: 'Desarrollador Backend',
  roleEn: 'Backend Developer',
  career: 'Ingeniería de Sistemas Computacionales',
  cycle: '10.º ciclo',
  email: 'dominidzero@gmail.com',
  phone: '(+51) 975 852 932',
  location: 'Lima, Perú',
  github: 'https://github.com/DominidM',
  linkedin: 'https://www.linkedin.com/in/dominid-mu%C3%B1oz-eslava-50b68828a/',
  company: 'https://solvegrades.com/',
  cvUrl: '/documents/Dominid-Munoz-Eslava-CV.pdf',
  cvFile: 'Dominid-Munoz-Eslava-CV.pdf',
  mainStack: ['Java', 'Spring Boot', 'NestJS', 'SQL'],
} as const;

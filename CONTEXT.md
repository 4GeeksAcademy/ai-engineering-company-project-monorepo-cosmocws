# CONTEXT.md — Nexova

## Hito 1: Sitio Web Público de tu Empresa

## Tu empresa

**Nexova** es una consultora de recursos humanos y adquisición de talento fundada en 2011, con sede en Valencia, España, y una oficina de expansión en Miami, Florida. Opera en tres líneas de negocio: headhunting ejecutivo y de mandos medios, outsourcing de equipos de atención al cliente para empresas tecnológicas, y formación corporativa en soft skills y liderazgo. Tiene aproximadamente 120 empleados y genera 8 millones de dólares en facturación anual. Sus clientes son principalmente empresas medianas de tecnología, retail y servicios financieros.

---

## Tu departamento y el problema que debes resolver

Trabajas en el equipo de **Marketing y Comunicaciones**, liderado por Carmen Ruiz. El sitio web corporativo de Nexova fue construido en 2019 y no ha tenido actualizaciones significativas. Es lento, no es accesible, y no refleja el posicionamiento actual de la empresa. Además, no existe un sistema para capturar leads: las personas interesadas en oportunidades laborales o servicios deben enviar un email genérico a <info@nexova.com>. Carmen necesita un sitio web moderno que presente profesionalmente los servicios de Nexova y capture información de candidatos potenciales de forma estructurada.

---

## Tu stakeholder

**Carmen Ruiz**, Head of Marketing

> Hola,
>
> Necesito que construyas nuestro nuevo sitio web corporativo. Debe tener una landing page que presente quiénes somos, qué hacemos, y por qué las empresas nos eligen para gestionar su talento. También necesito una página separada con un formulario para que profesionales interesados en oportunidades laborales puedan registrarse. Actualmente recibimos CVs por email sin ninguna estructura y es un caos. Quiero capturar: datos de contacto, experiencia profesional, sector de interés, nivel de inglés, y disponibilidad. El sitio debe ser responsive, accesible, y estar optimizado para SEO. Usa Tailwind para el diseño y asegúrate de que las validaciones del formulario funcionen correctamente.

---

## Alcance de idioma

- El soporte multiidioma es **opcional pero altamente recomendado** por la operación de Nexova entre España y Miami.
- Debes escoger un **idioma base** para toda la experiencia del sitio y del formulario.
- Si implementas un segundo idioma, trátalo como una mejora (sin reducir la calidad/completitud del idioma base).

## Contenido de la landing page

Tu landing page debe incluir las siguientes secciones, en este orden:

### Header

- Logo o nombre "Nexova"
- Navegación: Inicio | Servicios | Talento | Contacto

### Hero

- **Titular:** "Construimos equipos excepcionales para empresas en crecimiento"
- **Subtítulo:** "Consultora de recursos humanos y adquisición de talento con más de 10 años ayudando a empresas de tecnología, retail y servicios financieros a encontrar y desarrollar el mejor talento."
- **Call to action:** Botón "Únete a nuestro banco de talento" que enlace al formulario

### Servicios (3 columnas)

1. **Headhunting Ejecutivo**
   - Búsqueda y selección de perfiles ejecutivos y mandos medios
   - Proceso personalizado con garantía de reemplazo
2. **Outsourcing de Atención al Cliente**
   - Equipos especializados para empresas tecnológicas
   - Formación continua y supervisión dedicada

3. **Formación Corporativa**
   - Programas de soft skills y liderazgo
   - Cursos presenciales y en línea adaptados a cada organización

### Por qué Nexova (2 columnas)

- **12 años de experiencia** en el mercado latinoamericano
- **Presencia regional:** España y Estados Unidos
- **+500 procesos exitosos** de selección completados
- **Especialización sectorial** en tecnología, retail y finanzas

### Contacto

- Email: <contacto@nexova.com>
- Valencia: +34 960 123 456
- Miami: +1 305 555 0191

### Footer

- © 2025 Nexova. Todos los derechos reservados.
- LinkedIn | Instagram

---

## Campos del formulario de registro de talento

Tu formulario debe capturar la siguiente información:

| Campo                         | Tipo     | Validación                                                       | Obligatorio |
| ----------------------------- | -------- | ---------------------------------------------------------------- | ----------- |
| **Nombre completo**           | text     | Mínimo 2 palabras                                                | Sí          |
| **Email**                     | email    | Formato válido de email                                          | Sí          |
| **Teléfono**                  | tel      | Formato: +[código país] [número] (ej: +34 612 345 678)           | Sí          |
| **País de residencia**        | select   | España / Estados Unidos / Otro                                   | Sí          |
| **Años de experiencia**       | number   | Entre 0 y 50                                                     | Sí          |
| **Sector de interés**         | select   | Tecnología / Retail / Servicios Financieros / Consultoría / Otro | Sí          |
| **Nivel de inglés**           | select   | Básico / Intermedio / Avanzado / Nativo                          | Sí          |
| **Disponibilidad**            | radio    | Inmediata / 1 mes / 2-3 meses / Solo explorando                  | Sí          |
| **LinkedIn (URL del perfil)** | url      | Formato URL válido                                               | No          |
| **Comentarios adicionales**   | textarea | Máximo 500 caracteres                                            | No          |
| **Acepto política de datos**  | checkbox | Debe estar marcado para enviar                                   | Sí          |

---

## Validaciones específicas

1. **Email:** Debe validar que contenga @ y un dominio válido (ej: <usuario@dominio.com>)
2. **Teléfono:** Debe comenzar con + seguido del código de país
3. **Años de experiencia:** No puede ser negativo ni mayor a 50
4. **LinkedIn:** Si se proporciona, debe ser una URL válida (comenzar con http:// o https://)
5. **Comentarios:** Limitar a 500 caracteres con contador visible
6. **Política de datos:** El checkbox debe estar marcado; si no, mostrar error: "Debes aceptar la política de tratamiento de datos para continuar"

---

## Mensajes de error esperados

Cuando un campo no cumpla la validación, muestra estos mensajes específicos:

- **Nombre completo:** "El nombre debe contener al menos nombre y apellido"
- **Email:** "Ingresa un email válido (ejemplo: <nombre@empresa.com>)"
- **Teléfono:** "El teléfono debe incluir código de país (ejemplo: +34 612 345 678)"
- **País:** "Selecciona tu país de residencia"
- **Años de experiencia:** "Los años de experiencia deben estar entre 0 y 50"
- **Sector:** "Selecciona el sector de tu interés"
- **Nivel de inglés:** "Indica tu nivel de inglés"
- **Disponibilidad:** "Selecciona tu disponibilidad"
- **LinkedIn:** "Si incluyes LinkedIn, debe ser una URL válida"
- **Comentarios:** "Los comentarios no pueden exceder 500 caracteres (quedan X)"
- **Política de datos:** "Debes aceptar la política de tratamiento de datos para continuar"

---

## Mensaje de éxito

Cuando el formulario se valide correctamente (simular envío), mostrar:

> **¡Gracias por tu interés en Nexova!**
>
> Hemos recibido tu información. Nuestro equipo de selección la revisará y te contactaremos en caso de que tu perfil encaje con alguna de nuestras oportunidades actuales o futuras.
>
> Mientras tanto, síguenos en LinkedIn para estar al día de nuestras vacantes y contenido sobre desarrollo profesional.

---

## Restricción específica

El formulario está diseñado para **profesionales en búsqueda activa o pasiva de oportunidades laborales**, no para empresas que buscan contratar servicios de Nexova. Si un usuario pregunta sobre contratar servicios de headhunting o formación, el formulario debe incluir un mensaje visible que diga: "¿Eres una empresa buscando talento? Escríbenos a <contacto@nexova.com>"

---

## Schema.org markup requerido

Implementa el siguiente marcado Schema.org en tu landing page:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Nexova",
  "description": "Consultora de recursos humanos y adquisición de talento",
  "url": "https://nexova.com",
  "foundingDate": "2011",
  "address": [
    {
      "@type": "PostalAddress",
      "addressCountry": "ES",
      "addressLocality": "Valencia",
      "addressRegion": "Comunidad Valenciana"
    },
    {
      "@type": "PostalAddress",
      "addressCountry": "US",
      "addressLocality": "Miami",
      "addressRegion": "Florida"
    }
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+34-960-123-456",
    "contactType": "customer service",
    "availableLanguage": ["Spanish", "English"]
  },
  "sameAs": [
    "https://linkedin.com/company/nexova",
    "https://instagram.com/nexova"
  ]
}
```

**Hito 2: Fundamentos de Programación**  
**Empresa:** Nexova — Consultoría de Recursos Humanos y Adquisición de Talento  
**Tu Rol:** Ingeniero de IA Junior, Equipo de Nexova AI  
**Responsable del Proyecto:** Javier Almeida, Gerente de Operaciones

---

## Acerca de Nexova

Nexova es una firma de consultoría de recursos humanos y adquisición de talento con sede en Valencia, España, y operaciones de expansión en Miami, Florida. La empresa opera tres líneas de negocio: headhunting ejecutivo, outsourcing de equipos de soporte al cliente para empresas tecnológicas, y formación corporativa. Eres parte del equipo de Ingeniería de IA recientemente formado para modernizar las operaciones de Nexova.

---

## Tu Asignación

Javier Almeida, el Gerente de Operaciones, necesita que construyas la lógica central de procesamiento de datos para el sistema de gestión de candidatos de Nexova. Los 40 consultores de selección actualmente procesan todo manualmente — leyendo CVs, puntuando candidatos, haciendo matching con vacantes, y rastreando etapas del proceso. Este hito se enfoca en construir las funciones TypeScript que alimentarán el motor automatizado de scoring de candidatos y matching de vacantes.

Esto es programación pura — sin IA, sin prompting. Javier necesita ver que puedes escribir código sólido y bien tipado que maneje lógica de negocio real correctamente.

---

## Lo que Estás Construyendo

Implementarás un conjunto de utilidades TypeScript para:

1. **Modelar datos de candidatos y vacantes** usando interfaces
2. **Filtrar y buscar candidatos** por habilidades, experiencia y disponibilidad
3. **Puntuar candidatos** contra requisitos de vacantes
4. **Rankear candidatos** para una posición dada
5. **Generar reportes de selección** con métricas agregadas
6. **Validar datos** antes de procesarlos

---

## Entidades de Negocio

### Candidato (Candidate)

Un candidato en el sistema de Nexova representa una persona en la base de datos de talento. Cada candidato tiene:

**Interfaz: `Candidate`**

```typescript
interface Candidate {
  id: string; // Identificador único (ej: "C-2024-0451")
  fullName: string; // Nombre completo
  email: string; // Email de contacto
  phone: string; // Teléfono de contacto
  yearsOfExperience: number; // Años totales de experiencia profesional
  skills: string[]; // Array de habilidades (ej: ["TypeScript", "React", "Node.js"])
  englishLevel: EnglishLevel; // Nivel de inglés
  seniority: SeniorityLevel; // Nivel profesional
  currentSalary: number; // Salario actual en USD
  expectedSalary: number; // Salario esperado en USD
  availability: AvailabilityStatus; // Disponibilidad actual
  location: string; // Ciudad y país (ej: "Valencia, España")
  remoteOnly: boolean; // Solo acepta posiciones remotas
  status: CandidateStatus; // Estado actual en la base de datos
}

type EnglishLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Native";
type SeniorityLevel =
  | "Junior"
  | "Semi-Senior"
  | "Senior"
  | "Lead"
  | "Executive";
type AvailabilityStatus = "Immediate" | "2 weeks" | "1 month" | "Not available";
type CandidateStatus = "Active" | "In process" | "Hired" | "Inactive";
```

**Reglas de Validación:**

- `yearsOfExperience` debe ser >= 0 y <= 50
- `currentSalary` y `expectedSalary` deben ser > 0
- El array `skills` debe contener al menos 1 habilidad
- `email` debe ser un formato de email válido (verificación básica: contiene @ y .)
- `phone` no debe estar vacío

---

### Vacante (Vacancy)

Una vacante representa una posición abierta que Nexova está intentando cubrir para un cliente.

**Interfaz: `Vacancy`**

```typescript
interface Vacancy {
  id: string; // Identificador único (ej: "V-2024-0892")
  title: string; // Título del puesto (ej: "Senior Full-Stack Developer")
  companyName: string; // Nombre de la empresa cliente
  requiredSkills: string[]; // Habilidades técnicas requeridas
  preferredSkills: string[]; // Habilidades deseables
  minYearsExperience: number; // Experiencia mínima requerida
  maxYearsExperience: number; // Experiencia máxima relevante
  requiredEnglishLevel: EnglishLevel; // Nivel mínimo de inglés
  requiredSeniority: SeniorityLevel; // Nivel de seniority requerido
  salaryRangeMin: number; // Salario mínimo ofrecido (USD)
  salaryRangeMax: number; // Salario máximo ofrecido (USD)
  isRemote: boolean; // Posición remota
  location: string; // Ubicación de oficina si no es remota
  status: VacancyStatus; // Estado actual de la vacante
}

type VacancyStatus = "Open" | "In progress" | "Closed" | "On hold";
```

**Reglas de Validación:**

- `requiredSkills` debe contener al menos 1 habilidad
- `minYearsExperience` debe ser >= 0
- `maxYearsExperience` debe ser >= `minYearsExperience`
- `salaryRangeMax` debe ser >= `salaryRangeMin`
- Ambos valores de salario deben ser > 0

---

### Proceso de Selección (SelectionProcess)

Rastrea el progreso de un candidato a través de un proceso de selección de vacante.

**Interfaz: `SelectionProcess`**

```typescript
interface SelectionProcess {
  id: string; // Identificador único (ej: "SP-2024-1523")
  candidateId: string; // Referencia al candidato
  vacancyId: string; // Referencia a la vacante
  stage: ProcessStage; // Etapa actual
  score: number; // Puntaje de match (0-100)
  notes: string; // Notas del consultor
  createdAt: Date; // Fecha de inicio del proceso
  updatedAt: Date; // Fecha de última actualización
}

type ProcessStage =
  | "Screening"
  | "Interview"
  | "Technical test"
  | "Final interview"
  | "Offer"
  | "Rejected"
  | "Hired";
```

---

## Funciones Requeridas

Implementa estas funciones en los archivos apropiados según la estructura del README.

### 1. Operaciones de Colecciones (`src/utils/collections.ts`)

**`filterCandidatesBySkills(candidates: Candidate[], requiredSkills: string[]): Candidate[]`**

- Retorna candidatos que tienen TODAS las habilidades requeridas
- El matching de habilidades debe ser case-insensitive

**`filterCandidatesBySeniority(candidates: Candidate[], seniority: SeniorityLevel): Candidate[]`**

- Retorna candidatos con el nivel de seniority especificado

**`filterCandidatesByAvailability(candidates: Candidate[], availability: AvailabilityStatus[]): Candidate[]`**

- Retorna candidatos cuya disponibilidad coincida con cualquiera de los estados proporcionados

**`sortCandidatesBySalary(candidates: Candidate[], order: "asc" | "desc"): Candidate[]`**

- Retorna candidatos ordenados por salario esperado (ascendente o descendente)
- No debe mutar el array original

**`sortCandidatesByExperience(candidates: Candidate[], order: "asc" | "desc"): Candidate[]`**

- Retorna candidatos ordenados por años de experiencia
- No debe mutar el array original

---

### 2. Operaciones de Búsqueda (`src/utils/search.ts`)

**`findCandidateById(candidates: Candidate[], id: string): Candidate | null`**

- Realiza búsqueda lineal para encontrar un candidato por ID
- Retorna el candidato si se encuentra, null en caso contrario

**`findCandidateByEmail(candidates: Candidate[], email: string): Candidate | null`**

- Realiza búsqueda lineal para encontrar un candidato por email
- La comparación de email debe ser case-insensitive
- Retorna el candidato si se encuentra, null en caso contrario

**`binarySearchCandidateBySalary(sortedCandidates: Candidate[], targetSalary: number): number`**

- Asume que el array ya está ordenado por salario esperado (ascendente)
- Realiza búsqueda binaria para encontrar el índice de un candidato con el salario objetivo
- Retorna el índice si se encuentra, -1 en caso contrario
- Nota: Si múltiples candidatos tienen el mismo salario, retorna cualquier índice válido

---

### 3. Scoring y Matching (`src/utils/transformations.ts`)

**`calculateCandidateScore(candidate: Candidate, vacancy: Vacancy): number`**

Calcula un puntaje de match (0-100) entre un candidato y una vacante basado en:

- **Match de habilidades (40 puntos máx):**
  - +40 puntos si el candidato tiene TODAS las habilidades requeridas
  - +20 puntos si el candidato tiene al menos 50% de las habilidades requeridas
  - +10 puntos por cada habilidad preferida que tenga el candidato (máx +20)

- **Match de experiencia (20 puntos máx):**
  - +20 puntos si la experiencia del candidato está dentro del rango de la vacante
  - +10 puntos si el candidato está 1-2 años fuera del rango
  - 0 puntos si está más de 2 años fuera del rango

- **Match de seniority (15 puntos máx):**
  - +15 puntos por match exacto
  - +7 puntos si el candidato está un nivel arriba o abajo
  - 0 puntos en otro caso

- **Match de nivel de inglés (15 puntos máx):**
  - +15 puntos si el candidato cumple o excede el nivel requerido
  - 0 puntos en otro caso

- **Match de salario (10 puntos máx):**
  - +10 puntos si el salario esperado del candidato está dentro del rango de la vacante
  - +5 puntos si está hasta 20% por encima del máximo
  - 0 puntos si está más del 20% por encima

**`rankCandidatesForVacancy(candidates: Candidate[], vacancy: Vacancy): Array<{candidate: Candidate, score: number}>`**

- Puntúa todos los candidatos contra la vacante
- Los retorna ordenados por puntaje (más alto primero)
- Cada elemento contiene el candidato y su puntaje

**`groupCandidatesBySeniority(candidates: Candidate[]): Record<SeniorityLevel, Candidate[]>`**

- Agrupa candidatos por nivel de seniority
- Retorna un objeto donde las claves son niveles de seniority y los valores son arrays de candidatos

---

### 4. Agregaciones y Reportes (`src/utils/transformations.ts`)

**`countCandidatesByStatus(candidates: Candidate[]): Record<CandidateStatus, number>`**

- Retorna un conteo de candidatos para cada estado

**`calculateAverageSalary(candidates: Candidate[]): number`**

- Retorna el salario esperado promedio de todos los candidatos
- Redondear a 2 decimales

**`findTopSkills(candidates: Candidate[], topN: number): Array<{skill: string, count: number}>`**

- Encuentra las N habilidades más comunes entre todos los candidatos
- Las retorna ordenadas por frecuencia (más alta primero)
- Cada elemento contiene el nombre de la habilidad y cuántos candidatos la tienen

**`calculateVacancyFillRate(processes: SelectionProcess[]): number`**

- Calcula qué porcentaje de procesos terminaron en "Hired"
- Retorna un número entre 0 y 100, redondeado a 2 decimales

---

### 5. Validaciones (`src/utils/validations.ts`)

**`validateCandidate(candidate: Candidate): { valid: boolean, errors: string[] }`**

- Valida todas las reglas de negocio para un candidato
- Retorna un objeto con:
  - `valid`: true si todas las validaciones pasan, false en caso contrario
  - `errors`: array de mensajes de error (vacío si es válido)

**`validateVacancy(vacancy: Vacancy): { valid: boolean, errors: string[] }`**

- Valida todas las reglas de negocio para una vacante
- Retorna un objeto con:
  - `valid`: true si todas las validaciones pasan, false en caso contrario
  - `errors`: array de mensajes de error (vacío si es válido)

**`isValidEmail(email: string): boolean`**

- Retorna true si el email contiene @ y . en posiciones correctas
- Validación muy básica (no es de nivel producción)

---

## Datos de Ejemplo

Usa estos datos para probar tus funciones:

### Candidatos de Ejemplo

```typescript
const sampleCandidates: Candidate[] = [
  {
    id: "C-2024-0451",
    fullName: "María González",
    email: "maria.gonzalez@email.com",
    phone: "+56912345678",
    yearsOfExperience: 5,
    skills: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    englishLevel: "B2",
    seniority: "Semi-Senior",
    currentSalary: 3500,
    expectedSalary: 4200,
    availability: "1 month",
    location: "Valencia, España",
    remoteOnly: false,
    status: "Active",
  },
  {
    id: "C-2024-0452",
    fullName: "Juan Pérez",
    email: "juan.perez@email.com",
    phone: "+56987654321",
    yearsOfExperience: 3,
    skills: ["JavaScript", "React", "CSS", "HTML"],
    englishLevel: "B1",
    seniority: "Junior",
    currentSalary: 2200,
    expectedSalary: 2800,
    availability: "Immediate",
    location: "Miami, Florida, Estados Unidos",
    remoteOnly: true,
    status: "Active",
  },
  {
    id: "C-2024-0453",
    fullName: "Carolina Silva",
    email: "carolina.silva@email.com",
    phone: "+56911223344",
    yearsOfExperience: 8,
    skills: ["TypeScript", "Node.js", "PostgreSQL", "Docker", "AWS"],
    englishLevel: "C1",
    seniority: "Senior",
    currentSalary: 5500,
    expectedSalary: 6500,
    availability: "2 weeks",
    location: "Valencia, España",
    remoteOnly: false,
    status: "Active",
  },
];
```

### Vacante de Ejemplo

```typescript
const sampleVacancy: Vacancy = {
  id: "V-2024-0892",
  title: "Senior Full-Stack Developer",
  companyName: "TechCorp Solutions",
  requiredSkills: ["TypeScript", "React", "Node.js"],
  preferredSkills: ["PostgreSQL", "Docker"],
  minYearsExperience: 4,
  maxYearsExperience: 8,
  requiredEnglishLevel: "B2",
  requiredSeniority: "Senior",
  salaryRangeMin: 5000,
  salaryRangeMax: 7000,
  isRemote: true,
  location: "Remote",
  status: "Open",
};
```

---

## Criterios de Aceptación

Tu implementación será evaluada en:

1. **Type Safety:** Todas las interfaces definidas correctamente con tipos apropiados
2. **Corrección de Funciones:** Cada función produce el output esperado para los inputs dados
3. **Manejo de Casos Límite:** Las funciones manejan arrays vacíos, valores nulos y datos inválidos correctamente
4. **Lógica de Validación:** Las reglas de negocio se aplican con precisión
5. **Organización del Código:** Las funciones están en los archivos correctos según responsabilidad
6. **Convenciones de Nombres:** Variables, funciones y tipos siguen las convenciones de TypeScript
7. **Sin Mutaciones:** Las funciones de ordenamiento y filtrado no modifican los arrays originales
8. **Funciones Puras:** Las funciones solo trabajan con parámetros, sin variables globales

---

## Lo que Javier Espera

> "Mira, no necesito que esto sea perfecto. Necesito que funcione y sea mantenible. Los consultores van a usar estas funciones a través de una interfaz que construiremos después, pero primero necesito saber que la lógica es sólida. Dame código limpio en el que pueda confiar, y construiremos el resto encima."  
> — Javier Almeida, Gerente de Operaciones

---

## ¿Preguntas?

Si no estás seguro sobre algún requisito, pregunta a tu mentor/a. En un entorno de trabajo real, le escribirías a Javier por Slack .

---

_Este es un proyecto real de Nexova. Lo que construyas aquí se convertirá en parte del motor de scoring de candidatos en producción._
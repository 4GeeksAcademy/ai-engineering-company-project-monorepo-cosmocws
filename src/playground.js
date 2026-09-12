const sampleCandidates = [
  {
    id: "C-2024-0451",
    fullName: "Maria Gonzalez",
    email: "maria.gonzalez@email.com",
    phone: "+56912345678",
    yearsOfExperience: 5,
    skills: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    englishLevel: "B2",
    seniority: "Semi-Senior",
    currentSalary: 3500,
    expectedSalary: 4200,
    availability: "1 month",
    location: "Valencia, Espana",
    remoteOnly: false,
    status: "Active",
  },
  {
    id: "C-2024-0452",
    fullName: "Juan Perez",
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
    location: "Valencia, Espana",
    remoteOnly: false,
    status: "Active",
  },
];

const sampleVacancy = {
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

const sampleProcesses = [
  { stage: "Hired" },
  { stage: "Interview" },
  { stage: "Hired" },
];

const englishOrder = ["A1", "A2", "B1", "B2", "C1", "C2", "Native"];
const seniorityOrder = ["Junior", "Semi-Senior", "Senior", "Lead", "Executive"];

const normalize = (value) => String(value).trim().toLowerCase();
const roundTwo = (value) => Math.round(value * 100) / 100;

function filterCandidatesBySkills(candidates, requiredSkills) {
  const normalizedRequired = requiredSkills.map(normalize);
  return candidates.filter((candidate) => {
    const candidateSkills = new Set(candidate.skills.map(normalize));
    return normalizedRequired.every((skill) => candidateSkills.has(skill));
  });
}

function filterCandidatesByAvailability(candidates, availability) {
  const allowed = new Set(availability);
  return candidates.filter((candidate) => allowed.has(candidate.availability));
}

function sortCandidatesBySalary(candidates, order) {
  return [...candidates].sort((a, b) =>
    order === "asc" ? a.expectedSalary - b.expectedSalary : b.expectedSalary - a.expectedSalary
  );
}

function findCandidateById(candidates, id) {
  for (const candidate of candidates) {
    if (candidate.id === id) {
      return candidate;
    }
  }
  return null;
}

function findCandidateByEmail(candidates, email) {
  const normalizedEmail = normalize(email);
  for (const candidate of candidates) {
    if (normalize(candidate.email) === normalizedEmail) {
      return candidate;
    }
  }
  return null;
}

function binarySearchCandidateBySalary(sortedCandidates, targetSalary) {
  let left = 0;
  let right = sortedCandidates.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    const salary = sortedCandidates[middle].expectedSalary;

    if (salary === targetSalary) {
      return middle;
    }

    if (salary < targetSalary) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return -1;
}

function calculateCandidateScore(candidate, vacancy) {
  const candidateSkills = new Set(candidate.skills.map(normalize));
  const requiredSkills = vacancy.requiredSkills.map(normalize);
  const preferredSkills = [...new Set(vacancy.preferredSkills.map(normalize))];

  const requiredMatches = requiredSkills.filter((skill) => candidateSkills.has(skill)).length;
  let skillsScore = 0;

  if (requiredSkills.length === 0 || requiredMatches === requiredSkills.length) {
    skillsScore = 40;
  } else if (requiredMatches / requiredSkills.length >= 0.5) {
    skillsScore = 20;
  }

  const preferredMatches = preferredSkills.filter((skill) => candidateSkills.has(skill)).length;
  skillsScore = Math.min(skillsScore + preferredMatches * 10, 40);

  let experienceScore = 0;
  if (
    candidate.yearsOfExperience >= vacancy.minYearsExperience &&
    candidate.yearsOfExperience <= vacancy.maxYearsExperience
  ) {
    experienceScore = 20;
  } else {
    const belowRange = Math.max(vacancy.minYearsExperience - candidate.yearsOfExperience, 0);
    const aboveRange = Math.max(candidate.yearsOfExperience - vacancy.maxYearsExperience, 0);
    const distance = Math.max(belowRange, aboveRange);
    experienceScore = distance <= 2 ? 10 : 0;
  }

  let seniorityScore = 0;
  if (candidate.seniority === vacancy.requiredSeniority) {
    seniorityScore = 15;
  } else {
    const candidateIdx = seniorityOrder.indexOf(candidate.seniority);
    const requiredIdx = seniorityOrder.indexOf(vacancy.requiredSeniority);
    seniorityScore = Math.abs(candidateIdx - requiredIdx) === 1 ? 7 : 0;
  }

  const englishScore =
    englishOrder.indexOf(candidate.englishLevel) >= englishOrder.indexOf(vacancy.requiredEnglishLevel)
      ? 15
      : 0;

  let salaryScore = 0;
  if (
    candidate.expectedSalary >= vacancy.salaryRangeMin &&
    candidate.expectedSalary <= vacancy.salaryRangeMax
  ) {
    salaryScore = 10;
  } else if (
    candidate.expectedSalary > vacancy.salaryRangeMax &&
    candidate.expectedSalary <= vacancy.salaryRangeMax * 1.2
  ) {
    salaryScore = 5;
  }

  return Math.min(Math.max(skillsScore + experienceScore + seniorityScore + englishScore + salaryScore, 0), 100);
}

function rankCandidatesForVacancy(candidates, vacancy) {
  return candidates
    .map((candidate) => ({ candidate, score: calculateCandidateScore(candidate, vacancy) }))
    .sort((a, b) => b.score - a.score);
}

function calculateAverageSalary(candidates) {
  if (candidates.length === 0) {
    return 0;
  }
  const total = candidates.reduce((sum, candidate) => sum + candidate.expectedSalary, 0);
  return roundTwo(total / candidates.length);
}

function countCandidatesByStatus(candidates) {
  const counters = {
    Active: 0,
    "In process": 0,
    Hired: 0,
    Inactive: 0,
  };

  candidates.forEach((candidate) => {
    counters[candidate.status] += 1;
  });

  return counters;
}

function findTopSkills(candidates, topN) {
  const counter = new Map();
  candidates.forEach((candidate) => {
    const uniqueSkills = new Set(candidate.skills.map(normalize));
    uniqueSkills.forEach((skill) => {
      const current = counter.get(skill);
      if (current) {
        current.count += 1;
      } else {
        const originalSkill = candidate.skills.find((candidateSkill) => normalize(candidateSkill) === skill) || skill;
        counter.set(skill, { skill: originalSkill, count: 1 });
      }
    });
  });

  return Array.from(counter.values())
    .sort((a, b) => (b.count !== a.count ? b.count - a.count : a.skill.localeCompare(b.skill)))
    .slice(0, topN);
}

function calculateVacancyFillRate(processes) {
  if (processes.length === 0) {
    return 0;
  }
  const hiredCount = processes.filter((process) => process.stage === "Hired").length;
  return roundTwo((hiredCount / processes.length) * 100);
}

function renderResult(title, data) {
  const titleElement = document.getElementById("result-title");
  const outputElement = document.getElementById("result-output");

  titleElement.textContent = title;
  outputElement.textContent = JSON.stringify(data, null, 2);
}

function setupPlayground() {
  const skillInput = document.getElementById("skills-input");
  const availabilitySelect = document.getElementById("availability-select");
  const searchIdInput = document.getElementById("search-id");
  const searchEmailInput = document.getElementById("search-email");
  const binarySalaryInput = document.getElementById("binary-salary");

  document.getElementById("btn-filter-skills").addEventListener("click", () => {
    const skills = skillInput.value
      .split(",")
      .map((value) => value.trim())
      .filter((value) => value.length > 0);
    renderResult("Filtro por habilidades", filterCandidatesBySkills(sampleCandidates, skills));
  });

  document.getElementById("btn-filter-availability").addEventListener("click", () => {
    const values = Array.from(availabilitySelect.selectedOptions).map((option) => option.value);
    renderResult("Filtro por disponibilidad", filterCandidatesByAvailability(sampleCandidates, values));
  });

  document.getElementById("btn-sort-salary-asc").addEventListener("click", () => {
    renderResult("Orden por salario asc", sortCandidatesBySalary(sampleCandidates, "asc"));
  });

  document.getElementById("btn-sort-salary-desc").addEventListener("click", () => {
    renderResult("Orden por salario desc", sortCandidatesBySalary(sampleCandidates, "desc"));
  });

  document.getElementById("btn-search-id").addEventListener("click", () => {
    renderResult("Busqueda por ID", findCandidateById(sampleCandidates, searchIdInput.value));
  });

  document.getElementById("btn-search-email").addEventListener("click", () => {
    renderResult("Busqueda por email", findCandidateByEmail(sampleCandidates, searchEmailInput.value));
  });

  document.getElementById("btn-binary-salary").addEventListener("click", () => {
    const sorted = sortCandidatesBySalary(sampleCandidates, "asc");
    const salary = Number(binarySalaryInput.value);
    const index = binarySearchCandidateBySalary(sorted, salary);
    renderResult("Busqueda binaria por salario", { index, candidate: index >= 0 ? sorted[index] : null });
  });

  document.getElementById("btn-rank").addEventListener("click", () => {
    renderResult("Ranking para vacante", rankCandidatesForVacancy(sampleCandidates, sampleVacancy));
  });

  document.getElementById("btn-report").addEventListener("click", () => {
    renderResult("Reporte agregado", {
      averageSalary: calculateAverageSalary(sampleCandidates),
      byStatus: countCandidatesByStatus(sampleCandidates),
      topSkills: findTopSkills(sampleCandidates, 3),
      fillRate: calculateVacancyFillRate(sampleProcesses),
    });
  });
}

setupPlayground();

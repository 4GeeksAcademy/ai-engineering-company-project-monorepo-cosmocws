import type { Candidate, SelectionProcess, Vacancy } from "./types/models";
import {
  filterCandidatesByAvailability,
  filterCandidatesBySeniority,
  filterCandidatesBySkills,
  sortCandidatesByExperience,
  sortCandidatesBySalary,
} from "./utils/collections";
import {
  binarySearchCandidateBySalary,
  findCandidateByEmail,
  findCandidateById,
} from "./utils/search";
import {
  calculateAverageSalary,
  calculateCandidateScore,
  calculateVacancyFillRate,
  countCandidatesByStatus,
  findTopSkills,
  groupCandidatesBySeniority,
  rankCandidatesForVacancy,
} from "./utils/transformations";
import { isValidEmail, validateCandidate, validateVacancy } from "./utils/validations";

const sampleCandidates: Candidate[] = [
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

const sampleProcesses: SelectionProcess[] = [
  {
    id: "SP-1",
    candidateId: "C-2024-0451",
    vacancyId: "V-2024-0892",
    stage: "Hired",
    score: 88,
    notes: "Good fit",
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-20"),
  },
  {
    id: "SP-2",
    candidateId: "C-2024-0452",
    vacancyId: "V-2024-0892",
    stage: "Interview",
    score: 67,
    notes: "Pending",
    createdAt: new Date("2026-02-01"),
    updatedAt: new Date("2026-02-10"),
  },
  {
    id: "SP-3",
    candidateId: "C-2024-0453",
    vacancyId: "V-2024-0892",
    stage: "Hired",
    score: 94,
    notes: "Excellent fit",
    createdAt: new Date("2026-03-01"),
    updatedAt: new Date("2026-03-21"),
  },
];

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

function runQuickTests(): void {
  const bySkills: Candidate[] = filterCandidatesBySkills(sampleCandidates, ["typescript", "react"]);
  assert(bySkills.length === 1 && bySkills[0].id === "C-2024-0451", "filterCandidatesBySkills failed");

  const bySeniority: Candidate[] = filterCandidatesBySeniority(sampleCandidates, "Senior");
  assert(bySeniority.length === 1 && bySeniority[0].id === "C-2024-0453", "filterCandidatesBySeniority failed");

  const byAvailability: Candidate[] = filterCandidatesByAvailability(sampleCandidates, ["Immediate", "2 weeks"]);
  assert(byAvailability.length === 2, "filterCandidatesByAvailability failed");

  const sortedBySalaryAsc: Candidate[] = sortCandidatesBySalary(sampleCandidates, "asc");
  assert(sortedBySalaryAsc[0].expectedSalary === 2800, "sortCandidatesBySalary asc failed");

  const sortedByExperienceDesc: Candidate[] = sortCandidatesByExperience(sampleCandidates, "desc");
  assert(sortedByExperienceDesc[0].yearsOfExperience === 8, "sortCandidatesByExperience desc failed");

  const foundById: Candidate | null = findCandidateById(sampleCandidates, "C-2024-0452");
  assert(foundById?.fullName === "Juan Perez", "findCandidateById failed");

  const foundByEmail: Candidate | null = findCandidateByEmail(sampleCandidates, "MARIA.GONZALEZ@EMAIL.COM");
  assert(foundByEmail?.id === "C-2024-0451", "findCandidateByEmail failed");

  const binaryIndex: number = binarySearchCandidateBySalary(sortedBySalaryAsc, 4200);
  assert(binaryIndex >= 0, "binarySearchCandidateBySalary failed");

  const score: number = calculateCandidateScore(sampleCandidates[2], sampleVacancy);
  assert(score >= 0 && score <= 100, "calculateCandidateScore out of range");

  const ranking = rankCandidatesForVacancy(sampleCandidates, sampleVacancy);
  assert(ranking.length === 3, "rankCandidatesForVacancy failed");
  assert(ranking[0].score >= ranking[1].score, "rankCandidatesForVacancy sort order failed");

  const grouped = groupCandidatesBySeniority(sampleCandidates);
  assert(grouped.Senior.length === 1 && grouped.Junior.length === 1, "groupCandidatesBySeniority failed");

  const byStatus = countCandidatesByStatus(sampleCandidates);
  assert(byStatus.Active === 3, "countCandidatesByStatus failed");

  const averageSalary: number = calculateAverageSalary(sampleCandidates);
  assert(averageSalary === 4500, "calculateAverageSalary failed");

  const topSkills = findTopSkills(sampleCandidates, 2);
  assert(topSkills.length === 2 && topSkills[0].count >= topSkills[1].count, "findTopSkills failed");

  const fillRate = calculateVacancyFillRate(sampleProcesses);
  assert(fillRate === 66.67, "calculateVacancyFillRate failed");

  assert(isValidEmail("hello@domain.com"), "isValidEmail valid case failed");
  assert(!isValidEmail("invalid-email"), "isValidEmail invalid case failed");

  const validCandidateResult = validateCandidate(sampleCandidates[0]);
  assert(validCandidateResult.valid, "validateCandidate valid case failed");

  const invalidCandidateResult = validateCandidate({
    ...sampleCandidates[0],
    email: "bad-email",
    skills: [],
    currentSalary: 0,
    expectedSalary: -1,
    phone: "   ",
    yearsOfExperience: 55,
  });
  assert(!invalidCandidateResult.valid && invalidCandidateResult.errors.length >= 6, "validateCandidate invalid case failed");

  const validVacancyResult = validateVacancy(sampleVacancy);
  assert(validVacancyResult.valid, "validateVacancy valid case failed");

  const invalidVacancyResult = validateVacancy({
    ...sampleVacancy,
    requiredSkills: [],
    minYearsExperience: -1,
    maxYearsExperience: -2,
    salaryRangeMin: 0,
    salaryRangeMax: -1,
  });
  assert(!invalidVacancyResult.valid && invalidVacancyResult.errors.length >= 5, "validateVacancy invalid case failed");

  console.log("Quick tests passed.");
}

runQuickTests();

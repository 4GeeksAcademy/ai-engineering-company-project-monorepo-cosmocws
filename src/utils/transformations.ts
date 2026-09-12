import type {
  Candidate,
  CandidateStatus,
  EnglishLevel,
  RankedCandidate,
  SelectionProcess,
  SeniorityLevel,
  Vacancy,
} from "../types/models";

const englishLevelOrder: EnglishLevel[] = [
  "A1",
  "A2",
  "B1",
  "B2",
  "C1",
  "C2",
  "Native",
];

const seniorityLevelOrder: SeniorityLevel[] = [
  "Junior",
  "Semi-Senior",
  "Senior",
  "Lead",
  "Executive",
];

const normalizeText = (value: string): string => value.trim().toLowerCase();

const roundToTwoDecimals = (value: number): number => Math.round(value * 100) / 100;

function calculateSkillsScore(candidate: Candidate, vacancy: Vacancy): number {
  const candidateSkills: Set<string> = new Set(candidate.skills.map(normalizeText));
  const normalizedRequiredSkills: string[] = vacancy.requiredSkills.map(normalizeText);
  const normalizedPreferredSkills: string[] = vacancy.preferredSkills.map(normalizeText);

  const matchedRequiredSkillsCount: number = normalizedRequiredSkills.filter((skill: string) =>
    candidateSkills.has(skill)
  ).length;

  const requiredSkillsCount: number = normalizedRequiredSkills.length;

  let requiredSkillsScore: number = 0;

  if (requiredSkillsCount === 0 || matchedRequiredSkillsCount === requiredSkillsCount) {
    requiredSkillsScore = 40;
  } else if (matchedRequiredSkillsCount / requiredSkillsCount >= 0.5) {
    requiredSkillsScore = 20;
  }

  const uniquePreferredSkills: string[] = Array.from(new Set(normalizedPreferredSkills));
  const matchedPreferredSkillsCount: number = uniquePreferredSkills.filter((skill: string) =>
    candidateSkills.has(skill)
  ).length;

  const preferredSkillsScore: number = Math.min(matchedPreferredSkillsCount * 10, 20);

  // The context defines the skills section as 40 points max.
  return Math.min(requiredSkillsScore + preferredSkillsScore, 40);
}

function calculateExperienceScore(candidate: Candidate, vacancy: Vacancy): number {
  if (
    candidate.yearsOfExperience >= vacancy.minYearsExperience &&
    candidate.yearsOfExperience <= vacancy.maxYearsExperience
  ) {
    return 20;
  }

  const yearsBelowRange: number = Math.max(vacancy.minYearsExperience - candidate.yearsOfExperience, 0);
  const yearsAboveRange: number = Math.max(candidate.yearsOfExperience - vacancy.maxYearsExperience, 0);
  const distanceToRange: number = Math.max(yearsBelowRange, yearsAboveRange);

  if (distanceToRange <= 2) {
    return 10;
  }

  return 0;
}

function calculateSeniorityScore(candidate: Candidate, vacancy: Vacancy): number {
  if (candidate.seniority === vacancy.requiredSeniority) {
    return 15;
  }

  const candidateLevelIndex: number = seniorityLevelOrder.indexOf(candidate.seniority);
  const requiredLevelIndex: number = seniorityLevelOrder.indexOf(vacancy.requiredSeniority);

  if (Math.abs(candidateLevelIndex - requiredLevelIndex) === 1) {
    return 7;
  }

  return 0;
}

function calculateEnglishScore(candidate: Candidate, vacancy: Vacancy): number {
  const candidateLevelIndex: number = englishLevelOrder.indexOf(candidate.englishLevel);
  const requiredLevelIndex: number = englishLevelOrder.indexOf(vacancy.requiredEnglishLevel);

  if (candidateLevelIndex >= requiredLevelIndex) {
    return 15;
  }

  return 0;
}

function calculateSalaryScore(candidate: Candidate, vacancy: Vacancy): number {
  if (
    candidate.expectedSalary >= vacancy.salaryRangeMin &&
    candidate.expectedSalary <= vacancy.salaryRangeMax
  ) {
    return 10;
  }

  const acceptableOverSalary: number = vacancy.salaryRangeMax * 1.2;

  if (
    candidate.expectedSalary > vacancy.salaryRangeMax &&
    candidate.expectedSalary <= acceptableOverSalary
  ) {
    return 5;
  }

  return 0;
}

export function calculateCandidateScore(candidate: Candidate, vacancy: Vacancy): number {
  const totalScore: number =
    calculateSkillsScore(candidate, vacancy) +
    calculateExperienceScore(candidate, vacancy) +
    calculateSeniorityScore(candidate, vacancy) +
    calculateEnglishScore(candidate, vacancy) +
    calculateSalaryScore(candidate, vacancy);

  return Math.min(Math.max(totalScore, 0), 100);
}

export function rankCandidatesForVacancy(
  candidates: Candidate[],
  vacancy: Vacancy
): RankedCandidate[] {
  const rankedCandidates: RankedCandidate[] = candidates.map((candidate: Candidate) => ({
    candidate,
    score: calculateCandidateScore(candidate, vacancy),
  }));

  rankedCandidates.sort(
    (leftCandidate: RankedCandidate, rightCandidate: RankedCandidate) =>
      rightCandidate.score - leftCandidate.score
  );

  return rankedCandidates;
}

export function groupCandidatesBySeniority(
  candidates: Candidate[]
): Record<SeniorityLevel, Candidate[]> {
  const groupedCandidates: Record<SeniorityLevel, Candidate[]> = {
    Junior: [],
    "Semi-Senior": [],
    Senior: [],
    Lead: [],
    Executive: [],
  };

  for (const candidate of candidates) {
    groupedCandidates[candidate.seniority].push(candidate);
  }

  return groupedCandidates;
}

export function countCandidatesByStatus(
  candidates: Candidate[]
): Record<CandidateStatus, number> {
  const candidatesByStatus: Record<CandidateStatus, number> = {
    Active: 0,
    "In process": 0,
    Hired: 0,
    Inactive: 0,
  };

  for (const candidate of candidates) {
    candidatesByStatus[candidate.status] += 1;
  }

  return candidatesByStatus;
}

export function calculateAverageSalary(candidates: Candidate[]): number {
  if (candidates.length === 0) {
    return 0;
  }

  const totalExpectedSalary: number = candidates.reduce(
    (accumulatedSalary: number, candidate: Candidate) =>
      accumulatedSalary + candidate.expectedSalary,
    0
  );

  return roundToTwoDecimals(totalExpectedSalary / candidates.length);
}

export function findTopSkills(
  candidates: Candidate[],
  topN: number
): Array<{ skill: string; count: number }> {
  if (topN <= 0) {
    return [];
  }

  const skillsCounter: Map<string, { skill: string; count: number }> = new Map();

  for (const candidate of candidates) {
    const uniqueSkillsPerCandidate: Set<string> = new Set(candidate.skills.map(normalizeText));

    for (const normalizedSkill of uniqueSkillsPerCandidate) {
      const existingSkillEntry: { skill: string; count: number } | undefined =
        skillsCounter.get(normalizedSkill);

      if (existingSkillEntry !== undefined) {
        existingSkillEntry.count += 1;
      } else {
        const originalSkillName: string =
          candidate.skills.find(
            (skill: string) => normalizeText(skill) === normalizedSkill
          ) ?? normalizedSkill;

        skillsCounter.set(normalizedSkill, {
          skill: originalSkillName,
          count: 1,
        });
      }
    }
  }

  return Array.from(skillsCounter.values())
    .sort((leftSkill, rightSkill) => {
      if (rightSkill.count !== leftSkill.count) {
        return rightSkill.count - leftSkill.count;
      }

      return leftSkill.skill.localeCompare(rightSkill.skill);
    })
    .slice(0, topN);
}

export function calculateVacancyFillRate(processes: SelectionProcess[]): number {
  if (processes.length === 0) {
    return 0;
  }

  const hiredProcessesCount: number = processes.filter(
    (process: SelectionProcess) => process.stage === "Hired"
  ).length;

  const fillRate: number = (hiredProcessesCount / processes.length) * 100;
  return roundToTwoDecimals(fillRate);
}

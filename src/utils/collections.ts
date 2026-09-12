import type {
  AvailabilityStatus,
  Candidate,
  SeniorityLevel,
} from "../types/models";

const normalizeText = (value: string): string => value.trim().toLowerCase();

export function filterCandidatesBySkills(
  candidates: Candidate[],
  requiredSkills: string[]
): Candidate[] {
  const normalizedRequiredSkills: string[] = requiredSkills.map(normalizeText);

  return candidates.filter((candidate: Candidate) => {
    const candidateSkills: Set<string> = new Set(candidate.skills.map(normalizeText));
    return normalizedRequiredSkills.every((requiredSkill: string) =>
      candidateSkills.has(requiredSkill)
    );
  });
}

export function filterCandidatesBySeniority(
  candidates: Candidate[],
  seniority: SeniorityLevel
): Candidate[] {
  return candidates.filter((candidate: Candidate) => candidate.seniority === seniority);
}

export function filterCandidatesByAvailability(
  candidates: Candidate[],
  availability: AvailabilityStatus[]
): Candidate[] {
  if (availability.length === 0) {
    return [];
  }

  const allowedAvailability: Set<AvailabilityStatus> = new Set(availability);
  return candidates.filter((candidate: Candidate) =>
    allowedAvailability.has(candidate.availability)
  );
}

export function sortCandidatesBySalary(
  candidates: Candidate[],
  order: "asc" | "desc"
): Candidate[] {
  const sortedCandidates: Candidate[] = [...candidates];

  sortedCandidates.sort((leftCandidate: Candidate, rightCandidate: Candidate) => {
    const salaryDifference: number = leftCandidate.expectedSalary - rightCandidate.expectedSalary;
    return order === "asc" ? salaryDifference : -salaryDifference;
  });

  return sortedCandidates;
}

export function sortCandidatesByExperience(
  candidates: Candidate[],
  order: "asc" | "desc"
): Candidate[] {
  const sortedCandidates: Candidate[] = [...candidates];

  sortedCandidates.sort((leftCandidate: Candidate, rightCandidate: Candidate) => {
    const experienceDifference: number =
      leftCandidate.yearsOfExperience - rightCandidate.yearsOfExperience;
    return order === "asc" ? experienceDifference : -experienceDifference;
  });

  return sortedCandidates;
}

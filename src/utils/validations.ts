import type { Candidate, Vacancy } from "../types/models";

const normalizeText = (value: string): string => value.trim();

export function isValidEmail(email: string): boolean {
  const normalizedEmail: string = normalizeText(email);
  const atSymbolIndex: number = normalizedEmail.indexOf("@");
  const dotSymbolIndex: number = normalizedEmail.lastIndexOf(".");

  if (atSymbolIndex <= 0) {
    return false;
  }

  if (dotSymbolIndex <= atSymbolIndex + 1) {
    return false;
  }

  if (dotSymbolIndex === normalizedEmail.length - 1) {
    return false;
  }

  return true;
}

export function validateCandidate(candidate: Candidate): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (candidate.yearsOfExperience < 0 || candidate.yearsOfExperience > 50) {
    errors.push("yearsOfExperience must be between 0 and 50.");
  }

  if (candidate.currentSalary <= 0) {
    errors.push("currentSalary must be greater than 0.");
  }

  if (candidate.expectedSalary <= 0) {
    errors.push("expectedSalary must be greater than 0.");
  }

  if (candidate.skills.length < 1) {
    errors.push("skills must contain at least one skill.");
  }

  if (!isValidEmail(candidate.email)) {
    errors.push("email must be a valid email address.");
  }

  if (normalizeText(candidate.phone).length === 0) {
    errors.push("phone must not be empty.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateVacancy(vacancy: Vacancy): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (vacancy.requiredSkills.length < 1) {
    errors.push("requiredSkills must contain at least one skill.");
  }

  if (vacancy.minYearsExperience < 0) {
    errors.push("minYearsExperience must be greater than or equal to 0.");
  }

  if (vacancy.maxYearsExperience < vacancy.minYearsExperience) {
    errors.push("maxYearsExperience must be greater than or equal to minYearsExperience.");
  }

  if (vacancy.salaryRangeMin <= 0) {
    errors.push("salaryRangeMin must be greater than 0.");
  }

  if (vacancy.salaryRangeMax <= 0) {
    errors.push("salaryRangeMax must be greater than 0.");
  }

  if (vacancy.salaryRangeMax < vacancy.salaryRangeMin) {
    errors.push("salaryRangeMax must be greater than or equal to salaryRangeMin.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

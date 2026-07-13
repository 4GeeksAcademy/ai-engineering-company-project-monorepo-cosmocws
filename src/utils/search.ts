import type { Candidate } from "../types/models";

const normalizeText = (value: string): string => value.trim().toLowerCase();

export function findCandidateById(candidates: Candidate[], id: string): Candidate | null {
  for (const candidate of candidates) {
    if (candidate.id === id) {
      return candidate;
    }
  }

  return null;
}

export function findCandidateByEmail(candidates: Candidate[], email: string): Candidate | null {
  const normalizedEmail: string = normalizeText(email);

  for (const candidate of candidates) {
    if (normalizeText(candidate.email) === normalizedEmail) {
      return candidate;
    }
  }

  return null;
}

export function binarySearchCandidateBySalary(
  sortedCandidates: Candidate[],
  targetSalary: number
): number {
  let leftIndex: number = 0;
  let rightIndex: number = sortedCandidates.length - 1;

  while (leftIndex <= rightIndex) {
    const middleIndex: number = Math.floor((leftIndex + rightIndex) / 2);
    const currentSalary: number = sortedCandidates[middleIndex].expectedSalary;

    if (currentSalary === targetSalary) {
      return middleIndex;
    }

    if (currentSalary < targetSalary) {
      leftIndex = middleIndex + 1;
    } else {
      rightIndex = middleIndex - 1;
    }
  }

  return -1;
}

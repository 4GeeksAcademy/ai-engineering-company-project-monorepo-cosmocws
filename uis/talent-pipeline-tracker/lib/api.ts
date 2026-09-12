import type {
  Candidate,
  CandidateNote,
  CandidatePayload,
  CandidatesResponse,
  NotesResponse,
} from "@/types/records";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function getApiUrl() {
  if (!API_URL) {
    throw new Error("Falta configurar NEXT_PUBLIC_API_URL.");
  }

  return API_URL;
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${getApiUrl()}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });

  if (!response.ok) {
    throw new Error("No se pudo completar la operación. Inténtalo de nuevo.");
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function getCandidates(filters: {
  status?: string;
  stage?: string;
  search?: string;
}) {
  const parameters = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) parameters.set(key, value);
  });
  const query = parameters.toString();

  return request<CandidatesResponse>(`/records${query ? `?${query}` : ""}`);
}

export function getCandidate(id: string) {
  return request<Candidate>(`/records/${id}`);
}

export function createCandidate(payload: CandidatePayload) {
  return request<Candidate>("/records", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateCandidate(id: string, payload: CandidatePayload) {
  return request<Candidate>(`/records/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function patchCandidate(
  id: string,
  payload: Partial<Pick<Candidate, "status" | "stage">>,
) {
  return request<Candidate>(`/records/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function getNotes(id: string) {
  return request<NotesResponse>(`/records/${id}/notes`).then((response) => response.data);
}

export function createNote(id: string, content: string) {
  return request<CandidateNote>(`/records/${id}/notes`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}

export function deleteNote(recordId: string, noteId: string) {
  return request<void>(`/records/${recordId}/notes/${noteId}`, { method: "DELETE" });
}
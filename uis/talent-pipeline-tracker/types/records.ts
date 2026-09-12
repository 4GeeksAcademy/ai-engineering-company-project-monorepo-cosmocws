export const STATUS_LABELS = {
  received: "Recibida",
  in_progress: "En proceso",
  selected: "Seleccionada",
  discarded: "Descartada",
} as const;

export const STAGE_LABELS = {
  pending: "Pendiente de revisión",
  review: "En revisión",
  personal_interview: "Entrevista personal",
  technical_interview: "Entrevista técnica",
  offer_presented: "Oferta presentada",
} as const;

export type RecordStatus = keyof typeof STATUS_LABELS;
export type RecordStage = keyof typeof STAGE_LABELS;

export interface CandidateNote {
  id: string;
  record_id: string;
  content: string;
  created_at: string;
}

export interface Candidate {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  position: string;
  linkedin_url: string | null;
  cv_url: string | null;
  status: RecordStatus;
  stage: RecordStage;
  experience_years: number;
  notes_count: number;
  applied_at: string;
  updated_at: string;
  notes?: CandidateNote[];
}

export interface CandidatePayload {
  full_name: string;
  email: string;
  phone: string;
  position: string;
  linkedin_url?: string;
  cv_url?: string;
  experience_years: number;
}

export interface CandidatesResponse {
  total: number;
  page: number;
  limit: number;
  data: Candidate[];
}

export interface NotesResponse {
  data: CandidateNote[];
  meta: Record<string, unknown>;
}
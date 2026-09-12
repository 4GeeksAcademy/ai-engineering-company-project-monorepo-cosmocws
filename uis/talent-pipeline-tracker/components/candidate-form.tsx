"use client";

import { useState } from "react";
import type { Candidate, CandidatePayload } from "@/types/records";

type CandidateFormProps = {
  candidate?: Candidate;
  onSubmit: (payload: CandidatePayload) => Promise<void>;
  submitLabel: string;
  title: string;
};

export function CandidateForm({ candidate, onSubmit, submitLabel, title }: CandidateFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(formData: FormData) {
    const payload: CandidatePayload = {
      full_name: String(formData.get("full_name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      position: String(formData.get("position") ?? "").trim(),
      linkedin_url: String(formData.get("linkedin_url") ?? "").trim() || undefined,
      cv_url: String(formData.get("cv_url") ?? "").trim() || undefined,
      experience_years: Number(formData.get("experience_years")),
    };

    setIsSubmitting(true);
    setError("");
    try {
      await onSubmit(payload);
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "No se pudo guardar la candidatura.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mb-6 rounded-lg border border-slate-200 bg-white p-5" aria-labelledby="candidate-form-title">
      <h2 id="candidate-form-title" className="text-xl font-bold text-slate-950">{title}</h2>
      {error && <p className="notice-error mt-4" role="alert">{error}</p>}
      <form action={handleSubmit} className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="field-label">Nombre completo<input className="field" name="full_name" defaultValue={candidate?.full_name} required /></label>
        <label className="field-label">Email<input className="field" name="email" type="email" defaultValue={candidate?.email} required /></label>
        <label className="field-label">Teléfono<input className="field" name="phone" type="tel" defaultValue={candidate?.phone} required /></label>
        <label className="field-label">Puesto<input className="field" name="position" defaultValue={candidate?.position ?? "Asistente de Dirección"} required /></label>
        <label className="field-label">LinkedIn<input className="field" name="linkedin_url" type="url" defaultValue={candidate?.linkedin_url ?? ""} /></label>
        <label className="field-label">Enlace al CV<input className="field" name="cv_url" type="url" defaultValue={candidate?.cv_url ?? ""} /></label>
        <label className="field-label">Años de experiencia<input className="field" name="experience_years" type="number" min="0" defaultValue={candidate?.experience_years} required /></label>
        <div className="flex items-end"><button className="button-primary w-full md:w-auto" type="submit" disabled={isSubmitting}>{isSubmitting ? "Guardando..." : submitLabel}</button></div>
      </form>
    </section>
  );
}
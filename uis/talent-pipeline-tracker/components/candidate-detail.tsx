"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { CandidateForm } from "@/components/candidate-form";
import { createNote, deleteNote, getCandidate, getNotes, patchCandidate, updateCandidate } from "@/lib/api";
import { STAGE_LABELS, STATUS_LABELS, type Candidate, type CandidateNote, type CandidatePayload, type RecordStage, type RecordStatus } from "@/types/records";

export function CandidateDetail({ id }: { id: string }) {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [notes, setNotes] = useState<CandidateNote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const loadDetail = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const [record, recordNotes] = await Promise.all([getCandidate(id), getNotes(id)]);
      setCandidate(record);
      setNotes(recordNotes);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "No se pudo cargar la candidatura.");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadDetail(), 0);
    return () => window.clearTimeout(timer);
  }, [loadDetail]);

  async function updateField(field: "status" | "stage", value: string) {
    setIsUpdating(true);
    setFeedback("");
    try {
      const payload = field === "status" ? { status: value as RecordStatus } : { stage: value as RecordStage };
      setCandidate(await patchCandidate(id, payload));
      setFeedback(`${field === "status" ? "El estado" : "La etapa"} se ha actualizado.`);
    } catch (updateError) {
      setFeedback(updateError instanceof Error ? updateError.message : "No se pudo actualizar la candidatura.");
    } finally { setIsUpdating(false); }
  }

  async function handleEdit(payload: CandidatePayload) {
    setCandidate(await updateCandidate(id, payload));
    setShowEdit(false);
    setFeedback("Los datos de la candidatura se han actualizado.");
  }

  async function handleAddNote(formData: FormData) {
    const content = String(formData.get("content") ?? "").trim();
    if (!content) return;
    setIsAddingNote(true);
    try {
      const note = await createNote(id, content);
      setNotes((current) => [note, ...current]);
      setFeedback("La nota interna se ha añadido.");
    } catch (noteError) {
      setFeedback(noteError instanceof Error ? noteError.message : "No se pudo añadir la nota.");
    } finally { setIsAddingNote(false); }
  }

  async function handleDeleteNote(noteId: string) {
    try {
      await deleteNote(id, noteId);
      setNotes((current) => current.filter((note) => note.id !== noteId));
      setFeedback("La nota interna se ha eliminado.");
    } catch (noteError) {
      setFeedback(noteError instanceof Error ? noteError.message : "No se pudo eliminar la nota.");
    }
  }

  if (isLoading) return <main className="mx-auto max-w-4xl p-6" role="status">Cargando candidatura...</main>;
  if (error) return <main className="mx-auto max-w-4xl p-6"><p className="notice-error" role="alert">{error}</p><button className="button-primary mt-4" onClick={() => void loadDetail()}>Reintentar</button></main>;
  if (!candidate) return null;

  const details = [["Email", candidate.email], ["Teléfono", candidate.phone], ["Puesto", candidate.position], ["LinkedIn", candidate.linkedin_url], ["Enlace al CV", candidate.cv_url], ["Años de experiencia", String(candidate.experience_years)], ["Fecha de aplicación", new Date(candidate.applied_at).toLocaleDateString("es-ES")]];
  return <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6">
    <Link href="/" className="text-sm font-semibold text-teal-700 hover:underline">Volver al listado</Link>
    <header className="mt-5 border-b border-slate-200 pb-6"><p className="text-sm font-semibold uppercase tracking-[0.12em] text-teal-700">Candidatura · Asistente de Dirección</p><h1 className="mt-1 text-3xl font-bold text-slate-950">{candidate.full_name}</h1></header>
    {feedback && <p className="notice-success mt-5" role="status">{feedback}</p>}
    <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5"><h2 className="text-xl font-bold text-slate-950">Estado del proceso</h2><div className="mt-4 grid gap-4 sm:grid-cols-2"><label className="field-label">Estado<select className="field" value={candidate.status} disabled={isUpdating} onChange={(event) => void updateField("status", event.target.value)}>{Object.entries(STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><label className="field-label">Etapa<select className="field" value={candidate.stage} disabled={isUpdating} onChange={(event) => void updateField("stage", event.target.value)}>{Object.entries(STAGE_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label></div></section>
    <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5"><div className="flex items-center justify-between gap-4"><h2 className="text-xl font-bold text-slate-950">Datos de candidatura</h2><button className="link-button" onClick={() => setShowEdit((visible) => !visible)}>{showEdit ? "Cancelar edición" : "Editar datos"}</button></div><dl className="mt-4 grid gap-4 sm:grid-cols-2">{details.map(([label, value]) => <div key={label}><dt className="text-sm font-medium text-slate-500">{label}</dt><dd className="mt-1 text-slate-800">{value || "No disponible"}</dd></div>)}</dl></section>
    {showEdit && <div className="mt-6"><CandidateForm candidate={candidate} title="Editar candidatura" submitLabel="Guardar cambios" onSubmit={handleEdit} /></div>}
    <section className="mt-6 rounded-lg border border-slate-200 bg-white p-5"><h2 className="text-xl font-bold text-slate-950">Notas internas</h2><form action={handleAddNote} className="mt-4 flex flex-col gap-3"><label className="field-label">Nueva nota<textarea className="field min-h-24" name="content" required /></label><button className="button-primary self-start" disabled={isAddingNote}>{isAddingNote ? "Añadiendo..." : "Añadir nota"}</button></form><ul className="mt-6 divide-y divide-slate-200">{notes.map((note) => <li className="py-4" key={note.id}><div className="flex justify-between gap-4"><div><p className="whitespace-pre-wrap text-slate-800">{note.content}</p><p className="mt-1 text-sm text-slate-500">{new Date(note.created_at).toLocaleDateString("es-ES")}</p></div><button className="link-button text-red-700" onClick={() => void handleDeleteNote(note.id)}>Eliminar</button></div></li>)}</ul>{notes.length === 0 && <p className="mt-5 text-slate-600">No hay notas internas para esta candidatura.</p>}</section>
  </main>;
}
"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState, useTransition } from "react";
import { CandidateForm } from "@/components/candidate-form";
import { createCandidate, getCandidates } from "@/lib/api";
import { STAGE_LABELS, STATUS_LABELS, type Candidate, type CandidatePayload } from "@/types/records";

function CandidateList() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [success, setSuccess] = useState("");
  const [, startTransition] = useTransition();
  const status = searchParams.get("status") ?? "";
  const stage = searchParams.get("stage") ?? "";
  const search = searchParams.get("search") ?? "";

  const loadCandidates = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      setCandidates((await getCandidates({ status, stage, search })).data);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "No se pudieron cargar las candidaturas.");
    } finally { setIsLoading(false); }
  }, [search, stage, status]);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadCandidates(), 0);
    return () => window.clearTimeout(timer);
  }, [loadCandidates]);

  function updateFilter(name: string, value: string) {
    const parameters = new URLSearchParams(searchParams.toString());
    if (value) parameters.set(name, value); else parameters.delete(name);
    startTransition(() => router.replace(`${pathname}${parameters.size ? `?${parameters}` : ""}`));
  }

  async function handleCreate(payload: CandidatePayload) {
    await createCandidate(payload);
    setShowForm(false);
    setSuccess("La candidatura se ha registrado correctamente.");
    await loadCandidates();
  }

  return <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
    <header className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-semibold uppercase tracking-[0.12em] text-teal-700">People & Talent</p><h1 className="mt-1 text-3xl font-bold text-slate-950">Pipeline de candidaturas</h1><p className="mt-2 text-slate-600">Asistente de Dirección · Sede de Valencia</p></div><button className="button-primary" onClick={() => setShowForm((visible) => !visible)}>{showForm ? "Cerrar formulario" : "Registrar candidatura"}</button></header>
    {success && <p className="notice-success" role="status">{success}</p>}
    {showForm && <CandidateForm title="Nueva candidatura" submitLabel="Registrar candidatura" onSubmit={handleCreate} />}
    <section aria-label="Filtros de candidaturas" className="mb-6 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-3"><label className="field-label">Buscar por nombre o email<input className="field" value={search} onChange={(event) => updateFilter("search", event.target.value)} /></label><label className="field-label">Estado<select className="field" value={status} onChange={(event) => updateFilter("status", event.target.value)}><option value="">Todos los estados</option>{Object.entries(STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><label className="field-label">Etapa<select className="field" value={stage} onChange={(event) => updateFilter("stage", event.target.value)}><option value="">Todas las etapas</option>{Object.entries(STAGE_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label></section>
    {isLoading && <p className="notice" role="status">Cargando candidaturas...</p>}
    {error && <div className="notice-error" role="alert">{error} <button className="link-button" onClick={() => void loadCandidates()}>Reintentar</button></div>}
    {!isLoading && !error && candidates.length === 0 && <p className="notice">No hay candidaturas que coincidan con los filtros.</p>}
    {!isLoading && !error && candidates.length > 0 && <div className="overflow-hidden rounded-lg border border-slate-200 bg-white"><ul className="divide-y divide-slate-200">{candidates.map((candidate) => <li key={candidate.id}><Link className="block p-4 transition hover:bg-teal-50 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-teal-700" href={`/candidates/${candidate.id}`}><div className="grid gap-2 sm:grid-cols-4 sm:items-center"><div><p className="font-semibold text-slate-950">{candidate.full_name}</p><p className="text-sm text-slate-600">{candidate.email}</p></div><p className="text-slate-700">{candidate.position}</p><p><span className="badge">{STATUS_LABELS[candidate.status]}</span></p><p className="text-sm font-medium text-slate-700">{STAGE_LABELS[candidate.stage]}</p></div></Link></li>)}</ul></div>}
  </main>;
}

export default function Home() {
  return <Suspense fallback={<main className="mx-auto w-full max-w-6xl p-6">Cargando filtros...</main>}><CandidateList /></Suspense>;
}

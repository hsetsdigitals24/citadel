"use client";

import { PlusIcon, XMarkIcon, ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";

const fieldCls =
  "w-full rounded-xl border border-brand-100 bg-white px-4 py-2.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 transition";

export function StringList({
  values,
  onChange,
  placeholder = "Add an item…",
}: {
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const update = (i: number, v: string) => {
    const next = values.slice();
    next[i] = v;
    onChange(next);
  };
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= values.length) return;
    const next = values.slice();
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const remove = (i: number) =>
    onChange(values.filter((_, k) => k !== i));

  return (
    <div className="space-y-2">
      {values.map((v, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            value={v}
            onChange={(e) => update(i, e.target.value)}
            placeholder={placeholder}
            className={fieldCls}
          />
          <RowActions i={i} length={values.length} onMove={move} onRemove={remove} />
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...values, ""])}
        className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1.5 text-xs font-medium text-brand-700 hover:bg-brand-50"
      >
        <PlusIcon className="h-3.5 w-3.5" />
        Add
      </button>
    </div>
  );
}

export type StepValue = { title: string; detail: string };

export function StepList({
  values,
  onChange,
}: {
  values: StepValue[];
  onChange: (next: StepValue[]) => void;
}) {
  const update = (i: number, patch: Partial<StepValue>) => {
    const next = values.slice();
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= values.length) return;
    const next = values.slice();
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const remove = (i: number) =>
    onChange(values.filter((_, k) => k !== i));

  return (
    <div className="space-y-3">
      {values.map((step, i) => (
        <div
          key={i}
          className="rounded-xl border border-brand-100 bg-white p-3 space-y-2"
        >
          <div className="flex items-start gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-700">
              {i + 1}
            </div>
            <input
              value={step.title}
              onChange={(e) => update(i, { title: e.target.value })}
              placeholder="Step title (e.g. Consultation)"
              className={fieldCls}
            />
            <RowActions i={i} length={values.length} onMove={move} onRemove={remove} />
          </div>
          <textarea
            rows={2}
            value={step.detail}
            onChange={(e) => update(i, { detail: e.target.value })}
            placeholder="Short description of what happens at this step…"
            className={fieldCls}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...values, { title: "", detail: "" }])}
        className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1.5 text-xs font-medium text-brand-700 hover:bg-brand-50"
      >
        <PlusIcon className="h-3.5 w-3.5" />
        Add step
      </button>
    </div>
  );
}

export type FaqValue = { question: string; answer: string };

export function FaqList({
  values,
  onChange,
}: {
  values: FaqValue[];
  onChange: (next: FaqValue[]) => void;
}) {
  const update = (i: number, patch: Partial<FaqValue>) => {
    const next = values.slice();
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= values.length) return;
    const next = values.slice();
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const remove = (i: number) =>
    onChange(values.filter((_, k) => k !== i));

  return (
    <div className="space-y-3">
      {values.map((faq, i) => (
        <div
          key={i}
          className="rounded-xl border border-brand-100 bg-white p-3 space-y-2"
        >
          <div className="flex items-start gap-2">
            <input
              value={faq.question}
              onChange={(e) => update(i, { question: e.target.value })}
              placeholder="Question (e.g. Is the treatment painful?)"
              className={fieldCls}
            />
            <RowActions i={i} length={values.length} onMove={move} onRemove={remove} />
          </div>
          <textarea
            rows={2}
            value={faq.answer}
            onChange={(e) => update(i, { answer: e.target.value })}
            placeholder="Answer…"
            className={fieldCls}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...values, { question: "", answer: "" }])}
        className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3 py-1.5 text-xs font-medium text-brand-700 hover:bg-brand-50"
      >
        <PlusIcon className="h-3.5 w-3.5" />
        Add FAQ
      </button>
    </div>
  );
}

function RowActions({
  i,
  length,
  onMove,
  onRemove,
}: {
  i: number;
  length: number;
  onMove: (i: number, dir: -1 | 1) => void;
  onRemove: (i: number) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => onMove(i, -1)}
        disabled={i === 0}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-ink-muted hover:bg-brand-50 hover:text-brand-700 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Move up"
      >
        <ArrowUpIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => onMove(i, 1)}
        disabled={i === length - 1}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-ink-muted hover:bg-brand-50 hover:text-brand-700 disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Move down"
      >
        <ArrowDownIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => onRemove(i)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-ink-muted hover:bg-red-50 hover:text-red-600"
        aria-label="Remove"
      >
        <XMarkIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

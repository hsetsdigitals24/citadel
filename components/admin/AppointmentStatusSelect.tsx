"use client";

import { useState } from "react";

export function AppointmentStatusSelect({
  id,
  initial,
}: {
  id: string;
  initial: string;
}) {
  const [status, setStatus] = useState(initial);
  const [saving, setSaving] = useState(false);

  const onChange = async (next: string) => {
    setStatus(next);
    setSaving(true);
    try {
      await fetch(`/api/appointments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <select
      value={status}
      onChange={(e) => onChange(e.target.value)}
      disabled={saving}
      className="rounded-lg border border-brand-100 bg-white px-2.5 py-1.5 text-xs font-medium focus:border-brand-500 focus:outline-none"
    >
      <option value="pending">Pending</option>
      <option value="confirmed">Confirmed</option>
      <option value="cancelled">Cancelled</option>
    </select>
  );
}

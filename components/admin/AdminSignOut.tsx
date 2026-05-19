"use client";

import { signOut } from "next-auth/react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";

export function AdminSignOut() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/admin/login" })}
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-surface px-3 py-2 text-sm font-medium text-ink-muted hover:bg-brand-50 hover:text-brand-700"
    >
      <ArrowRightOnRectangleIcon className="h-4 w-4" />
      Sign out
    </button>
  );
}

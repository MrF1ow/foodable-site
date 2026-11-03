"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

import { SETUP_SKILL_URL } from "@/lib/site";

const AGENT_PROMPT = `Read ${SETUP_SKILL_URL} and walk me through setting up Foodable.`;

// The one-line prompt that hands setup to an agent, with a copy button.
export function AgentPrompt() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(AGENT_PROMPT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-start gap-3 rounded-xl border bg-card p-4 shadow-sm">
      <p className="min-w-0 flex-1 font-mono text-sm leading-relaxed break-words">
        Read{" "}
        <a
          href={SETUP_SKILL_URL}
          className="break-all text-brand hover:underline"
        >
          {SETUP_SKILL_URL}
        </a>{" "}
        and walk me through setting up Foodable.
      </p>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : "Copy prompt"}
        className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border bg-background text-muted-foreground transition-colors hover:text-brand"
      >
        {copied ? <Check className="size-4 text-brand" /> : <Copy className="size-4" />}
      </button>
    </div>
  );
}

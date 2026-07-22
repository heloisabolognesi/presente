"use client";

import { useRef, useState } from "react";
import SectionHeading from "./SectionHeading";
import { scrollToSection } from "@/lib/scrollTo";

type Line = { type: "input" | "output"; text: string };

const COMMANDS: Record<string, (() => string[]) | string[]> = {
  help: [
    "Comandos disponíveis:",
    "  whoami      — quem é você por aqui",
    "  date        — uma data importante",
    "  memories    — vai até a linha do tempo",
    "  hug         — um abraço, à distância",
    "  sobre       — por que esse site existe",
    "  clear       — limpa a tela"
  ],
  whoami: ["Você é Anninha.", "E é muito mais do que imagina."],
  date: ["07/08/2024", "O dia em que essa história começou."],
  hug: ["Enviando um abraço através da tela...", "( ) tentando", "(  )", "( ) recebido. ❤️"],
  sobre: [
    "Esse site foi construído memória por memória,",
    "pensado especialmente pra você.",
    "Não é só um projeto — é um obrigado."
  ]
};

const UNKNOWN = ["Comando não reconhecido.", "Digite 'help' para ver os comandos válidos."];

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: "Microsoft Windows [Versão 10.0.19045.4291]" },
    { type: "output", text: "(c) Microsoft Corporation. Todos os direitos reservados." },
    { type: "output", text: "" },
    { type: "output", text: "MEMORIES OS - Ambiente de Prompt de Comando" },
    { type: "output", text: "Digite 'help' para começar." },
    { type: "output", text: "" }
  ]);
  const [value, setValue] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setLines((prev) => [...prev, { type: "input", text: raw }]);

    if (cmd === "clear" || cmd === "cls") {
      setLines([]);
      return;
    }

    if (cmd === "memories") {
      setLines((prev) => [...prev, { type: "output", text: "Iniciando processo de memória..." }, { type: "output", text: "" }]);
      setTimeout(() => scrollToSection("timeline"), 600);
      return;
    }

    const output = COMMANDS[cmd];
    const responseLines = typeof output === "function" ? output() : output ?? UNKNOWN;

    setLines((prev) => [...prev, ...responseLines.map((text) => ({ type: "output" as const, text })), { type: "output" as const, text: "" }]);
    
    // Scroll only the internal body container, without moving the page viewport
    setTimeout(() => {
      if (bodyRef.current) {
        bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
      }
    }, 50);
  };

  const handleContainerClick = () => {
    inputRef.current?.focus({ preventScroll: true });
  };

  return (
    <section id="terminal-section" className="relative py-28 px-6 bg-deep">
      <SectionHeading
        eyebrow="Capítulo 04"
        title="Terminal"
        subtitle="Um pequeno sistema, só seu. Digite 'help' pra começar a explorar."
      />

      <div 
        onClick={handleContainerClick}
        className="max-w-2xl mx-auto card-premium overflow-hidden rounded-xl border border-white/10 shadow-2xl bg-[#0C0C0C] cursor-text"
      >
        {/* Barra de título do Windows Clássica Modificada (mas tech) */}
        <div className="flex items-center gap-3 px-3 py-2 bg-[#1C1C1C] border-b border-white/5">
          <svg className="w-4 h-4 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="4 17 10 11 4 5"></polyline>
            <line x1="12" y1="19" x2="20" y2="19"></line>
          </svg>
          <span className="font-body text-xs text-white/70">Prompt de Comando</span>
        </div>

        {/* Corpo do CMD */}
        <div 
          ref={bodyRef}
          className="relative p-3 sm:p-5 h-80 overflow-y-auto font-mono text-sm sm:text-base font-medium" 
          style={{ fontFamily: "Consolas, 'Courier New', monospace" }}
        >
          <div className="relative z-10 space-y-0 text-white/90">
            {lines.map((line, i) => (
              <div key={i} className={line.type === "input" ? "text-white" : "text-white/80"}>
                {line.type === "input" ? (
                  <span><span className="text-white/60">C:\Users\Anninha&gt;</span>{line.text}</span>
                ) : (
                  line.text
                )}
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              run(value);
              setValue("");
            }}
            className="flex items-center"
          >
            <span className="text-white/60 shrink-0">C:\Users\Anninha&gt;</span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="flex-1 bg-transparent font-mono text-sm sm:text-base text-white focus:outline-none ml-1"
              style={{ fontFamily: "Consolas, 'Courier New', monospace" }}
              autoComplete="off"
              spellCheck={false}
            />
          </form>
        </div>
      </div>
    </section>
  );
}

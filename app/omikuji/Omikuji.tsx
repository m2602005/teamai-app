"use client";

import { useState } from "react";
import {
  CATEGORIES,
  LUCKY_COLORS,
  LUCKY_ITEMS,
  drawFortune,
  pick,
  type Fortune,
} from "./data";

type Result = {
  fortune: Fortune;
  details: { label: string; text: string }[];
  item: string;
  color: string;
  number: number;
};

const rankColor: Record<Fortune["tone"], string> = {
  great: "text-red-700",
  good: "text-red-800",
  bad: "text-stone-700",
};

export default function Omikuji() {
  const [phase, setPhase] = useState<"idle" | "shaking" | "result">("idle");
  const [result, setResult] = useState<Result | null>(null);

  function draw() {
    if (phase === "shaking") return;
    setPhase("shaking");
    setResult(null);
    setTimeout(() => {
      const fortune = drawFortune();
      setResult({
        fortune,
        details: CATEGORIES.map((c) => ({ label: c.label, text: pick(c.lines[fortune.tone]) })),
        item: pick(LUCKY_ITEMS),
        color: pick(LUCKY_COLORS),
        number: Math.floor(Math.random() * 100) + 1,
      });
      setPhase("result");
    }, 1400);
  }

  return (
    <div className="flex w-full flex-col items-center gap-8">
      {phase !== "result" && (
        <button
          type="button"
          onClick={draw}
          disabled={phase === "shaking"}
          aria-label="おみくじを引く"
          className={`group relative flex h-56 w-32 flex-col items-center justify-start rounded-t-lg rounded-b-md border-4 border-amber-900 bg-gradient-to-b from-red-700 to-red-800 pt-6 shadow-xl transition-transform hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-400 ${
            phase === "shaking" ? "animate-shake" : ""
          }`}
        >
          <span className="absolute -top-3 left-1/2 h-4 w-3 -translate-x-1/2 rounded-sm bg-amber-100" />
          <span className="writing-vertical text-3xl font-bold tracking-[0.3em] text-amber-50">
            御神籤
          </span>
        </button>
      )}

      {phase === "idle" && (
        <p className="text-stone-700">筒をタップしておみくじを引きましょう</p>
      )}
      {phase === "shaking" && <p className="text-stone-700">カラカラ…</p>}

      {phase === "result" && result && (
        <div className="animate-unfold w-full max-w-md rounded-sm border-2 border-red-800 bg-[#fffaf0] p-6 shadow-lg">
          <p className="text-center text-sm text-stone-500">第{result.number}番</p>
          <p className={`mt-2 text-center text-7xl font-bold ${rankColor[result.fortune.tone]}`}>
            {result.fortune.rank}
          </p>
          <p className="mt-4 border-y border-red-800/30 py-3 text-center leading-7 text-stone-800">
            {result.fortune.message}
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {result.details.map((d) => (
              <div key={d.label} className="flex gap-2">
                <dt className="shrink-0 font-bold text-red-800">{d.label}</dt>
                <dd className="text-stone-800">{d.text}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 flex justify-around rounded bg-red-800/5 py-3 text-sm text-stone-800">
            <span>
              <span className="font-bold text-red-800">ラッキーアイテム</span> {result.item}
            </span>
            <span>
              <span className="font-bold text-red-800">ラッキーカラー</span> {result.color}
            </span>
          </div>
        </div>
      )}

      {phase === "result" && (
        <button
          type="button"
          onClick={draw}
          className="rounded-full bg-red-800 px-8 py-3 font-bold text-amber-50 shadow transition-colors hover:bg-red-700"
        >
          もう一度引く
        </button>
      )}
    </div>
  );
}

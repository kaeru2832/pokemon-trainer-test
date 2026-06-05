"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import questionsData from "@/data/questions.json";
import { calculateTypeCode } from "@/lib/score";

interface Option {
  id: string;
  text: string;
  weights: Record<string, number>;
}

interface Question {
  id: number;
  text: string;
  maxSelect: number;
  options: Option[];
}

const questions: Question[] = questionsData.questions as unknown as Question[];

export default function QuizPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string[]>>({});

  const current = questions[currentIndex];
  const selected = answers[current.id] ?? [];
  const progress = ((currentIndex) / questions.length) * 100;

  const toggleOption = useCallback(
    (optionId: string) => {
      setAnswers((prev) => {
        const cur = prev[current.id] ?? [];
        if (cur.includes(optionId)) {
          return { ...prev, [current.id]: cur.filter((id) => id !== optionId) };
        }
        if (cur.length >= current.maxSelect) {
          // remove oldest selection
          return { ...prev, [current.id]: [...cur.slice(1), optionId] };
        }
        return { ...prev, [current.id]: [...cur, optionId] };
      });
    },
    [current.id, current.maxSelect]
  );

  const handleNext = () => {
    if (selected.length === 0) return;

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      // Calculate result
      const allWeights: Record<string, number>[] = [];
      for (const q of questions) {
        const sel = answers[q.id] ?? [];
        for (const optId of sel) {
          const opt = q.options.find((o) => o.id === optId);
          if (opt) allWeights.push(opt.weights);
        }
      }
      const code = calculateTypeCode(allWeights);
      router.push(`/result/${code}`);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-xl">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Q{currentIndex + 1} / {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full progress-bar-fill rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div key={current.id} className="poke-card p-6 mb-6 animate-fadeInUp">
          <p className="text-xs text-gray-400 mb-2 font-medium">
            최대 {current.maxSelect}개 선택
          </p>
          <h2 className="text-lg md:text-xl font-bold leading-snug mb-6">
            {current.text}
          </h2>

          <div className="grid grid-cols-1 gap-3">
            {current.options.map((opt) => (
              <button
                key={opt.id}
                className={`option-btn ${selected.includes(opt.id) ? "selected" : ""}`}
                onClick={() => toggleOption(opt.id)}
              >
                <span className="pr-6">{opt.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            className="poke-btn-secondary flex-1"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            style={{ opacity: currentIndex === 0 ? 0.4 : 1 }}
          >
            ← 이전
          </button>
          <button
            className="poke-btn-primary flex-[2]"
            onClick={handleNext}
            disabled={selected.length === 0}
            style={{ opacity: selected.length === 0 ? 0.5 : 1 }}
          >
            {currentIndex < questions.length - 1 ? "다음 →" : "결과 보기 🎉"}
          </button>
        </div>
      </div>
    </main>
  );
}

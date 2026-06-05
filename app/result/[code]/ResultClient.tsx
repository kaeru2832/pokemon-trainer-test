"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface PokemonType {
  code: string;
  name: string;
  pokemon: { id: number; name: string; generation: number };
  summary: string;
  description: string;
  keywords: string[];
  matchCode: string;
  rivalCode: string;
}

interface Props {
  type: PokemonType;
  matchType: PokemonType | null;
  rivalType: PokemonType | null;
}

export default function ResultClient({ type, matchType, rivalType }: Props) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  const pokemonImgSrc = `/pokemon/${type.pokemon.id}.png`;

  const handleCopyLink = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleSaveCard = async () => {
    if (saving) return;
    setSaving(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      if (!cardRef.current) return;
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: "#FFF8EE",
      });
      const link = document.createElement("a");
      link.download = `pokemon-trainer-${type.code}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const descriptions = type.description.split("\n\n");

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-xl animate-fadeInUp">

        {/* Result Card (export target) */}
        <div ref={cardRef} className="result-card-export p-6 mb-6">
          <p className="text-xs text-center text-gray-400 mb-1 font-medium">
            나의 트레이너 유형
          </p>
          <h1 className="text-2xl md:text-3xl font-black text-center mb-1" style={{ color: "#CC0000" }}>
            {type.name}
          </h1>
          <p className="text-center text-sm text-gray-500 mb-4 font-mono">{type.code}</p>

          {/* Pokemon Image */}
          <div className="flex justify-center mb-4">
            <div className="relative w-48 h-48">
              <Image
                src={pokemonImgSrc}
                alt={type.pokemon.name}
                fill
                className="object-contain drop-shadow-lg"
                unoptimized
                priority
              />
            </div>
          </div>

          <h2 className="text-xl font-bold text-center mb-2">
            {type.pokemon.name}
            <span className="text-sm text-gray-400 ml-2">#{type.pokemon.id}</span>
          </h2>

          <p className="text-center text-gray-600 text-sm mb-4 leading-relaxed">
            {type.summary}
          </p>

          {/* Keywords */}
          <div className="flex flex-wrap justify-center gap-2 pb-2">
            {type.keywords.map((kw) => (
              <span
                key={kw}
                className="px-3 py-1 rounded-full text-xs font-bold text-white"
                style={{ background: "#CC0000" }}
              >
                #{kw}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="poke-card p-6 mb-4">
          <h3 className="text-base font-bold mb-3" style={{ color: "#CC0000" }}>✦ 유형 설명</h3>
          <div className="space-y-3">
            {descriptions.map((para, i) => (
              <p key={i} className="text-sm text-gray-700 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Match & Rival */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {matchType && (
            <PartnerCard label="환상의 짝궁" type={matchType} accent="#E8A020" />
          )}
          {rivalType && (
            <PartnerCard label="운명의 라이벌" type={rivalType} accent="#CC0000" />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-4">
          <button
            className="poke-btn-secondary flex-1 text-sm"
            onClick={handleCopyLink}
          >
            {copied ? "✓ 복사됨!" : "🔗 링크 복사"}
          </button>
          <button
            className="poke-btn-secondary flex-1 text-sm"
            onClick={handleSaveCard}
            disabled={saving}
          >
            {saving ? "저장 중…" : "💾 카드 저장"}
          </button>
        </div>

        <button
          className="poke-btn-primary w-full"
          onClick={() => router.push("/quiz")}
        >
          다시 테스트하기
        </button>

        <button
          className="mt-3 poke-btn-secondary w-full"
          onClick={() => router.push("/")}
        >
          메인으로
        </button>
      </div>

      <footer className="mt-12 text-center text-xs text-gray-400 px-4">
        <p>
          포켓몬 이미지 및 명칭은 Nintendo / Game Freak / The Pokémon Company의 지식재산입니다.
          <br />본 사이트는 개인 팬 프로젝트로 비상업적 목적으로 제작되었습니다.
        </p>
      </footer>
    </main>
  );
}

function PartnerCard({
  label,
  type,
  accent,
}: {
  label: string;
  type: PokemonType;
  accent: string;
}) {
  return (
    <div
      className="poke-card p-4 flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => {
        if (typeof window !== "undefined") {
          window.location.href = `/result/${type.code}`;
        }
      }}
    >
      <p className="text-xs font-bold mb-1" style={{ color: accent }}>
        {label}
      </p>
      <div className="relative w-16 h-16 my-1">
        <Image
          src={`/pokemon/${type.pokemon.id}.png`}
          alt={type.pokemon.name}
          fill
          className="object-contain"
          unoptimized
        />
      </div>
      <p className="text-xs font-bold mt-1">{type.pokemon.name}</p>
      <p className="text-xs text-gray-500">{type.name}</p>
    </div>
  );
}

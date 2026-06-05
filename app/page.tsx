"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center animate-fadeInUp">

        <h1 className="text-3xl md:text-4xl font-black mb-3 leading-tight" style={{ color: "#CC0000" }}>
          당신은 어떤
          <br />
          트레이너인가요?
        </h1>
        <p className="text-base text-gray-500 mb-2">
          10문항으로 알아보는 나의 트레이너 유형
        </p>
        <p className="text-sm text-gray-400 mb-10">
          1·2세대 포켓몬 32종 중 나와 가장 닮은 포켓몬은?
        </p>

        {/* 몬스터볼 */}
        <div className="mb-10 flex justify-center">
          <Pokeball />
        </div>

        <button
          className="poke-btn-primary w-full max-w-xs mx-auto block text-lg"
          onClick={() => router.push("/quiz")}
        >
          테스트 시작하기 →
        </button>

        <p className="mt-4 text-xs text-gray-400">약 1분 · 10문항 · 문항당 최대 2개 선택</p>
      </div>

      <footer className="mt-16 text-center text-xs text-gray-400 px-4">
        <p>
          포켓몬 이미지 및 명칭은 Nintendo / Game Freak / The Pokémon Company의 지식재산입니다.
          <br />
          본 사이트는 개인 팬 프로젝트이며 비상업적 목적으로 제작되었습니다.
        </p>
      </footer>
    </main>
  );
}

function Pokeball() {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "drop-shadow(0 8px 32px rgba(204,0,0,0.25))" }}
    >
      {/* 위쪽 빨간 반구 */}
      <path d="M10 100 A90 90 0 0 1 190 100 Z" fill="#CC0000" />
      {/* 아래쪽 흰 반구 */}
      <path d="M10 100 A90 90 0 0 0 190 100 Z" fill="white" />
      {/* 외곽 원 */}
      <circle cx="100" cy="100" r="90" stroke="#1a1a1a" strokeWidth="8" fill="none" />
      {/* 가운데 가로선 */}
      <line x1="10" y1="100" x2="190" y2="100" stroke="#1a1a1a" strokeWidth="8" />
      {/* 중앙 버튼 외부 흰 원 */}
      <circle cx="100" cy="100" r="26" fill="white" stroke="#1a1a1a" strokeWidth="8" />
      {/* 중앙 버튼 내부 흰 원 */}
      <circle cx="100" cy="100" r="14" fill="white" stroke="#888" strokeWidth="3" />
      {/* 빛 반사 하이라이트 */}
      <ellipse cx="72" cy="62" rx="14" ry="9" fill="white" opacity="0.35" transform="rotate(-30 72 62)" />
    </svg>
  );
}

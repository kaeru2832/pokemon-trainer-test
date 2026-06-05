"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center animate-fadeInUp">
        {/* 포켓볼 아이콘 */}
        <div className="mb-8 flex justify-center">
          <PokeballIcon />
        </div>

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

        {/* 트레이너 실루엣 */}
        <div className="mb-10 flex justify-center">
          <TrainerSilhouette />
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

function PokeballIcon() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="36" cy="36" r="34" stroke="#CC0000" strokeWidth="4" fill="white"/>
      <path d="M2 36 Q2 4 36 4 Q70 4 70 36" fill="#CC0000"/>
      <rect x="2" y="33" width="68" height="6" fill="#333"/>
      <circle cx="36" cy="36" r="10" fill="white" stroke="#333" strokeWidth="4"/>
      <circle cx="36" cy="36" r="5" fill="white" stroke="#666" strokeWidth="2"/>
    </svg>
  );
}

function TrainerSilhouette() {
  return (
    <svg
      className="trainer-silhouette"
      width="180"
      height="220"
      viewBox="0 0 180 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 머리 */}
      <ellipse cx="90" cy="42" rx="28" ry="30" fill="#CC0000" opacity="0.85"/>
      {/* 모자 */}
      <rect x="62" y="18" width="56" height="10" rx="5" fill="#8B0000"/>
      <rect x="55" y="24" width="70" height="6" rx="3" fill="#8B0000"/>
      {/* 몸통 */}
      <rect x="62" y="72" width="56" height="64" rx="12" fill="#CC0000" opacity="0.85"/>
      {/* 왼팔 */}
      <rect x="38" y="74" width="24" height="48" rx="12" fill="#CC0000" opacity="0.75"/>
      {/* 오른팔 (올린 팔) */}
      <rect x="118" y="56" width="24" height="48" rx="12" fill="#CC0000" opacity="0.75" transform="rotate(-30 130 80)"/>
      {/* 왼다리 */}
      <rect x="65" y="132" width="22" height="56" rx="11" fill="#8B0000" opacity="0.85"/>
      {/* 오른다리 */}
      <rect x="93" y="132" width="22" height="56" rx="11" fill="#8B0000" opacity="0.85"/>
      {/* 포켓볼 (손에 든) */}
      <circle cx="148" cy="60" r="13" fill="white" stroke="#333" strokeWidth="2"/>
      <path d="M135 60 Q135 47 148 47 Q161 47 161 60" fill="#CC0000"/>
      <rect x="135" y="58" width="26" height="4" fill="#333"/>
      <circle cx="148" cy="60" r="5" fill="white" stroke="#333" strokeWidth="2"/>
    </svg>
  );
}

# 포켓몬 트레이너 심리테스트

10개의 심리 문항으로 알아보는 나의 트레이너 유형. 1·2세대 포켓몬 32종 중 당신과 가장 닮은 포켓몬은?

## 시작하기

```bash
npm install
npm run build   # 포켓몬 이미지 다운로드 + Next.js 정적 빌드
npm run start
```

개발 서버:
```bash
npm run dev
# 별도로 이미지 먼저 다운로드:
node scripts/download-images.mjs
```

## 구조

- `data/questions.json` — 10문항, 8지선다, 가중치 정의
- `data/types.json` — 32개 유형 + 포켓몬 매핑
- `lib/score.ts` — 채점 알고리즘, 궁합/라이벌 로직 (순수 함수)
- `app/page.tsx` — 메인 (트레이너만 등장)
- `app/quiz/page.tsx` — 퀴즈 화면
- `app/result/[code]/page.tsx` — 결과 페이지 (SSG, 32개 정적 생성)

## 유형 시스템

5개 성향 축의 이진 조합 (2⁵ = 32종):

| 축 | A극 | B극 |
|---|---|---|
| 주도성 | L (리더) | S (서포터) |
| 판단 | T (이성) | F (감성) |
| 속도 | R (돌격) | C (신중) |
| 에너지 | E (사교) | I (독립) |
| 성향 | A (모험) | D (안정) |

## 저작권

포켓몬 이미지 및 명칭은 Nintendo / Game Freak / The Pokémon Company의 지식재산입니다.
본 프로젝트는 개인 팬 프로젝트로 비상업적 목적으로 제작되었습니다.

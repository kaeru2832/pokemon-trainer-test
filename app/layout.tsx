import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "포켓몬 트레이너 심리테스트",
  description: "10개의 질문으로 알아보는 나의 트레이너 유형 — 1·2세대 포켓몬 32종 중 당신은 누구?",
  openGraph: {
    title: "포켓몬 트레이너 심리테스트",
    description: "10개의 질문으로 알아보는 나의 트레이너 유형",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}

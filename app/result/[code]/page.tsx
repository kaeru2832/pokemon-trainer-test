import { Metadata } from "next";
import { notFound } from "next/navigation";
import { redirect } from "next/navigation";
import typesData from "@/data/types.json";
import { isValidCode, getRivalCode, getMatchCode } from "@/lib/score";
import ResultClient from "./ResultClient";

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

const types: PokemonType[] = typesData.types;

function getType(code: string): PokemonType | undefined {
  return types.find((t) => t.code === code);
}

export async function generateStaticParams() {
  return types.map((t) => ({ code: t.code }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const type = getType(code);
  if (!type) return { title: "포켓몬 트레이너 심리테스트" };

  const title = `${type.name} — 당신의 포켓몬은 ${type.pokemon.name}!`;
  const description = type.summary;
  const imageUrl = `/pokemon/${type.pokemon.id}.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: imageUrl, width: 475, height: 475 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  if (!isValidCode(code)) {
    redirect("/");
  }

  const type = getType(code);
  if (!type) redirect("/");

  // Resolve match and rival — use data override if present, else computed
  const matchCode = type.matchCode || getMatchCode(code);
  const rivalCode = type.rivalCode || getRivalCode(code);
  const matchType = getType(matchCode);
  const rivalType = getType(rivalCode);

  return (
    <ResultClient
      type={type}
      matchType={matchType ?? null}
      rivalType={rivalType ?? null}
    />
  );
}

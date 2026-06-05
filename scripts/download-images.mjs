/**
 * 결과 포켓몬 이미지를 PokeAPI 공식 아트워크에서 로컬 /public/pokemon/ 에 다운로드합니다.
 * html2canvas CORS taint 방지 + OG 이미지 재사용 목적.
 *
 * Usage: node scripts/download-images.mjs
 */

import fs from "fs";
import path from "path";
import https from "https";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// types.json에서 사용하는 포켓몬 ID 추출
const typesRaw = fs.readFileSync(path.join(ROOT, "data/types.json"), "utf-8");
const types = JSON.parse(typesRaw).types;
const ids = [...new Set(types.map((t) => t.pokemon.id))];

const outDir = path.join(ROOT, "public/pokemon");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function download(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest)) {
      console.log(`  skip (exists): ${path.basename(dest)}`);
      return resolve();
    }
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        file.close();
        fs.unlinkSync(dest);
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      res.pipe(file);
      file.on("finish", () => {
        file.close();
        console.log(`  downloaded: ${path.basename(dest)}`);
        resolve();
      });
    }).on("error", (err) => {
      fs.existsSync(dest) && fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function main() {
  console.log(`Downloading ${ids.length} pokemon images...`);
  for (const id of ids) {
    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    const dest = path.join(outDir, `${id}.png`);
    try {
      await download(url, dest);
    } catch (e) {
      // fallback to regular sprite
      const fallback = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
      try {
        await download(fallback, dest);
      } catch (e2) {
        console.warn(`  WARN: could not download #${id}: ${e2.message}`);
      }
    }
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

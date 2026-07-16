import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { extname, join, relative, sep } from "node:path";

const root = process.cwd();
const out = join(root, "out");
const dist = join(root, "dist");

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(out, dist, { recursive: true });
await mkdir(join(dist, "server"), { recursive: true });
await mkdir(join(dist, ".openai"), { recursive: true });
await cp(join(root, ".openai", "hosting.json"), join(dist, ".openai", "hosting.json"));

const files = {};
for (const file of await listFiles(dist)) {
  const rel = `/${relative(dist, file).split(sep).join("/")}`;
  if (rel.startsWith("/server/")) continue;
  files[rel] = {
    type: contentType(file),
    body: (await readFile(file)).toString("base64")
  };
}

await writeFile(
  join(dist, "server", "index.js"),
  `export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/api/classify-photo") {
      return Response.json({ category: "기타", tags: [], source: "fallback" });
    }
    const pathname = url.pathname === "/" ? "/index.html" : url.pathname;
    const asset = ASSETS[pathname] || (!pathname.includes(".") ? ASSETS["/index.html"] : null);
    if (!asset) return new Response("Not found", { status: 404 });
    return new Response(decode(asset.body), {
      headers: {
        "content-type": asset.type,
        "cache-control": pathname.startsWith("/_next/") ? "public, max-age=31536000, immutable" : "public, max-age=60"
      }
    });
  }
};

const ASSETS = ${JSON.stringify(files)};

function decode(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}
`,
  "utf8"
);

async function listFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...await listFiles(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

function contentType(file) {
  switch (extname(file)) {
    case ".html":
      return "text/html; charset=utf-8";
    case ".txt":
      return "text/plain; charset=utf-8";
    case ".js":
      return "text/javascript; charset=utf-8";
    case ".css":
      return "text/css; charset=utf-8";
    case ".json":
      return "application/json; charset=utf-8";
    case ".svg":
      return "image/svg+xml";
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".webp":
      return "image/webp";
    default:
      return "application/octet-stream";
  }
}

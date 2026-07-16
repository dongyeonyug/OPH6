import { NextResponse } from "next/server";
import { fallbackClassification, normalizeCategory } from "@/lib/aiClassification";

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(fallbackClassification(), { status: 200 });
  }

  try {
    const body = await request.json();
    const image = typeof body?.image === "string" ? body.image : "";
    if (!image.startsWith("data:image/")) {
      return NextResponse.json(fallbackClassification(), { status: 200 });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: "사진을 보고 여행 앨범 카테고리를 음식, 자연, 동물, 도시, 사람, 기타 중 하나로 고르고 한국어 태그를 최대 3개 제안하세요. JSON만 반환하세요: {\"category\":\"...\",\"tags\":[\"...\"]}"
              },
              { type: "input_image", image_url: image }
            ]
          }
        ],
        text: { format: { type: "json_object" } }
      }),
      signal: AbortSignal.timeout(9000)
    });

    if (!response.ok) {
      return NextResponse.json(fallbackClassification(), { status: 200 });
    }

    const data = await response.json();
    const text = data.output_text ?? data.output?.[0]?.content?.[0]?.text ?? "{}";
    const parsed = JSON.parse(text);
    const category = normalizeCategory(parsed.category);
    const tags = Array.isArray(parsed.tags) ? parsed.tags.filter((tag: unknown) => typeof tag === "string").slice(0, 3) : [];
    return NextResponse.json({ category, tags, source: "openai" });
  } catch {
    return NextResponse.json(fallbackClassification(), { status: 200 });
  }
}

import { expect, test } from "@playwright/test";

const svg = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
    <rect width="900" height="1200" fill="#f5f1ea"/>
    <circle cx="450" cy="420" r="250" fill="#e60023" opacity="0.82"/>
    <rect x="170" y="660" width="560" height="280" rx="48" fill="#211f1b" opacity="0.88"/>
    <text x="450" y="815" text-anchor="middle" font-family="Arial" font-size="76" fill="#fff">TripCanvas QA</text>
  </svg>`
);

test("TripCanvas core country album flow", async ({ page }, testInfo) => {
  const consoleErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  await page.goto("/");
  await expect(page.getByRole("heading", { name: "TripCanvas" })).toBeVisible();
  await page.locator('[aria-label="브라질 선택"]').click();
  await expect(page.getByRole("heading", { name: "브라질" })).toBeVisible();
  await expect(page.getByText("저장된 사진 0장")).toBeVisible();

  await page.getByRole("button", { name: /사진 추가/ }).click();
  await page.locator("#photo-file").setInputFiles({
    name: "tripcanvas-local.svg",
    mimeType: "image/svg+xml",
    buffer: svg
  });
  await page.getByRole("button", { name: /저장하기|저장 중/ }).click();
  await expect(page.getByText("설명 없는 사진").first()).toBeVisible();
  await expect(page.getByText(/기타/).first()).toBeVisible();

  await page.getByRole("button", { name: /사진첩 열기/ }).click();
  await expect(page.getByRole("heading", { name: "브라질 사진첩" })).toBeVisible();
  await page.getByLabel("대표 사진").first().focus();
  await page.keyboard.press("Enter");
  await page.getByLabel("설명 수정").first().focus();
  await page.keyboard.press("Enter");
  await page.locator(".memory-card input").nth(0).fill("상파울루 테스트");
  await page.locator(".memory-card textarea").nth(0).fill("자동 QA로 저장한 사진");
  await page.locator(".memory-card input").nth(1).fill("2026-07-16");
  await page.locator(".memory-card select").selectOption("도시");
  await page.locator(".memory-card input").nth(2).fill("qa, 도시");
  await page.getByRole("button", { name: /저장/ }).last().focus();
  await page.keyboard.press("Enter");
  await expect(page.getByLabel("브라질 사진첩").getByText("상파울루 테스트").first()).toBeVisible();

  await page.getByLabel("사진 크게 보기").first().focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog", { name: "사진 크게 보기" })).toBeVisible();
  await page.getByRole("button", { name: "닫기" }).click();
  await page.getByRole("button", { name: /지도로 돌아가기/ }).click();

  await page.getByRole("button", { name: /슬라이드쇼/ }).click();
  await expect(page.getByRole("dialog", { name: "브라질 슬라이드쇼" })).toBeVisible();
  await expect(page.getByText("1 / 1")).toBeVisible();
  await page.getByRole("button", { name: "닫기" }).click();

  await page.reload();
  await page.locator('[aria-label="브라질 선택"]').click();
  await expect(page.getByLabel("브라질 여행 사진 상세").getByText("상파울루 테스트").first()).toBeVisible();

  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(hasOverflow).toBeFalsy();
  expect(consoleErrors.filter((text) => !text.includes("Failed to load resource"))).toEqual([]);

  await page.screenshot({ path: `test-results/${testInfo.project.name}-tripcanvas.png`, fullPage: true });
});

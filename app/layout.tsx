import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TripCanvas",
  description: "지도에서 나라를 고르고 여행 사진을 브라우저 안에 간직하는 로컬 사진첩"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}

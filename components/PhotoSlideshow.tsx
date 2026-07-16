"use client";

import { useState } from "react";
import { ArrowLeft, CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import type { Country, Memory } from "@/lib/types";

type Props = {
  country: Country;
  memories: Memory[];
  onClose: () => void;
};

export function PhotoSlideshow({ country, memories, onClose }: Props) {
  const [index, setIndex] = useState(0);
  const current = memories[index];

  function move(delta: number) {
    if (memories.length === 0) return;
    setIndex((value) => (value + delta + memories.length) % memories.length);
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`${country.nameKo} 슬라이드쇼`}>
      <section className="slideshow">
        <header className="modal-header">
          <div>
            <h2>{country.nameKo} 슬라이드쇼</h2>
            <span className="pill">{memories.length > 0 ? `${index + 1} / ${memories.length}` : "0 / 0"}</span>
          </div>
          <button className="icon-btn" type="button" onClick={onClose} aria-label="닫기">
            <X size={18} />
          </button>
        </header>

        <div className="slide-image">
          {current ? (
            <img src={current.imageUrl} alt={current.description || current.title || "슬라이드 사진"} />
          ) : (
            <div className="panel-empty">
              <div>
                <strong>슬라이드가 없어요</strong>
                <p>사진을 추가한 뒤 다시 열어 주세요.</p>
              </div>
            </div>
          )}
        </div>

        <footer className="modal-footer">
          <button className="btn" type="button" onClick={() => move(-1)} disabled={memories.length < 2}>
            <CaretLeft size={18} /> 이전
          </button>
          <span>{current?.title || current?.description || "설명 없는 사진"} · {current?.date || "날짜 없음"}</span>
          <button className="btn" type="button" onClick={() => move(1)} disabled={memories.length < 2}>
            다음 <CaretRight size={18} />
          </button>
          <button className="btn btn-ghost" type="button" onClick={onClose}>
            <ArrowLeft size={18} /> 지도로 돌아가기
          </button>
        </footer>
      </section>
    </div>
  );
}

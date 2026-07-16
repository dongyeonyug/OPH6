"use client";

import { ArrowLeft, Images } from "@phosphor-icons/react";
import type { Country, Memory } from "@/lib/types";
import { MemoryBoard } from "@/components/MemoryBoard";

type Props = {
  country: Country;
  memories: Memory[];
  onBack: () => void;
  onOpenLightbox: (memory: Memory) => void;
  onUpdateMemory: (memory: Memory) => void;
  onDeleteMemory: (memory: Memory) => void;
};

export function CountryAlbumView({ country, memories, onBack, onOpenLightbox, onUpdateMemory, onDeleteMemory }: Props) {
  return (
    <div className="album-shell" role="dialog" aria-modal="true" aria-label={`${country.nameKo} 사진첩`}>
      <section className="album">
        <header className="album-header">
          <div>
            <h2>{country.nameKo} 사진첩</h2>
            <span className="pill"><Images size={14} /> {memories.length}장</span>
          </div>
          <button className="btn" type="button" onClick={onBack}>
            <ArrowLeft size={18} /> 지도로 돌아가기
          </button>
        </header>
        <div className="album-body">
          <MemoryBoard
            memories={memories}
            emptyText="이 나라의 앨범이 비어 있어요. 지도 화면에서 사진 추가를 눌러 첫 사진을 저장해 보세요."
            onOpenLightbox={onOpenLightbox}
            onUpdateMemory={onUpdateMemory}
            onDeleteMemory={onDeleteMemory}
          />
        </div>
      </section>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Check, PencilSimple, Star, Trash, MagnifyingGlassPlus, X } from "@phosphor-icons/react";
import { CATEGORIES, type Memory, type PhotoCategory } from "@/lib/types";

type Props = {
  memories: Memory[];
  emptyText: string;
  onOpenLightbox: (memory: Memory) => void;
  onUpdateMemory: (memory: Memory) => void;
  onDeleteMemory: (memory: Memory) => void;
};

export function MemoryBoard({ memories, emptyText, onOpenLightbox, onUpdateMemory, onDeleteMemory }: Props) {
  if (memories.length === 0) {
    return (
      <div className="panel-empty">
        <div>
          <strong>빈 사진첩</strong>
          <p>{emptyText}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="memory-grid">
      {memories.map((memory) => (
        <MemoryCard
          key={memory.id}
          memory={memory}
          onOpenLightbox={onOpenLightbox}
          onUpdateMemory={onUpdateMemory}
          onDeleteMemory={onDeleteMemory}
        />
      ))}
    </div>
  );
}

function MemoryCard({ memory, onOpenLightbox, onUpdateMemory, onDeleteMemory }: { memory: Memory; onOpenLightbox: (memory: Memory) => void; onUpdateMemory: (memory: Memory) => void; onDeleteMemory: (memory: Memory) => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(memory);

  function save() {
    onUpdateMemory({
      ...memory,
      title: draft.title?.trim(),
      description: draft.description?.trim(),
      date: draft.date,
      note: draft.note?.trim(),
      tags: draft.tags?.trim(),
      category: draft.category || "기타"
    });
    setEditing(false);
  }

  return (
    <article className="memory-card">
      <button className="photo-frame" type="button" onClick={() => onOpenLightbox(memory)} aria-label="사진 크게 보기">
        <img src={memory.imageUrl} alt={memory.description || memory.title || "여행 사진"} />
      </button>
      {!editing ? (
        <>
          <div className="memory-meta">
            <strong>{memory.title || memory.description || "설명 없는 사진"}</strong>
            <span>{memory.date || "날짜 없음"} · {memory.category || "기타"}</span>
            <span>{memory.tags || "태그 없음"}</span>
          </div>
          <div className="card-actions">
            <button className="icon-btn" type="button" onClick={() => onOpenLightbox(memory)} aria-label="확대">
              <MagnifyingGlassPlus size={17} />
            </button>
            <button className="icon-btn" type="button" onClick={() => setEditing(true)} aria-label="설명 수정">
              <PencilSimple size={17} />
            </button>
            <button className="icon-btn" type="button" onClick={() => onUpdateMemory({ ...memory, isRepresentative: true })} aria-label="대표 사진">
              <Star size={17} weight={memory.isRepresentative ? "fill" : "regular"} />
            </button>
            {memory.source === "local" && (
              <button className="icon-btn" type="button" onClick={() => onDeleteMemory(memory)} aria-label="삭제">
                <Trash size={17} />
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="form">
          <div className="field">
            <label>제목</label>
            <input value={draft.title ?? ""} onChange={(event) => setDraft({ ...draft, title: event.target.value })} />
          </div>
          <div className="field">
            <label>설명</label>
            <textarea value={draft.description ?? ""} onChange={(event) => setDraft({ ...draft, description: event.target.value })} />
          </div>
          <div className="field">
            <label>날짜</label>
            <input type="date" value={draft.date ?? ""} onChange={(event) => setDraft({ ...draft, date: event.target.value })} />
          </div>
          <div className="field">
            <label>카테고리</label>
            <select value={draft.category || "기타"} onChange={(event) => setDraft({ ...draft, category: event.target.value as PhotoCategory })}>
              {CATEGORIES.map((category) => <option key={category}>{category}</option>)}
            </select>
          </div>
          <div className="field">
            <label>태그 또는 기분</label>
            <input value={draft.tags ?? ""} onChange={(event) => setDraft({ ...draft, tags: event.target.value })} />
          </div>
          <div className="field">
            <label>메모</label>
            <textarea value={draft.note ?? ""} onChange={(event) => setDraft({ ...draft, note: event.target.value })} />
          </div>
          <div className="card-actions">
            <button className="btn btn-primary" type="button" onClick={save}><Check size={17} /> 저장</button>
            <button className="btn" type="button" onClick={() => { setDraft(memory); setEditing(false); }}><X size={17} /> 취소</button>
          </div>
        </div>
      )}
    </article>
  );
}

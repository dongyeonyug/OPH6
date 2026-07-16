"use client";

import { useMemo, useRef, useState } from "react";
import { CalendarBlank, Images, MagicWand, Plus, Slideshow, Star } from "@phosphor-icons/react";
import { CATEGORIES, type Country, type Memory, type MemoryDraft, type PhotoCategory } from "@/lib/types";
import { MemoryBoard } from "@/components/MemoryBoard";

type Props = {
  country: Country;
  memories: Memory[];
  onAddMemory: (country: Country, draft: Omit<Memory, "imageUrl" | "source" | "createdAt">, file: File) => Promise<void>;
  onOpenAlbum: () => void;
  onOpenSlideshow: () => void;
  onOpenLightbox: (memory: Memory) => void;
  onUpdateMemory: (memory: Memory) => void;
  onDeleteMemory: (memory: Memory) => void;
};

const emptyDraft: MemoryDraft = {
  title: "",
  description: "",
  date: "",
  note: "",
  tags: "",
  category: "기타"
};

export function CountryDetailPanel({
  country,
  memories,
  onAddMemory,
  onOpenAlbum,
  onOpenSlideshow,
  onOpenLightbox,
  onUpdateMemory,
  onDeleteMemory
}: Props) {
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState<MemoryDraft>(emptyDraft);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [errors, setErrors] = useState<{ country?: string; photo?: string; file?: string }>({});
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const latest = useMemo(() => [...memories].sort((a, b) => b.createdAt - a.createdAt)[0], [memories]);

  function resetForm() {
    setDraft(emptyDraft);
    setFile(null);
    setPreview("");
    setErrors({});
    if (inputRef.current) inputRef.current.value = "";
  }

  async function classify(fileToClassify: File) {
    try {
      const image = await downscaleImage(fileToClassify);
      const response = await fetch("/api/classify-photo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image })
      });
      const result = await response.json();
      const category = CATEGORIES.includes(result.category) ? result.category : "기타";
      setDraft((current) => ({
        ...current,
        category,
        tags: current.tags || (Array.isArray(result.tags) ? result.tags.join(", ") : "")
      }));
    } catch {
      setDraft((current) => ({ ...current, category: current.category || "기타" }));
    }
  }

  function handleFile(nextFile: File | undefined) {
    if (!nextFile) return;
    if (!nextFile.type.startsWith("image/")) {
      setErrors({ file: "이미지 파일만 선택할 수 있어요" });
      return;
    }
    if (nextFile.size > 12 * 1024 * 1024) {
      setErrors({ file: "12MB 이하 사진을 선택해 주세요" });
      return;
    }
    setFile(nextFile);
    setPreview(URL.createObjectURL(nextFile));
    setErrors({});
    void classify(nextFile);
  }

  async function submit() {
    const nextErrors: typeof errors = {};
    if (!country?.id) nextErrors.country = "나라를 선택해 주세요";
    if (!file) nextErrors.photo = "사진을 선택해 주세요";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !file) return;

    setIsSaving(true);
    await onAddMemory(
      country,
      {
        id: crypto.randomUUID(),
        countryId: country.id,
        title: draft.title.trim(),
        description: draft.description.trim(),
        date: draft.date,
        note: draft.note.trim(),
        tags: draft.tags.trim(),
        category: draft.category || "기타",
        imageKey: undefined,
        isRepresentative: memories.length === 0
      },
      file
    );
    setIsSaving(false);
    resetForm();
    setShowForm(false);
  }

  return (
    <aside className="detail-panel" aria-label={`${country.nameKo} 여행 사진 상세`}>
      <div className="panel-section">
        <section className="summary">
          <div className="summary-top">
            <div>
              <h2>{country.nameKo}</h2>
              <p>{country.summary}</p>
            </div>
            <span className="pill">{country.code}</span>
          </div>
          <p>
            저장된 사진 {memories.length}장
            {" · "}
            최근 여행 {latest?.date || "날짜 없음"}
          </p>
        </section>

        <div className="action-row" aria-label="사진첩 주요 작업">
          <button className="btn btn-primary" type="button" onClick={() => setShowForm((value) => !value)}>
            <Plus size={18} /> 사진 추가
          </button>
          <button className="btn" type="button" onClick={onOpenAlbum}>
            <Images size={18} /> 사진첩 열기
          </button>
          <button className="btn" type="button" onClick={onOpenSlideshow} disabled={memories.length === 0}>
            <Slideshow size={18} /> 슬라이드쇼
          </button>
        </div>

        <MemoryBoard
          memories={memories.slice(0, 6)}
          emptyText="아직 이 나라에 저장된 사진이 없어요. 사진 추가로 첫 기억을 남겨보세요."
          onOpenLightbox={onOpenLightbox}
          onUpdateMemory={onUpdateMemory}
          onDeleteMemory={onDeleteMemory}
        />

        {showForm && (
          <form className="form" onSubmit={(event) => { event.preventDefault(); void submit(); }}>
            <div className="field">
              <label>나라</label>
              <input value={`${country.nameKo} (${country.code})`} readOnly aria-invalid={Boolean(errors.country)} />
              {errors.country && <span className="error">{errors.country}</span>}
            </div>
            <div className="field">
              <label htmlFor="photo-file">사진</label>
              <input
                id="photo-file"
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={(event) => handleFile(event.target.files?.[0])}
                aria-invalid={Boolean(errors.photo || errors.file)}
              />
              {errors.photo && <span className="error">{errors.photo}</span>}
              {errors.file && <span className="error">{errors.file}</span>}
            </div>
            {preview && (
              <div className="photo-frame" aria-label="선택한 사진 미리보기">
                <img src={preview} alt="선택한 사진 미리보기" />
              </div>
            )}
            <div className="field">
              <label htmlFor="memory-title">제목</label>
              <input id="memory-title" value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} placeholder="비워두면 설명 없는 사진" />
            </div>
            <div className="field">
              <label htmlFor="memory-description">설명</label>
              <textarea id="memory-description" value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} placeholder="짧은 기억을 적어도 좋아요" />
            </div>
            <div className="field">
              <label htmlFor="memory-date">날짜</label>
              <input id="memory-date" type="date" value={draft.date} onChange={(event) => setDraft({ ...draft, date: event.target.value })} />
            </div>
            <div className="field">
              <label htmlFor="memory-category">카테고리</label>
              <select id="memory-category" value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value as PhotoCategory })}>
                {CATEGORIES.map((category) => <option key={category}>{category}</option>)}
              </select>
            </div>
            <div className="field">
              <label htmlFor="memory-tags">태그 또는 기분</label>
              <input id="memory-tags" value={draft.tags} onChange={(event) => setDraft({ ...draft, tags: event.target.value })} placeholder="예: 골목, 저녁, 맑음" />
            </div>
            <div className="field">
              <label htmlFor="memory-note">메모</label>
              <textarea id="memory-note" value={draft.note} onChange={(event) => setDraft({ ...draft, note: event.target.value })} placeholder="나중에 보고 싶은 개인 메모" />
            </div>
            <button className="btn btn-primary" type="submit" disabled={isSaving}>
              <MagicWand size={18} /> {isSaving ? "저장 중" : "저장하기"}
            </button>
          </form>
        )}

        {!showForm && latest && (
          <div className="summary">
            <span className="pill"><Star size={14} /> 대표 사진</span>
            <p><CalendarBlank size={14} /> {latest.title || "설명 없는 사진"} · {latest.date || "날짜 없음"}</p>
          </div>
        )}
      </div>
    </aside>
  );
}

function downscaleImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const max = 640;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("canvas unavailable"));
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.72));
    };
    img.onerror = () => reject(new Error("image load failed"));
    img.src = url;
  });
}

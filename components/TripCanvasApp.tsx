"use client";

import { useEffect, useMemo, useState } from "react";
import { COUNTRIES } from "@/data/countries";
import { seedMemories } from "@/data/countries";
import type { Country, Memory } from "@/lib/types";
import { loadLocalMemories, persistLocalMemories, removeLocalMemory, saveLocalMemory, updateLocalMemoryMeta } from "@/lib/storage";
import { CountryAlbumView } from "@/components/CountryAlbumView";
import { CountryDetailPanel } from "@/components/CountryDetailPanel";
import { PhotoSlideshow } from "@/components/PhotoSlideshow";
import { WorldMap } from "@/components/WorldMap";
import { X } from "@phosphor-icons/react";

type Mode = "map" | "album" | "slideshow";

export function TripCanvasApp() {
  const [selectedId, setSelectedId] = useState("392");
  const [memories, setMemories] = useState<Memory[]>(seedMemories);
  const [mode, setMode] = useState<Mode>("map");
  const [lightbox, setLightbox] = useState<Memory | null>(null);

  useEffect(() => {
    let live = true;
    loadLocalMemories().then((local) => {
      if (live) setMemories([...seedMemories, ...local]);
    });
    return () => {
      live = false;
    };
  }, []);

  const selectedCountry = useMemo(() => COUNTRIES.find((country) => country.id === selectedId) ?? COUNTRIES[0], [selectedId]);
  const selectedMemories = memories.filter((memory) => memory.countryId === selectedCountry.id);
  const memoryByCountry = useMemo(() => {
    return COUNTRIES.reduce<Record<string, Memory[]>>((acc, country) => {
      acc[country.id] = memories.filter((memory) => memory.countryId === country.id);
      return acc;
    }, {});
  }, [memories]);

  async function addMemory(country: Country, draft: Omit<Memory, "imageUrl" | "source" | "createdAt">, file: File) {
    const memory: Memory = {
      ...draft,
      countryId: country.id,
      imageUrl: "",
      source: "local",
      createdAt: Date.now()
    };
    const saved = await saveLocalMemory(memory, file);
    setMemories((current) => [...current.map((item) => ({ ...item, isRepresentative: item.countryId === country.id && saved.isRepresentative ? false : item.isRepresentative })), saved]);
  }

  function updateMemory(next: Memory) {
    setMemories((current) => {
      const updated = current.map((memory) => {
        if (next.isRepresentative && memory.countryId === next.countryId && memory.id !== next.id) {
          return { ...memory, isRepresentative: false };
        }
        return memory.id === next.id ? next : memory;
      });
      persistLocalMemories(updated);
      return updated;
    });
    updateLocalMemoryMeta(next);
    setLightbox((current) => (current?.id === next.id ? next : current));
  }

  async function deleteMemory(memory: Memory) {
    await removeLocalMemory(memory);
    setMemories((current) => current.filter((item) => item.id !== memory.id));
    setLightbox((current) => (current?.id === memory.id ? null : current));
  }

  function selectCountry(country: Country) {
    setSelectedId(country.id);
    setMode("map");
  }

  return (
    <main className="app-shell">
      <header className="app-header">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">T</div>
          <div>
            <h1>TripCanvas</h1>
            <p>지도에서 고르고, 그 나라의 사진첩을 바로 엽니다.</p>
          </div>
        </div>
        <p className="header-note">사진은 이 브라우저와 기기에만 저장됩니다.</p>
      </header>

      <div className="map-layout">
        <section className="map-stage" aria-label="세계 지도">
          <WorldMap
            countries={COUNTRIES}
            selectedCountry={selectedCountry}
            memoriesByCountry={memoryByCountry}
            onSelect={selectCountry}
          />
          <div className="map-hint">
            <strong>나라를 선택해 주세요</strong>
            색이 있는 나라는 저장된 사진이 있습니다. 데스크톱에서는 마우스를 올리면 최근 사진이 작게 보입니다.
          </div>
        </section>

        <CountryDetailPanel
          country={selectedCountry}
          memories={selectedMemories}
          onAddMemory={addMemory}
          onOpenAlbum={() => setMode("album")}
          onOpenSlideshow={() => setMode("slideshow")}
          onOpenLightbox={setLightbox}
          onUpdateMemory={updateMemory}
          onDeleteMemory={deleteMemory}
        />
      </div>

      {mode === "album" && (
        <CountryAlbumView
          country={selectedCountry}
          memories={selectedMemories}
          onBack={() => setMode("map")}
          onOpenLightbox={setLightbox}
          onUpdateMemory={updateMemory}
          onDeleteMemory={deleteMemory}
        />
      )}

      {mode === "slideshow" && (
        <PhotoSlideshow country={selectedCountry} memories={selectedMemories} onClose={() => setMode("map")} />
      )}

      {lightbox && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="사진 크게 보기">
          <div className="lightbox">
            <div className="modal-header">
              <h2>{lightbox.title || "설명 없는 사진"}</h2>
              <button className="icon-btn" type="button" onClick={() => setLightbox(null)} aria-label="닫기">
                <X size={18} />
              </button>
            </div>
            <div className="lightbox-image">
              <img src={lightbox.imageUrl} alt={lightbox.description || lightbox.title || "여행 사진"} />
            </div>
            <div className="modal-footer">
              <span>{lightbox.description || "설명 없는 사진"} · {lightbox.date || "날짜 없음"} · {lightbox.category || "기타"}</span>
              <button className="btn btn-ghost" type="button" onClick={() => setLightbox(null)}>돌아가기</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

"use client";

import { useMemo, useState, type KeyboardEvent, type MouseEvent } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import atlas from "world-atlas/countries-110m.json";
import type { Country, Memory } from "@/lib/types";

type Props = {
  countries: Country[];
  selectedCountry: Country;
  memoriesByCountry: Record<string, Memory[]>;
  onSelect: (country: Country) => void;
};

type Preview = {
  memory: Memory;
  x: number;
  y: number;
};

export function WorldMap({ countries, selectedCountry, memoriesByCountry, onSelect }: Props) {
  const [preview, setPreview] = useState<Preview | null>(null);
  const byId = useMemo(() => new Map(countries.map((country) => [country.id, country])), [countries]);

  function countryFromGeo(geo: { id?: string | number }) {
    const id = String(geo.id ?? "").padStart(3, "0");
    return byId.get(id);
  }

  function latestMemory(country: Country) {
    const list = memoriesByCountry[country.id] ?? [];
    return list.find((memory) => memory.isRepresentative) ?? [...list].sort((a, b) => b.createdAt - a.createdAt)[0];
  }

  function bounded(clientX: number, clientY: number) {
    const width = 170;
    const height = 170;
    return {
      x: Math.min(window.innerWidth - width - 12, Math.max(12, clientX + 16)),
      y: Math.min(window.innerHeight - height - 12, Math.max(82, clientY + 16))
    };
  }

  return (
    <div className="map-canvas">
      <div className="map-card">
        <ComposableMap projectionConfig={{ scale: 152 }} className="map-svg" role="img" aria-label="나라를 선택할 수 있는 실제 세계 지도">
          <ZoomableGroup center={[10, 20]} zoom={1}>
            <Geographies geography={atlas}>
              {({ geographies }: { geographies: Array<Record<string, unknown> & { rsmKey: string; id?: string | number }> }) =>
                geographies.map((geo) => {
                  const country = countryFromGeo(geo);
                  const isSelected = country?.id === selectedCountry.id;
                  const hasPhotos = country ? (memoriesByCountry[country.id]?.length ?? 0) > 0 : false;
                  const fill = isSelected ? "#e60023" : hasPhotos ? "#b9afa2" : "#ded7cb";
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      tabIndex={country ? 0 : -1}
                      aria-label={country ? `${country.nameKo} 선택` : "선택할 수 없는 나라"}
                      className="country-shape"
                      fill={fill}
                      stroke="#fffaf2"
                      strokeWidth={0.55}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none" },
                        pressed: { outline: "none" }
                      }}
                      onClick={() => country && onSelect(country)}
                      onKeyDown={(event: KeyboardEvent<SVGPathElement>) => {
                        if (country && (event.key === "Enter" || event.key === " ")) {
                          event.preventDefault();
                          onSelect(country);
                        }
                      }}
                      onMouseMove={(event: MouseEvent<SVGPathElement>) => {
                        if (!country) return;
                        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
                        const memory = latestMemory(country);
                        if (!memory) return;
                        const pos = bounded(event.clientX, event.clientY);
                        setPreview({ memory, ...pos });
                      }}
                      onMouseLeave={() => setPreview(null)}
                    />
                  );
                })
              }
            </Geographies>
          </ZoomableGroup>
        </ComposableMap>
      </div>
      {preview && (
        <div className="hover-preview" style={{ left: preview.x, top: preview.y }}>
          <div className="photo-frame">
            <img src={preview.memory.imageUrl} alt={preview.memory.title || "최근 여행 사진"} />
          </div>
          <div className="memory-meta">
            <strong>{preview.memory.title || "설명 없는 사진"}</strong>
            <span>{preview.memory.date || "날짜 없음"}</span>
          </div>
        </div>
      )}
    </div>
  );
}

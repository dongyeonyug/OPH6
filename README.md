# TripCanvas

TripCanvas는 지도에서 나라를 선택하고, 해당 나라의 여행 사진을 브라우저 로컬 저장소에 보관하는 한국어 우선 MVP입니다.

## 실행

```bash
npm install
npm run dev
```

프로덕션 빌드 확인:

```bash
npm run build
```

브라우저 QA:

```bash
npm run qa:playwright
```

## 배포와 저장소

- GitHub: https://github.com/dongyeonyug/OPH6
- Production URL: https://tripcanvas-oph6.yugdongyeon.chatgpt.site
- 저장소 접근성: 제출 검토를 위해 GitHub 저장소를 public으로 전환했습니다.

## 환경 변수

`.env.example`에는 서버 전용 선택 기능인 `OPENAI_API_KEY` 자리표시자만 있습니다. 실제 키는 `.env.local` 또는 호스팅 런타임 환경 변수에만 둡니다.

`OPENAI_API_KEY`가 없거나 API가 실패해도 사진 저장과 수동 카테고리 선택은 계속 동작합니다.

## Ralphthon 요약

- 작업지시: `GOAL.md`, `SPEC.md`, `CONTROL.md`에 요구사항과 제한을 구조화했습니다.
- 자율 수행: `PLAN.md`, `ATTEMPTS.md`, `NOTES.md`에 실행 루프와 실패 후 조정을 기록했습니다.
- 검증 루프: `QA.md`와 Playwright 테스트가 지도 선택, 로컬 사진 추가, 앨범, 편집, 대표 사진, 슬라이드쇼, 새로고침 지속성, 모바일/데스크톱 오버플로를 확인합니다.
- 배포 검증: production URL에서 데스크톱/모바일 직접 브라우저 스모크가 통과했습니다.
- 발표 문서: `PRESENTATION.md`는 한국어로 편집 가능한 3분 발표 자료입니다.

## 현재 MVP 범위

- 실제 세계 지도 기반 국가 선택
- 데스크톱 오른쪽 패널, 모바일 하단 시트
- 로컬 파일 사진 추가
- IndexedDB 이미지 저장과 localStorage 메타데이터 보조
- 사진 제목/설명/날짜/메모/태그/카테고리 편집
- 대표 사진 지정, 삭제, 큰 사진 보기, 슬라이드쇼
- 서버 전용 선택 AI 분류 라우트와 수동 fallback

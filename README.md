# ISAANG Robotics — Website

프로젝트형 로보틱스 동아리 정적 웹사이트입니다.
GitHub Pages / Netlify에 바로 배포 가능합니다.

## 폴더 구조

```
isaang-site/
├── index.html          ← 구조 (HTML 골격, About 사이드바 직접 수정)
├── css/
│   └── style.css       ← 디자인 (색상, 폰트, 레이아웃)
├── js/
│   └── main.js         ← 동작 로직 (데이터 렌더링)
├── data/
│   ├── site.json       ★ 기본 정보, 모집, 연락처
│   ├── history.json    ★ 연혁
│   ├── awards.json     ★ 수상 및 활동
│   ├── projects.json   ★ 프로젝트
│   └── members.json    ★ 인원
└── 느낌1.png            ← 히어로 배경 이미지 (교체 가능)
```

★ 표시 파일만 수정하면 대부분의 내용이 바뀝니다.

---

## 수정 방법

### 1) 기본 정보 · 모집 · 연락처
**`data/site.json`**

| 필드 | 설명 |
|---|---|
| `siteTitle` | 브라우저 탭 제목 |
| `clubName` | 푸터에 표시되는 동아리명 |
| `tagline` | 히어로 한줄 설명 |
| `footerDescription` | 푸터 부제 |
| `heroStats` | 히어로 우측 통계 `[{"num":"05","label":"Members"}]` |
| `aboutParagraphs` | 소개 섹션 문단 배열 |
| `recruitTargets` | 모집 대상 목록 |
| `recruitProcess` | 지원 절차 목록 |
| `contact` | email / instagram / github / note |
| `footerLinks` | 푸터 링크 배열 |

### 2) 연혁
**`data/history.json`**
```json
[
  {
    "year": "2026.03.23",
    "title": "제목",
    "description": "설명"
  }
]
```

### 3) 수상 및 활동
**`data/awards.json`**
```json
[
  {
    "category": "Award",
    "title": "수상명",
    "description": "설명",
    "links": [{ "label": "링크", "url": "https://..." }]
  }
]
```

### 4) 프로젝트
**`data/projects.json`**
```json
[
  {
    "status": "In Progress",
    "title": "프로젝트명",
    "description": "설명",
    "tags": ["Vision", "Control"],
    "links": [{ "label": "GitHub", "url": "https://..." }]
  }
]
```

### 5) 인원
**`data/members.json`**
```json
[
  {
    "name": "이름",
    "role": "Control / AI",
    "major": "SW",
    "description": "한줄 소개 (비워도 됨)",
    "skills": ["ROS2", "PyTorch"]
  }
]
```

### 6) 히어로 이미지 교체
`index.html` 내 아래 줄의 `src` 경로만 바꾸세요.
```html
<img class="hero-img" src="느낌1.png" alt="..." />
```

### 7) About 사이드바 수정
`index.html` 안의 `.about-sidebar` 블록을 직접 수정하세요.
(Hardware / Control & AI / Research 항목)

---

## 배포

### GitHub Pages
1. 새 저장소 생성 후 파일 전체 업로드
2. `Settings > Pages > Branch: main / Root` 설정
3. 저장 → 자동 배포

### Netlify
- 폴더를 드래그 앤 드롭하거나 GitHub 저장소 연결

---

## 주의사항
- JSON 파일은 반드시 UTF-8로 저장하세요.
- 쉼표(`,`)와 큰따옴표(`"`) 누락에 주의하세요.
- 로컬에서 바로 열면 fetch가 차단됩니다. VS Code의 Live Server 익스텐션이나 `npx serve .`을 사용하세요.

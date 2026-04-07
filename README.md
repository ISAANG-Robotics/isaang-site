# ISAANG Robotics Website Template

프로젝트형 동아리/연구실 사이트용 정적 웹사이트 템플릿입니다.
GitHub Pages와 Netlify에 바로 올릴 수 있습니다.

## 폴더 구조

```bash
isaang-site/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── data/
    ├── site.json
    ├── history.json
    ├── awards.json
    ├── projects.json
    └── members.json
```

## 수정 방법

### 1) 기본 소개 수정
- `data/site.json`
- 동아리 이름, 한줄 소개, 소개글, 모집 정보, 연락처 수정

### 2) 연혁 수정
- `data/history.json`
- 연도, 제목, 설명 추가/삭제

### 3) 수상 및 활동 수정
- `data/awards.json`
- 수상/활동 카드 추가 가능

### 4) 프로젝트 수정
- `data/projects.json`
- 프로젝트 제목, 설명, 태그, 링크 수정

### 5) 인원 수정
- `data/members.json`
- 이름, 역할, 전공, 소개, 기술 스택 수정

## GitHub Pages 배포

1. 새 GitHub 저장소 생성
2. 이 폴더의 모든 파일 업로드
3. `Settings > Pages` 이동
4. Branch를 `main` / Root로 설정
5. 저장 후 배포 완료

## Netlify 배포

### 방법 1
- Netlify에 폴더 드래그 앤 드롭

### 방법 2
- GitHub 저장소 연결 후 배포

## 주의
- `index.html`을 더 건드리지 않아도 대부분의 내용은 `data/*.json`만 수정하면 됩니다.
- JSON 문법에서 쉼표와 큰따옴표를 잘 지켜야 합니다.

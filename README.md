![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/SpringBoot-3.5-green)
![React](https://img.shields.io/badge/React-19-blue)
![MySQL](https://img.shields.io/badge/MySQL-8-blue)
![JWT](https://img.shields.io/badge/JWT-Authentication-red)
![OpenAI](https://img.shields.io/badge/OpenAI-API-black)

# 🏥 AI Healthcare

> **OpenAI를 활용하여 사용자의 증상을 분석하고 적절한 병원을 추천하는 <br/> AI 기반 Healthcare 서비스**

![메인](docs/images/main.png)

---

# 📋 프로젝트 요약

| 항목 | 내용 |
|------|------|
| 프로젝트명 | AI Healthcare |
| 개발 기간 | 2026.06 ~ 2026.07 |
| 개발 인원 | 1명 (개인 프로젝트) |
| 담당 역할 | Full Stack Developer |
| 주요 기능 | AI 증상 분석, 병원 추천, 즐겨찾기, AI 분석 이력, 마이페이지 |
| 사용 API | OpenAI API, HIRA Open API |

---

# 📌 프로젝트 소개

AI Healthcare는 **OpenAI API**를 활용하여 사용자의 증상을 분석하고 적절한 병원을 추천하는 의료 보조 웹 서비스입니다

사용자는 병원을 검색하고 즐겨찾기로 관리할 수 있으며 AI 분석 이력과 개인 통계를 마이페이지에서 확인할 수 있습니다

사용자 경험 향상을 위해 Skeleton Loading, Toast Message, Confirm Modal, Empty State 등을 적용하여 실제 서비스와 유사한 UI/UX를 구현하였습니다

또한 향후 확장성을 고려하여 병원 종별(Hospital Type)과 진료과(Medical Department)를 분리하는 구조로 설계하였습니다

---

# 🛠 기술 스택

## Backend

- Java 17
- Spring Boot 3
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- MySQL
- Gradle

## Frontend

- React
- React Router
- Axios
- Tailwind CSS
- Chart.js
- React Hot Toast

## Open API

- OpenAI API
- HIRA Open API

## DevOps

- Git
- GitHub
- Docker
- AWS EC2 (예정)

---

# 🏗️ System Architecture

![Architecture](docs/images/architecture.png)

---

# 🌐 REST API

## Authentication

| Method | URL | 설명 |
|--------|-----|------|
| POST | /api/auth/signup | 회원가입 |
| POST | /api/auth/login | 로그인 |

## AI

| Method | URL | 설명 |
|--------|-----|------|
| POST | /api/ai/symptom | AI 증상 분석 |
| GET | /api/ai/histories | AI 분석 이력 조회 |
| DELETE | /api/ai/histories/{historyId} | AI 분석 이력 삭제 |

## Hospital

| Method | URL | 설명 |
|--------|-----|------|
| GET | /api/hospitals | 병원 검색 |
| GET | /api/hospitals/{id} | 병원 상세 조회 |

## Favorite

| Method | URL | 설명 |
|--------|-----|------|
| GET | /api/favorites | 즐겨찾기 조회 |
| POST | /api/favorites/{hospitalId} | 즐겨찾기 추가 |
| DELETE | /api/favorites/{hospitalId} | 즐겨찾기 삭제 |

## User

| Method | URL | 설명 |
|--------|-----|------|
| GET | /api/users/me | 내 정보 조회 |
| GET | /api/users/dashboard | 대시보드 조회 |

---

# 📂 프로젝트 구조

```text
Backend

src
└── main
    ├── java
    │    └── com.healthcare.ai_healthcare
    │         ├── ai
    │         ├── auth
    │         ├── favorite
    │         ├── history
    │         ├── hospital
    │         ├── user
    │         ├── config
    │         └── common
    └── resources

Frontend

frontend
└── src
     ├── api
     ├── components
     ├── pages
     ├── routes
     ├── hooks
     └── utils
```

---

# ✨ 주요 기능

## 👤 회원

- JWT 로그인
- 회원가입
- 로그아웃
- 마이페이지

## 🤖 AI 증상 분석

- OpenAI API 기반 증상 분석
- 추천 병원 조회
- AI 분석 이력 저장 및 삭제

## 🏥 병원

- 병원 검색
- 병원 상세 조회
- 페이지네이션
- 즐겨찾기 토글

## 📊 마이페이지

- 회원 정보 조회
- 즐겨찾기 개수
- AI 분석 횟수
- 진료과 통계 (Pie Chart)

## 🎨 UI / UX

- Skeleton Loading
- Confirm Modal
- Toast Message
- Loading Spinner
- Empty State
- Pagination

---

# 📊 ERD

![ERD](docs/images/erd.png)

> 현재 구현에서는 HIRA 병원 기본정보 API의 한계로 `department` 컬럼을 사용하고 있습니다
>
> 향후에는 `hospitalType`과 `medicalDepartment`를 분리하고,
> HIRA 진료과목 API를 추가 연동하여 AI 추천 정확도를 향상시킬 예정입니다

---

# 🖥️ 서비스 화면

| 메인 | 로그인 |
|------|---------|
| ![](docs/images/main.png) | ![](docs/images/login.png) |

| AI 입력 | AI 결과 |
|---------|---------|
| ![](docs/images/ai.png) | ![](docs/images/ai-result.png) |

| 병원 검색 | 병원 상세 |
|-----------|-----------|
| ![](docs/images/hospital.png) | ![](docs/images/hospital-detail.png) |

| 즐겨찾기 | 마이페이지 |
|-----------|-----------|
| ![](docs/images/favorite.png) | ![](docs/images/mypage1.png) |

| 활동 통계 | AI 분석 이력 |
|-----------|--------------|
| ![](docs/images/mypage2.png) | ![](docs/images/history.png) |

---

# 🧩 Trouble Shooting

## 1. OpenAI 응답 JSON Parsing

### 문제

OpenAI 응답을 DTO로 변환하는 과정에서 JSON Parsing 오류 발생

### 해결

ObjectMapper를 활용하여 DTO로 변환하고 예외 발생 시 기본 추천 병원을 반환하도록 구현하여 서비스 안정성을 확보

---

## 2. JWT 인증 처리

### 문제

Service마다 로그인 사용자를 조회하는 코드가 중복

### 해결

SecurityContextHolder를 활용하여 공통 메서드로 로그인 사용자를 조회하도록 리팩토링하여<br/> 코드 중복을 제거

---

## 3. HIRA API 데이터 한계

### 문제

HIRA 병원 기본정보 API의 `department` 값은 실제 진료과가 아닌 **상급종합, 종합병원** 등의 병원 종별 정보를 제공

### 해결

현재 프로젝트에서는 MVP 단계로 병원 종별 기준 추천을 구현하였으며, 

향후에는

- hospitalType
- medicalDepartment

를 분리하고 HIRA 진료과목 API를 추가 연동하여 추천 정확도를 개선할 예정입니다

---
# 🚀 배포 과정

### 1. Docker 이미지 생성

```bash
docker build -t sangwo0/ai-healthcare-backend:latest .
```

### 2. Docker Hub 업로드

```bash
docker push sangwo0/ai-healthcare-backend:latest
```

### 3. AWS EC2

```bash
ssh -i ai-healthcare.pem ubuntu@EC2
```

### 4. Docker Compose

```bash
docker compose pull
docker compose up -d
```

### 5. 결과

- Docker Compose 기반으로 Spring Boot와 MySQL 컨테이너 구성
- Docker Hub 활용하여 이미지를 배포하고 EC2에서 Pull 방식으로 실행하도록 구성
- AWS EC2 환경에서 배포를 진행, 현재 프리티어 자원 제약으로 인해 운영 환경 안정화 진행 중

---

# 🚀 향후 개선 사항

- GitHub Actions CI/CD
- HIRA 진료과목 API 연동
- 지도(Map API) 연동
- 위치 기반 병원 추천
- 검색 자동완성

---

# 👨‍💻 Developer

## 조상우

- Backend : Spring Boot
- Frontend : React
- Database : MySQL

---
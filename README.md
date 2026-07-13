# 🏥 AI Healthcare

> **OpenAI를 활용하여 사용자의 증상을 분석하고 적절한 병원을 추천하는 <br/> AI 기반 Healthcare 서비스**

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/SpringBoot-3.5-green)
![React](https://img.shields.io/badge/React-19-blue)
![MySQL](https://img.shields.io/badge/MySQL-8-blue)
![JWT](https://img.shields.io/badge/JWT-Authentication-red)
![OpenAI](https://img.shields.io/badge/OpenAI-API-black)

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

AI Healthcare는 사용자가 입력한 증상을 AI가 분석하여 적절한 진료과를 추천하고,
HIRA 공공데이터를 활용하여 병원 정보를 조회할 수 있는 웹 서비스입니다.

Spring Boot 기반 REST API를 직접 설계하고 React와 연동하여 서비스를 구현하였으며,
JWT 기반 로그인과 사용자별 즐겨찾기, AI 분석 이력 기능을 제공합니다.

또한 Docker Compose를 이용하여 Spring Boot와 MySQL 컨테이너 환경을 구성하고,
Docker Hub와 AWS EC2를 활용하여 실제 서비스를 배포했습니다.

---

# 🛠 기술 스택

| 분야 | 기술 |
| ----|-----|
|Backend| Spring Boot, Spring Security, JPA, JWT|
|Frontend|React|
|Database|MySQL|
|Infra|Docker, Docker Compose, Docker Hub, AWS EC2|
|API| OpenAI API, HIRA Open API|

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

- 회원가입
- 로그인
- JWT 기반 인증 및 인가
- Spring Security 적용

---

## 🤖 AI 증상 분석

- OpenAI API 연동
- 증상 분석
- 진료과 추천

---

## 🏥 병원 검색

- HIRA Open API 연동
- 병원 검색
- 병원 상세 조회

---

## ⭐ 사용자 기능

- 즐겨찾기
- AI 분석 이력
- 마이페이지

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

# 🚨 Trouble Shooting

## 1️. Spring Security 인증 코드 중복

### 문제

JWT 인증 로직이 여러 클래스에 분산되어 있어 유지보수가 어려웠습니다.

### 원인

인증 관련 로직이 공통화되지 않아 동일한 코드가 여러 곳에서 사용되고 있었습니다.

### 해결

공통 인증 로직을 분리하여 Spring Security 인증 구조를 개선했습니다.

### 결과

- 코드 중복 제거
- 유지보수성 향상
- 인증 로직 관리 효율성 개선

---

## 2. OpenAI API Parsing 오류

### 문제

OpenAI API 응답을 처리하는 과정에서 JSON Parsing 예외가 발생했습니다.

### 원인

응답 데이터 구조가 상황에 따라 달라질 수 있었고 예외 처리가 부족했습니다.

### 해결

응답 검증 로직과 예외 처리를 추가하여 다양한 응답에서도 정상적으로 동작하도록 개선했습니다.

### 결과

- Parsing 오류 해결
- 서비스 안정성 향상
- 예외 상황 대응 가능

---

## 3️. Docker 환경에서 MySQL 연결 실패

### 문제

Docker Compose 실행 후 Spring Boot가 MySQL에 연결되지 않았습니다.

```text
Communications link failure
The driver has not received any packets from the server.
```

### 원인

Spring Boot가 MySQL보다 먼저 실행되어 DB 초기화가 완료되기 전에 연결을 시도했습니다.

또한 환경 변수 설정이 정상적으로 반영되지 않았습니다.

### 해결

- Docker Compose 환경 변수 수정
- DB Host를 컨테이너 이름(mysql)으로 변경
- 컨테이너 재생성
- 환경 변수 재적용

### 결과

- Spring Boot와 MySQL 정상 연결
- Docker 환경 안정화
- 컨테이너 기반 개발 환경 구축

---

## 4️. AWS EC2 배포 실패

### 문제

Docker 컨테이너는 실행되었지만 외부에서 서비스에 접근할 수 없었습니다.

### 원인

EC2 Security Group의 인바운드 규칙과 Docker 포트 설정이 올바르게 적용되지 않았습니다.

### 해결

- Security Group 8081 포트 허용
- Docker 포트 매핑 확인
- 컨테이너 재실행

### 결과

- EC2 정상 배포
- 외부 접속 가능
- 운영 환경 구축 완료

---

## 5️. Docker 환경 변수 변경이 적용되지 않는 문제

### 문제

MySQL 비밀번호를 변경했지만 기존 비밀번호가 계속 유지되었습니다.

### 원인

Docker Volume에 기존 MySQL 데이터가 유지되고 있어 초기 환경 변수가 다시 적용되지 않았습니다.

### 해결

기존 Volume을 삭제하고 컨테이너를 다시 생성했습니다.

```bash
docker compose down -v
docker compose up -d
```

### 결과

- 환경 변수 정상 적용
- MySQL 초기화 완료
- 컨테이너 재배포 성공

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

# 📚 프로젝트를 통해 배운 점

- Spring Boot 기반 REST API 설계 및 구현 경험
- Spring Security와 JWT 인증 구조 이해
- OpenAI API 및 HIRA Open API 연동 경험
- JPA 기반 데이터베이스 설계 및 CRUD 구현
- Docker Compose를 활용한 컨테이너 환경 구축
- Docker Hub와 AWS EC2를 활용한 서비스 배포 경험
- 운영 환경에서 발생하는 문제를 로그 분석을 통해 해결하는 경험

# 👨‍💻 Developer

## 조상우

- Backend : Spring Boot
- Frontend : React
- Database : MySQL

---
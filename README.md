# 🏥 AI Healthcare

AI 기반 증상 분석 및 병원 추천 서비스입니다.

사용자가 증상을 입력하면 AI(OpenAI)를 통해 적절한 진료과를 추천하고,
공공데이터(HIRA)를 이용하여 관련 병원을 검색할 수 있습니다.

---

# 🚀 Tech Stack

## Backend

- Java 17
- Spring Boot 3
- Spring Security
- Spring Data JPA
- JWT
- MySQL

## External API

- HIRA 병원정보 Open API
- OpenAI API

## Documentation

- Swagger(OpenAPI 3)

---

# 📌 주요 기능

## 👤 회원

- 회원가입
- 로그인(JWT)
- JWT 인증

## 🏥 병원

- 병원 목록 조회
- 병원 검색
- 병원 상세 조회
- 병원 데이터 동기화(HIRA)

## ⭐ 즐겨찾기

- 즐겨찾기 등록
- 즐겨찾기 조회
- 즐겨찾기 삭제

## 🤖 AI

- 증상 분석
- 진료과 추천
- 추천 병원 조회

---

# 📂 프로젝트 구조

src/main/java

```
ai
auth
config
common
exception
favorite
hospital
```

---

# REST API

| Method | URL | Description |
|---------|-----|-------------|
| POST | /api/auth/signup | 회원가입 |
| POST | /api/auth/login | 로그인 |
| GET | /api/hospitals | 병원 조회 |
| GET | /api/hospitals/{id} | 병원 상세조회 |
| POST | /api/hospitals/sync | HIRA 동기화 |
| POST | /api/favorites/{id} | 즐겨찾기 추가 |
| GET | /api/favorites | 즐겨찾기 조회 |
| DELETE | /api/favorites/{id} | 즐겨찾기 삭제 |
| POST | /api/ai/symptom | AI 증상 분석 |

---

# 📸 Swagger

```
http://localhost:8081/swagger-ui/index.html
```

---

# 앞으로 추가 예정

- OpenAI 실제 응답 연동 (Billing)
- 진료과 API 연동
- Docker
- AWS EC2 배포
- GitHub Actions CI/CD

# Nextflix Web Application

A full-stack movie-browser built during the **Nextzy Full-stack Engineer Test**.

**Live Demo**
Frontend: [https://demo-nextflix-web-application.vercel.app]
Backend API: [https://demo-nextflix-web-application.onrender.com]

---

## Highlights

### Frontend
* **Tech:** Next.js 15 (App Router), TypeScript, Tailwind CSS, React Icons

### Backend
* **Tech:** NestJS, Mock Data (User/Profile), TMDB API (ผ่าน custom backend)

### Architecture
* **Structure:** Presentation / Domain / Data

### State Management
* **Library:** Zustand

### Styling
* **Tools:** Tailwind CSS

---

## Repository Structure

```
demo-nextflix-web-application/               
├── apps/                                   
│   ├── backend/                            # Backend API built with NestJS
│   │   ├── src/                            
│   │   │   ├── app.controller.ts           
│   │   │   ├── app.module.ts               
│   │   │   ├── app.service.ts             
│   │   │   ├── auth/                       # Authentication feature
│   │   │   │   ├── auth.controller.ts      # Handles auth-related API routes (login/logout)
│   │   │   │   ├── auth.module.ts          
│   │   │   │   ├── auth.service.ts         
│   │   │   │   ├── dto/login.dto.ts        
│   │   │   │   ├── jwt-auth.guard.ts       # JWT-based authorization guard
│   │   │   │   ├── jwt.strategy.ts         # JWT validation strategy
│   │   │   │   └── refresh-token.interceptor.ts  # Handles automatic token refresh
│   │   │   ├── data/                       # Data repositories for DB access (Mock Data for User/Profile)
│   │   │   │   ├── movies.repository.ts    # Movie data access logic (Proxy to TMDB)
│   │   │   │   ├── profile.repository.ts   # Profile data access logic (Mock Data)
│   │   │   │   └── user.repository.ts      # User data access logic (Mock Data)
│   │   │   ├── health/                     # Health check API
│   │   │   │   ├── health.controller.ts   
│   │   │   │   └── health.module.ts                         
│   │   │   ├── movies/                     # Movies API
│   │   │   │   ├── movies.controller.ts    
│   │   │   │   ├── movies.module.ts        
│   │   │   │   └── movies.service.ts       
│   │   │   └── profile/                    # Profile API
│   │   │       ├── profile.controller.ts   
│   │   │       ├── profile.module.ts       
│   │   │       └── profile.service.ts      
│   └── frontend/                            # Frontend app built with Next.js
│       ├── src/                           
│       │   ├── app/                        
│       │   │   ├── (protected)/             # Authenticated-only pages
│       │   │   │   ├── movies/page.tsx      # Movies page
│       │   │   │   └── select-profile/page.tsx  # Profile selection page
│       │   │   ├── globals.css              # Global CSS styles (Import Tailwind CSS)
│       │   │   └── login/page.tsx           # Login page
│       │   ├── components/                  # Reusable UI components
│       │   │   ├── DropdownMenu.tsx         # Dropdown menu 
│       │   │   ├── LoginForm.tsx             # Login form 
│       │   │   ├── MovieCard.tsx             # Movie card UI
│       │   │   ├── SearchInput.tsx           # Search input (opens modal popup)
│       │   │   ├── SelectProfileList.tsx    # Profile selection list (Carousel)
│       │   │   └── ThemeToggle.tsx          # Light/dark theme toggle button
│       │   ├── data/                         # Client-side data repositories (API clients)
│       │   │   ├── auth.repository.ts        # Auth API client
│       │   │   └── movie.repository.ts       # Movie API client
│       │   │   └── profile.repository.ts     # Profile API client
│       │   ├── domain/                       
│       │   │   ├── auth.service.ts           # Auth service logic on client
│       │   │   ├── dtos/                     # Data transfer objects (DTOs)
│       │   │   │   ├── auth.dto.ts
│       │   │   │   └── movie.dto.ts
│       │   │   └── movie.service.ts          # Movie service logic on client
│       │   ├── lib/                          # Helper utilities and hooks
│       │   │   ├── authServiceInstance.ts    # Auth service instance 
│       │   │   ├── movieServiceInstance.ts   # Movie service instance 
│       │   │   └── useSessionKeepAlive.ts    # Hook to keep session alive
│       │   └── store/                        # State management (Zustand)
│       │       └── authStore.ts              # Auth state management store
└── README.md                               # Project documentation and overview

```

**Clean Architecture – Frontend**

* `Presentation:` `app/`, `components/`
* `Domain:` `domain/` (entities, services)
* `Data:` `data/` (repositories, datasources)

---

## Quick Start (Local)

### Prerequisites

* Node.js ≥ 18 (LTS)
* npm

### Setup

```bash
# 1. โคลน Repository
git clone https://github.com/sirikupmo/demo-nextflix-web-application.git
cd demo-nextflix-web-application 

# 2. ติดตั้ง Dependencies ทั้งหมด
npm install

# 3. สร้างไฟล์ Environment Variables สำหรับทั้ง Frontend และ Backend (ตัวอย่างที่หัวข้อ "Environment Variables")
cp apps/frontend/.env.example apps/frontend/.env.local
cp apps/backend/.env.example apps/backend/.env

# 4. รัน Development Server
# รัน Backend (ใน Terminal/Command Prompt แยกต่างหาก)
npm run start:dev --workspace=apps/backend

# รัน Frontend (ใน Terminal/Command Prompt แยกต่างหาก)
npm run dev --workspace=apps/frontend

# หากต้องการรันทั้งคู่พร้อมกัน (ให้ตั้งค่า script ใน package.json ของ root)
# ตัวอย่าง: เพิ่ม "dev": "npm run start:dev --workspace=apps/backend & npm run dev --workspace=apps/frontend" ใน package.json ของ root
# แล้วรัน: npm run dev
```

URL Frontend `http://localhost:3000`
URL Backend API  `http://localhost:3001`

---

## Environment Variables

เพิ่มไฟล์ `.env.local` ที่ `apps/frontend/`:

```env
NODE_ENV=development
NEXT_PUBLIC_API_URL="http://localhost:3001"
PING_INTERVAL_MIN=10

```
เพิ่มไฟล์ `.env` ที่ `apps/backend/`:

```env
NODE_ENV=development
PORT=3001
JWT_SECRET="your_jwt_secret"
COOKIE_MAX_AGE_MIN=300
JWT_EXPIRATION_TIME_SHOPT_LIVED="60m"
JWT_EXPIRATION_TIME_LONG_LIVED="1d"
TMDB_URL="https://api.themoviedb.org/3"
TMDB_TOKEN="eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzIxMWM0NTY0YjBjY2NmMzk2YTk1ZDIxZjI0MDc4NyIsIm5iZiI6MTc1MjUxMzYzOS42NzUsInN1YiI6IjY4NzUzYzY3ZTIyMmQ3ZWMyOWY5MWIyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1hIpExNpytZx8iauo9gZUyr5fsqGVvQIqW6N-vq-1Xs"
FRONTEND_ORIGIN="http://localhost:3000"

```
---

## UI/UX Features

### Authentication
* หน้า Login 
* จัดกา State ผู้ใช้ด้วย Zustand
* เปลี่ยนหน้าไป select-profile หลัง Login สำเร็จ
* จัดการ Loading / Error

### Session Management
* Protected Routes: ใช้ Layout เพื่อป้องกันเส้นทางที่ต้องมีการยืนยันตัวตน หากไม่มีการยืนยันตัวตนจะถูกเปลี่ยนเส้นทางไปหน้า Login โดยอัตโนมัติ
* Session Keep-Alive: ใช้ `useSessionKeepAlive` ping backend ทุก xx นาทีตามค่า `PING_INTERVAL_MIN` .env ซึ่งจะกระตุ้นให้ Backend รีเฟรช JWT cookie โดยอัตโนมัติ (ผ่าน refresh-token.interceptor.ts) เพื่อป้องกันเซสชันหมดอายุจากการไม่ใช้งาน
* Logout อัตโนมัติ: หากผู้ใช้ไม่มีการใช้งานเกินระยะเวลาที่กำหนดใน JWT_EXPIRES_IN (เช่น 1 ชั่วโมง) และไม่มีการส่งคำขอใดๆ ที่จะกระตุ้นการรีเฟรช JWT cookie เซสชันจะหมดอายุลงและผู้ใช้จะถูกนำกลับไปที่หน้า Login


### Profile Selection
* หน้า select-profile แสดงโปรไฟล์จาก Mock Data

### Movie List
* Carousel แสดงภาพยนตร์ยอดนิยมแนวนอน (TMDB)
* สามารถกดที่ดู Details ภาพยนตร์แต่ละเรื่องได้เมื่อคลิกจะเปิด Modal Popup รายละเอียด

### Search Functionality
* ปุ่มค้นหาที่มุมขวาบนของหน้าจอ
* เมื่อคลิกจะเปิด Modal Popup สำหรับการค้นหา
* ช่องค้นหาพร้อม Debounce เพื่อการค้นหาแบบ Real-time
* แสดงผลลัพธ์การค้นหาเป็นรายการที่มีรูปภาพขนาดเล็กทางซ้ายและชื่อเรื่องทางขวา
* แสดง Loading Spinner ที่สร้างด้วย Tailwind CSS ระหว่างการค้นหา

### Theme Toggling
* รองรับ Dark Mode และ Light Mode ด้วย next-themes (ปุ่มสลับธีม ThemeToggle.tsx ถูกวางไว้ที่มุมซ้ายบน)

### Navigation
* เมนู Dropdown (DropdownMenu.tsx) ที่มุมขวาบนพร้อมตัวเลือก Logout เพื่อออกจากระบบและกลับไปหน้า Login

### Responsive Design
* Layout รองรับ Mobile, Tablet, Desktop

### Custom Fonts
* ใช้ฟอนต์ JetBrains Mono, Kanit เพื่อความสวยงาม

### Animations
* ใช้ Tailwind CSS และ CSS
* Effect ตอนเปลี่ยนหน้า, modal, hover ต่างๆ

---

## Authentication & Session Management Logic
โปรเจกต์นี้ใช้ JSON Web Tokens (JWT) สำหรับการยืนยันตัวตนและการจัดการเซสชัน โดยมี Logic ดังนี้:
1. การเข้าสู่ระบบ (Login):
   * เมื่อผู้ใช้เข้าสู่ระบบสำเร็จ Backend (NestJS) จะสร้าง JWT และส่งกลับมาในรูปแบบของ HTTP-only Cookie
   * การใช้ HTTP-only Cookie เป็นการเพิ่มความปลอดภัย เนื่องจาก JavaScript บน Frontend ไม่สามารถเข้าถึง Cookie นี้ได้โดยตรง ซึ่งช่วยลดความเสี่ยงจากการโจมตีแบบ Cross-Site Scripting (XSS)
   * JWT เป็น Stateless Token ซึ่ข้อมูลที่จำเป็นสำหรับการยืนยันตัวตนจะถูกเก็บไว้ใน Token เอง ทำให้ Backend ไม่จำเป็นต้องเก็บ Session State ไว้ใน Server ซึ่งช่วยให้ Scalability ดีขึ้น
2. การจัดการเซสชัน (Session Management):
   * การส่งคำขอที่ต้องมีการยืนยันตัวตน: ทุกครั้งที่ Frontend ส่งคำขอไปยัง Backend สำหรับ Protected Routes (เช่น /movies, /profile) Browser จะแนบ JWT Cookie ไปกับคำขอโดยอัตโนมัติ
   * การรีเฟรช Token อัตโนมัติ (Backend): บนฝั่ง Backend, refresh-token.interceptor.ts จะตรวจสอบทุกคำขอที่เข้ามา หาก JWT ใกล้หมดอายุหรือหมดอายุแล้ว (แต่ Refresh Token ยังไม่หมดอายุ) Interceptor จะทำการออก JWT ใหม่และส่งกลับไปใน HTTP-only Cookie ของ Response โดยอัตโนมัติ ทำให้เซสชันของผู้ใช้ยังคงอยู่โดยไม่จำเป็นต้อง Login ใหม่
   * การรักษาเซสชัน (Frontend): useSessionKeepAlive.ts hook บน Frontend จะส่งคำขอ GET /auth/ping ไปยัง Backend เป็นระยะๆ เพื่อกระตุ้นให้ Backend ตรวจสอบและรีเฟรช JWT Cookie หากจำเป็น ซึ่งช่วยป้องกันไม่ให้เซสชันของผู้ใช้หมดอายุจากการไม่ใช้งาน
3. การออกจากระบบ (Logout):
   * เมื่อผู้ใช้คลิก "Logout" หรือเซสชันหมดอายุเนื่องจากไม่มีการใช้งานเกินระยะเวลาที่กำหนด (และ useSessionKeepAlive ไม่สามารถรีเฟรชได้) Frontend จะส่งคำขอ POST /auth/logout ไปยัง Backend
   * Backend จะทำการล้าง HTTP-only Cookie ที่เก็บ JWT ออกจาก Browser ทำให้ผู้ใช้ไม่สามารถเข้าถึง Protected Routes ได้อีกต่อไปและถูกนำกลับไปยังหน้า Login
* ### ข้อดีของ Logic นี้ ###
  * ความปลอดภัยสูง: การใช้ HTTP-only Cookie ป้องกัน XSS และ JWT ช่วยให้ Backend เป็น Stateless
  * ประสบการณ์ผู้ใช้ที่ดี: ผู้ใช้ไม่จำเป็นต้อง Login ซ้ำบ่อยๆ เนื่องจากมีการรีเฟรช Token อัตโนมัติและ Session Keep-Alive
  * Scalability: Backend ไม่ต้องเก็บ Session State ทำให้ง่ายต่อการขยายระบบ
  * การจัดการ Inactivity Logout: ระบบสามารถจัดการการ Logout อัตโนมัติเมื่อผู้ใช้ไม่มีการใช้งานตามระยะเวลาที่กำหนด ซึ่งเป็นมาตรการความปลอดภัยที่ดี
* ### ข้อเสียของ Logic นี้ ###
  * การจัดการ Token Blacklisting/Revocation ที่ซับซ้อนขึ้น: เนื่องจาก JWT เป็น Stateless การเพิกถอน Token ทันทีเมื่อผู้ใช้ออกจากระบบหรือเมื่อ Token ถูกขโมยทำได้ยากกว่าระบบ Session-based ทั่วไป หากต้องการ Blacklist Token ที่ถูกเพิกถอน จะต้องมีกลไกเพิ่มเติม เช่น การเก็บ Token ที่ถูก Blacklist ไว้ในฐานข้อมูลหรือ Redis ซึ่งเพิ่มความซับซ้อนให้กับระบบ
  * การพึ่งพาเวลาหมดอายุ (Expiration Time): แม้จะมีการรีเฟรช Token อัตโนมัติ แต่หากระบบเกิดปัญหาและไม่สามารถรีเฟรช Token ได้ ผู้ใช้ก็ยังคงต้อง Login ใหม่เมื่อ Token หมดอายุจริง
  * ความซับซ้อนในการ Debug: การ Debug ปัญหาที่เกี่ยวข้องกับ JWT และ Cookie อาจซับซ้อนกว่าการจัดการ Session ID แบบดั้งเดิม เนื่องจาก Token ถูกเข้ารหัสและเก็บไว้ใน Cookie


## API Reference (Mock Data + TMDB Proxy)

> Frontend เชื่อมต่อกับ backend API ที่จำลองข้อมูล และเป็น proxy สำหรับ TMDB API
> [TMDB Docs](https://developer.themoviedb.org/)

### Authentication

| Method | Endpoint     | Description                          |
| ------ | ------------ | ------------------------------------ |
| POST   | /auth/login  | Login และตั้งค่า JWT Cookie / Token  |
| GET    | /auth/me     | ดึงข้อมูลผู้ใช้ที่เข้าสู่ระบบแล้ว    |
| POST   | /auth/logout | ออกจากระบบและล้าง JWT Cookie         |
| GET    | /auth/ping   | Ping session เพื่อต่ออายุ JWT Cookie |

### Movies

| Method | Endpoint                  | Description                          |
| ------ | ------------------------- | ------------------------------------ |
| GET    | /movies/popular           | ดึงรายการภาพยนตร์ยอดนิยมจาก TMDB         |
| GET    | /movies/:id               | ดึงรายละเอียดภาพยนตร์จาก TMDB ตาม ID      |
| GET    | /movies/search?query=...  | ค้นหาภาพยนตร์จาก TMDB                  |
| GET    | /movies/top-rated         | ดึงรายการภาพยนต์จัดอันดับจาก TMDB          |
| GET    | /movies/upcoming          | ดึงรายการภาพยนต์ที่กำลังมาจาก TMDB         |
| GET    | /movies/now-playing       | ดึงรายการภาพยนต์ที่กำลังเข้าฉายจาก TMDB       |

### Profile

| Method | Endpoint      | Description                                                  |
| ------ | ------------- | ------------------------------------------------------------ |
| GET    | /profile      | ดึงโปรไฟล์ของ User ทั้งหมดจาก Mock Data โดยจะตรวจ User ID จาก Token |
| GET    | /profile/:id  | ดึงโปรไฟล์เฉพาะจาก Mock Data ตาม Profile ID                       |

---

## Future Enhancements

* เชื่อมต่อฐานข้อมูลจริง (Database) (Auth System)
* ฟีเจอร์จัดการโปรไฟล์ (สร้าง, แก้ไข, ลบ)
* การสมัครสมาชิก
* การจัดการสถานะโหลด/ข้อผิดพลาดอย่างละเอียด
* รองรับหลายภาษา (i18n)
* ปรับปรุง UI เพิ่มเติม เช่น:
  * ปุ่มสลับธีม
  * เมนูนำทางที่สมบูรณ์
  * Skeleton Loaders

---

## License

MIT © 2025 \[Sirikup Mowong]

Built with love as part of the Nextzy Full-stack Engineer technical test.

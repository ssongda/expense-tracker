# 지출 흐름 가계부 (Expense Flow Tracker)

이 프로젝트는 사용자의 지출을 추적하고 관리하는 웹 애플리케이션입니다. React와 Next.js를 기반으로 구축되었으며, 사용자 친화적인 인터페이스를 제공합니다.

## 주요 기능

- 달력 기반의 지출 추적
- 연도 및 월 선택 기능
- 반응형 디자인

## 기술 스택

- Next.js 14.2.13
- React 18
- TypeScript
- date-fns (날짜 처리 라이브러리)
- CSS Modules (스타일링)

## 프로젝트 구조

expense-tracker/
├── .next/                                # Next.js 빌드 아티팩트 (자동 생성)
├── node_modules/                         # 프로젝트 의존성 (자동 생성)
├── prisma/                               # Prisma 관련 파일 및 설정
│   └── schema.prisma                     # Prisma 스키마 파일
├── src/                                  # 소스 코드
│   ├── app/                              # 애플리케이션 설정 및 전역 상태 관리
│   │   ├── auth/                         # 인증 관련 파일
│   │   │   ├── create-account/           # 계정 생성 관련 파일
│   │   │   │   ├── action.ts             # 계정 생성 처리 로직
│   │   │   │   ├── index.module.css      # 계정 생성 페이지 스타일
│   │   │   │   └── page.tsx              # 계정 생성 페이지 컴포넌트
│   │   │   ├── login/                    # 로그인 관련 파일
│   │   │   │   ├── action.ts             # 로그인 처리 로직
│   │   │   │   ├── index.module.css      # 로그인 페이지 스타일
│   │   │   │   └── page.tsx              # 로그인 페이지 컴포넌트
│   │   │   ├── index.module.css          # 인증 관련 스타일
│   │   │   ├── layout.tsx                # 인증 관련 레이아웃 컴포넌트
│   │   │   └── page.tsx                  # 인증 메인 페이지 컴포넌트
│   │   ├── expences/                     # 지출 관련 파일
│   │   │   ├── analysis/                 # 지출 내역 분석 관련 파일
│   │   │   │   └── page.tsx              # 지출 내역 분석 페이지 컴포넌트
│   │   │   ├── expenses/                 # 지출 내역 관련 파일
│   │   │   │   └── page.tsx              # 지출 내역 페이지 컴포넌트
│   │   │   └── layout.tsx                # 지출 관련 레이아웃 컴포넌트
│   │   ├── api/                          # API 라우트
│   │   │   ├── expenses/                 # 지출 관련 API
│   │   │   │   └── route.ts              # 지출 관련 API 라우트
│   │   ├── fonts/                        # 폰트 관련 파일
│   │   │   ├── GeistMonoVF.woff          # GeistMono 폰트 파일
│   │   │   └── GeistVF.woff              # Geist 폰트 파일
│   │   ├── github/                       # GitHub 관련 파일
│   │   │   ├── complete/                 # 완료된 GitHub 작업 관련 파일
│   │   │   │   └── route.ts              # 완료된 작업 API 라우트
│   │   │   └── start/                    # 시작된 GitHub 작업 관련 파일
│   │   │       └── route.ts              # 시작된 작업 API 라우트
│   │   ├── favicon.ico                   # 사이트 파비콘
│   │   ├── globals.css                   # 전역 스타일
│   │   ├── layout.tsx                    # 페이지 레이아웃 컴포넌트
│   │   ├── page.module.css               # 페이지 모듈 스타일
│   │   └── Provider.tsx                  # 전역 상태 관리 또는 컨텍스트 제공자
│   ├── components/                       # 재사용 가능한 컴포넌트
│   │   ├── Analysis/                     # 지출 내역 분석 컴포넌트
│   │   │   ├── index.module.css          # 지출 내역 분석 스타일
│   │   │   └── index.tsx                 # 지출 내역 분석 컴포넌트
│   │   ├── Calendar/                     # 달력 관련 컴포넌트
│   │   │   ├── CalendarHeader/           # 달력 헤더 컴포넌트
│   │   │   │   ├── index.module.css      # 달력 헤더 스타일
│   │   │   │   └── index.tsx             # 달력 헤더 컴포넌트
│   │   │   ├── index.module.css          # 달력 스타일
│   │   │   └── index.css                 # 달력 기본 스타일
│   │   ├── common/                       # 공통 컴포넌트
│   │   │   ├── Button/                   # 버튼 컴포넌트
│   │   │   │   ├── index.module.css      # 버튼 스타일
│   │   │   │   └── index.tsx             # 버튼 컴포넌트
│   │   │   ├── Input/                    # 입력 필드 컴포넌트
│   │   │   │   ├── index.module.css      # 입력 필드 스타일
│   │   │   │   └── index.tsx             # 입력 필드 컴포넌트
│   │   ├── Expenses/                     # 지출 관련 컴포넌트
│   │   │   │   ├── ExpenseInput/         # 지출 입력 컴포넌트
│   │   │   │   │   ├── hooks/            # 지출 입력 관련 훅
│   │   │   │   │   │   └── index.ts      # 지출 입력 훅
│   │   │   │   │   ├── index.module.css  # 지출 입력 스타일
│   │   │   │   │   └── index.tsx         # 지출 입력 컴포넌트
│   │   │   │   ├── ExpenseItem/          # 지출 항목 컴포넌트
│   │   │   │   │   ├── index.module.css  # 지출 항목 스타일
│   │   │   │   │   └── index.tsx         # 지출 항목 컴포넌트
│   │   │   │   ├── ExpenseTotal/         # 지출 총합 컴포넌트
│   │   │   │   │   ├── index.module.css  # 지출 총합 스타일
│   │   │   │   │   └── index.tsx         # 지출 총합 컴포넌트
│   │   │   │   ├── hooks/                # 지출 관련 훅
│   │   │   │   │   ├── addExpense.ts     # 지출 추가 훅
│   │   │   │   │   ├── deleteExpenses.ts # 지출 삭제 훅
│   │   │   │   │   └── index.ts          # 훅의 인덱스 파일
│   │   │   │   ├── ListControlPanel/     # 리스트 제어 패널 컴포넌트
│   │   │   │   │   ├── hooks/            # 리스트 제어 패널 관련 훅
│   │   │   │   │   │   └── index.ts      # 리스트 제어 패널 훅
│   │   │   │   │   ├── index.module.css  # 리스트 제어 패널 스타일
│   │   │   │   │   └── index.tsx         # 리스트 제어 패널 컴포넌트
│   │   │   │   └── index.module.css      # 지출 관련 스타일
│   │   │   │   └── index.tsx             # 지출 내역 페이지 컴포넌트
│   │   ├── GlobalHeader/                 # 전역 헤더 컴포넌트
│   │   │   ├── index.module.css          # 전역 헤더 스타일
│   │   │   └── index.tsx                 # 전역 헤더 컴포넌트
│   │   ├── Label/                        # 라벨 컴포넌트
│   │   │   ├── index.module.css          # 라벨 스타일
│   │   │   └── index.tsx                 # 라벨 컴포넌트
│   │   ├── Login/                        # 로그인 컴포넌트
│   │   │   ├── index.module.css          # 로그인 스타일
│   │   │   └── index.tsx                 # 로그인 컴포넌트
│   │   ├── SocialLogin/                  # 소셜 로그인 컴포넌트
│   │   │   ├── index.module.css          # 소셜 로그인 스타일
│   │   │   └── index.tsx                 # 소셜 로그인 컴포넌트
│   │   └── YearSelector/                 # 연도 선택 컴포넌트
│   │       ├── index.module.css          # 연도 선택 스타일
│   │       └── index.tsx                 # 연도 선택 컴포넌트
│   ├── domain/                           # 도메인 모델 및 비즈니스 로직
│   │   └── model/                        # 도메인 모델
│   │       └── expense/                  # 지출 모델
│   │           └── index.ts              # 지출 모델 로직
│   ├── lib/                              # 라이브러리 및 외부 모듈
│   │   ├── constants.ts                  # 상수 정의
│   │   ├── prisma.ts                     # Prisma 클라이언트 설정
│   │   └── session.ts                    # 세션
│   └── utils/                            # 유틸리티 함수
│       └── common/                       # 공통 유틸리티
│           ├── combineClassname.ts       # 클래스 이름 결합 함수
│           └── formatNumber.ts           # 숫자 포맷팅 함수
├── .env                                  # 환경 변수
├── .eslintrc.json                        # ESLint 설정 파일
├── .gitignore                            # Git 무시할 파일 목록
├── .prettierrc.cjs                       # Prettier 설정 파일
├── middleware.ts                         # Next.js 미들웨어 파일
├── next-env.d.ts                         # Next.js 환경 설정 파일 (자동 생성)
├── next.config.mjs                       # Next.js 설정 파일
├── package-lock.json                     # 패키지의 정확한 버전 관리 (자동 생성)
├── package.json                          # 프로젝트 의존성 및 스크립트
├── tsconfig.json                         # TypeScript 설정 파일
└── yarn.lock                             # Yarn 패키지의 정확한 버전 관리 (자동 생성)
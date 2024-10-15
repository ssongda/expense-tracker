# 支出フロー家計簿 (Expense Flow Tracker)

このプロジェクトは、ユーザーの支出を追跡し管理するウェブアプリケーションです。
ReactとNext.jsを基盤に構築されており、ユーザーフレンドリーインターフェースを提供しています。

## 主な機能

- カレンダーに基づく支出追跡
- 年と月の選択機能
- レスポンシブデザイン

## 技術スタック

- Next.js 14.2.13
- React 18
- TypeScript
- date-fns (日付処理ライブラリ)
- CSS Modules (スタイリング)
- prisma
- prettier (コードフォーマット)

## プロジェクト構造
```shell
expense-tracker/
src/
├─app
│  ├─(auth)                
│  │  ├─create-account     # アカウント生成
│  │  └─login              # ログイン
│  ├─(expences)            
│  │  ├─analysis           # 支出分析
│  │  └─expenses           # 支出一覧
│  ├─api 
│  │  └─expenses           # 支出API
│  ├─fonts
│  └─github
│      ├─complete
│      └─start
├─components
│  ├─Analysis
│  ├─Calendar
│  │  └─CalendarHeader
│  ├─common
│  │  ├─Button
│  │  ├─Input
│  │  └─Label
│  ├─Expenses
│  │  ├─ExpenseInput
│  │  │  └─hooks
│  │  ├─ExpenseItem
│  │  ├─ExpenseTotal
│  │  ├─hooks
│  │  └─ListControlPanel
│  │      └─hooks
│  ├─GlobalHeader
│  │  └─Avatar
│  ├─SocialLogin
│  └─YearSelector
├─domain
│  └─model
│      ├─expense
│      └─user
├─lib
└─utils
    └─common
```

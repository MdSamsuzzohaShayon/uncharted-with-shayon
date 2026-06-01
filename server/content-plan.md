# 📁 Strapi Server Project Structure

## 🏗️ Root Directory (`server/`)

```
server/
├── config/
├── create-table.md
├── data/
├── database/
├── dist/
├── favicon.png
├── node_modules/
├── package.json
├── package-lock.json
├── plan.md
├── public/
├── README.md
├── scripts/
├── src/
├── tsconfig.json
└── types/
```

---

## 📦 Source Code (`src/`)

```
src/
├── admin/
├── api/
├── components/
├── extensions/
├── index.ts
├── middlewares/
└── plugins/
```

---

## 🔌 Custom Plugin: Editor.js

```
src/plugins/editorjs/
├── admin/
│   └── src/
│       ├── components/
│       │   └── Editor.tsx
│       └── index.ts
│
└── package.json
```

---

## 🎨 Editor.js Admin UI Layer

```
admin/src/
├── components/
│   └── Editor.tsx   → React Editor.js wrapper
│
└── index.ts         → Custom field registration
```

---

## ⚙️ Plugin Configuration (Strapi)

### `config/plugins.ts`

```ts
upload:
  ├── provider: aws-s3 (Cloudflare R2)
  ├── endpoint: R2_ENDPOINT
  ├── bucket: R2_BUCKET
  ├── public baseUrl: R2_PUBLIC_URL
  └── security:
      ├── maxFileSize: 10MB
      └── allowedTypes: images only

editorjs:
  ├── enabled: true
  └── resolve: ./src/plugins/editorjs
```

---

# 🧠 Architecture Overview

## 🟣 1. Backend (Strapi Core)

```
API Layer
 ├── api/
 ├── services/
 ├── controllers/
 └── database/
```

---

## 🟡 2. Plugin System

```
plugins/
 ├── editorjs  ← custom rich text editor
 ├── upload    ← Cloudflare R2 integration
```

---

## 🔵 3. Admin Panel (React)

```
admin/
 ├── Content-Type Builder
 ├── Custom Fields (Editor.js)
 └── UI Components (React)
```

---

## 🟢 4. Media Storage

```
Cloudflare R2
 ├── images uploaded via Strapi upload plugin
 ├── public URLs generated via baseUrl
```

---

# 🧩 Data Flow (Important)

## ✍️ Writing an article

```
Admin UI (Editor.js)
        ↓
Custom Field (JSON)
        ↓
Strapi API
        ↓
Database (Postgres/MySQL)
```

---

## 🖼️ Image upload flow

```
Editor.js / Strapi Upload
        ↓
Cloudflare R2 (S3 API)
        ↓
Public URL stored in Strapi
        ↓
Used in frontend (Nuxt)
```

---

# ⚠️ Key Insight About Your Setup

You currently have a **hybrid architecture**:

### 🧠 CMS Layer

* Strapi v5
* Custom plugin system
* JSON-based Editor.js content

### ☁️ Media Layer

* Cloudflare R2 (S3-compatible)
* Strapi upload provider configured

### 🌐 Frontend Layer

* Nuxt.js (consumes Strapi API)
* Renders Editor.js JSON → HTML

---


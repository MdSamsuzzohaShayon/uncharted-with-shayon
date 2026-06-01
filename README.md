# 🌍 Uncharted With Shayon

**Description:**
Uncharted With Shayon is a modern travel and photography platform combining **travel blogs**, **location guides**, and **activity showcases** with stunning photography. It allows users to explore locations, read articles, view galleries, and manage travel content through a robust CMS.

**Live Preview:** [https://uncharted.webdevlab.org](https://uncharted.webdevlab.org)

---

## 🛠 Tech Stack

| Layer        | Technology                                                                    |
| ------------ | ----------------------------------------------------------------------------- |
| Frontend     | Nuxt 4, TypeScript, Pinia (state management)                                  |
| Backend      | Strapi, Node.js, TypeScript                                                   |
| Database     | PostgreSQL (Neon)                                                             |
| File Storage | Cloudflare R2                                                                 |
| Features     | Articles, Categories, Tags, Activities, Locations, Galleries, User Management |

---

## 🎨 Design

* **Font:** Brittany
* **Primary Colors:** `#f6b234`, `#0e3267`
* **Design Inspirations:**

  * [Exploreist Theme](https://themeperch.net/html/exploreist/pages/home-6.html)
  * [Tripp Theme](https://tripptheme.com/tripp3/)

---

## 🏗 Project Structure

```text
uncharted-with-shayon/
│
├── client/                      # Nuxt 4 Frontend
│   ├── app/
│   │   ├── assets/              # CSS, images, fonts
│   │   ├── components/          # Reusable UI components
│   │   ├── layouts/             # Layouts (default, auth, etc.)
│   │   ├── pages/               # Route pages
│   │   ├── composables/         # Reusable logic (useAuth, useApi)
│   │   ├── plugins/             # Nuxt plugins
│   │   ├── middleware/          # Route middleware (auth, guest)
│   │   ├── stores/              # Pinia / state management
│   │   ├── utils/               # Helper functions
│   │   └── types/               # Frontend TypeScript types
│   │
│   ├── shared/                  # Shared logic across the app
│   │   ├── api/                 # API clients / fetch wrappers
│   │   ├── constants/           # App constants
│   │   └── types/               # Shared TypeScript types
│   │
│   ├── public/                  # Static files
│   ├── .nuxt/                   # Auto-generated (ignore)
│   ├── .output/                 # Build output
│   ├── nuxt.config.ts
│   ├── tsconfig.json
│   ├── package.json
│   └── .env
│
├── server/                       # Strapi Backend
│   ├── config/                  # App & plugin configs
│   │   ├── database.ts
│   │   ├── server.ts
│   │   └── middlewares.ts
│   │
│   ├── src/
│   │   ├── api/                 # Business logic modules
│   │   │   ├── post/
│   │   │   │   ├── content-types/
│   │   │   │   ├── controllers/
│   │   │   │   ├── routes/
│   │   │   │   └── services/
│   │   │   ├── user/
│   │   │   └── ...other modules
│   │   │
│   │   ├── extensions/          # Extend Strapi plugins
│   │   ├── middlewares/         # Custom middlewares
│   │   ├── policies/            # Auth / permissions logic
│   │   └── utils/               # Helper functions
│   │
│   ├── database/                # DB setup & migrations
│   ├── data/                    # Seed data
│   ├── public/                  # Uploaded files
│   ├── scripts/                 # Automation scripts
│   ├── dist/                    # Compiled output
│   ├── types/                   # Backend TypeScript types
│   ├── .strapi/                 # Internal Strapi files
│   ├── .env
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── docs/                        # Optional documentation
│   ├── architecture.md
│   ├── api.md
│   └── database.md
│
├── scripts/                     # Root-level scripts (CI/CD, setup)
├── .gitignore
├── README.md
└── docker-compose.yml (optional)
```

---

## 🚀 Usage

### 1. Clone the repository

```bash
git clone https://github.com/MdSamsuzzohaShayon/uncharted-with-shayon.git
```

---

### 2. Strapi Backend

```bash
cd server
cp .env.example .env      # Create environment variables
npm install               # Install dependencies
npm run dev               # Start development server
```

* Admin Panel: [http://localhost:1337/admin](http://localhost:1337/admin)
* API Endpoints: [http://localhost:1337/api](http://localhost:1337/api)

---

### 3. Nuxt Frontend

```bash
cd client
cp .env.example .env      # Create environment variables
npm install               # Install dependencies
npm run dev               # Start development server
```

* Frontend: [http://localhost:3000](http://localhost:3000)

---

## 🗄 Database Information

**Database:** PostgreSQL (Neon)

**Tables & Key Fields:**

| Table        | Fields & Relations                                                                                                                                                                                                                                                           |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **activity** | `title, name, slug, icon, description, feature_image, short_description, gallery, duration, cost, location (relation), articles (relation), tags (relation)`                                                                                                                 |
| **article**  | `title, slug, description, youtube_url, featured_image, gallery, published_date, travel_cost, best_time, map_lat, map_lng, categories (relation), tags (relation), location (relation), meta_title, meta_description, og_image, canonical_url, views, activities (relation)` |
| **category** | `name, slug, icon, articles (relation)`                                                                                                                                                                                                                                      |
| **location** | `name, slug, district, division, description, cover_image, latitude, longitude, articles (relation), activities (relation)`                                                                                                                                                  |
| **tag**      | `name, slug, articles (relation), activities (relation)`                                                                                                                                                                                                                     |
| **user**     | `username, email, provider, password, resetPasswordToken, confirmationToken, confirmed, blocked, role (relation)`                                                                                                                                                            |

> To switch databases, update `server/config/database.ts`.

---

## 💡 Features

* Fully responsive **Nuxt 4 frontend**
* **Strapi backend** with modular APIs
* Role-based authentication and permissions
* Dynamic routing with **SEO-friendly URLs**
* Gallery & media management
* Configurable environment variables for easy deployment

---

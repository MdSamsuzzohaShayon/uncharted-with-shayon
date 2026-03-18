# 1. Create the Strapi Project

Use the latest Strapi version.

```bash
npx create-strapi@latest travel-cms
```

Select:

```
Custom installation
Database → PostgreSQL
```

Or install manually:

```bash
npm install pg
```

Run the server:

```bash
npm run dev
```

Admin panel:

```
http://localhost:1337/admin
```

---

# 2. PostgreSQL Configuration

Edit `.env`.

```env
DATABASE_CLIENT=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=travel_blog
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=yourpassword
DATABASE_SSL=false
```

Strapi database config:

```
config/database.ts
```

Example:

```ts
export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST'),
      port: env.int('DATABASE_PORT'),
      database: env('DATABASE_NAME'),
      user: env('DATABASE_USERNAME'),
      password: env('DATABASE_PASSWORD'),
    },
  },
});
```

---

# 3. Content Types (Most Important)

Create these collections.

## Travel Post

This is your **main blog post model**.

Fields:

```
title (text)
slug (uid)
description (text)
content (rich text)
youtube_url (text)
featured_image (media)
gallery (media multiple)
published_date (date)
travel_cost (number)
best_time (text)
map_lat (decimal)
map_lng (decimal)
```

Relations:

```
category → many to one
location → many to one
tags → many to many
```

---

## Location

```
name
slug
district
division
description
cover_image
latitude
longitude
```

---

## Category

```
name
slug
icon
```

Examples:

```
Beach
Mountain
Island
Waterfall
Historical
Food
```

---

## Tags

```
name
slug
```

Examples:

```
budget
solo
family
trekking
camping
```

---

# 4. Create API Permissions

Go to:

```
Settings → Roles → Public
```

Allow:

```
find
findOne
```

For:

```
article
location
category
tag
```

This allows your Nuxt.js frontend to fetch posts.

Example API:

```
GET /api/articles
```

With relations:

```
/api/articles?populate=*
```

---

# 5. Setup Slug System

Each blog post should have a **slug**.

Example:

```
/blog/sajek-valley-travel-guide
```

In Strapi:

Field type → **UID**

Connected to:

```
title
```

---

# 6. Cloudflare R2 Upload Setup

Since R2 is **S3 compatible**, install provider.

```bash
npm install @strapi/provider-upload-aws-s3
```

Edit:

```
config/plugins.ts
```

Example:

```ts
export default ({ env }) => ({
  upload: {
    config: {
      provider: 'aws-s3',
      providerOptions: {
        accessKeyId: env('R2_ACCESS_KEY'),
        secretAccessKey: env('R2_SECRET_KEY'),
        region: 'auto',
        endpoint: env('R2_ENDPOINT'),
        params: {
          Bucket: env('R2_BUCKET'),
        },
      },
    },
  },
});
```

Environment variables:

```env
R2_ACCESS_KEY=
R2_SECRET_KEY=
R2_BUCKET=
R2_ENDPOINT=
```


## **7. Optimize Image Structure**

### What this is:

This is about **organizing your media files** in R2 (or any cloud storage) in a structured folder hierarchy. Example:

```
travel-blog/
   posts/
   gallery/
   thumbnails/
   locations/
```

* `posts/` → Featured images for blog posts
* `gallery/` → Multiple images per post
* `thumbnails/` → Pre-generated small images for previews
* `locations/` → Cover images for each location

### Why it’s important:

1. Keeps your bucket **organized**. Imagine hundreds of images; folders prevent chaos.
2. Makes it easier to **apply automated transformations** (resizing, CDN caching).
3. Useful when **migrating** or **backing up** your media.

### How to do it in Strapi:

Add `rootPath` to your R2 plugin configuration for automatic folder usage:

```ts
params: {
  Bucket: env('R2_BUCKET'),
  ACL: 'public-read',
},
rootPath: 'travel-blog', // this is the folder prefix
```

Then, when you upload via Strapi, images go under `travel-blog/...`.

---

## **8. Enable SEO Fields**

### What this is:

Add extra fields to your Travel Post model for **search engine optimization**:

```
meta_title
meta_description
og_image
canonical_url
```

* **meta_title** → Title shown on Google search results
* **meta_description** → Description snippet in search results
* **og_image** → Image for social sharing (Facebook, Twitter)
* **canonical_url** → Prevent duplicate content issues

### Why it’s important:

1. Helps your blog **rank on Google**.
2. Ensures **social media posts** display correctly.
3. Avoids SEO penalties for duplicate content.

### How to do it:

1. In Strapi admin → Content-Types → Travel Post → Add new fields.
2. Field types:

   * `meta_title` → text
   * `meta_description` → text
   * `og_image` → media
   * `canonical_url` → text

---

## **9. Custom API (Optional but Powerful)**

### What this is:

Instead of only using default Strapi endpoints (`/api/articles`), you can create **custom controllers and routes** for specialized APIs.

Example: `/api/featured-posts` → fetch latest or trending posts.

### Why it’s important:

1. Gives **precise control** over what data is returned.
2. Allows **optimized queries**, instead of pulling all posts and filtering on frontend.
3. Enables features like **trending posts, top-rated posts**, etc.

### How to do it:

1. Create `src/api/featured-posts/controllers/featured-posts.ts`:

```ts
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::travel-post.travel-post', ({ strapi }) => ({
  async findFeatured(ctx) {
    const posts = await strapi.db.query('api::travel-post.travel-post').findMany({
      where: { featured: true },
      orderBy: { published_date: 'desc' },
      populate: '*',
    });
    return posts;
  },
}));
```

2. Add a route in `routes/featured-posts.ts`:

```ts
{
  method: 'GET',
  path: '/featured-posts',
  handler: 'featured-posts.findFeatured',
  config: { auth: false },
}
```

3. Call `/api/featured-posts` from your frontend.

---

## **10. Add View Count System**

### What this is:

A **numeric field `views`** tracks how many times a post has been read.

### Why it’s important:

1. Helps **identify trending posts**.
2. Can **power “Most Popular” or “Trending” sections**.
3. Useful for analytics without external services.

### How to do it:

1. Add `views` field (integer) to Travel Post.
2. Create a route and controller to increment view count:

```ts
// controller
async incrementView(ctx) {
  const { id } = ctx.params;
  const post = await strapi.db.query('api::travel-post.travel-post').findOne({ where: { id } });
  if (post) {
    await strapi.db.query('api::travel-post.travel-post').update({
      where: { id },
      data: { views: post.views + 1 },
    });
  }
  return { success: true };
}
```

3. Call this route whenever the frontend **renders a post**.

---

## **11. Enable Rich Blog Content**

### What this is:

Instead of plain text, use **Rich Text Editor or Markdown** for posts.

* Strapi has built-in **Rich Text (WYSIWYG)**.
* Markdown allows developers to **store structured content**.

### Why it’s important:

1. Travel blogs need **formatted content**: headings, lists, images, quotes.
2. Markdown is great for **exporting or migrating content** later.
3. Makes your blog **visually rich and professional**.

### How to do it:

1. Go to Travel Post → Add Field → Rich Text (or Markdown plugin).
2. Replace `content` field with Rich Text type.

---

## **12. API Query Examples**

### What this is:

You need to know how to **fetch data from Strapi**.

Examples:

* **All posts with relations**:

```
GET /api/articles?populate=*
```

* **Filter by location**:

```
GET /api/articles?filters[location][slug][$eq]=sajek
```

* **Sort by published date**:

```
GET /api/articles?sort=published_date:desc
```

### Why it’s important:

1. Frontend can fetch only **needed data**, reducing payload.
2. Enables **dynamic pages**, e.g., location pages, latest posts.
3. Populating relations ensures **Category, Tags, Location** are included.

---

## **13. Recommended Backend Folder Structure**

### Example:

```
src/
  api/
    article/
    location/
    category/
    tag/
  extensions/
config/
```

* `api/` → All your content types
* `extensions/` → Customizations of plugins
* `config/` → Database, plugins, server configs

### Why it’s important:

1. Makes project **maintainable**.
2. Clear separation between **core logic, plugins, configs**.
3. Helps **teams scale** development.

---

## **14. Deployment Plan**

### Options:

* **Railway / Render / Fly.io** → Easy Strapi hosting
* **VPS** → Full control (needs more DevOps skills)
* Database → Managed PostgreSQL (Supabase, Neon, RDS)

### Why it’s important:

1. Ensures **production-ready backend**.
2. Managed DB = no worries about backups, scaling.
3. Deployment strategy affects **performance and security**.

---

## **15. Security**

* **Disable public write access**.
* Only allow **GET endpoints** for public.
* Use **API tokens** for frontend POST/PUT/DELETE requests if needed.

### Why it’s important:

1. Prevent **unauthorized content changes**.
2. Secures your R2 uploads and DB.
3. Essential for **professional travel blogs**.

---

## **16. Bonus Feature: Itinerary JSON Field**

* Store **day-by-day travel plans** in structured JSON.

Example:

```json
[
  { "day": 1, "activities": ["Dhaka → Bandarban"] },
  { "day": 2, "activities": ["Nilgiri + Chimbuk"] },
  { "day": 3, "activities": ["Nafakhum Waterfall"] }
]
```

### Why it’s important:

1. Makes posts **more structured and readable**.
2. Allows **dynamic rendering**: day-wise tabs, Google Maps markers.
3. Can be **exported or shared easily**.

---

✅ With steps 7–16 implemented, your backend is **fully structured, scalable, and ready for a modern travel blog**.

---

If you want, I can make a **visual workflow diagram** showing:

**Frontend → Strapi → PostgreSQL → R2 → Cloudflare CDN**

With each step labeled why it exists, so you have a **clear blueprint for the entire project**.

Do you want me to make that diagram?

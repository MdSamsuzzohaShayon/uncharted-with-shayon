## **1️⃣ Create Content Types**

### **A. Article**

This will be your main blog post.

1. Go to **Content-Types Builder → Create new collection type** → Name: `Article`.
2. Add the following fields:

| Field            | Type              | Notes                                  |
| ---------------- | ----------------- | -------------------------------------- |
| `title`          | Text (Short text) | Required                               |
| `slug`           | UID               | Connected to `title`                   |
| `description`    | Text (Long text)  | Optional                               |
| `content`        | Rich Text         | Use WYSIWYG editor                     |
| `youtube_url`    | Text              | Optional                               |
| `featured_image` | Media (Single)    | Optional                               |
| `gallery`        | Media (Multiple)  | Optional                               |
| `published_date` | Date              | Optional                               |
| `travel_cost`    | Number            | Optional, can be integer               |
| `best_time`      | Text              | Optional, e.g., "December to February" |
| `map_lat`        | Decimal           | Optional                               |
| `map_lng`        | Decimal           | Optional                               |

3. **Relations** (after creating the collection type):

| Relation   | Type                   | Notes                                    |
| ---------- | ---------------------- | ---------------------------------------- |
| `category` | Many to One → Category | Each Article belongs to one category |
| `location` | Many to One → Location | Each Article is tied to one location |
| `tags`     | Many to Many → Tags    | Each post can have multiple tags         |

---

### **B. Location**

1. **Content-Types Builder → Create new collection type** → Name: `Location`.
2. Add these fields:

| Field         | Type           | Notes               |
| ------------- | -------------- | ------------------- |
| `name`        | Text           | Required            |
| `slug`        | UID            | Connected to `name` |
| `district`    | Text           | Optional            |
| `division`    | Text           | Optional            |
| `description` | Text (Long)    | Optional            |
| `cover_image` | Media (Single) | Optional            |
| `latitude`    | Decimal        | Optional            |
| `longitude`   | Decimal        | Optional            |

---

### **C. Category**

1. **Content-Types Builder → Create new collection type** → Name: `Category`.
2. Fields:

| Field  | Type           | Notes               |
| ------ | -------------- | ------------------- |
| `name` | Text           | Required            |
| `slug` | UID            | Connected to `name` |
| `icon` | Media (Single) | Optional            |

**Example categories**: Beach, Mountain, Island, Waterfall, Historical, Food

---

### **D. Tags**

1. **Content-Types Builder → Create new collection type** → Name: `Tag`.
2. Fields:

| Field  | Type | Notes               |
| ------ | ---- | ------------------- |
| `name` | Text | Required            |
| `slug` | UID  | Connected to `name` |

**Example tags**: budget, solo, family, trekking, camping

---

## **2️⃣ Set up Slug System**

For every collection type (`Article`, `Location`, `Category`, `Tag`):

1. Field type → **UID**
2. Target field → `title` or `name`
3. This ensures your URL-friendly slugs are automatically generated.

**Example Article URL**:

```
/blog/sajek-valley-travel-guide
```

---

## **3️⃣ Configure API Permissions**

1. Go to **Settings → Roles → Public**.
2. Under **Permissions**, for each content type (`article`, `location`, `category`, `tag`), allow:

* `find` → to fetch all entries
* `findOne` → to fetch a single entry by ID or slug

3. Click **Save**.

> This allows your Nuxt.js frontend to fetch posts using:

```http
GET /api/articles
GET /api/articles/:id
```

To populate relations (category, location, tags):

```http
GET /api/articles?populate=*
```

---

## **4️⃣ Optional: Rich Queries**

* Filter by category:

```
GET /api/articles?filters[category][slug][$eq]=beach&populate=*
```

* Filter by tag:

```
GET /api/articles?filters[tags][slug][$eq]=budget&populate=*
```

---

## ✅ Next Steps

1. **Create some entries** in `Category`, `Location`, and `Tag` first.
2. Then create `Article` entries linking to those relations.
3. Test your API endpoints with `/api/articles?populate=*` in the browser or Postman.
4. Use the slugs in Nuxt.js routes like `/blog/:slug`.

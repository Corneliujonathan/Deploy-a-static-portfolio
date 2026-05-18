# 📚 Library Management REST API

> A fully-featured RESTful API for managing books, members, and borrow transactions — built with **Node.js**, **Express**, and **SQLite**.

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.18-000000?style=flat-square&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?style=flat-square&logo=sqlite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)
![Status](https://img.shields.io/badge/Status-Active-00ffc8?style=flat-square)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [Request & Response Examples](#-request--response-examples)
- [Business Rules](#-business-rules)
- [Error Handling](#-error-handling)
- [Author](#-author)

---

## 🔍 Overview

This project implements a **RESTful API** for a Library Management System as part of a backend development learning journey. It supports full **CRUD operations** (Create, Read, Update, Delete) across three core resources — Books, Members, and Borrow Records — with built-in business-rule validation, filtering, search, and pagination.

---

## ✨ Features

- ✅ Full CRUD for **Books**, **Members**, and **Borrow Records**
- ✅ **Search & Filter** — by title, author, ISBN, genre, status, and more
- ✅ **Pagination** — `?page=` and `?limit=` on all list endpoints
- ✅ **Business Rules** — enforced on borrow/return operations
- ✅ **Atomic Transactions** — book copies auto-managed on borrow/return
- ✅ **Overdue Detection** — auto-marks past-due records
- ✅ **Consistent JSON Responses** — `{ success, data, meta }` format
- ✅ **SQLite Database** — zero-config, file-based storage
- ✅ **Morgan HTTP Logging** — request logs in development

---

## 📁 Project Structure

```
library_api_js/
│
├── server.js                  # Entry point — Express app setup
├── database.js                # SQLite connection + schema creation
├── package.json               # Dependencies and scripts
│
├── routes/
│   ├── books.js               # Book CRUD + /available + /history
│   ├── members.js             # Member CRUD + /borrows
│   └── borrows.js             # Borrow CRUD + /return + /overdue
│
└── middleware/
    └── validate.js            # Shared helpers: validation, pagination, responses
```

---

## 🛠 Tech Stack

| Layer        | Technology              |
|--------------|-------------------------|
| Runtime      | Node.js 18+             |
| Framework    | Express.js 4.18         |
| Database     | SQLite (better-sqlite3) |
| HTTP Logging | Morgan                  |
| CORS         | cors                    |
| Dev Server   | nodemon                 |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/your-username/library-management-api.git
cd library-management-api
```

**2. Install dependencies**
```bash
npm install
```

**3. Start the server**
```bash
# Development (auto-restart on file changes)
npm run dev

# Production
npm start
```

**4. The API is now running at:**
```
http://localhost:3000
```

> 💡 The SQLite database file (`library.db`) is created automatically on first run — no setup needed.

---

## 🔗 API Endpoints

**Base URL:** `http://localhost:3000/api/v1`

### 📖 Books

| Method   | Endpoint                      | Description                        |
|----------|-------------------------------|------------------------------------|
| `GET`    | `/books`                      | List all books (search, filter, paginate) |
| `POST`   | `/books`                      | Add a new book                     |
| `GET`    | `/books/:id`                  | Get a single book                  |
| `PUT`    | `/books/:id`                  | Replace a book (full update)       |
| `PATCH`  | `/books/:id`                  | Update specific fields             |
| `DELETE` | `/books/:id`                  | Delete a book                      |
| `GET`    | `/books/available`            | List books with copies in stock    |
| `GET`    | `/books/:id/history`          | Borrow history for a book          |

### 👤 Members

| Method   | Endpoint                      | Description                        |
|----------|-------------------------------|------------------------------------|
| `GET`    | `/members`                    | List all members                   |
| `POST`   | `/members`                    | Register a new member              |
| `GET`    | `/members/:id`                | Get a single member                |
| `PUT`    | `/members/:id`                | Replace a member (full update)     |
| `PATCH`  | `/members/:id`                | Update specific fields             |
| `DELETE` | `/members/:id`                | Delete a member                    |
| `GET`    | `/members/:id/borrows`        | Active borrows for a member        |

### 📦 Borrow Records

| Method   | Endpoint                      | Description                        |
|----------|-------------------------------|------------------------------------|
| `GET`    | `/borrows`                    | List all borrow records            |
| `POST`   | `/borrows`                    | Borrow a book (checkout)           |
| `GET`    | `/borrows/:id`                | Get a single borrow record         |
| `PUT`    | `/borrows/:id`                | Replace a borrow record            |
| `PATCH`  | `/borrows/:id`                | Update specific fields             |
| `DELETE` | `/borrows/:id`                | Delete a borrow record             |
| `POST`   | `/borrows/:id/return`         | Return a borrowed book             |
| `GET`    | `/borrows/overdue`            | List all overdue records           |

### Query Parameters (List Endpoints)

| Parameter  | Example                    | Description                    |
|------------|----------------------------|--------------------------------|
| `search`   | `?search=Python`           | Search across relevant fields  |
| `status`   | `?status=available`        | Filter by status               |
| `genre`    | `?genre=Programming`       | Filter by genre (books)        |
| `ordering` | `?ordering=-year`          | Sort (prefix `-` for DESC)     |
| `page`     | `?page=2`                  | Page number (default: 1)       |
| `limit`    | `?limit=5`                 | Items per page (default: 10)   |

---

## 📨 Request & Response Examples

### Create a Book — `POST /api/v1/books`

**Request Body:**
```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "isbn": "9780132350884",
  "genre": "Programming",
  "year": 2008,
  "total_copies": 5,
  "available_copies": 5
}
```

**Response — 201 Created:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Clean Code",
    "author": "Robert C. Martin",
    "isbn": "9780132350884",
    "genre": "Programming",
    "year": 2008,
    "total_copies": 5,
    "available_copies": 5,
    "status": "available",
    "created_at": "2026-05-18T10:30:00"
  }
}
```

---

### Borrow a Book — `POST /api/v1/borrows`

**Request Body:**
```json
{
  "book_id": 1,
  "member_id": 2,
  "due_date": "2026-06-15",
  "notes": "For semester project"
}
```

**Response — 201 Created:**
```json
{
  "success": true,
  "data": {
    "id": 5,
    "book_id": 1,
    "member_id": 2,
    "book_title": "Clean Code",
    "member_name": "Arjun Ravi",
    "borrow_date": "2026-05-18",
    "due_date": "2026-06-15",
    "status": "borrowed"
  }
}
```

---

### Return a Book — `POST /api/v1/borrows/5/return`

No request body needed.

**Response — 200 OK:**
```json
{
  "success": true,
  "data": {
    "message": "Book returned successfully.",
    "record": {
      "id": 5,
      "status": "returned",
      "return_date": "2026-05-18",
      "book_title": "Clean Code",
      "member_name": "Arjun Ravi"
    }
  }
}
```

---

## ⚙️ Business Rules

The following rules are automatically enforced when borrowing a book:

| # | Rule |
|---|------|
| 1 | Book must have at least **1 available copy** |
| 2 | `due_date` must be a **future date** |
| 3 | Member `membership_status` must be **active** |
| 4 | Member must be **below their borrow limit** (`max_borrow_limit`) |

When returning a book:
- `available_copies` is **automatically incremented**
- Book `status` is set back to `available`
- Overdue check runs automatically on `GET /borrows/overdue`

---

## ❌ Error Handling

All errors return a consistent JSON structure:

```json
{
  "success": false,
  "error": "Human-readable error message here."
}
```

| Status Code | Meaning                                      |
|-------------|----------------------------------------------|
| `400`       | Bad Request — validation or business rule    |
| `404`       | Not Found — resource doesn't exist           |
| `204`       | No Content — successful delete               |
| `500`       | Internal Server Error                        |

---

## 👤 Author

**Your Name**
- 🎓 B.E. Electrical Engineering (Final Year)
- 💻 Aspiring Backend Developer
- 🛠 Skills: Python · Django · SQL · JavaScript · Node.js
- 📍 Chennai, Tamil Nadu

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/your-profile)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-181717?style=flat-square&logo=github)](https://github.com/your-username)

---

## 📄 License

This project is licensed under the **MIT License** — free to use, modify, and distribute.

---

> Built as part of a structured backend development learning path. Feedback and contributions are welcome!

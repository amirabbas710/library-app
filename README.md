# 📚 library.app

**A Modern Library Management System built with Pure JavaScript & OOP**

![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Latest-339933?style=flat&logo=node.js&logoColor=white)
![OOP](https://img.shields.io/badge/Paradigm-OOP-blueviolet?style=flat)
![License](https://img.shields.io/badge/License-MIT-green?style=flat)

A fully-featured, console-based library management service demonstrating advanced Object-Oriented Programming, Clean Architecture, and Real-World Business Logic.

## 🎬 Demo
============================================================
📚 Welcome to library management service
============================================================

📚 Step 1: Add books to library

✅ #1 - Ai (2 Copies)
✅ #2 - Security (1 Copies)
✅ #3 - Databases (4 Copies)
✅ #4 - Computer Networks (1 Copies)
✅ #5 - Alghoritms (2 Copies)
✅ #6 - Advanced Javascript (3 Copies)

👥 Step 2: Register members

✅ Ali Ahmadi (Student) - Limit: 5 books
✅ Sara Karimi (Teacher) - Limit: 10 books
✅ Reza Hosseiny (User) - Limit: 3 books
✅ Maryam Rezaie (Student) - Limit: 5 books

> 💡 Run `node main.js` to see the full interactive demo with emojis, stats, fines, and error handling!

## ✨ Features

### 📖 Book Management
- Full CRUD operations on books
- Search by title or author
- Filter by category and year range
- Automatic category tracking
- Multi-copy support per book

### 👥 Member Management
- Three member types: User, Student, Teacher
- Different loan limits & durations per type
- Personal debt tracking
- Active loans tracking

### 📤 Borrowing System
- Automatic due date calculation based on member type
- Maximum loan limit enforcement
- Active & overdue loan tracking
- Automatic fine calculation (1000 Toman / day late)
- Full return workflow with debt update

### 📊 Reporting & Analytics
- Top most borrowed books
- Most active members
- Library overview stats
- Average loan duration
- Category distribution
- Top books by year

### 🛡️ Robust Error Handling
Every operation is protected against:
- Non-existent books / members / loans
- Unavailable books (no copies left)
- Loan limit exceeded
- Invalid titles (minimum 2 characters)
- Double returns

## 🏗️ Architecture
library.app/
│
├── main.js ← Demo entry point
├── README.md
├── .gitignore
│
├── models/
│ ├── Member.js ← Base class (no dependencies)
│ ├── StudentMember.js ← extends Member
│ ├── TeacherMember.js ← extends Member
│ ├── Book.js ← Book entity + validation
│ └── Loan.js ← Loan lifecycle (uses Book + Member)
│
└── services/
├── LibraryService.js ← Core business logic
└── ReportService.js ← Analytics & reporting

> 📌 Files are ordered by dependency — base classes first, then specializations, then services that consume them.

### 🧩 Design Principles

| Principle | Implementation |
|-----------|----------------|
| Single Responsibility | Each class handles one concern |
| Separation of Concerns | Models vs. Services vs. Reports |
| Open/Closed | New member types extend `Member` |
| Encapsulation | Private fields (`#loans`, `#books`, `#members`) |
| Data Abstraction | Getters/Setters with validation |

## 🧠 OOP Concepts Used

This project is a showcase of modern JavaScript OOP:

- **Classes & Constructors** — `Book`, `Loan`, `Member` entities
- **Inheritance & Polymorphism** — `StudentMember` & `TeacherMember` extend `Member`:
  ```javascript
  class StudentMember extends Member {
    getLoanLimit() { return 5; }      // overrides base (3)
    getLoanDays()  { return 18; }     // overrides base (14)
    getMemberType() { return "Student"; }
  }
  Encapsulation — Private fields prevent external mutation:
  class LibraryService {
  #loans = [];
  #books = new Map();
  #members = new Map();
  #categories = new Set();
}
Static Members — Book.nextId (auto-increment), Loan.FINE_PER_DAY (1000)

Getters & Setters — With validation (title must be ≥ 2 chars):
set title(value) {
  if (!value || value.trim().length < 2) {
    throw new Error("Title must be at least 2 characters");
  }
  this._title = value.trim();
}
Advanced Data Structures — Map (O(1) lookup), Set (unique categories), Array (loan history)

Factory Pattern — createBook() and createMember() encapsulate instantiation

📦 Tech Stack
Layer	Technology
Language	JavaScript (ES2022+)
Runtime	Node.js
Module System	ES Modules (import/export)
Paradigm	Object-Oriented Programming
Data Structures	Map, Set, Array
Dependencies	Zero — Pure vanilla JS
🎯 No frameworks. No libraries. Pure JavaScript.

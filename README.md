<div align="center">

# 📚 library.app

### A Modern Library Management System built with Pure JavaScript & OOP

[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-Latest-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![OOP](https://img.shields.io/badge/Paradigm-OOP-blueviolet?style=for-the-badge)](https://en.wikipedia.org/wiki/Object-oriented_programming)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)]()

**A fully-featured, console-based library management service demonstrating advanced Object-Oriented Programming, Clean Architecture, and Real-World Business Logic.**

[Features](#-features) • [Architecture](#️-architecture) • [OOP Concepts](#-oop-concepts-used) • [Installation](#-installation) • [Usage](#-usage) • [Roadmap](#️-roadmap)

</div>

---

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

📤 Step 3: Borrow books

✅ Ali loaned Ai book
Due Date: 1403/...
✅ Ali loaned Alghoritms book
Due Date: 1403/...

> 💡 **Tip:** Run the project to see the full interactive demo with emojis, stats, fines, and error handling!

---

## ✨ Features

### 📖 Book Management
- ➕ Create, Read, Update, Delete (full CRUD) books
- 🔍 Search books by **title** or **author**
- 🎯 Advanced filtering by **category**, **year range**
- 📂 Automatic category tracking
- 📦 Multi-copy support per book

### 👥 Member Management
- 🎓 Three member types: **User**, **Student**, **Teacher**
- 🎁 Different loan limits & durations per type
- 📊 Personal debt tracking
- 🔗 Active loans tracking per member

### 📤 Borrowing System
- ⏰ Automatic due date calculation based on member type
- 🚫 Maximum loan limit enforcement
- 📋 Active & overdue loan tracking
- 💰 Automatic fine calculation (1000 Toman / day late)
- 🔄 Full return workflow with debt update

### 📊 Reporting & Analytics
- 🏆 **Top most borrowed books**
- ⭐ **Most active members**
- 📈 **Library overview stats** (books, members, loans, fines)
- ⏱️ **Average loan duration**
- 📂 **Category distribution**
- 📅 **Top books by year**

### 🛡️ Robust Error Handling
Every operation is protected against:
- ❌ Non-existent books/members/loans
- ❌ Unavailable books (no copies left)
- ❌ Loan limit exceeded
- ❌ Invalid titles (minimum 2 characters)
- ❌ Double returns

---

## 🏗️ Architecture
library.app/
│
├── 📄 main.js ← Demo entry point
├── 📄 README.md
├── 📄 .gitignore
│
├── 📁 models/
│ ├── 👤 Member.js ← Base class (no dependencies)
│ ├── 🎓 StudentMember.js ← extends Member
│ ├── 👨‍🏫 TeacherMember.js ← extends Member
│ ├── 📘 Book.js ← Book entity + validation
│ └── 📗 Loan.js ← Loan lifecycle (uses Book + Member)
│
└── 📁 services/
├── 🏛️ LibraryService.js ← Core business logic
└── 📊 ReportService.js ← Analytics & reporting

> 📌 **Note:** Files are ordered by dependency — base classes first, then specializations, then services that consume them.

### 🧩 Design Principles

| Principle | Implementation |
|-----------|----------------|
| **Single Responsibility** | Each class handles one concern (Book, Loan, Member, Reporting) |
| **Separation of Concerns** | Models vs. Services vs. Reports |
| **Open/Closed** | New member types extend `Member` without modifying existing code |
| **Encapsulation** | Private fields (`#loans`, `#books`, `#members`) |
| **Data Abstraction** | Getters/Setters with validation |

---

## 🧠 OOP Concepts Used

This project is a **showcase of modern JavaScript OOP**. Here's exactly what's used and where:

<details>
<summary><b>1️⃣ Classes & Constructors</b></summary>

```javascript
class Book {
  constructor(title, author, year, category, copies = 1) {
    this.title = title;
    this.copies = copies;
    // ...
  }
}
</details><details> <summary><b>2️⃣ Inheritance & Polymorphism</b></summary>
StudentMember and TeacherMember extend Member and override key methods:
class StudentMember extends Member {
  getLoanLimit() { return 5; }      // overrides base (3)
  getLoanDays()  { return 18; }     // overrides base (14)
  getMemberType() { return "Student"; }
}
</details><details> <summary><b>3️⃣ Encapsulation (Private Fields)</b></summary>
class LibraryService {
  #loans = [];
  #books = new Map();
  #members = new Map();
  #categories = new Set();
}
State is fully protected — no external mutation possible.

</details><details> <summary><b>4️⃣ Static Members</b></summary>
class Book {
  static nextId = 1;          // auto-incrementing IDs
}

class Loan {
  static FINE_PER_DAY = 1000; // business constant
}
</details><details> <summary><b>5️⃣ Getters & Setters with Validation</b></summary>
set title(value) {
  if (!value || value.trim().length < 2) {
    throw new Error("Title must be at least 2 characters");
  }
  this._title = value.trim();
}
</details><details> <summary><b>6️⃣ Advanced Data Structures</b></summary>
Map → O(1) book & member lookup by ID

Set → unique category tracking

Array → ordered loan history

</details><details> <summary><b>7️⃣ Factory Pattern</b></summary>
createBook(title, author, category, year, copies) {
  const book = new Book(title, author, year, category, copies);
  this.#books.set(book.id, book);
  return book;
}
</details>
📦 Tech Stack
<div align="center">
Layer	Technology
Language	JavaScript (ES2022+)
Runtime	Node.js
Module System	ES Modules (import/export)
Paradigm	Object-Oriented Programming
Data Structures	Map, Set, Array
Dependencies	✅ Zero — Pure vanilla JS
</div>
🎯 No frameworks. No libraries. Pure JavaScript. This project proves that clean architecture and solid OOP don't require any dependencies.

🚀 Installation
Prerequisites
Node.js (v16 or later recommended)

Any terminal

Setup
# 1. Clone the repository
git clone https://github.com/amirabbas710/library.app.git

# 2. Navigate into the project
cd library.app

# 3. Run the demo
node main.js
That's it. No npm install needed. ✨
💻 Usage
The project ships with main.js — a full interactive demo showcasing every feature. Run it and watch the story unfold:
node main.js
🔧 Using the Services Programmatically
import LibraryService from "./services/LibraryService.js";
import ReportService from "./services/ReportService.js";
import StudentMember from "./models/StudentMember.js";

const library = new LibraryService();
const report = new ReportService(library);

// ➕ Create a book
const book = library.createBook("Clean Code", "Robert Martin", "Programming", 2008, 3);

// 👤 Register a student
const student = library.createMember(
  new StudentMember("Ali Ahmadi", "ali@gmail.com")
);

// 📤 Borrow a book
const loan = library.borrowBook(student.id, book.id);

// 📥 Return it (auto fine calculation)
const { fine } = library.returnBook(loan.id);

// 📊 Get stats
const stats = report.getLibraryStats();
console.log(stats);
🏛️ LibraryService
Method	Description
createBook(title, author, category, year, copies)	Add new book
updateBook(id, updates)	Update book fields
deleteBook(id)	Remove book
getBookById(id) / getAllBooks()	Retrieve books
searchBooks(text)	Search by title/author
filterBooks({ category, yearFrom, yearTo })	Filter books
createMember(member)	Register member
deleteMember(id)	Remove member
borrowBook(memberId, bookId)	Borrow operation
returnBook(loanId)	Return + fine calc
getActiveLoans() / getOverdueLoans()	Loan queries
getMemberLoans(memberId)	Member's loan history
📊 ReportService
Method	Description
getLibraryStats()	Full overview
getMostBorrowedBooks(n)	Top N books
getActiveMembers(n)	Top N members
getTopBooksByYear(year, n)	Best books of a year
getCategoryDistribution()	Books per category
👤 Member Types
Type	Loan Limit	Loan Days
Member (User)	3 books	14 days
StudentMember	5 books	18 days
TeacherMember	10 books	30 days
Fine rate: 1,000 Toman per day late.
🧪 Demo Scenario
main.js walks through a complete real-world story:

✅ Add 6 books across multiple categories

✅ Register 4 members (Student, Teacher, User, Student)

✅ Borrow books under different limits

✅ Show active loans

⏰ Simulate overdue loans

📥 Return a book → automatic fine calculation

🚫 Test 5 error scenarios

📊 Generate full stats & analytics

Every step is logged with emojis and clear formatting — perfect for learning, presenting, or teaching OOP.

🗺️ Roadmap
□ 💾 Persistence layer (JSON / SQLite)
□ 🌐 REST API with Express.js
□ 🖥️ Web dashboard (React / Vue)
□ 🧪 Unit tests with Vitest / Jest
□ 📧 Email notifications for due dates
□ 🔐 Authentication & roles
□ 📱 CLI tool with Commander.js
□ 📊 Export reports to PDF / CSV

🤝 Contributing
Contributions, issues, and feature requests are welcome!
Feel free to check the issues page.

Fork the project

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request
📄 License
Distributed under the MIT License. See LICENSE for more information.

👤 Author
<div align="center">
Amir Abbas

https://img.shields.io/badge/GitHub-amirabbas710-181717?style=for-the-badge&logo=github

⭐ If you found this project useful or learned something from it, please give it a star! ⭐

</div>
<div align="center">
🎓 Built with passion for clean code & OOP
library.app — Because a library deserves a beautiful system.

</div> ```
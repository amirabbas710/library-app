<div align="center">

# 📚 LIBRARY MANAGEMENT SYSTEM

### ✦ Where Knowledge Meets Technology ✦

**A modular, object-oriented library management system built with modern JavaScript.**

Manage books, empower members, automate lending, and turn library activity into meaningful insights.

<br/>

[![JavaScript](https://img.shields.io/badge/JavaScript-ES2022+-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white)](https://nodejs.org/)
[![Architecture](https://img.shields.io/badge/Architecture-Modular-7C3AED?style=for-the-badge)](#-architecture)
[![License](https://img.shields.io/badge/License-Not_Specified-gray?style=for-the-badge)](#-license)

<br/>

**📖 BOOKS**   •   **👥 MEMBERS**   •   **🔄 LOANS**   •   **📊 ANALYTICS**

<br/>

---

</div>

## ✨ The Project

Managing a library involves more than keeping track of books. It requires coordinating members, monitoring available copies, enforcing borrowing policies, handling overdue returns, and understanding how resources are used.

**Library Management System** brings these core responsibilities together in a clean, modular JavaScript application.

Built around Object-Oriented Programming principles, the project models real-world library entities and separates business operations from reporting logic.

> 💡 **The goal:** Build a maintainable foundation for library operations while demonstrating practical JavaScript engineering concepts.

---

## ⚡ Features at a Glance

<table>
<tr>
<td width="50%">

### 📚 Book Management

* Create and update books
* Track available copies
* Search by title or author
* Filter by category and year
* Maintain borrowing statistics

</td>
<td width="50%">

### 👥 Member Management

* Register library members
* Support multiple member types
* Apply individual borrowing limits
* Configure loan durations
* Track active loans and debt

</td>
</tr>
<tr>
<td width="50%">

### 🔄 Loan Management

* Process borrowing transactions
* Generate due dates automatically
* Track active and overdue loans
* Process book returns
* Calculate late-return fines

</td>
<td width="50%">

### 📊 Smart Reporting

* Library-wide statistics
* Most-borrowed book rankings
* Member activity rankings
* Popular books by publication year
* Category distribution reports

</td>
</tr>
</table>

---

## 🧬 Membership System

Different members have different borrowing privileges.

The system implements these policies through inheritance and method overriding rather than duplicating the borrowing workflow.

| Membership           | 📚 Loan Limit | 🗓️ Loan Period |
| :------------------- | :-----------: | :-------------: |
| 👤 Standard Member   |    3 books    |     14 days     |
| 🎓 Student Member    |    5 books    |     18 days     |
| 👨‍🏫 Teacher Member |    10 books   |     30 days     |

### Under the Hood

The base `Member` class defines the default borrowing rules.

`StudentMember` and `TeacherMember` extend that class and override the relevant methods:

```javascript
getLoanLimit() {
  return 5;
}

getLoanDays() {
  return 18;
}

getMemberType() {
  return "Student";
}
```

This approach makes it possible to introduce additional membership categories without rewriting the core borrowing process.

---

## 🏗️ Architecture

The project follows a modular structure that separates domain models, business logic, and reporting responsibilities.

```text
📦 library-management-system
│
├── 📄 main.js
├── 📄 README.md
├── 📄 .gitignore
│
├── 📂 models
│   ├── 📘 Book.js
│   ├── 📋 Loan.js
│   ├── 👤 Member.js
│   ├── 🎓 StudentMember.js
│   └── 👨‍🏫 TeacherMember.js
│
└── 📂 services
    ├── ⚙️ LibraryService.js
    └── 📊 ReportService.js
```

### 📦 Models — The Domain Layer

| Class           | Responsibility                                        |
| :-------------- | :---------------------------------------------------- |
| `Book`          | Book metadata, availability, and borrowing count      |
| `Loan`          | Borrowing transactions, due dates, returns, and fines |
| `Member`        | Member identity and default borrowing policies        |
| `StudentMember` | Student-specific borrowing rules                      |
| `TeacherMember` | Teacher-specific borrowing rules                      |

### ⚙️ Services — The Business Layer

**`LibraryService`**

The central service responsible for managing books and members, processing loans, validating borrowing operations, searching the catalog, and tracking returns.

**`ReportService`**

The analytical component responsible for aggregating library data, calculating statistics, and generating rankings.

**`main.js`**

The application entry point that demonstrates the system through sample books, member registrations, borrowing transactions, overdue scenarios, return processing, error handling, and reports.

---

## 🧠 Engineering Principles

This project demonstrates several fundamental software engineering concepts.

| Principle                  | How It Is Applied                                                     |
| :------------------------- | :-------------------------------------------------------------------- |
| **Encapsulation**          | Private fields protect internal collections and borrowing counters    |
| **Inheritance**            | Specialized member classes extend the base `Member` class             |
| **Polymorphism**           | Member subclasses override borrowing policies                         |
| **Abstraction**            | Services expose operations without exposing their private collections |
| **Separation of Concerns** | Models, business logic, and reporting are separated                   |
| **Modularity**             | ES modules organize the application into reusable files               |
| **Error Handling**         | Exceptions communicate invalid operations                             |
| **Data Aggregation**       | Reports summarize borrowing activity and library statistics           |

### 🔐 Encapsulation in Practice

The library service uses private fields to protect its internal state:

```javascript
#loans = [];
#books = new Map();
#members = new Map();
#categories = new Set();
```

This keeps internal collections accessible through the service's public methods rather than directly exposing them to the rest of the application.

---

## 🔄 How the System Works

The application demonstrates a complete library workflow.

```text
        ┌───────────────────┐
        │   Initialize      │
        │   Library System  │
        └─────────┬─────────┘
                  │
                  ▼
        ┌───────────────────┐
        │   Register Books  │
        │   & Members       │
        └─────────┬─────────┘
                  │
                  ▼
        ┌───────────────────┐
        │   Borrow a Book   │
        │   Validate Rules  │
        └─────────┬─────────┘
                  │
                  ▼
        ┌───────────────────┐
        │   Track the Loan  │
        │   & Due Date      │
        └─────────┬─────────┘
                  │
                  ▼
        ┌───────────────────┐
        │   Return the Book │
        │   Calculate Fine  │
        └─────────┬─────────┘
                  │
                  ▼
        ┌───────────────────┐
        │   Generate Reports│
        │   & Statistics    │
        └───────────────────┘
```

---

## 💰 Fine Calculation

Overdue returns are handled by the `Loan` class.

The system uses a configurable daily fine rate:

| Setting              |                                        Value |
| :------------------- | -------------------------------------------: |
| Fine per overdue day |                                  1,000 Toman |
| Loan due date        |     Calculated from the member's loan period |
| Late days            | Calculated from the due date and return date |
| Total fine           |                  Late days × daily fine rate |

The core calculation is implemented as follows:

```javascript
static FINE_PER_DAY = 1000;

calculateFine() {
  return this.getDaysLate() * Loan.FINE_PER_DAY;
}
```

When a book is returned, the service records the fine and updates the member's outstanding debt.

---

## 📊 Reporting & Analytics

The `ReportService` transforms library activity into useful summaries.

| Method                       | Description                              |
| :--------------------------- | :--------------------------------------- |
| `getLibraryStats()`          | Overall library statistics               |
| `getMostBorrowedBooks(n)`    | Most frequently borrowed books           |
| `getActiveMembers(n)`        | Members ranked by recorded loan activity |
| `getTopBooksByYear(year, n)` | Popular books from a publication year    |
| `getCategoryDistribution()`  | Number of books in each category         |

### Example

```javascript
const stats = report.getLibraryStats();

console.log({
  books: stats.totalBooks,
  copies: stats.totalCopies,
  members: stats.totalMembers,
  loans: stats.totalLoans,
  activeLoans: stats.activeLoans,
  overdueLoans: stats.overdueLoans,
  fines: stats.totalFines,
});
```

The reporting layer is independent of the models' presentation, making it easier to extend the application with new statistics.

---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) with support for modern JavaScript features
* A terminal or command-line interface

### 1. Clone the Repository

```bash
git clone <your-repository-url>
```

### 2. Enter the Project Directory

```bash
cd library-management-system
```

### 3. Enable ES Modules

Ensure that the root `package.json` includes:

```json
{
  "type": "module"
}
```

### 4. Run the Application

```bash
node main.js
```

That's it! The application runs its predefined demonstration and prints the results to your terminal.

---

## 💻 Quick Example

```javascript
import LibraryService from "./services/LibraryService.js";
import ReportService from "./services/ReportService.js";
import StudentMember from "./models/StudentMember.js";

const library = new LibraryService();
const reports = new ReportService(library);

// Add a book
const book = library.createBook(
  "Clean Code",
  "Robert C. Martin",
  "Programming",
  2008,
  3
);

// Register a member
const student = new StudentMember(
  "Alex Johnson",
  "alex@example.com"
);

library.createMember(student);

// Borrow a book
const loan = library.borrowBook(student.id, book.id);

console.log(loan.getSummary());

// Generate statistics
console.log(reports.getLibraryStats());
```

---

## 🛡️ Validation & Error Handling

The library service validates critical operations before processing them.

* Checks whether a member exists.
* Checks whether a book exists.
* Rejects borrowing when no copies are available.
* Enforces membership borrowing limits.
* Rejects invalid or previously completed loan returns.
* Provides descriptive error messages.

Example:

```javascript
try {
  library.borrowBook(999, 1);
} catch (error) {
  console.error(error.message);
}
```

This approach makes invalid operations easier to diagnose and helps keep business rules centralized.

---

## 🗺️ Roadmap

The current implementation provides a foundation for future development.

* [ ] 💾 Persistent database storage
* [ ] 🌐 REST API integration
* [ ] 🎨 Web-based user interface
* [ ] 🔐 Authentication and authorization
* [ ] 🔔 Due-date reminders and notifications
* [ ] 📅 Book reservations and waiting lists
* [ ] 🧪 Automated unit and integration tests
* [ ] 📄 CSV and PDF report exports
* [ ] 🔎 Advanced search and pagination
* [ ] 📦 Improved inventory consistency

---

## ⚠️ Current Limitations

* Data is stored in memory and does not persist after the application stops.
* The application runs through a console-based demonstration.
* Authentication and authorization are not implemented.
* Fine payments are not processed through a payment system.
* Additional validation and automated tests would be needed for production use.

---

## 🎯 Project Goals

This project is designed to demonstrate:

* Practical Object-Oriented Programming with JavaScript
* Class inheritance and polymorphism
* Private class fields and encapsulation
* Modular software architecture
* Business rule enforcement
* Loan lifecycle management
* Date calculations and fine handling
* Statistical reporting and data aggregation

---

## 📄 License

No license has been specified yet. Add a license file if you intend to distribute the project as open-source software.

---

<div align="center">

### ✦ Built with JavaScript. Organized with OOP. ✦

**📚 Every Book Has a Story. Every System Has a Structure.**

</div>

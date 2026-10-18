import Member from "./models/Member.js";
import StudentMember from "./models/StudentMember.js";
import TeacherMember from "./models/TeacherMember.js";
import ReportService from "./services/ReportService.js";
import LibraryService from "./services/LibraryService.js";

// ============================================================
// Step 1: Starting System
// ============================================================
console.log("=".repeat(60));
console.log("📚 Welcome to library management service");
console.log("=".repeat(60));

const library = new LibraryService();
const report = new ReportService(library);

// ============================================================
// Step 2: Add Books
// ============================================================
console.log("\n📚 Step 1: Add books to library");
console.log("-".repeat(60));

const books = [
  ["Ai", "Maryam Rezaie", "Ai", 2024, 2],
  ["Security", "Nazanin Alizade", "Security", 2023, 1],
  ["Databases", "Ahmad Rezaie", "Programming", 2023, 4],
  ["Computer Networks", "Reza Moradi", "Network", 2021, 1],
  ["Alghoritms", "Mohammad Hosseiny", "Programming", 2022, 2],
  ["Advanced Javascript", "Sara karimi", "Programming", 2024, 3],
];

books.forEach(([title, author, category, year, copies]) => {
  const book = library.createBook(title, author, category, year, copies);
  console.log(` ✅ #${book.id} - ${book.title} (${book.copies} Copies)`);
});

// ============================================================
// Step 3: Add Members
// ============================================================
console.log("\n👥 Step 2: Register members");
console.log("-".repeat(60));

const ali = library.createMember(
  new StudentMember("Ali Ahmadi", "ali@gmail.com"),
);

const sara = library.createMember(
  new TeacherMember("Sara Karimi", "sara@gmail.com"),
);

const reza = library.createMember(
  new Member("Reza Hosseiny", "reza@gmail.com"),
);

const maryam = library.createMember(
  new StudentMember("Maryam Rezaie", "maryam@gmail.com"),
);

[ali, sara, reza, maryam].forEach((m) => {
  console.log(
    ` ✅ ${m.name} (${m.getMemberType()}) - Limit: ${m.getLoanLimit()} books`,
  );
});

// ============================================================
// Step 4: Borrow Books
// ============================================================
console.log("\n📤 Step 3: Borrow books");
console.log("-".repeat(60));

const loans = [];

const borrowActions = [
  [ali.id, 1, "Ali"],
  [ali.id, 5, "Ali"],
  [sara.id, 2, "Sara"],
  [reza.id, 3, "Reza"],
  [maryam.id, 4, "Maryam"],
];

borrowActions.forEach(([memberId, bookId, memberName]) => {
  try {
    const loan = library.borrowBook(memberId, bookId);
    loans.push(loan);

    console.log(` ✅ ${memberName} loaned ${loan.book.title} book`);
    console.log(` Due Date: ${loan.dueDate.toLocaleDateString("fa-IR")}`);
  } catch (err) {
    console.log(` ❌ ${memberName}: ${err.message}`);
  }
});

// ============================================================
// Step 5: Show Active Loans
// ============================================================
console.log("\n📋 Step 4: Active loans");
console.log("-".repeat(60));

library.getActiveLoans().forEach((loan) => {
  console.log(` ${loan.getSummary()}`);
});

// ============================================================
// Step 6: Simulate Overdue
// ============================================================
console.log("\n⏰ Step 5: Simulate Overdue");
console.log("-".repeat(60));

loans[0].dueDate.setDate(loans[0].dueDate.getDate() - 5);
console.log(
  ` ⚠️ Loan #${loans[0].id} (${loans[0].book.title}) - 5 days overdue`,
);

loans[2].dueDate.setDate(loans[2].dueDate.getDate() - 3);
console.log(
  ` ⚠️ Loan #${loans[2].id} (${loans[2].book.title}) - 3 days overdue`,
);

// ============================================================
// Step 7: Return Book
// ============================================================
console.log("\n📥 Step 6: Return Book");
console.log("-".repeat(60));

try {
  const { fine, loan } = library.returnBook(loans[0].id);
  console.log(` ✅ ${loan.member.name} Returned ${loan.book.title} book`);

  if (fine > 0) {
    console.log(` 💰 Fine: ${fine.toLocaleString("fa-IR")} Toman`);
  }
} catch (error) {
  console.log(`  ❌ ${error.message}`);
}

// ============================================================
// Step 8: Check Errors
// ============================================================
console.log("\n🚫 Step 7: Check Errors");
console.log("-".repeat(60));

const errorTests = [
  () => library.returnBook(999),
  () => library.deleteBook(999),
  () => library.borrowBook(999, 1),
  () => library.borrowBook(ali.id, 999),
  () => library.borrowBook(reza.id, 3),
];

errorTests.forEach((test, i) => {
  try {
    test();
  } catch (error) {
    console.log(` ❌ Test ${i + 1}: ${error.message}`);
  }
});

// ============================================================
// Step 9: Stats and Reports
// ============================================================
console.log("\n📊 Step 8: Stats and Reports");
console.log("-".repeat(60));

const stats = report.getLibraryStats();
console.log("\n📈 Library Overview Stats");
console.log(` 📚 Books: ${stats.totalBooks} (${stats.totalCopies})`);
console.log(` 👥 Members: ${stats.totalMembers}`);
console.log(
  ` 📖 Loans: ${stats.totalLoans} | Active: ${stats.activeLoans} | Overdue: ${stats.overdueLoans}`,
);
console.log(` 💰 Fines: ${stats.totalFines.toLocaleString("fa-IR")} Toman`);
console.log(` ⏱️ Average Loan Duration: ${stats.avgLoanDays} Days`);

console.log(` \n🏆 Most Borrowed Books`);
report.getMostBorrowedBooks(3).forEach((book, i) => {
  console.log(` ${i + 1}. ${book.title} (${book.borrowCount}) Times`);
});

console.log(` \n⭐ Most Active Members`);
report.getActiveMembers(3).forEach(({ member, loanCount }, i) => {
  console.log(
    ` ${i + 1}. ${member.name} - ${member.getMemberType()} (${loanCount}) Loans`,
  );
});

// ============================================================
// End
// ============================================================
console.log("\n" + "=".repeat(60));
console.log("🎉 Project executed successfully!");
console.log("=".repeat(60));

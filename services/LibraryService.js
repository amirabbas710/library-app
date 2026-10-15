import Loan from "../models/Loan.js";
import Book from "../models/Book.js";

class LibraryService {
  #loans = [];
  #books = new Map();
  #members = new Map();
  #categories = new Set();

  getBookById(id) {
    return this.#books.get(id);
  }

  getAllBooks() {
    return [...this.#books.values()];
  }

  getCategories() {
    return [...this.#categories];
  }

  searchBooks(text) {
    const t = text.toLowerCase();

    return this.getAllBooks().filter(
      (b) =>
        b.title.toLowerCase().includes(t) || b.author.toLowerCase().includes(t),
    );
  }

  filterBooks({ category, yearFrom, yearTo }) {
    return this.getAllBooks().filter((book) => {
      if (category && book.category !== category) return false;
      if (yearFrom && book.year < yearFrom) return false;
      if (yearTo && book.year > yearTo) return false;

      return true;
    });
  }

  createBook(title, author, category, year, copies = 1) {
    const book = new Book(title, author, year, category, copies);
    this.#books.set(book.id, book);
    this.#categories.add(category);

    return book;
  }

  updateBook(id, updates) {
    const book = this.#books.get(id);

    if (!book) {
      throw new Error(`Book with id: ${id} not found`);
    }

    const merged = { ...book, ...updates };
    book.title = merged.title;
    book.author = merged.author;
    book.category = merged.category;
    book.year = merged.year;
    book.copies = merged.copies;

    this.#categories.add(book.category);
    return book;
  }

  deleteBook(id) {
    if (!this.#books.has(id)) {
      throw new Error(`Book with id: ${id} not found`);
    }

    this.#books.delete(id);
  }

  createMember(member) {
    this.#members.set(member.id, member);
    return member;
  }

  getMemberById(id) {
    return this.#members.get(id);
  }

  getAllMembers() {
    return [...this.#members.values()];
  }

  deleteMember(id) {
    if (!this.#members.has(id)) {
      throw new Error(`Member with id: ${id} not found`);
    }

    this.#members.delete(id);
  }

  borrowBook(memberId, bookId) {
    //* Check member existence
    const member = this.#members.get(memberId);

    if (!member) {
      throw new Error(`Member with id: ${memberId} not found`);
    }

    //* Check book existence
    const book = this.#books.get(bookId);

    if (!book) {
      throw new Error(`Book with id: ${bookId} not found`);
    }

    if (!book.isAvailable()) {
      throw new Error(`Book ${book.title} has not any copies!`);
    }

    if (member.activeLoans.length >= member.getLoanLimit()) {
      throw new Error(`Maximum loan limit reached`);
    }

    book.increaseBorrow();
    const loan = new Loan(book, member);

    this.#loans.push(loan);
    member.activeLoans.push(loan);

    return loan;
  }

  returnBook(loanId) {
    const loan = this.#loans.find((l) => l.id === loanId && !l.isReturned());
    if (!loan) {
      throw new Error(`Loan with id: ${loanId} not found`);
    }

    const fine = loan.returnBook();

    loan.book.available++;
    loan.member.debt += fine;
    loan.member.activeLoans = loan.member.activeLoans.filter(
      (l) => l.id !== loanId,
    );

    return { loan, fine };
  }

  getActiveLoans() {
    return this.#loans.filter((l) => !l.isReturned());
  }

  getAllLoans() {
    return this.#loans;
  }

  getOverdueLoans() {
    return this.#loans.filter((l) => l.isOverdue());
  }

  getMemberLoans(memberId) {
    return this.#loans.filter((l) => l.member.id === memberId);
  }
}

export default LibraryService;

//* Single Responsibility

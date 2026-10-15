class Loan {
  static nextId = 1;
  static FINE_PER_DAY = 1000;

  constructor(book, member) {
    this.id = Loan.nextId++;
    this.fine = 0;
    this.book = book;
    this.member = member;
    this.returnDate = null;
    this.borrowDate = new Date();

    this.dueDate = new Date();
    this.dueDate.setDate(this.dueDate.getDate() + member.getLoanDays());
  }

  isReturned() {
    return this.returnDate !== null;
  }

  isOverdue() {
    if (this.isReturned()) return false;
    return new Date().getTime() > this.dueDate.getTime();
  }

  getDaysLate() {
    const end = this.returnDate || new Date();
    const diffMs = end.getTime() - this.dueDate.getTime();

    if (diffMs <= 0) return 0;

    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  }

  calculateFine() {
    return this.getDaysLate() * Loan.FINE_PER_DAY;
  }

  returnBook() {
    this.returnDate = new Date();
    this.fine = this.calculateFine();

    return this.fine;
  }

  getSummary() {
    const { id, book, member, dueDate, returnDate, fine } = this;

    const status = returnDate
      ? `Return: ${returnDate.toLocaleDateString("fa-IR")} | Fine: ${fine}`
      : this.isOverdue()
        ? `⚠️ Overdue: ${this.getDaysLate()} Days`
        : "In Process";

    return `Loan #${id} | Book: ${book.title} | Member: ${member.name} |
     DueDate: ${dueDate.toLocaleDateString("fa-IR")} | ${status}`;
  }
}

export default Loan;

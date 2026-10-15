class ReportService {
  constructor(library) {
    this.library = library;
  }

  getMostBorrowedBooks(n = 5) {
    return this.library
      .getAllBooks()
      .slice()
      .sort((a, b) => b.borrowCount - a.borrowCount)
      .slice(0, n);
  }

  getActiveMembers(n = 5) {
    return this.library
      .getAllMembers()
      .map((m) => ({
        member: m,
        loanCount: this.library.getMemberLoans(m.id).length,
      }))
      .sort((a, b) => b.loanCount - a.loanCount)
      .slice(0, n);
  }

  getTopBooksByYear(year, n = 3) {
    return this.library
      .getAllBooks()
      .filter((b) => b.year === year)
      .slice()
      .sort((a, b) => b.borrowCount - a.borrowCount)
      .slice(0, n);
  }

  getLibraryStats() {
    const books = this.library.getAllBooks();
    const loans = this.library.getAllLoans();
    const members = this.library.getAllMembers();
    const activeLoans = this.library.getActiveLoans();
    const overdueLoans = this.library.getOverdueLoans();

    const totalFines = loans.reduce((sum, l) => sum + l.fine, 0);
    const totalCopies = books.reduce((sum, b) => sum + b.copies, 0);

    const durations = loans.map((l) => {
      const end = l.returnDate || new Date();
      const diffMs = end.getTime() - l.borrowDate.getTime();

      return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    });

    const avgLoanDays = durations.length
      ? (durations.reduce((a, b) => a + b, 0) / durations.length).toFixed(1)
      : 0;

    return {
      totalFines,
      avgLoanDays,
      totalCopies,
      totalBooks: books.length,
      totalLoans: loans.length,
      totalMembers: members.length,
      activeLoans: activeLoans.length,
      overdueLoans: overdueLoans.length,
    };
  }

  getCategoryDistribution() {
    return Object.fromEntries(
      this.library
        .getCategories()
        .map((category) => [
          category,
          this.library.getAllBooks().filter((b) => b.category === category)
            .length,
        ]),
    );
  }
}

export default ReportService;

class Book {
  static nextId = 1;
  #borrowCount = 0;

  constructor(title, author, year, category, copies = 1) {
    this.year = year;
    this.title = title;
    this.author = author;
    this.copies = copies;
    this.id = Book.nextId++;
    this.available = copies;
    this.category = category;
  }

  set title(value) {
    if (!value || value.trim().length < 2) {
      throw new Error("Title must be at least 2 characters");
    }

    this._title = value.trim();
  }

  get title() {
    return this._title;
  }

  get borrowCount() {
    return this.#borrowCount;
  }

  increaseBorrow() {
    this.available--;
    this.#borrowCount++;
  }

  isAvailable() {
    return this.available > 0;
  }

  getInfo() {
    return `#${this.id} | ${this.title} | ${this.author} | ${this.category} | ${this.year} Available:
    ${this.copies}/${this.available}
    `;
  }
}

export default Book;

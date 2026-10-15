class Member {
  static nextId = 1;

  constructor(name, email) {
    this.debt = 0;
    this.name = name;
    this.email = email;
    this.activeLoans = [];
    this.id = Member.nextId++;
    this.joinDate = new Date();
  }

  getLoanLimit() {
    return 3;
  }

  getLoanDays() {
    return 14;
  }

  getMemberType() {
    return "User";
  }

  getInfo() {
    return `#${this.id} | ${this.name} | ${this.email} |
     Type: ${this.getMemberType()} | Maximum: ${this.getLoanLimit()} | Debt: ${this.debt}`;
  }
}

export default Member;

import Member from "./Member.js";

class StudentMember extends Member {
  constructor(name, email, studentId) {
    super(name, email);
    this.studentId = studentId;
  }

  getLoanLimit() {
    return 5;
  }

  getLoanDays() {
    return 18;
  }

  getMemberType() {
    return "Student";
  }
}

export default StudentMember;

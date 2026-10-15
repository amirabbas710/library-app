import Member from "./Member.js";

class TeacherMember extends Member {
  getLoanLimit() {
    return 10;
  }

  getLoanDays() {
    return 30;
  }

  getMemberType() {
    return "Teacher";
  }
}

export default TeacherMember;

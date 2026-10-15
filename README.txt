//* properties or fields
//* Book =>
//* Title
//* Author
//* Year
//* Category => برنامه نویسی، الکترونیک، نقشه کشی
//* Copies => تعداد کل نسخه ها
//* Available => نسخه های موجود
//* Id
//* Borrow Count => تعداد دفعاتی که امانت داده شده است

//* Methods
//* getInfo()
//* isAvailable()
//* increaseBorrow
//******************************

//* Properties
//* Member
//* Id
//* name
//* email
//* joinDate => Automatic => new Date()
//* debt => Default:0
//* activeLoans => Array

//* Methods
//* getInfo()
//* getLoanLimit() => Maximum count of loans
//* getLoanDays() => Maximum days of loan
//* getMemberType() => Student, Teacher, User

// Member (Base Class)
// StudentMember (Maximum 5 books, 14 Days)
// TeacherMember (Maximum 10, 30 Days)
// (Maximum 3 books, 14 days)

//* Loan
//* Id
//* book => Book Object (title, etc)
//* member
//* borrowDate => Automatic => new Date()
//* returnDate
//* dueDate
//* fine => default:0
//* Methods =>
//* isReturned()
//* isOverdue()
//* getDaysLate()
//* calculateFine()
//* returnBook()
//* getSummary()

//* LibraryService => Encapsulation
//* #books: Map<id,Book>
//* #members: Map<id,Member>
//* #loans: Loan[]
//* #categories: Set<string>

//* Methods
//* createBook, getBook, getAllBooks, updateBook, deleteBook
//* searchBooks, filterBooks
//* getCategories

// createMember
// getMemberById
// getAllMembers
// deleteMember

//* Loan Flow
//* Does member exists?
//* Does book exists?
// Is any copies exists?
// Does member overdue?
// Okay => reduce book copy, create loan

//* Report Service
//* getActiveMembers
//* getMostBorrowedBooks
//* getLibraryStats =>\
// total books count
// total books copies count
// total members count
// total loan count (total, active, overdue)
// total fine amount
// loan average
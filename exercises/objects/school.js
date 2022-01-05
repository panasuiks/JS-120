function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],

    info() {
      console.log(`${this.name} is a ${this.year} year student`)
    },

    listCourses() {
      console.log(this.courses)
    },

    addCourse(courseObject) {
      if (!this.courses.some(course => course.name === courseObject.name)) {
        this.courses.push(courseObject);
      }
    },

    addNote(courseCode, note) {
      let specificCourse = this.courses.filter(course => course.code === courseCode);
      if (specificCourse.length === 1) {
        specificCourse = specificCourse[0];
        if (!specificCourse.hasOwnProperty('note')) {
          specificCourse.note = note
        } else {
          specificCourse.note += ' ; ' + note;
        }
      }
    },

    updateNote(courseCode, note) {
      let specificCourse = (this.courses.filter(course => course.code === courseCode));
      if (specificCourse.length === 1) {
        specificCourse = specificCourse[0]
        specificCourse.note = note;
      }
    },

    addGrade(courseCode, grade) {
      let specificCourse = (this.courses.filter(course => course.code === courseCode));
      if (specificCourse.length === 1) {
        specificCourse = specificCourse[0]
        specificCourse.grade = grade;
      }
    },


    viewNotes() {
      for (let course of this.courses) {
        if (course.hasOwnProperty('note')) {
          console.log(`${course.name}: ${course.note}`);
        }
      }
    },

    reportGrades() {
      for (course of this.courses) {
        let courseName = course.name;
        let grade = course.grade || 'In progress';
        console.log(`${courseName}: ${grade}`)
      }
    },
    reportCourseGrade(courseName) {
      for (course of this.courses) {
        if (course.name === courseName && course.grade) {
          console.log(`${this.name}: ${course.grade}`)
        }
      }
    },
  }
}

// let foo = createStudent('Foo', '1st');
// foo.info();
// // "Foo is a 1st year student"
// foo.listCourses();
// // [];
// foo.addCourse({ name: 'Math', code: 101 });
// foo.addCourse({ name: 'Advanced Math', code: 102 });
// foo.listCourses();
// // [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
// foo.addNote(101, 'Fun course');
// foo.addNote(101, 'Remember to study for algebra');
// foo.viewNotes();
// // "Math: Fun course; Remember to study for algebra"
// foo.addNote(102, 'Difficult subject');
// foo.viewNotes();
// // "Math: Fun course; Remember to study for algebra"
// // "Advance Math: Difficult subject"
// foo.updateNote(101, 'Fun course');
// foo.viewNotes();
// // "Math: Fun course"
// // "Advanced Math: Difficult subject"


let school = {
  students: [],

  addStudent(name, year) {
    const YEARS = ['1st', '2nd', '3rd', '4th', '5th'];
    if (YEARS.includes(year)) {
      let student = createStudent(name, year);
      this.students.push(student);
      return student;
    } else {
      console.log('Invalid Year')
    }
  },

  enrollStudent(student, courseName, courseCode) {
    student.addCourse({ name: courseName, code: courseCode });
  },

  addGrade(student, courseCode, grade) {
    student.addGrade(courseCode, grade);
  },

  getReportCard(student) {
    student.reportGrades();
  },

  createGradesObject(className) {
    let grades = [];
    for (let student of this.students) {
      let courseArray = student.courses.filter(course => course.name === className && course.hasOwnProperty('grade'));
      if (courseArray.length === 1) {
        grades.push([student.name, courseArray[0].grade]);
      }
    }
    return grades;
  },

  courseReport(className) {
    let grades = this.createGradesObject(className);
    if (grades.length > 0) {
      const STUDENT_INDEX = 0;
      const GRADE_INDEX = 1;
      let total = grades.reduce((prev, current) => {
        return prev + current[GRADE_INDEX];
      }, 0)
      let average = Math.round((total / grades.length));
      console.log(`=${className}=`);
      for (studentGrade of grades) {
        console.log(`${studentGrade[STUDENT_INDEX]}: ${studentGrade[GRADE_INDEX]}`);
      }
      console.log(`---`);
      console.log(`Course Average: ${average}`);
    }
  }
}

let foo = school.addStudent('foo', '3rd');
let bar = school.addStudent('bar', '1st');
let qux = school.addStudent('qux', '1st');
school.enrollStudent(foo, 'Math', 101);
school.enrollStudent(foo, 'Advanced Math', 102);
school.enrollStudent(foo, 'Physics', 202);
school.enrollStudent(bar, 'Math', 101);
school.enrollStudent(qux, 'Math', 101);
school.enrollStudent(qux, 'Advanced Math', 102);
school.addGrade(foo, 101, 95);
school.addGrade(foo, 102, 90);
school.addGrade(bar, 101, 91);
school.addGrade(qux, 101, 93);
school.addGrade(qux, 102, 90);


school.getReportCard(foo);
school.courseReport('Advanced Math');
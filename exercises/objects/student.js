function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    notes: {},

    info() {
      console.log(`${this.name} is a ${this.year} year student`)
    },

    listCourses() {
      console.log(this.courses)
    },

    addCourse(courseObject) {
      if (!this.courses.includes(courseObject)) this.courses.push(courseObject);
    },

    addNote(courseCode, note) {
      let specificCourse = (this.courses.filter(course => course.code === courseCode));
      if (specificCourse.length === 1) {
        let name = specificCourse[0].name;
        if (!this.notes.hasOwnProperty(name)) {
          this.notes[name] = note
        } else {
          this.notes[name] += ' ; ' + note;
        }
      }
    },

    updateNote(courseCode, note) {
      let specificCourse = (this.courses.filter(course => course.code === courseCode));
      if (specificCourse.length === 1) {
        let name = specificCourse[0].name;
        this.notes[name] = note;
      }
    },

    viewNotes() {
      for (let courseName in this.notes) {
        console.log(`${courseName}: ${this.notes[courseName]}`);
      }
    }
  }
}


let foo = createStudent('Foo', '1st');
foo.info();
// "Foo is a 1st year student"
foo.listCourses();
// [];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.listCourses();
// [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
// "Advance Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
// "Math: Fun course"
// "Advanced Math: Difficult subject"
module.exports = function() {
  return {
    employees: require('./employees.json'),
    standards: require('./standards.json'),
    students: require('./student-list.json'),
    subjects: require('./subjects.json'),
    divisions: require('./divisions.json')
  }
}
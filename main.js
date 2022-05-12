//inputs var
var courseNameInput = document.getElementById("courseName");
var courseCategoryInput = document.getElementById("courseCategory");
var coursePriceInput = document.getElementById("coursePrice");
var courseDescriptionInput = document.getElementById("courseDescription");
//butyons var
var addBtn = document.getElementById("click");
//Array to save objects
var courses = [];
//var to catch table body
var data = document.getElementById("data");

addBtn.onclick = function () {
  addCourse();
  displayData();
};

// create function add course to add course on click button Add course
function addCourse() {
  //create course object to get element from user inputs
  var course = {
    name: courseNameInput.value,
    category: courseCategoryInput.value,
    price: coursePriceInput.value,
    description: courseDescriptionInput.value,
  };
  //Add object course to array courses
  courses.push(course);
}

// create function display data on click button Add course
function displayData() {
  //Add course to the body of the table
  var result = "";
  for (i = 0; i < courses.length; i++) {
    result += `
    <tr>
      <td>${i + 1}</td>
      <td>${courses[i].name}</td>
      <td>${courses[i].category}</td>
      <td>${courses[i].price}</td>
      <td>${courses[i].description}</td>
      <td></td>
      <td></td>
      </tr>`;
  }
  data.innerHTML = result;
}

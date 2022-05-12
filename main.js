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

// create function add course to add course on click button Add course
addBtn.onclick = function () {
  //create course object to get element from user inputs
  var course = {
    name: courseNameInput.value,
    category: courseCategoryInput.value,
    price: coursePriceInput.value,
    description: courseDescriptionInput.value,
  };
  //Add object course to array courses
  courses.push(course);
};

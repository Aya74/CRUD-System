//inputs var
var courseNameInput = document.getElementById("courseName");
var courseCategoryInput = document.getElementById("courseCategory");
var coursePriceInput = document.getElementById("coursePrice");
var courseDescriptionInput = document.getElementById("courseDescription");
//buttons var
var addBtn = document.getElementById("click");
var clearBtn = document.getElementById("clear");
//Array to save objects
var courses = [];
//var to catch table body
var data = document.getElementById("data");
//var to catch all the inputs
var inputs = document.getElementsByClassName("inputs");

//Get Item from local storage then display data
if(localStorage.getItem("coursesList") == null){
var courses = [];
}else {
var courses = JSON.parse(localStorage.getItem("coursesList")) ;
displayData();
}

addBtn.onclick = function () {
  addCourse();
  displayData();
  clearForm();
};

clearBtn.onclick = function () {
  clearForm();
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
  //Add array courses to localstorage
  localStorage.setItem("coursesList",JSON.stringify(courses));
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
      <td><button class="update">Update</button></td>
      <td><button class="delete" onclick="deleteCourse(${i})">Delete</button></td>
      </tr>`;
  }
  data.innerHTML = result;
}

//create function to clear all the inputs
function clearForm() {
  for (i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
}

//create function that allow the user to delete course inforamtion (from the table)
function deleteCourse(index){
  courses.splice(index,1);
  displayData();
}
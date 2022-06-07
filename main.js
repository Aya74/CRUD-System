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
//var for alert
var nameAlert = document.getElementById("nameAlert");
var cateAlert = document.getElementById("cateAlert");
var priceAlert = document.getElementById("priceAlert");
var descAlert = document.getElementById("descAlert");

var currentIndex = 0;
//Get Item from local storage then display data
if (localStorage.getItem("coursesList") == null) {
  var courses = [];
} else {
  var courses = JSON.parse(localStorage.getItem("coursesList"));
  displayData();
}

addBtn.onclick = function () {
  if (addBtn.innerHTML == "Add Course") {
    addCourse();
    addBtn.disabled = "true";
    isValid();
  } else {
    updateCourse();
    isValid();
  }
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
  localStorage.setItem("coursesList", JSON.stringify(courses));
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Your work has been added",
    showConfirmButton: false,
    timer: 1500,
  });
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
      <td><button class="update" onclick="getCourseData(${i})">Update</button></td>
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
  //disabled Add Course button when clear
  addBtn.disabled = "true";
  //if course is valid clear
  isValid();
  //if course inputs in in-valid clear
  isINValid();
  //When click on clear button make alert (error msg) display none
  noneAlert();
}

//create function that allow the user to delete course information (from the table)
function deleteCourse(index) {
  //sweet alert
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      //if the user confirm to delete then delete the course
      courses.splice(index, 1);
      localStorage.setItem("coursesList", JSON.stringify(courses));
      displayData();
      Swal.fire("Deleted!", "The course has been deleted.", "success");
    }
  });
}

//create function search to search about courses and display the result
function search(value) {
  //Add course to the body of the table
  var result = "";
  for (i = 0; i < courses.length; i++) {
    if (courses[i].name.toLowerCase().includes(value.toLowerCase())) {
      result += `
    <tr>
      <td>${i + 1}</td>
      <td>${courses[i].name}</td>
      <td>${courses[i].category}</td>
      <td>${courses[i].price}</td>
      <td>${courses[i].description}</td>
      <td><button class="update" onclick="getCourseData(${i})">Update</button></td>
      <td><button class="delete" onclick="deleteCourse(${i})">Delete</button></td>
      </tr>`;
    }
  }
  data.innerHTML = result;
}

//get the data on the inputs
function getCourseData(index) {
  course = courses[index];
  courseNameInput.value = course.name;
  courseCategoryInput.value = course.category;
  coursePriceInput.value = course.price;
  courseDescriptionInput.value = course.description;
  addBtn.innerHTML = "Update";
  currentIndex = index;
}

//function to update inputs value
function updateCourse() {
  var course = {
    name: courseNameInput.value,
    category: courseCategoryInput.value,
    price: coursePriceInput.value,
    description: courseDescriptionInput.value,
  };
  courses[currentIndex].name = course.name;
  courses[currentIndex].category = course.category;
  courses[currentIndex].price = course.price;
  courses[currentIndex].description = course.description;
  localStorage.setItem("coursesList", JSON.stringify(courses));
  addBtn.innerHTML = "Add Course";
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Your work has been updated",
    showConfirmButton: false,
    timer: 1500,
  });
}

// Validate course name input
var namePattern = /^[A-Z\s][\sa-z]{2,20}$/;
courseName.onkeyup = function () {
  if (namePattern.test(courseName.value)) {
    courseName.classList.add("is-valid");
    courseName.classList.remove("is-invalid");
    nameAlert.classList.add("d-none");
    validate();
  } else {
    addBtn.disabled = "true";
    courseName.classList.add("is-invalid");
    nameAlert.classList.remove("d-none");
  }
};

// Validate category name input
var categoryPattern = /^[A-Z\s][\sa-z]{2,20}$/;
courseCategory.onkeyup = function () {
  if (categoryPattern.test(courseCategory.value)) {
    courseCategory.classList.add("is-valid");
    courseCategory.classList.remove("is-invalid");
    cateAlert.classList.add("d-none");
    validate();
  } else {
    addBtn.disabled = "true";
    courseCategory.classList.add("is-invalid");
    cateAlert.classList.remove("d-none");
  }
};

// Validate category name input
var pricePattern = /^\d{0,8}(\.\d{1,4})?$/;
coursePrice.onkeyup = function () {
  if (pricePattern.test(coursePrice.value)) {
    coursePrice.classList.add("is-valid");
    coursePrice.classList.remove("is-invalid");
    priceAlert.classList.add("d-none");
    validate();
  } else {
    addBtn.disabled = "true";
    coursePrice.classList.add("is-invalid");
    priceAlert.classList.remove("d-none");
  }
};

// Validate description name input
var descriptionPattern = /^[A-Z\s][\sa-z]{2,200}$/;
courseDescription.onkeyup = function () {
  if (descriptionPattern.test(courseDescription.value)) {
    courseDescription.classList.add("is-valid");
    courseDescription.classList.remove("is-invalid");
    descAlert.classList.add("d-none");
    validate();
  } else {
    addBtn.disabled = "true";
    courseDescription.classList.add("is-invalid");
    descAlert.classList.remove("d-none");
  }
};

//if the inputs values match with the regex then allow to add course
function validate() {
  if (
    namePattern.test(courseName.value) &&
    categoryPattern.test(courseCategory.value) &&
    pricePattern.test(coursePrice.value) &&
    descriptionPattern.test(courseDescription.value)
  ) {
    addBtn.removeAttribute("disabled");
  } else {
    addBtn.disabled = "true";
  }
}

//function to remove is-valide class
function isValid() {
  courseName.classList.remove("is-valid");
  courseCategory.classList.remove("is-valid");
  coursePrice.classList.remove("is-valid");
  courseDescription.classList.remove("is-valid");
}

//function to remove is-invalide class
function isINValid() {
  courseName.classList.remove("is-invalid");
  courseCategory.classList.remove("is-invalid");
  coursePrice.classList.remove("is-invalid");
  courseDescription.classList.remove("is-invalid");
}

//function to make alert error msg display none
function noneAlert() {
  nameAlert.style.display = "none";
  cateAlert.style.display = "none";
  priceAlert.style.display = "none";
  descAlert.style.display = "none";
}

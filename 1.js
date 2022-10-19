
//  * CSCI2720/ESTR2106 Assignment 1
//  * Bootstrap Web Page with a Web Form
//  *
//  * I declare that the assignment here submitted is original
//  * except for source material explicitly acknowledged,
//  * and that the same or closely related material has not been
//  * previously submitted for another course.
//  * I also acknowledge that I am aware of University policy and
//  * regulations on honesty in academic work, and of the disciplinary
//  * guidelines and procedures applicable to breaches of such
//  * policy and regulations, as contained in the website.
//  *
//  * University Guideline on Academic Honesty:
//  *   http://www.cuhk.edu.hk/policy/academichonesty
//  * Faculty of Engineering Guidelines to Academic Honesty:
//  *   https://www.erg.cuhk.edu.hk/erg/AcademicHonesty
//  *
//  * Student Name: Chen Weiyu
//  * Student ID  : 1155141421
//  * Date        : 13/10/2022

function alignFunc(){

    const secHead = document.getElementsByTagName("h2");
    // console.log(secHead);
    Array.from(secHead).forEach(elem => {
      if(cnt == 1){
        elem.classList.remove("text-start");
        elem.classList.add("text-center");
        // console.log("to center");
      }
      else if (cnt == 2) {
        elem.classList.remove("text-center");
        elem.classList.add("text-end");
        // console.log("to end");
      }
      else if(cnt == 0){
        elem.classList.remove("text-end");
        elem.classList.add("text-start");
        // console.log("to start");
      }
      else{
        elem.classList.remove("text-center");
        elem.classList.add("text-start");
      }
    });

    if(cnt<0) cnt = 0;
    cnt = (cnt + 1)%3;
}

function addComment(){
  const promptInput = prompt("Please Add a New Course (Use comma to separate course code and name)", "CSCI2720, Building Web Applications");
  if(promptInput===null) return;
  const values = promptInput.split(",");
  console.log(values);

  var table = document.getElementById("myTable");
  console.log(table.rows);
  if(values.length>1){
    // Create an empty <tr> element and add it to the 1st position of the table:
    var row = table.insertRow(table.rows.length);

    // Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
    var code = row.insertCell(0);
    var name = row.insertCell(1);

    // Add some text to the new cells:
    code.innerHTML = values[0];
    name.innerHTML = values[1];
  }
}

function scrollBar(){
  let bar = document.getElementById("progressBar");
  let barContainer = document.getElementById("barCont");

  if(barCnt==0){
    barContainer.style.visibility = "visible";
    // bar.style.display = "block";
  }
  else {
    barContainer.style.visibility = "hidden";
    // bar.style.display = "none";
  }
  barCnt = (barCnt+1)%2;

  function scroll() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    bar.style.width = scrolled + "%";
    // console.log(bar.style);
  }

  window.onscroll = function() {scroll()};
  // console.log(window.scrollY+window.innerHeight);
  // console.log(document.body.clientHeight);
  // console.log(window.innerHeight);
}

function processform(){
    let newComment = document.createElement("div");
    let element = '<div><svg height="100" width="100"><circle cx="50" cy="50" r="40"></svg></div><div><h5></h5><p></p></div>';
    newComment.innerHTML = element;
    newComment.className = "d-flex";
    newComment.querySelectorAll("div")[0].className = "flex-shrink-0 mb-3"; // 1st div
    newComment.querySelectorAll("div")[1].className = "flex-grow-1"; // 2nd div

    let lastComment = document.querySelector("#comments").lastElementChild; // instead of lastChild for div element
    newComment.id = 'c' +(Number(lastComment.id.substr(1)) + 1);

    if(document.querySelector("#new-email").validity.valueMissing){
      alert("Email cannot be empty :(");
      document.querySelector("form").reset();
      return;
    }

    if (document.querySelector("#new-email").validity.typeMismatch) {
      alert("invalid email :(");
      document.querySelector("form").reset();
      return;
    }

    if(document.querySelector("#new-comment").validity.valueMissing){
      alert("Comments cannot be empty :(");
      document.querySelector("form").reset();
      return;
    }

    newComment.querySelector("h5").innerHTML = document.querySelector("#new-email").value;
    newComment.querySelector("p").innerHTML = document.querySelector("#new-comment").value;

    let color = document.querySelectorAll("input[name= new-color]:checked")[0].value;

    newComment.querySelector("circle").setAttribute("fill", color);
    document.querySelector("#comments").appendChild(newComment);
    document.querySelector("form").reset();
    savefile();
    return;
}

function savefile(){
  console.log(document.getElementById("comments").innerHTML);
  fetch('./file.txt', {
      method: 'PUT',
      body: document.getElementById("comments").innerHTML
  });
}

function loadfile(){
  fetch('./file.txt')
  .then(res => res.text())
  .then(content => document.getElementById("comments").innerHTML = content);
}

function toggle(){
  // if(document.querySelector("body").classList!=null)
  document.querySelector("body").classList.toggle("bg-white");
  document.querySelector("body").classList.toggle("bg-black");
  const secs = document.getElementsByTagName("section");
  console.log(secs);
  Array.from(secs).forEach(elem => {
    // if(darkcnt == 0){
    //   elem.classList.remove("bg");
    //   elem.classList.add("text-start");
    // }
    elem.classList.toggle("bg-dark");
    elem.classList.toggle("bg-light");
    elem.classList.toggle("darkmode");
  });
  Array.from(document.getElementsByTagName("a")).forEach(elem => {
    elem.classList.toggle("darkmode");
  });
  document.querySelector("table").classList.toggle("darkmode");
  document.querySelector("thead").classList.toggle("table-light");
  document.querySelector("thead").classList.toggle("table-dark");
  document.querySelector("button").classList.toggle("btn-outline-dark");
  document.querySelector("button").classList.toggle("btn-outline-light");
}


window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  // if(window.matchMedia('(prefers-color-scheme: dark)').matches)
    toggle();
});

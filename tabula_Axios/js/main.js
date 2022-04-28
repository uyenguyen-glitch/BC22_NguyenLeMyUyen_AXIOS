// Layout
function getEle(id) {
  return document.getElementById(id);
}

function domClassName(number, display) {
  for (var i = 0; i < number; i++) {
    document.getElementsByClassName("fa")[i].style.display = display;
  }
}
function openNav() {
  if (screen.width >= 768) {
    getEle("mySidenav").style.width = "30%";
    getEle("btnOpen").style.display = "none";
    getEle("btnClose").style.display = "inline-block";
    getEle("logo-responsive").style.display = "block";
    getEle("logo-web").style.display = "none";
    domClassName(6, "inline-block");
    document.getElementById("main").style.marginLeft = "30%";
  } else if (screen.width <= 767.98) {
    getEle("mySidenav").style.width = "50%";
    getEle("btnOpen").style.display = "none";
    getEle("btnClose").style.display = "inline-block";
    getEle("logo-responsive").style.display = "block";
    getEle("logo-web").style.display = "none";

    domClassName(6, "inline-block");
    document.getElementById("main").style.marginLeft = "75%";
  }
}

function closeNav() {
  getEle("mySidenav").style.width = "0";
  getEle("btnOpen").style.display = "inline-block";
  getEle("btnClose").style.display = "none";
  getEle("logo-responsive").style.display = "none";
  getEle("logo-web").style.display = "inline-block";

  domClassName(6, "none");
  document.getElementById("main").style.marginLeft = "0";
}

// Change arrow of selection box
getEle("exampleFormControlSelect1").addEventListener("click", function () {
  if (getEle("fa-angle-down").style.display == "block") {
    getEle("fa-angle-down").style.display = "none";
    getEle("fa-angle-up").style.display = "block";
  } else {
    getEle("fa-angle-down").style.display = "block";
    getEle("fa-angle-up").style.display = "none";
  }
});

// Api
var services = new Service();
function getListProduct() {
  var promise = services.fetchData();
  promise
    .then(function (result) {
      renderHTML(result.data);
      // console.log(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getListProduct();

function renderHTML(arr) {
  var content = "";
  console.log(arr);
  for (var i = 0; i < arr.length; i++) {
    var teacher = arr[i];
    if (teacher.loaiND === "GV") {
      content += `<div class="col-lg-3">
                  <div class="container"></div>
                  <div class="card">
                    <div class="thumbnail">
                      <img
                        class="card-img-top img-fluid"
                        src="../images/${teacher.hinhAnh}"
                        alt="Card image cap"
                      />
                    </div>

                    <div class="card-body">
                      <p>${teacher.ngonNgu}</p>
                      <h1 class="card-title">${teacher.hoTen}</h1>
                      <p class="card-text">
                      ${teacher.moTa}
                      </p>
                    </div>
                  </div>
              </div>`;
    }
  }
  getEle("teacherItems").innerHTML = content;
}

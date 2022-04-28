function Validation() {
  // Kiểm tra rỗng
  this.kiemTraRong = function (value, errorID, mess) {
    if (value === "") {
      // Lỗi
      getEle(errorID).innerHTML = mess;
      getEle(errorID).style.display = "block";
      return false;
    } else {
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";
      return true;
    }
  };

  // Kiểm tra độ dài chuỗi
  this.kiemTraDoDaiChuoi = function (value, errorID, mess, min, max) {
    if (value.trim().length >= min && value.trim().length <= max) {
      //   Hợp lệ
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";
      return true;
    }

    // Không hợp lệ
    getEle(errorID).innerHTML = mess;
    getEle(errorID).style.display = "block";
    return false;
  };

  // Kiểm tra email
  this.kiemTraDinhDangEmail = function (value, errorID, mess) {
    var email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (value.match(email)) {
      // Hợp lệ
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";
      return true;
    }

    getEle(errorID).innerHTML = mess;
    getEle(errorID).style.display = "block";
    return false;
  };

  // Kiểm tra mật khẩu
  this.kiemTraMatKhau = function (value, errorID, mess) {
    var password =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;

    if (value.match(password)) {
      getEle(errorID).innerHTML = "";
      getEle(errorID).style.display = "none";
      return true;
    }
    getEle(errorID).innerHTML = mess;
    getEle(errorID).style.display = "block";
    return false;
  };

  // Kiểm tra chức vụ
  this.kiemTraSelecBox = function (value, errorID, mess, statement) {
    if (value === statement) {
      // Không hợp lệ
      getEle(errorID).innerHTML = mess;
      getEle(errorID).style.display = "block";
      return false;
    }
    // Hợp lệ
    getEle(errorID).innerHTML = "";
    getEle(errorID).style.display = "none";
    return true;
  };

  //   Kiểm tra kí tự đặc biệt và số

  this.kiemTraTen = function (value, errorID, mess) {
    var name = /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;

    if (value.match(name)) {
      getEle(errorID).innerHTML = mess;
      getEle(errorID).style.display = "block";
      return false;
    }
    getEle(errorID).innerHTML = "";
    getEle(errorID).style.display = "none";
    return true;
  };
}

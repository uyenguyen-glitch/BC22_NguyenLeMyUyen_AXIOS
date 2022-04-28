// getEle
function getEle(id) {
  return document.getElementById(id);
}

var service = new Service();

// Lấy dữ liệu
function getListUser() {
  var promise = service.fetchData();
  promise
    .then(function (result) {
      renderHTML(result.data);
      //   console.log(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getListUser();

// Rendern function
function renderHTML(arr) {
  var content = "";
  console.log(arr);

  for (var i = 0; i < arr.length; i++) {
    content += `<tr>
                      <td>${i + 1}</td>
                      <td>${arr[i].taiKhoan}</td>
                      <td>${arr[i].matKhau}</td>
                      <td>${arr[i].hoTen}</td>
                      <td>${arr[i].email}</td>
                      <td>${arr[i].ngonNgu}</td>
                      <td>${arr[i].loaiND}</td>
                      <td>
                        <button class="btn btn-info"                 
                        data-target="#myModal" data-toggle="modal" onclick="suaUser(${
                          arr[i].id
                        })">Sửa</button>
                        <button class="btn btn-danger" onclick="xoaUser(${
                          arr[i].id
                        })">Xóa</button>
                      </td>
                  </tr>`;
  }
  getEle("tblDanhSachNguoiDung").innerHTML = content;
}

// Dom lấy dữ liệu
function layThongTinUser() {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var hinhAnh = getEle("HinhAnh").value;
  var loaiNguoiDung = getEle("loaiNguoiDung").value;
  var loaiNgonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;

  // Tạo đối tượng validation
  var validation = new Validation();

  // Tạo flag
  var isValid = true;

  // Validation
  /**
   * Tài khoản
   */
  isValid &= validation.kiemTraRong(
    taiKhoan,
    "errorTK",
    "(*) Tài khoản không được để trống"
  );
  /**
   * Họ tên
   */
  isValid &=
    validation.kiemTraRong(
      hoTen,
      "errorHT",
      "(*) Họ tên không được để trống"
    ) && validation.kiemTraTen(hoTen, "errorHT", "(*) Tên không hợp lệ");
  /**
   * Password
   */
  isValid &=
    validation.kiemTraRong(
      matKhau,
      "errorMK",
      "(*) Mật khẩu không được để trống"
    ) &&
    validation.kiemTraDoDaiChuoi(
      matKhau,
      "errorMK",
      "(*) Mật khẩu phải có từ 6-8 kí tự",
      6,
      8
    ) &&
    validation.kiemTraMatKhau(
      matKhau,
      "errorMK",
      "(*) Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt"
    );
  /**
   * Email
   */
  isValid &=
    validation.kiemTraRong(
      email,
      "errorEmail",
      "(*) Email không được để trống"
    ) &&
    validation.kiemTraDinhDangEmail(
      email,
      "errorEmail",
      "(*) Email không đúng định dạng"
    );
  /**
   * Hình ảnh
   */
  isValid &= validation.kiemTraRong(
    hinhAnh,
    "errorHA",
    "(*) Hình ảnh không được để trống"
  );

  /**
   * Loại người dung
   */
  isValid &= validation.kiemTraSelecBox(
    loaiNguoiDung,
    "errorLND",
    "(*) Vui lòng chọn loại người dùng",
    "Chọn loại người dùng"
  );

  /**
   * Loại ngôn ngữ
   */
  isValid &= validation.kiemTraSelecBox(
    loaiNgonNgu,
    "errorNN",
    "(*) Vui lòng chọn loại ngôn ngữ",
    "Chọn ngôn ngữ"
  );
  /**
   * Mô tả
   */
  isValid &=
    validation.kiemTraRong(moTa, "errorMT", "(*) Mô tả không được để trống") &&
    validation.kiemTraDoDaiChuoi(
      moTa,
      "errorMT",
      "(*) Mô tả không vượt quá 60 kí tự",
      1,
      60
    );

  // Check form
  if (!isValid) return null;

  // Tạo đối tượng user
  var user = new Users(
    "",
    taiKhoan,
    hoTen,
    matKhau,
    email,
    hinhAnh,
    loaiNguoiDung,
    loaiNgonNgu,
    moTa
  );

  return user;
}
// Dom tới nút thêm mới
getEle("btnThemNguoiDung").addEventListener("click", function () {
  // add button Them dưới footer của modal
  var footer = `<button class="btn btn-success" onclick="themUser()" id="btn-them">Thêm</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
});

// Thêm người dùng
function themUser() {
  var user = layThongTinUser();
  if (user != null) {
    service
      .addUser(user)
      .then(function () {
        getListUser();
        // Tắt modal
        document.getElementsByClassName("close")[0].click();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

// Xóa
function xoaUser(id) {
  service
    .deleteUser(id)
    .then(function (result) {
      // Xóa thành công fetch lại data mới
      getListUser();
    })
    .catch(function (error) {
      console.log(error);
    });
}

//   Dom tới nút sửa
function suaUser(id) {
  // Sửa lại tiêu đề modal
  document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa User";
  // add button Cập nhật dưới footer của modal
  var footer = `<button class="btn btn-success" onclick="capNhatUser(${id})">Cập nhật</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
  // gọi phương thức service để lấy product từ server
  service
    .fetchDataID(id)
    .then(function (result) {
      var user = result.data;
      getEle("TaiKhoan").value = user.taiKhoan;
      getEle("HoTen").value = user.hoTen;
      getEle("MatKhau").value = user.matKhau;
      getEle("Email").value = user.email;
      getEle("HinhAnh").value = user.hinhAnh;
      getEle("loaiNguoiDung").value = user.loaiND;
      getEle("loaiNgonNgu").value = user.loaiNgonNgu;
      getEle("MoTa").value = user.moTa;
    })
    .catch(function (error) {
      console.log(error);
    });
}
// Update
function capNhatUser(id) {
  var user = layThongTinUser();

  var user = new Users(
    id,
    user.taiKhoan,
    user.hoTen,
    user.matKhau,
    user.email,
    user.hinhAnh,
    user.loaiNguoiDung,
    user.loaiNgonNgu,
    user.moTa
  );

  service
    .update(user)
    .then(function (result) {
      getListUser();
      // Tắt modal
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

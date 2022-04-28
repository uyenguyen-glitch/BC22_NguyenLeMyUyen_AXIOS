function Service() {
  // Lấy dữ liệu
  this.fetchData = function () {
    return axios({
      url: "https://6255692452d8738c6921720f.mockapi.io/api/staff_student",
      method: "GET",
    });
  };

  //   Thêm dữ liệu
  this.addUser = function (user) {
    return axios({
      url: `https://6255692452d8738c6921720f.mockapi.io/api/staff_student`,
      method: "POST",
      data: user,
    });
  };
  //   Xóa dữ liệu
  this.deleteUser = function (id) {
    return axios({
      url: `https://6255692452d8738c6921720f.mockapi.io/api/staff_student/${id}`,
      method: "DELETE",
    });
  };
  // Lấy dữ liệu có id
  this.fetchDataID = function (id) {
    return axios({
      url: `https://6255692452d8738c6921720f.mockapi.io/api/staff_student/${id}`,
      method: "GET",
    });
  };
  // Cập nhật dữ liệu
  this.update = function (user) {
    return axios({
      url: `https://6255692452d8738c6921720f.mockapi.io/api/staff_student/${user.id}`,
      method: "PUT",
      data: user,
    });
  };
}

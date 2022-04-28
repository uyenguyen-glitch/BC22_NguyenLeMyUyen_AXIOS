function Service() {
  this.fetchData = function () {
    return axios({
      //   key: value
      url: "https://6255692452d8738c6921720f.mockapi.io/api/staff_student",
      method: "GET",
    });
  };
}

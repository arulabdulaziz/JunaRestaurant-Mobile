import axios from "axios";
const axiosInst = axios.create({
  baseURL: "https://juna-restaurant.herokuapp.com/",
  timeout: 100000,
});
const interceptResponse = (res) => {
  try {
    console.log(res, "3<<");
    return Promise.resolve(res);
  } catch (e) {
    // check for response code 123 and redirect to login
    console.log(e, "4<<");
    return Promise.resolve(res);
  }
};
const interceptResError = (error) => {
  if (error.message == "Network Error") {
    error.response = {
      message: "No Internet Connection",
    };
  }
  if (!error.response) {
    return Promise.reject(error);
  }
  const { status } = error.response;
  // console.log(error.response, "<< error2")
  if (status === 401) {
    // logout
    // navigation.replace('Login')
    return Promise.reject(error);
  }
  return Promise.reject(error);
};
axiosInst.interceptors.response.use(interceptResponse, interceptResError);
export default axiosInst;

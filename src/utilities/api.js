import axios from "axios";

const api = axios.create({
  // // baseURL: "http://localhost:5000/api/",
  // baseURL: "http://196.219.138.210:5002/api/", // Replace with your API base URL
  baseURL: "http://192.168.1.29:5002/api/ar/", // Replace with your API base URL

  // baseURL: "http://192.168.1.29:5004/api/", // Replace with your API base URL
  // baseURL: "http://196.219.138.210:5002/api/ar/", // Replace with your API base URL
  // baseURL: "http://192.168.1.197:5000/api/ar/", // Replace with your API base URL
  withCredentials: true, // This allows sending credentials (cookies, authorization headers, etc.)
  headers: {
    "Content-Type": "application/json", // Set content type if necessary
    platform: "Web", // You can set any header you want here
  },
});

// export const signIn = async (email, password) => {
//   try {
//     const user = await api.post("auth/signin", {
//       emailOrUsername: email,
//       password: password,
//     });

//     const userdata = user.data.user;
//     localStorage.setItem("userData", JSON.stringify(userdata));
//     localStorage.setItem("AccessToken", JSON.stringify(user.data.accessToken));
//     return userdata;
//   } catch (err) {
//     throw new Error(err);
//   }
// };

// Request interceptor to include token as a cookie
// api.interceptors.request.use(
//   (config) => {
//     // Get the token from localStorage

//     const token = localStorage.getItem("AccessToken");
//     // console.log(token);
//     if (token !== "undefined" || !token) {
//       config.headers.Authorization = `Bearer ${JSON.parse(
//         localStorage.getItem("AccessToken")
//       )} `;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => {
//     // If the response is successful, return it
//     return response;
//   },
//   async (error) => {
//     // const originalRequest = error.config;

//     // Check if the error is due to an expired token
//     if (error.response && error.response.status === 401) {
//       localStorage.clear();
//       return Promise.reject(error);
//     }

//     return Promise.reject(error);
//   }
// );

// Function to handle sign-out (optional)
// export const signOut = () => {
// 	// Clear user data
// 	localStorage.removeItem("AccessToken");

// 	// Redirect to sign-in page (if needed)
// 	window.location.href = "/AuthPage";
// };

export default api;

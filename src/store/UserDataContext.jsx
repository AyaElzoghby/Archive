/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

export const UserDataContext = createContext({
  userName: "",
  ImageSrc:"",
  email: "",
  lastActive: "",
  userDepartmentID: 0,
  userDepartmentName: "",
  userTypeID: 0,
  userTypeName: "",

});

function UserDataProvider({ children }) {
  const [userData, setUserData] = useState({
    ImageSrc:"",
    userName: "",
    email: "",
    lastActive: "",
    userDepartmentID: 0,
    userDepartmentName: "",
    userTypeID: 0,
    userTypeName: "",
  });

  // Load user data from localStorage once when the component mounts
  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("user"));
    if (storedUserData) {
      setUserData({
        ImageSrc: storedUserData.ImageSrc||"",
        userName: storedUserData.username || "",
        email: storedUserData.email || "",
        lastActive: storedUserData.lastActive || "",
        userDepartmentID: storedUserData.UserDepartmentID || 0,
        userDepartmentName: storedUserData.UserDepartmentName || "",
        userTypeID: storedUserData.userTypeID || 0,
        userTypeName: storedUserData.userTypeName||"",

      });
    }
  }, []);

  return (
    <UserDataContext.Provider value={userData}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserDataProvider;

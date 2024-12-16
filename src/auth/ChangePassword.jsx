import { useState } from "react";
import { PencilLine, Cancel, Eye, EyeClosed } from "../../src/assets/index";
import ArrowLineUpRight from "../../public/icons/ArrowLineUpRight.svg";
import { api } from "../utilities";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handlePasswordChange = async () => {
    // Input validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("جميع الحقول مطلوبة");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("كلمة المرور الجديدة وتأكيد كلمة المرور لا تتطابقان");
      return;
    }

    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      await api.post("/auth/change-password", {
        oldPassword,
        newPassword,
      });
      setSuccess("تم تغيير كلمة المرور بنجاح");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(
        err.response?.data?.message || "حدث خطأ أثناء تغيير كلمة المرور"
      );
    } finally {
      setLoading(false);
    }
  };

  const togglePopup = () => {
    setIsPopupVisible((prev) => !prev);
  };

  const togglePasswordVisibility = (field) => {
    if (field === "old") setShowOldPassword((prev) => !prev);
    if (field === "new") setShowNewPassword((prev) => !prev);
    if (field === "confirm") setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="font-tajawal">
      {/* Button to open the popup */}
      <button
        onClick={togglePopup}
        className="bg-[#2579A7] text-white py-2 px-4 rounded  hover:bg-[#1f648d] focus:outline-none"
      >
        <div className="flex w-40 gap-2 font-bold">
          <p>تغيير كلمة المرور</p>
          <img className="w-6 h-6" src={PencilLine} alt="Icon" />
        </div>
      </button>

      {/* Popup Modal */}
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-[400px]">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">تغيير كلمة المرور</h2>
              <button
                onClick={togglePopup}
                className="text-gray-500 hover:text-gray-800"
              >
                <img src={Cancel} alt="Close Icon" />
              </button>
            </div>
            <div className="w-full h-[1px] bg-[#6B9FBB80] mb-4"></div>

            <div>
              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
              {success && <p className="text-green-500 text-sm mb-3">{success}</p>}

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">كلمة المرور القديمة</label>
                <div className="relative ">
                <span
                    className="absolute top-1/2 left-3 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => togglePasswordVisibility("old")}
                  >
                    <img
                      src={showOldPassword ?  Eye :EyeClosed}
                      alt="Toggle Visibility"
                      className="w-5 h-5"
                    />
                  </span>
                  <input
                    type={showOldPassword ? "text" : "password"}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder="ادخل كلمة المرور القديمة"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                 
                </div>
             
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">كلمة المرور الجديدة</label>
                <div className="relative ">
                <span
                    className="absolute top-1/2 left-3 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => togglePasswordVisibility("new")}
                  >
                    <img
                      src={showNewPassword ?  Eye :EyeClosed}
                      alt="Toggle Visibility"
                      className="w-5 h-5"
                    />
                  </span>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    placeholder="ادخل كلمة المرور الجديدة"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                 
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">تأكيد كلمة المرور الجديدة</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                    placeholder="تأكيد كلمة المرور الجديدة"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span
                    className="absolute top-1/2 left-3 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => togglePasswordVisibility("confirm")}
                  >
                    <img
                      src={showConfirmPassword ?  Eye :EyeClosed}
                      alt="Toggle Visibility"
                      className="w-5 h-5"
                    />
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center w-full gap-1">
                <button
                  className="bg-[#2579A7] text-white px-4 py-2 w-full rounded-md font-bold hover:bg-[#1f648d] flex justify-center items-center gap-2"
                  onClick={handlePasswordChange}
                  disabled={loading}
                >
                  {loading ? "جارٍ الحفظ..." : "حفظ التغييرات"}
                  <img src={ArrowLineUpRight} alt="Icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;

// import React, { useState } from "react";
// import axios from "axios";
// import { PencilLine } from "../../src/assets/index";
// import ArrowLineUpRight from "../../public/icons/ArrowLineUpRight.svg";
// import { Cancel } from "../assets/index";
// import { api } from "../utilities";


// const ChangePassword = () => {
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [isPopupVisible, setIsPopupVisible] = useState(false);

//   const handlePasswordChange = async () => {
//     if (newPassword !== confirmPassword) {
//       setError("كلمة المرور الجديدة وتأكيد كلمة المرور لا تتطابقان");
//       return;
//     }

//     setError(null);
//     setSuccess(null);
//     setLoading(true);

//     try {
//       await api.put("/auth/change-password", {
//         oldPassword,
//         newPassword,
//       });
//       setSuccess("تم تغيير كلمة المرور بنجاح");
//       setOldPassword("");
//       setNewPassword("");
//       setConfirmPassword("");
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "حدث خطأ أثناء تغيير كلمة المرور"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Show or hide the popup
//   const togglePopup = () => {
//     setIsPopupVisible((prev) => !prev);
//   };

//   return (
//     <div className="font-tajawal">
//       {/* Button to open the popup */}
//       <button
//         onClick={togglePopup}
//         className="bg-[#2579A7] text-white py-2 px-4 rounded mb-4"
//       >
//         <div className="flex gap-2 font-bold">
//           <p>تغيير كلمة المرور</p>
//           <img className="w-6 h-6" src={PencilLine} alt="Icon" />
//         </div>
//       </button>

//       {/* Popup Modal */}
//       {isPopupVisible && (
//         <div className="fixed inset-0 border-[1px] border border-[#6B9FBB80] bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-md shadow-lg w-[400px]">
//             <div className="justify-between items-center mb-2 flex">
//             <h2 className="text-xl font-bold">تغيير كلمة المرور</h2>

//               <button
//                 onClick={togglePopup}
//                 className=" text-gray-500 hover:text-gray-800"
//               >
//                 <img src={Cancel} alt="" />
//               </button>
//             </div>
//             <div className="w-[98%] h-[1px] bg-[#6B9FBB80]"></div>


//           <div className="mt-4 pt-2 ">
//           {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
//             {success && <p className="text-green-500 text-sm mb-3">{success}</p>}

//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">كلمة المرور القديمة</label>
//               <input
//                 type="password"
//                 className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
//                 placeholder="ادخل كلمة المرور القديمة"
//                 value={oldPassword}
//                 onChange={(e) => setOldPassword(e.target.value)}
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">كلمة المرور الجديدة</label>
//               <input
//                 type="password"
//                 className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
//                 placeholder="ادخل كلمة المرور الجديدة"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//               />
//             </div>

//             <div className="mb-4">
//               <label className="block text-gray-700 mb-2">تأكيد كلمة المرور الجديدة</label>
//               <input
//                 type="password"
//                 className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
//                 placeholder="تأكيد كلمة المرور الجديدة"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//             </div>

//             <div className="flex items-center justify-center w-full gap-1">
//               <button
//                 className="bg-[#2579A7] text-center font-bold text-white px-4 py-2 w-full rounded-md"
//                 onClick={handlePasswordChange}
//                 disabled={loading}
//               >
//                 <div className="flex text-center justify-center mx-auto w-full gap-2">
//                     <p>
//                     {loading ? "جارٍ الحفظ..." : "حفظ التغييرات"}

//                     </p>
//                     <img src={ArrowLineUpRight} alt="Icon"  />
//                 </div>
//               </button>
//               {/* <button
//                 className="bg-gray-300 px-4 py-2 rounded-md"
//                 onClick={togglePopup}
//               >
//                 إغلاق
//               </button> */}
//             </div>
//           </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChangePassword;
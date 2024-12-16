import { useState, useEffect, useRef } from "react";
// import { api } from "../../utilities";
import { Cancel } from "../../assets/index";
import Spinner from "../UI/spinner";
import Upload from "../../../public/assets/Upload.svg";
import ArrowRight from "../../../public/icons/ArrowRight.svg";
import FileUploader from "../Inputs/FileUploader";
const UploadComponent = () => {
  const [loading, setLoading] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef(null);

  // Fetch notifications from API
  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     try {
  //       const response = await api.get("notifications?DepartmentID=4015299");
  //       setNotifications(response.data.notifications);
  //     } catch (error) {
  //       console.error("Error fetching notifications:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchNotifications();
  // }, []);

  // Close popup when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupVisible(false);
      }
    };

    if (isPopupVisible) {
      window.addEventListener("click", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isPopupVisible]);

  // Show or hide the popup
  const togglePopup = (event) => {
    event.stopPropagation(); // Prevent togglePopup on button click propagating to window click
    setIsPopupVisible((prev) => !prev);
  };

  return (
    <div className="font-tajawal  w-full">
      {/* Trigger Button for Popup */}
      <div className="h-full w-full flex font-tajawal flex-col items-center">
        <div
          onClick={togglePopup}
          className={`w-full px-6 py-8 border-4 border-dashed rounded-lg border-gray-400 bg-gray-100 justify-center items-center cursor-pointer transition-all`}
        >
          <img
            src={Upload}
            className="m-auto my-6 w-12 h-12"
            alt="Uploaded preview"
          />

          <label className="text-center font-semibold text-gray-600 transition-all cursor-pointer">
            <span className="block font-[24px] font-bold text-gray-500">
              Upload
            </span>
          </label>
        </div>
      </div>

      {/* Popup Modal */}
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div
            ref={popupRef}
            className="bg-white lg:w-[40%] sm:w-[80%] h-3/5 p-6 rounded-lg shadow-lg relative overflow-hidden"
          >
            <div className="justify-between px-4 mb-4 flex">
              <h2 className="text-xl font-bold text-center text-gray-800">
                Upload Document{" "}
              </h2>
              <button onClick={togglePopup} className="text-black">
                <img src={Cancel} className="h-5 w-5 font-bold" alt="" />
              </button>
            </div>

            {/* Uploadin progress */}
            <div className="space-y-4 overflow-hidden h-full pl-2">
              {/* {loading ? (
                <div className="overflow-hidden flex justify-center items-center">
                  <Spinner />
                </div>
              ) : (
               
              <div className="flex gap-2">            <div className="w-[100%] h-[1px] mx-auto mb-6 bg-[#227099]"></div>
            <div className="w-[100%] h-[1px] mx-auto mb-6 bg-[#227099]"></div>
            <div className="w-[100%] h-[1px] mx-auto mb-6 bg-[#227099]"></div>
            </div>
             
              )} */}
              <div className="hidden" id="Step1">
              <div className="flex gap-2">
                <div className="w-[100%] h-[10px] mx-auto mb-6 bg-[#227099]"></div>
                <div className="w-[100%] h-[10px] mx-auto mb-6 bg-[#F4F4F4]"></div>
                <div className="w-[100%] h-[10px] mx-auto mb-6 bg-[#F4F4F4]"></div>
              </div>
              <div className=" gap-5">
                <div className="flex justify-around my-12 mb-28">
                  <div className="flex items-center gap-2">
                    <p>Code</p>
                    <input
                      type="number"
                      name=""
                      id=""
                      className=" w-full box-border p-2 pl-4 font-tajawal center font-semibold text-base border border-inputBorder text-inputTextColor hover:outline-inputHover hover:outline-2 focus:border-inputFocuse rounded outline-none placeholder:font-light"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <p>Name</p>
                    <input
                      type="text"
                      name=""
                      id=""
                      className=" w-full box-border p-2 pl-4 font-tajawal center font-semibold text-base border border-inputBorder text-inputTextColor hover:outline-inputHover hover:outline-2 focus:border-inputFocuse rounded outline-none placeholder:font-light"
                    />
                  </div>
                </div>
                <div className="flex justify-around my-12 mb-28">
                  <div className="flex items-center gap-2">
                    <p>Classification</p>
                    {/* <DropDown
          value={}
          onChange={(val) => {
          }}
          placeHolder={}
          options={}
        />            */}
                  </div>
                  <div className="flex items-center gap-2">
                    <p>Type</p>
                    {/* <DropDown
          value={}
          onChange={(val) => {
          }}
          placeHolder={}
          options={}
        />                */}
                  </div>
                </div>
              </div>
              <div className="w-full font-bold font-tajawal flex justify-center">
                <button
                  onClick={() => {}}
                  className="mt-4 p-2 flex bg-mainBlue w-[345px] h-[48px] justify-center items-center gap-3 text-white rounded-md "
                >
                  <p className="font-[24px]">Next </p>
                  <img src={ArrowRight} alt="" className="w-5 h-5" />
                </button>
              </div>
             
              </div>
              <div className="hidden" id="Step2">
              <div className="flex gap-2">
                <div className="w-[100%] h-[10px] mx-auto mb-6 bg-[#227099]"></div>
                <div className="w-[100%] h-[10px] mx-auto mb-6 bg-[#227099]"></div>
                <div className="w-[100%] h-[10px] mx-auto mb-6 bg-[#F4F4F4]"></div>
              </div>
              <div className=" gap-5">
                <div className="flex justify-around my-12 mb-28">
                  <div className="flex items-center gap-2">
                    <p>Code</p>
                    <input
                      type="number"
                      name=""
                      id=""
                      className=" w-full box-border p-2 pl-4 font-tajawal center font-semibold text-base border border-inputBorder text-inputTextColor hover:outline-inputHover hover:outline-2 focus:border-inputFocuse rounded outline-none placeholder:font-light"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <p>Name</p>
                    <input
                      type="text"
                      name=""
                      id=""
                      className=" w-full box-border p-2 pl-4 font-tajawal center font-semibold text-base border border-inputBorder text-inputTextColor hover:outline-inputHover hover:outline-2 focus:border-inputFocuse rounded outline-none placeholder:font-light"
                    />
                  </div>
                </div>
                <div className="flex justify-around my-12 mb-28">
                  <div className="flex items-center gap-2">
                    <p>Classification</p>
                    {/* <DropDown
          value={}
          onChange={(val) => {
          }}
          placeHolder={}
          options={}
        />            */}
                  </div>
                  <div className="flex items-center gap-2">
                    <p>Type</p>
                    {/* <DropDown
          value={}
          onChange={(val) => {
          }}
          placeHolder={}
          options={}
        />                */}
                  </div>
                </div>
              </div>
              <div className="w-full font-bold font-tajawal flex justify-center">
                <button
                  onClick={() => {}}
                  className="mt-4 p-2 flex bg-mainBlue w-[345px] h-[48px] justify-center items-center gap-3 text-white rounded-md "
                >
                  <p className="font-[24px]">Next </p>
                  <img src={ArrowRight} alt="" className="w-5 h-5" />
                </button>
              </div>
             
              </div>
              <div className="" id="Step3">
              <div className="flex gap-2">
                <div className="w-[100%] h-[10px] mx-auto mb-6 bg-[#227099]"></div>
                <div className="w-[100%] h-[10px] mx-auto mb-6 bg-[#227099]"></div>
                <div className="w-[100%] h-[10px] mx-auto mb-6 bg-[#227099]"></div>
              </div>
                <div className="flex justify-center ">
                  <FileUploader/>
               
                </div>
          
             
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadComponent;

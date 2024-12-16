import { useState, useEffect, useContext } from "react";
// import ImageCard from "../../components/UI/ImageCard";
import { api } from "../../utilities";
import { Cancel } from "../../assets/index";
import Camera from "../../../public/icons/Camera.svg";
import FileUploader from "../../components/Inputs/FileUploader";
import { SideMenuContext } from "../../store/SideMenuContext";
import Spinner from "../../components/UI/spinner";

const ChangeUserProfil = () => {
  const [Image, setImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { departmentValue, organizationValue, systemValue } =
    useContext(SideMenuContext);

  // Fetch Image from API
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await api.post("/auth/upload");
        setImage(response.data.imagePath);
      } catch (error) {
        console.error("Error fetching Image:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [departmentValue, organizationValue, systemValue]);

  // Show or hide the popup
  const togglePopup = () => {
    setIsPopupVisible((prev) => !prev);
  };

  return (
    <div>
      {/* Trigger Button for Popup */}
      <button
        onClick={togglePopup}
        className="bg-[#DDE7F1] w-full justify-center flex gap-2 text-lg font-bold text-[#227099]"
        type="button"
      >
        <img src={Camera} alt="upload image" />
        <p>تغيير الصورة</p>
      </button>

      {/* Popup Modal */}
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white w-[50%] h-3/5 p-6 rounded-lg shadow-lg relative">
            <div className="justify-between px-4 mb-4  flex">
              <h2 className="text-xl font-bold text-center text-gray-800  ">
                تغيير الصورة
              </h2>
              <button onClick={togglePopup} className=" text-black">
                <img src={Cancel} className="h-5 w-5 font-bold" alt="" />
              </button>
            </div>
            <div className="w-[100%] h-[1px] mx-auto mb-6 bg-[#227099]"></div>

            {/* Task List */}
            <div className="space-y-4 overflow-hidden h-3/4">
              {loading ? (
                <div className="overflow-hidden flex justify-center items-center">
                <Spinner />
              </div>  
              ) : (
                <div className="w-[70%] py-5 m-auto">
                  <FileUploader type="img" url={"/auth/upload"} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangeUserProfil;

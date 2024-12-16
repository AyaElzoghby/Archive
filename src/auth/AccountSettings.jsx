import { useContext} from "react";
import { UserDataContext } from "../store/UserDataContext";
import { tablerUser } from "../../src/assets/index";
import ChangePassword from "../auth/ChangePassword";
import { formatDateWithHours } from "../utilities/functions";
import ChangeUserProfil from "../Pages/additions/ChangeUserProfil"


const AccountSettings = () => {
  const { userName, userDepartmentName, lastActive,userTypeName,userTypeID, email ,ImageSrc} =
    useContext(UserDataContext);



  return (
    <div className="p-6 w-[90%] m-auto font-tajawal ">
      <div className="relative ">
        <div className="flex gap-8 items-center">
          <div className="relative w-[240px] h-[240px]">
            <img
              src={ImageSrc}
              alt="User Avatar"
              className="w-[240px] h-[240px] bg-[#F1F3F9] rounded-md p-8"
            />
            <div className="absolute object-cover rounded-md bg-[#DDE7F1] p-2 flex justify-center items-center bottom-0 h-[40px]  w-full">
             <ChangeUserProfil
             />
            </div>
          </div>

          <div className="">
            <h2 className="text-2xl font-semibold mb-3">{userName}</h2>
            <div className="text-md flex gap-3 text-gray-500 items-center">
              <p>آخر ظهور:</p>
              <p>{formatDateWithHours(lastActive)}</p>
            </div>
          </div>
        </div>
        <div className="absolute left-0 bottom-0">
          
          <ChangePassword />
        </div>
      </div>

      <div className="border border-[#6B9FBB80] border-[1px] bg-[#FCFDFD] mt-8 p-6 rounded-md shadow-sm ">
        <div className="flex gap-4 mb-4  items-center">
          <img
            src={tablerUser}
            alt="User Avatar"
            className="w-8 h-8 justify-center rounded-full border"
          />
          <h3 className="text-lg font-bold mb-2">المعلومات الشخصية</h3>
        </div>
        <div className="w-[98%] h-[1px] bg-[#6B9FBB80]"></div>
        <div className="space-y-2 p-4">
          <div className="space-y-1">
            <span className="font-semibold text-md text-[#2B2B2B80]">
              الاسم بالكامل
            </span>

            <p className="text-[#2B2B2B] font-bold text-md">{userName}</p>
          </div>
          <div className="space-y-1">
            <span className="font-semibold text-md text-[#2B2B2B80]">
              القسم
            </span>

            <p className="text-[#2B2B2B] font-bold text-md">
              {userDepartmentName || "غير محدد"}
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-semibold text-md text-[#2B2B2B80]">
              نوع المستخدم
            </span>

            <p className="text-[#2B2B2B] font-bold text-md">
              {userTypeName || "غير محدد"}
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-semibold text-md text-[#2B2B2B80]">
              البريد الالكتروني
            </span>

            <p className="text-[#2579A7] font-bold text-md"> {email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
import Home from "../../assets/Images/Home.png";
import { useAuth } from "../../store/Auth";
import { formatDate } from "../Grid/utilities";
import Spinner from "./spinner";
import { useState } from "react";
const WelcomeCard = () => {
  const { user, signOut } = useAuth();
  const [loader, setLoader] = useState(false);
  return (
    <div
      className="rounded-lg p-4 shadow-md  m-4"
      style={{
        backgroundImage: "linear-gradient(to right, #A5C5D5, #ffffff)",
      }}
      dir="rtl"
    >
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-4">
        <div className="mb-4 md:mb-0 md:order-last">
          <img
            src={Home}
            alt="Statistics"
            className="w-60 max-w-xs mx-auto md:mx-0"
          />
        </div>

        <div className="text-center md:text-right font-tajawal">
          <h3 className="text-lg font-semibold text-[#133A54]">مرحباً بك</h3>
          <h4 className="text-xl font-bold text-[#133A54] mt-2">
            {" "}
            {user?.username}{" "}
          </h4>
          <p className="text-sm font-tajawal text-[#133A54] mt-2 flex items-center ">
            آخر ظهور{" "}
            {user.lastActive?.split("T")[0] +
              " - " +
              user.lastActive?.split("T")[1].split("+")[0]}
          </p>
          <div className="mt-4 space-x-2 space-x-reverse">
            <button
              disabled={loader}
              onClick={async () => {
                setLoader(true);
                await signOut();
              }}
              className="bg-[#227099]  text-white py-2 px-4 rounded-lg hover:bg-[#1a5a73] transition"
            >
              {loader ? <Spinner parentStyle="min-h-4" /> : "	تسجيل الخروج"}
            </button>
            <button className="border hidden border-[#227099] text-[#227099] py-2 px-4 rounded-lg hover:bg-blue-100 transition"></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;

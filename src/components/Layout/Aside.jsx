/* eslint-disable react/prop-types */

// import { profile, homeIcon, logout } from "../../assets";
import X from "../../../public/icons/X.svg";
import { useRef, useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../store/Auth";
// import { formatDateWithHours } from "../../utilities/functions";

import asideBurger from "/icons/AsideBurger.svg";
import HomeIcon from "/icons/Home.svg";
import searchIcon from "/icons/Search-Magnifier.svg";

import { TreeBox, AsideDropDowns } from "./index";
import {Spinner} from "../UI/index"
import { IconComp } from "../Grid/UI";

import { SideMenuContext } from "../../store/SideMenuContext";

// import { buildTree } from "../Grid/utilities";

function Aside() {
  // const navigate = useNavigate();
  const [userMenu, setUserMenu] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  // const { signOut, user } = useAuth();
  // const [mainTree, setMainTree] = useState([]);
  // const [reportTree, setReportTreeData] = useState([]);
  const {
    systemValue,
    loading,
  } = useContext(SideMenuContext);

  const userMenuRef = useRef(null);
  const AsideRef = useRef(null);

  // const navigateHome = () => {
  //   navigate("/");
  // };

  const asideToggler = () => {
    setIsOpened((prev) => !prev);
  };

  // useEffect(() => {
  //   setMainTree(buildTree(mainTreeData, null, "MenuParentID", "MenuID"));
  // }, [mainTreeData]);

  

  // console.log(mainTree);

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenu(false);
      }
    }

    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuRef]);

  useEffect(() => {
    const handleClickOutsideAside = (e) => {
      if (AsideRef.current && !AsideRef.current.contains(e.target)) {
        setIsOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideAside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideAside);
    };
  }, [isOpened]);

  return (
    <>
      <aside
        id="Aside"
        ref={AsideRef}
        className={`h-full bg-white rounded-tl-lg shadow-md overflow-y-auto scrollbar-none ${
          isOpened
            ? " flex-1 min-w-[451px] "
            : "scrollbar-none w-[5.5rem] min-w-[85px]"
        } duration-500 transition-all`}
      >
        {/* Toggle Button */}
        {!loading && (
          <div>
            <div
              className={`flex justify-end p-4  h-fit  ${
                isOpened ? "block" : "hidden"
              }`}
            >
              <img
                src={X}
                alt="toggle"
                className="cursor-pointer hover:scale-[1.2] duration-300 ease-out"
                onClick={asideToggler}
              />
            </div>

            {/* Animated Content */}
            <div
              className={` transition-opacity duration-500 ${
                isOpened
                  ? "opacity-100 max-h-[600px] block"
                  : "opacity-0 max-h-0 hidden"
              }`}
            >
              {/* User Info */}
              <div className="relative mb-2 border-b  border-b-[#D9D9D9] flex justify-between">
                <div className="justify-center items-center" ref={userMenuRef}>
                  {/* <button className="hover:-translate-x-1 duration-300 w-full ease-in-out pt-1 px-3 ">
                    <div
                      className="flex items-center gap-2"
                      onClick={() => {
                        setUserMenu(!userMenu);
                      }}
                    >
                      <img
                        width={40}
                        height={40}
                        src={profile}
                        alt="profile"
                        className="rounded-full w-9 h-9"
                      />
                      <div
                        className={`flex-col text-right transition-all duration-500 ${
                          isOpened ? "block" : "hidden"
                        }`}
                      >
                        <div className="font-tajawal flex flex-col">
                          <p className="text-l font-medium">
                            {user?.username || ""}
                          </p>
                          <p className="text-xs text-[#878787]">{`اخر تسجيل ${formatDateWithHours(
                            user?.lastActive
                          )}`}</p>
                        </div>
                      </div>
                    </div>
                  </button> */}
                  {/* User Menu */}
                  {/* <div
                    className={`${userMenu ? "flex" : "hidden"} ${
                      mobile ? "" : "absolute"
                    } bg-gray-50 z-10 shadow-md border border-[#00000020] p-1 bottom-[-95px] flex-col left-0 w-full`}
                  >
                    <button
                      onClick={() => {
                        navigate("/AccountSettings.aspx");
                      }}
                      className="p-1 flex items-center justify-between flex-row-reverse hover:scale-105 duration-300 ease-in-out"
                    >
                      <img src={profile} alt="settings"></img>
                      الحساب
                    </button>

                    <button
                      onClick={signOut}
                      className="p-1 flex items-center justify-between flex-row-reverse hover:scale-105 duration-300 ease-in-out"
                    >
                      <img src={logout} alt="logout"></img>
                      تسجيل الخروج
                    </button>
                  </div> */}
                </div>
                {/* <div
                  className={` pl-1 pt-3 duration-300 ${
                    isOpened ? "block" : "hidden"
                  }`}
                >
                  <img
                    src={asideBurger}
                    alt=""
                    className="cursor-pointer hover:scale-[1.2] duration-300 ease-out"
                    onClick={asideToggler}
                  />
                </div> */}
              </div>

              <div className="px-3">
                {/* Dropdowns */}
                <AsideDropDowns />
                {/* Navigation */}
                {/* <div
                  className="flex py-2 pl-2 my-2 cursor-pointer hover:mr-1 duration-300"
                  onClick={() => {
                    navigateHome();
                    pageNameHandler("الصفحه الرئيسية");
                  }}
                >
                  <img
                    src={homeIcon}
                    width={25}
                    alt="homeIcon"
                    className="w-[20px] pl-1"
                  />
                  <h3
                    className={`text-[#5C5E64] ${
                      isOpened ? "block" : "hidden"
                    }`}
                  >
                    الصفحة الرئيسية
                  </h3>
                </div> */}

                {/* TreeBox */}
                <TreeBox />
              </div>
            </div>
          </div>
        )}

        {!isOpened && !loading && (
          <div>
            <div
              className={`flex justify-center items-center py-3 border-b  border-b-[#D9D9D9] duration-300 ${
                !isOpened ? "block" : "none"
              }`}
            >
              <img
                src={asideBurger}
                alt=""
                className="cursor-pointer hover:scale-[1.2] duration-300 ease-out"
                onClick={asideToggler}
              />
            </div>

            <div className=" px-4 flex flex-col gap-4">
              <div
                className={`flex flex-col gap-4 pt-5 pb-3 ${
                  !isOpened ? "border-b border-b-[#D9D9D9]" : ""
                }`}
              >
   

                <div
                  className={`flex justify-center items-center  duration-300 ${
                    !isOpened ? "block" : "hidden"
                  }`}
                >
                  <img
                    src={searchIcon}
                    alt=""
                    className="cursor-pointer hover:scale-[1.2] duration-300 ease-out"
                    onClick={asideToggler}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 px-4">
              <p
                className={`${
                  !isOpened ? "block" : "hidden"
                } text-center font-semibold`}
              >
                Projects
              </p>

              {/* <div className="mt-5 flex flex-col gap-5 items-center">
                {systemValue.value === 21 && mainTree.length > 0 && (
                  <>
                    <IconComp
                      isOpened={isOpened}
                      src={homeIcon}
                      config={mainTree[0]}
                      toolName={"MenuNameAr"}
                    />
                    <IconComp
                      isOpened={isOpened}
                      src={homeIcon}
                      config={mainTree[1]}
                      toolName={"MenuNameAr"}
                    />
                    <IconComp
                      isOpened={isOpened}
                      src={homeIcon}
                      config={mainTree[2]}
                      toolName={"MenuNameAr"}
                    />
                    <IconComp
                      isOpened={isOpened}
                      src={homeIcon}
                      config={mainTree[3]}
                      toolName={"MenuNameAr"}
                    />
                  </>
                )}

                
              </div> */}
            </div>

           
          </div>
        )}

        {loading && <Spinner />}
      </aside>
    </>
  );
}

export default Aside;

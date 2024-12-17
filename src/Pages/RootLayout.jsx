/* eslint-disable react/prop-types */
import { Aside, Header, SecondaryHeader } from "../components/index";
import SearchInput from "../components/Inputs/SearchInput";
import CreateInpute from "../components/Inputs/CreateInpute";
import CreateComponent from "../components/Inputs/CreateComponent";

import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="">
      <Header />
      <div
        className="flex"
        style={{
          height: `calc(100vh - 65px)`,
        }}
      >
        <Aside />
        <main className="w-full h-full overflow-y-auto scrollbar-none">
          <div className="px-4">
            <Outlet />
            <Toaster
              position="bottom-right"
              reverseOrder
              toastOptions={{
                duration: 2000,
              }}
            />
          </div>
        </main>
        {/* <div className="grow border bordeer-[#FAFAFA] border-r-2  p-6">
          <SearchInput />
          <div className="flex items-center">
            <div className="w-[180px] h-[108px] left-0 mt-6 ">
              <CreateComponent />
            </div>
          </div>
        </div> */}
        {/* <div className="grow p-4">
          <SearchInput />
        </div> */}
      </div>
    </div>
  );
}

export default RootLayout;

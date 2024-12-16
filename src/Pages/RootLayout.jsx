/* eslint-disable react/prop-types */
import { Aside, Header, SecondaryHeader } from "../components/index";
import SearchInput from "../components/Inputs/SearchInput";
import CreateInpute from "../components/Inputs/CreateInpute";
import UploadComponent from "../components/Inputs/UploadComponent";

import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="">
      <Header />
      <div
        className="flex"
        style={{
          height: `calc(100vh - 112px)`,
        }}
      >
        <Aside />
        <main className="w-full flex h-full overflow-y-auto scrollbar-none z-0">
          {/* <div className="px-4">
            <Outlet />
            <Toaster
              position="bottom-right"
              reverseOrder
              toastOptions={{
                duration: 2000,
              }}
            />
          </div> */}
          <div className="grow border bordeer-[#FAFAFA] border-r-2  p-4">
            <SearchInput />
            <div className="flex p-4 gap-4">
              <CreateInpute />
              <UploadComponent />
            </div>
          </div>
          <div className="grow p-4">
            {" "}
            <SearchInput />
          </div>
        </main>
      </div>
    </div>
  );
}

export default RootLayout;

import { SideMenuContext } from "../../store/SideMenuContext";
import { useContext } from "react";

import MainDropDown from "../Layout/MainDropDown";

function AsideDropDowns() {
  const {
    CompanyData,
    ClassificationValue,
    CompanyValue,
    handleChangeCompanyValue,
    handleChangeClassificationValue,
    classifications,
  } = useContext(SideMenuContext);

  return (
    <div>
      <div className="flex flex-col gap-2 font-tajawal my-4 font-bold">
        <div className="flex items-center justify-between mb-2">
          <div className="max-w-[200px]">
            <MainDropDown
              placeholder={"Company"}
              options={CompanyData}
              value={CompanyValue}
              onChange={(value) => handleChangeCompanyValue(value)}
            ></MainDropDown>
          </div>
        </div>
        <div className=" items-center justify-between mb-2">
          <div className="max-w-[200px]">
            <MainDropDown
              placeholder={"Classification"}
              value={ClassificationValue}
              options={classifications}
              onChange={(value) => handleChangeClassificationValue(value)}
            ></MainDropDown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AsideDropDowns;

import { SideMenuContext } from "../../store/SideMenuContext";
import { useContext } from "react";

import MainDropDown from "../Layout/MainDropDown";

function AsideDropDowns() {
  const {
    CompanyData,
    ClassificationData,
    ClassificationValue,
    CompanyValue,
    setCompanyValue,
    setClassificationValue,
  } = useContext(SideMenuContext);

  const handleChangeClassificationValue = (value) => {
    localStorage.setItem("ClassificationValue", JSON.stringify(value));
    setClassificationValue(value);
  };

  const handleChangeCompanyValue = (value) => {
    localStorage.setItem("CompanyValue", JSON.stringify(value));
    setCompanyValue(value);
  };

  return (
    <div>
      {/* {departmentData.length &&
        CompanyData.length &&
        ClassificationData.length && ( */}
      <div className="flex flex-col gap-2 font-tajawal w-[371px] my-10 mx-auto font-bold">
        <div className="flex items-center justify-between mb-2 h-[48px]">
          <p>Company</p>
          <div className="max-w-[201px]">
            <MainDropDown
              placeholder={"Company"}
              options={CompanyData}
              value={CompanyValue}
              onChange={(value) => handleChangeCompanyValue(value)}
            ></MainDropDown>
          </div>
        </div>
        <div className="flex items-center justify-between mb-2">
          <p>Classification</p>
          <div className="max-w-[201px]">
            <MainDropDown
              placeholder={"Classification "}
              options={ClassificationData}
              value={ClassificationValue}
              onChange={(value) => handleChangeClassificationValue(value)}
            ></MainDropDown>
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
}

export default AsideDropDowns;

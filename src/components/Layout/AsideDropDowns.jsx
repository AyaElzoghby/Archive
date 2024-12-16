import { SideMenuContext } from "../../store/SideMenuContext";
import { useContext } from "react";

import MainDropDown from "../Layout/MainDropDown";



function AsideDropDowns() {
  const {
    organizationData,
    ClassificationData,
    ClassificationValue,
    organizationValue,
    setOrganizationValue,
    setClassificationValue,
  } = useContext(SideMenuContext);

  const handleChangeClassificationValue = (value) => {
    localStorage.setItem("ClassificationValue", JSON.stringify(value));
    setClassificationValue(value);
  };

  const handleChangeOrganizationValue = (value) => {
    localStorage.setItem("orgValue", JSON.stringify(value));
    setOrganizationValue(value);
  };

  return (
    <div>
      {/* {departmentData.length &&
        organizationData.length &&
        ClassificationData.length && ( */}
      <div className="flex flex-col gap-2 font-tajawal font-bold">
      <div className="flex gap-2 mb-2">
          <p>Company</p>
          <MainDropDown
          placeholder={"Company"}
          options={organizationData}
          value={organizationValue}
          onChange={(value) => handleChangeOrganizationValue(value)}
        ></MainDropDown>
        </div> 
        <div className="flex gap-2 mb-2">
          <p>Classification</p>
          <MainDropDown
          placeholder={"Classification "}
          options={ClassificationData}
          value={ClassificationValue}
          onChange={(value) => handleChangeClassificationValue(value)}
        ></MainDropDown>
       
        </div>
     
       
       
      </div>
      {/* )} */}
    </div>
  );
}

export default AsideDropDowns;

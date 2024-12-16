import { createContext, useState, useEffect, useCallback } from "react";
import api from "../utilities/api";
import { handleDropdownFormat, getInitialValue } from "../utilities/functions";

export const SideMenuContext = createContext({
  organizationData: [],
  ClassificationData: [],
  organizationValue: {},
  ClassificationValue: {},
  languageValue: 0, 
  Languages : [],
  mainTreeData: [],
  setOrganizationValue: () => {},
  setClassificationValue: () => {},
  setLanguageValue: () => {}, 
  loading: null,
  error: null,
  pageName: "",
  pageNameHandler: () => {},
});

function SideMenuProvider({ children }) {
  const [organizationData, setOrganizationData] = useState([]);
  const [ClassificationData, setClassificationData] = useState([]);
  const [mainTreeData, setMainTreeData] = useState([]);
  const [pageName, setPageName] = useState(
    JSON.parse(localStorage.getItem("pageName")) || "الصفحه الرئيسية"
  );

 
  const [organizationValue, setOrganizationValue] = useState(
    getInitialValue("orgValue")
  );
  const [languageValue, setLanguageValue] = useState(
    getInitialValue("LangValue")
  ); 
  const [ClassificationValue, setClassificationValue] = useState(
    getInitialValue("ClassificationValue", true)
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const Languages = [
    { value: 1, label: "العربيه", img: "/icons/Egypt.svg" },
    { value: 2, label: "English", img:"/icons/UnitedStates.svg" },

  ];

  const fetchDropdownData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("user/menus");
      setOrganizationData(
        handleDropdownFormat(response.data.orgList, "OrgID", "OrgName")
      );
      setClassificationData(
        handleDropdownFormat(response.data.ClassificationList, "ClassificationID", "ClassificationName")
      );
    
    } catch (err) {
      console.error("Error fetching dropdown data:", err);
      setError("Failed to load dropdown options.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchMainTreeMenu = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `user/treeMenu?ClassificationID=${ClassificationValue.value}`
      );
      setMainTreeData(response.data.treeMenu);
    } catch (err) {
      console.error("Error fetching main tree menu data:", err);
      setError("Failed to load main tree menu.");
    } finally {
      setLoading(false);
    }
  }, [ClassificationValue]);

  

  const pageNameHandler = (name) => {
    setPageName(name);
  };

  useEffect(() => {
    fetchDropdownData();
    fetchMainTreeMenu();
  }, [fetchDropdownData, fetchMainTreeMenu]);

  // Sync selected values with localStorage

  useEffect(() => {
    localStorage.setItem("orgValue", JSON.stringify(organizationValue));
  }, [organizationValue]);

  useEffect(() => {
    localStorage.setItem("ClassificationValue", JSON.stringify(ClassificationValue));
  }, [ClassificationValue]);

  useEffect(() => {
    localStorage.setItem("LangValue", JSON.stringify(languageValue)); 
  }, [languageValue]);

  useEffect(() => {
    localStorage.setItem("pageName", JSON.stringify(pageName));
  }, [pageName]);

  return (
    <SideMenuContext.Provider
      value={{
        organizationData,
        ClassificationData,
        languageValue, 
        Languages,
        organizationValue,
        ClassificationValue,
        mainTreeData,
        setOrganizationValue,
        setClassificationValue,
        setLanguageValue, 
        loading,
        error,
        pageName,
        pageNameHandler,
      }}
    >
      {children}
    </SideMenuContext.Provider>
  );
}

export default SideMenuProvider;


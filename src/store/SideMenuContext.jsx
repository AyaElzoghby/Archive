/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useCallback } from "react";
import api from "../utilities/api";
import { handleDropdownFormat, getInitialValue } from "../utilities/functions";

export const SideMenuContext = createContext({
  CompanyData: [],
  ClassificationData: [],
  CompanyValue: {},
  ClassificationValue: {},
  languageValue: 0,
  Languages: [],
  mainTreeData: [],
  setCompanyValue: () => {},
  setClassificationValue: () => {},
  handleChangeLanguage: () => {},
  loading: null,
  error: null,
  pageName: "",
  pageNameHandler: () => {},
});

function SideMenuProvider({ children }) {
  const [CompanyData, setCompanyData] = useState([]);
  const [ClassificationData, setClassificationData] = useState([]);
  const [mainTreeData, setMainTreeData] = useState([]);
  const [pageName, setPageName] = useState(
    JSON.parse(localStorage.getItem("pageName")) || "الصفحه الرئيسية"
  );

  const [CompanyValue, setCompanyValue] = useState(() =>
    getInitialValue("CompanyID")
  );
  const [languageValue, setLanguageValue] = useState(() =>
    getInitialValue("LangValue")
  );
  const [ClassificationValue, setClassificationValue] = useState(() =>
    getInitialValue("ClassificationValue", true)
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const Languages = [
    { value: 1, label: "العربيه", img: "/icons/Egypt.svg" },
    { value: 2, label: "English", img: "/icons/UnitedStates.svg" },
  ];

  const handleChangeLanguage = (val) => {
    localStorage.setItem("LangValue", JSON.stringify(val));
    setLanguageValue(val);
  };

  /**
   * Fetch dropdown data for Company and Classification.
   */
  const fetchDropdownData = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch the data from the API
      const response = await api.get(`/table?sp=api_admin_company_trx`);
      console.log(response);
      // Safely set the data from the response
      if (response?.data?.success) {
        const companyList = response.data.data || [];
        setCompanyData(
          handleDropdownFormat(companyList, "CompanyID", "CompanyName")
        );

        // Handle ClassificationList only if it exists
        const classificationList = response.data.ClassificationList || [];
        setClassificationData(
          handleDropdownFormat(
            classificationList,
            "ClassificationID",
            "ClassificationName"
          )
        );
      } else {
        throw new Error("Unexpected API response format.");
      }
    } catch (err) {
      console.error("Error fetching dropdown data:", err);
      setError("Failed to load dropdown options.");
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch tree menu data based on ClassificationValue.
   */
  const fetchMainTreeMenu = useCallback(async () => {
    try {
      if (!ClassificationValue?.value) return; // Avoid fetching if ClassificationValue is not set
      setLoading(true);

      // Fetch the data from the API
      const response = await api.get(
        `user/treeMenu?ClassificationID=${ClassificationValue.value}`
      );

      // Safely set the tree menu data
      setMainTreeData(response?.data?.treeMenu || []);
    } catch (err) {
      console.error("Error fetching main tree menu data:", err);
      setError("Failed to load main tree menu.");
    } finally {
      setLoading(false);
    }
  }, [ClassificationValue]);

  /**
   * Handles updating the page name.
   */
  const pageNameHandler = (name) => {
    setPageName(name);
  };

  /**
   * Initial API calls on component mount.
   */
  useEffect(() => {
    fetchDropdownData();
    fetchMainTreeMenu();
  }, [fetchDropdownData, fetchMainTreeMenu]);

  /**
   * Sync selected values with localStorage.
   */
  useEffect(() => {
    localStorage.setItem("CompanyValue", JSON.stringify(CompanyValue));
  }, [CompanyValue]);

  useEffect(() => {
    localStorage.setItem(
      "ClassificationValue",
      JSON.stringify(ClassificationValue)
    );
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
        CompanyData,
        ClassificationData,
        languageValue,
        Languages,
        handleChangeLanguage,
        CompanyValue,
        ClassificationValue,
        mainTreeData,
        setCompanyValue,
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

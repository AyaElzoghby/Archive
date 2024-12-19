/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useCallback } from "react";
import api from "../utilities/api";
import { handleDropdownFormat, getInitialValue } from "../utilities/functions";

export const SideMenuContext = createContext({
  CompanyData: [],
  ClassificationData: [],
  CompanyValue: {},
  ClassificationValue: {},
  classifications: [],
  languageValue: 0,
  Languages: [],
  mainTreeData: [],
  handleChangeCompanyValue: () => {},
  handleChangeClassificationValue: () => {},
  handleChangeLanguage: () => {},
  loading: null,
  error: null,
  pageName: "",
  pageNameHandler: () => {},
});

function SideMenuProvider({ children }) {
  const [CompanyData, setCompanyData] = useState([]);
  const [mainTreeData, setMainTreeData] = useState([]);
  const [pageName, setPageName] = useState(
    JSON.parse(localStorage.getItem("pageName")) || "الصفحه الرئيسية"
  );

  const [CompanyValue, setCompanyValue] = useState(() =>
    getInitialValue("CompanyValue")
  );

  const [languageValue, setLanguageValue] = useState(
    () => getInitialValue("LangValue") || 2
  );

  const [ClassificationValue, setClassificationValue] = useState(() =>
    getInitialValue("ClassificationValue")
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const Languages = [
    { value: 1, label: "العربيه", img: "/icons/Egypt.svg" },
    { value: 2, label: "English", img: "/icons/UnitedStates.svg" },
  ];

  const classifications = [
    { value: 0, label: "Private" },
    { value: 1, label: "Public" },
  ];

  const handleChangeLanguage = (val) => {
    localStorage.setItem("LangValue", JSON.stringify(val));
    setLanguageValue(val);
  };

  const fetchCompanyData = async () => {
    try {
      setLoading(true);
      const response = await api.get(`table?sp=arc_admin_company_trx`);
      const formattedCompanyData = handleDropdownFormat(
        response.data.data,
        "CompanyID",
        "CompanyName"
      );
      setCompanyData(formattedCompanyData);
      // console.log(response);
    } catch (error) {
      if (error) {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChangeCompanyValue = (value) => {
    localStorage.setItem("CompanyValue", JSON.stringify(value));
    setCompanyValue(value);
  };

  // console.log(CompanyValue);

  const handleChangeClassificationValue = (value) => {
    localStorage.setItem("ClassificationValue", JSON.stringify(value));
    setClassificationValue(value);
  };

  // console.log(ClassificationValue);

  const fetchMainTreeMenu = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `class?CompanyID=${CompanyValue.value}&IsPublic=${ClassificationValue.value}`
      );
      setMainTreeData(response.data.data);
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const pageNameHandler = (name) => {
    setPageName(name);
  };

  useEffect(() => {
    fetchCompanyData();
  }, []);

  useEffect(() => {
    fetchMainTreeMenu();
  }, [ClassificationValue]);

  // console.log(CompanyData);

  // useEffect(() => {
  //   localStorage.setItem("CompanyValue", JSON.stringify(CompanyValue));
  // }, [CompanyValue]);

  // useEffect(() => {
  //   localStorage.setItem(
  //     "ClassificationValue",
  //     JSON.stringify(ClassificationValue)
  //   );
  // }, [ClassificationValue]);

  // useEffect(() => {
  //   localStorage.setItem("LangValue", JSON.stringify(languageValue));
  // }, [languageValue]);

  // useEffect(() => {
  //   localStorage.setItem("pageName", JSON.stringify(pageName));
  // }, [pageName]);

  return (
    <SideMenuContext.Provider
      value={{
        CompanyData,
        languageValue,
        Languages,
        handleChangeLanguage,
        CompanyValue,
        ClassificationValue,
        mainTreeData,
        handleChangeCompanyValue,
        handleChangeClassificationValue,
        setLanguageValue,
        loading,
        error,
        pageName,
        pageNameHandler,
        classifications,
      }}
    >
      {children}
    </SideMenuContext.Provider>
  );
}

export default SideMenuProvider;

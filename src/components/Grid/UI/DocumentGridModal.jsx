import Modal from "./Modal";
import { LocalGrid } from "..";

import { useContext, useEffect, useState } from "react";
import { SideMenuContext } from "../../../store/SideMenuContext";

import axios from "axios";

function DocumentGridModal() {
  const [showModal, setShowModal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { departmentValue } = useContext(SideMenuContext);
  //   console.log(departmentValue);

  const token = JSON.parse(localStorage.getItem("AccessToken"));

  const getDocumnetsData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://192.168.1.197:5000/api/document",
        {
          LocationID: 4015299,
          LangID: 1,
          ReferenceID: 435079,
          DocumentRefTypeID: 6,
          withCredentials: true,
          headers: {
            Authorization: `barer ${token}`,
          },
        }
      );

      console.log(response);
      setIsLoading(false);
    } catch (error) {
      console.error(error || "failed to fetch data");
    }
  };

  useEffect(() => {
    getDocumnetsData();
  }, []);

  return (
    <>
      <div>
        <button onClick={() => setShowModal("Documnets")}>المستندات</button>
      </div>
      <Modal
        open={showModal === "Documnets"}
        onClose={showModal === "Documnets" ? () => setShowModal(null) : null}
        haveGrid
      >
        <LocalGrid
          tableConfig={[
            {
              keyName: "LocationID",
              arCaption: "",
              enCaption: "",
              Input: false,
              hidden: true,
              isRequired: false,
              type: "number",
              width: 0,
            },
            {
              keyName: "DocumnetID",
              arCaption: "",
              enCaption: "",
              Input: false,
              hidden: true,
              isRequired: false,
              type: "number",
              width: 0,
            },
            {
              keyName: "DocumnetRefTypeID",
              arCaption: "",
              enCaption: "",
              Input: false,
              hidden: true,
              isRequired: false,
              type: "number",
              width: 0,
            },
            {
              keyName: "RefrenceID",
              arCaption: "",
              enCaption: "",
              Input: false,
              hidden: true,
              isRequired: false,
              type: "number",
              width: 0,
            },
            {
              keyName: "DocumnetCode",
              arCaption: "الكود",
              enCaption: "",
              Input: false,
              hidden: false,
              isRequired: false,
              type: "number",
              width: 50,
            },
            {
              keyName: "DocumnetName",
              arCaption: "اسم المستند",
              enCaption: "",
              Input: false,
              hidden: false,
              isRequired: false,
              type: "text",
              width: 200,
            },
            {
              keyName: "DocumnetDate",
              arCaption: "التاريخ",
              enCaption: "",
              Input: false,
              hidden: false,
              isRequired: false,
              type: "date",
              width: 200,
            },
            {
              keyName: "DocumnetClassID",
              arCaption: "",
              enCaption: "",
              Input: false,
              hidden: true,
              isRequired: false,
              type: "",
              width: 0,
            },
            {
              keyName: "FileName",
              arCaption: "اسم الملف",
              enCaption: "",
              Input: false,
              hidden: false,
              isRequired: false,
              type: "text",
              width: 100,
            },
          ]}
        />
      </Modal>
    </>
  );
}

export default DocumentGridModal;

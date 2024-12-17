
import { useContext } from "react";
import { NestedTable } from "../../components/Grid/index";
import { SideMenuContext } from "../../store/SideMenuContext";

function Calssfication() {
const {ClassificationValue,LangValue,CompanyValue}=useContext(SideMenuContext)

  return (
    <>
      <NestedTable
            rowKey={"ClassficationID"}
            globalParams={{
              CompanyID:1,
              IsPublic:1,
            }}
            ParentkeyName={"ClassficationParentID"}

            params={{
              ins: {
                sp: "api_calssfication_ins",
              },
              trx: {
                sp: "api_classfication_trx",
              },
              del: { sp: "api_classification_del" },
              upd: { sp: "api_calssfication_upd " },
            }}
            tableConfig={[
              
              {
                keyName: "ClassficationParentID",
                Input: false,
                type: "text",
                hidden: true,
              },
              {
                keyName: "ClassficationID",
                Input: false,
                type: "text",
                hidden: true,
              },
              {
                enCaption: " ClassficationNameEn",
                isRequired: true,
                Input: true,
                type: "text",
                hidden: false,
                keyName: "ClassficationNameEn",
               
                width: 200,
              },
              {
                enCaption: "ClassficationNameAr",
                type: "text",
                Input: true,
                isRequired: true,
                hidden: false,
                keyName: "ClassficationNameAr",
                width: 200,
              },
              {
                enCaption: " IsPublic",
                type: "check",
                Input: false,
                isRequired: false,
                hidden: true,
                keyName: "IsPublic",
                width: 100,
              }, 
             
            ]}
          >
          
          </NestedTable>
    </>
  );
}

export default Calssfication;

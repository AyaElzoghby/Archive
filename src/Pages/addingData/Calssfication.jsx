
import { NestedTable } from "../../components/Grid/index";
import { SideMenuContext } from "../../store/SideMenuContext";

function Calssfication() {

  return (
    <>
      <NestedTable
            rowKey={"CompanyID"}
            haveDel={false}
            globalParams={{
            }}
            ParentkeyName={"ClassficationParentID"}

            params={{
              ins: {
                sp: "api_calssfication_ins",
              },
              trx: {
                sp: "api_classfication_trx",
              },
              del: { sp: "" },
              upd: { sp: "api_calssfication_upd " },
            }}
            tableConfig={[
              {
                Caption: "CompanyID",
                isRequired: true,
                Input: true,
                type:"number",
                hidden: false,
                keyName: "CompanyID",
                width: 100,
              },
              {
                arCaption: " ClassficationNameEn",
                isRequired: true,
                Input: true,
                type: "text",
                hidden: false,
                keyName: "ClassficationNameEn",
               
                width: 200,
              },
              {
                arCaption: "ClassficationNameAr",
                type: "text",
                Input: true,
                isRequired: true,
                hidden: false,
                keyName: "ClassficationNameAr",
                width: 200,
              },
              {
                arCaption: " IsPublic",
                type: "check",
                Input: true,
                isRequired: true,
                hidden: false,
                keyName: "IsPublic",
                width: 100,
              }, {
                arCaption: " ClassficationParentID",
                type: "number",
                Input: true,
                isRequired: true,
                hidden: false,
                keyName: "ClassficationParentID",
                width: 100,
              },
             
            ]}
          >
          
          </NestedTable>
    </>
  );
}

export default Calssfication;

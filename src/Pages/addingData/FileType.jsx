
import { LocalGrid } from "../../components/Grid/index";
import { SideMenuContext } from "../../store/SideMenuContext";

function FileType() {

  return (
    <>
      <LocalGrid
            rowKey={"TypeID"}
            globalParams={{
            }}
            params={{
              ins: {
                sp: "file_type_ins",
              },
              trx: {
                sp: "file_type_trx",
              },
              del: { sp: "file_type_del" },
              upd: { sp: "file_type_upd " },
            }}
            tableConfig={[
              {
                Caption: "TypeID",
                isRequired: true,
                Input: true,
                hidden: false,
                keyName: "TypeID",
                width: 100,
              },
              {
                arCaption: " TypeNameAr",
                isRequired: true,
                Input: true,
                type: "text",
                hidden: false,
                keyName: "TypeNameAr",
               
                width: 200,
              },
              {
                arCaption: "TypeNameEn",
                type: "text",
                Input: true,
                isRequired: true,
                hidden: false,
                keyName: "TypeNameEn",
                width: 200,
              },
              {
                arCaption: " TypeCode",
                type: "text",
                Input: true,
                isRequired: true,
                hidden: false,
                keyName: "TypeCode",
                width: 200,
              },
             
            ]}
            isExpand
          >
            <LocalGrid 
                        rowKey={"AttributionID"}

             params={{
              ins: {
                sp: "type_attribution_Ins",
              },
              trx: {
                sp: "type_attribution_Trx",
              },
              del: { sp: "type_attribution_Del" },
              upd: { sp: "type_attribution_upd " },
            }}
            tableConfig={[
              {
                Caption: "TypeID",
                isRequired: true,
                Input: true,
                hidden: false,
                keyName: "TypeID",
                width: 100,
              },
              {
                arCaption: " AttributionName",
                isRequired: true,
                Input: true,
                type: "text",
                hidden: false,
                keyName: "AttributionName",
               
                width: 200,
              },
              {
                arCaption: "AttributionType",
                type: "text",
                Input: true,
                isRequired: true,
                hidden: false,
                keyName: "AttributionType",
                width: 200,
              },
              
            ]}/>
          </LocalGrid>
    </>
  );
}

export default FileType;

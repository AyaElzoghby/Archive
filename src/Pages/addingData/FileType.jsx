import { LocalGrid } from "../../components";
import { SideMenuContext } from "../../store/SideMenuContext";
import { useContext } from "react";
import {useDropDown} from '../../hooks/useDropDownData'

function FileType() {
  const { languageValue, ClassificationValue } = useContext(SideMenuContext);
  const {
    data: attributionDropDown,
    loading: attributionLoading,
    error: attributionError,
  } = useDropDown(
    "arc_attribution_data_type_trx",
    {  },
    "key",
    "value"
  );
  console.log(attributionDropDown)
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
            enCaption: "TypeID",
            isRequired: false,
            Input: false,
            hidden: true,
            keyName: "TypeID",
            width: 100,
          },
          {
            enCaption: " TypeNameAr",
            isRequired: true,
            Input: true,
            type: "text",
            hidden: false,
            keyName: "TypeNameAr",

            width: 200,
          },
          {
            enCaption: "TypeNameEn",
            type: "text",
            Input: true,
            isRequired: true,
            hidden: false,
            keyName: "TypeNameEn",
            width: 200,
          },
          {
            enCaption: " TypeCode",
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
          tableConfig={[  {
            enCaption: " AttributionID",
            isRequired: false,
            Input: false,
            type: "text",
            hidden: true,
            keyName: "AttributionID",
            width: 200,
          },
            
            {
              enCaption: " input Name",
              isRequired: true,
              Input: true,
              type: "text",
              hidden: false,
              keyName: "AttributionName",

              width: 200,
            },
            {
              enCaption: "data type",
              type: "dropDown",
              options:attributionDropDown,
              Input: true, 
              isRequired: true,
              hidden: false,
              keyName: "DataTypeID",
              width: 200,
            },
          ]}
        />
      </LocalGrid>
    </>
  );
}

export default FileType;

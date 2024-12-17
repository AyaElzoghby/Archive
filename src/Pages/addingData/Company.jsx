import { LocalGrid } from "../../components";
import { SideMenuContext } from "../../store/SideMenuContext";
import { useContext } from "react";
import {useDropDown} from '../../hooks/useDropDownData'

function Company() {
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
      >
       
      </LocalGrid>
    </>
  );
}

export default Company;

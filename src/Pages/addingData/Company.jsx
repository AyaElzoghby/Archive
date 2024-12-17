import { LocalGrid } from "../../components";


function Company() {
  
  return (
    <>
      <LocalGrid
        rowKey={"CompanyID"}
        globalParams={{}}
        params={{
          ins: {
            sp: "arc_admin_company_ins",
          },
          trx: {
            sp: "arc_admin_company_trx",
          },
          del: { sp: "arc_admin_company_del" },
          upd: { sp: "arc_admin_company_upd " },
        }}
        tableConfig={[
          {
            enCaption: "CompanyCode",
            isRequired: true,
            Input: true,
            hidden: false,
            type: "number",
            keyName: "CompanyCode",
            width: 100,
          },
          {
            enCaption: " CompanyName",
            isRequired: true,
            Input: true,
            type: "text",
            hidden: false,
            keyName: "CompanyName",
            width: 200,
          },
        ]}
      ></LocalGrid>
    </>
  );
}

export default Company;

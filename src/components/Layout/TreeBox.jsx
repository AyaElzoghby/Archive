import { TreeView } from "./index";
import { useContext } from "react";
import { Spinner } from "../UI";

import { SideMenuContext } from "../../store/SideMenuContext";
function TreeBox() {
  const { mainTreeData, loading, error, ClassificationValue } =
    useContext(SideMenuContext);

  // console.log(mainTreeData);

  const treeHeaderClass =
    "flex flex-1 justify-center items-center p-1 cursor-pointer font-tajawal text-md font-semibold hover:bg-mainGray duration-300 rounded-md text-sm";

  const ActivetreeHeaderClass = " text-white bg-mainBlue";

  // console.log(mainTreeData);

  return (
    <>
      {error && <p>failed to fetch side menu data</p>}
      {loading && <Spinner />}
      {!loading && !error && (
        <>
          <div className="flex justify-center items-center mb-2 py-2 w-48 text-center rounded-xl font-tajawal bg-[#FAFAFA]">
            <p className="text-lg font-bold">
              {`${ClassificationValue.label} Projects`}
            </p>
          </div>
          <div>
            {mainTreeData.length > 0 && (
              <div>
                <TreeView
                  ParentId={"ClassficationParentID"}
                  Id={"ClassficationID"}
                  NodeName={"ClassficationNameEn"}
                  data={mainTreeData}
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default TreeBox;

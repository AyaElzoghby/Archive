import { TreeView } from "./index";

import { useContext, useState } from "react";

import { Spinner } from "../UI";

import { SideMenuContext } from "../../store/SideMenuContext";
function TreeBox() {
  const { mainTreeData, loading, error, ClassificationValue } =
    useContext(SideMenuContext);

  const [activeHeader, setActiveHeader] = useState(0);

  const treeHeaderClass =
    "flex flex-1 justify-center items-center p-1 cursor-pointer font-tajawal text-md font-semibold hover:bg-mainGray duration-300 rounded-md text-sm";

  const ActivetreeHeaderClass = " text-white bg-mainBlue";

  const handleActiveTreeHeader = (index) => {
    setActiveHeader(index);
  };

  // console.log(mainTreeData);

  return (
    <>
      {error && <p>failed to fetch side menu data</p>}
      {loading && <Spinner />}
      {!loading && !error && (
        <>
          <div className="flex mb-2 h-fit ">
            <div
              className={
                activeHeader === 0
                  ? `${treeHeaderClass.replace(
                      "hover:bg-mainGray",
                      ""
                    )}${ActivetreeHeaderClass}`
                  : treeHeaderClass
              }
              onClick={() => handleActiveTreeHeader(0)}
            >
              <p className="">{ClassificationValue.value}Projects</p>
            </div>
           
          </div>
          <div>
            {activeHeader === 0 && mainTreeData.length > 0 && (
              <div>
                <TreeView
                  ParentId={"MenuParentID"}
                  Id={"MenuID"}
                  NodeName={"MenuNameAr"}
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

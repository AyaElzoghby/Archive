import SearchInput from "../../components/Inputs/SearchInput";
import FilterInput from "../../components/Inputs/FilterInput";
import CreateComponent from "../../components/Inputs/CreateComponent";
import { useParams } from "react-router-dom";
import { TreeView } from "../../components";
import { api } from "../../utilities";
import { useState, useEffect } from "react";
import { use } from "react";

function AddDocumnet() {
  const [FolderData, setFolderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params.id;

  //   const fetchCompanyFiles = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await api.get(
  //         `file/company?CompanyID=${id}&IsPublicID=${}`
  //       );
  //       console.log(response);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  return (
    <div className="flex h-full">
      <div className="p-3 flex-1">
        <div className="flex gap-2">
          <SearchInput />
          <FilterInput />
        </div>
        <div className="w-[180px] mt-3">
          <CreateComponent />
        </div>
      </div>

      <div className="w-[1px] bg-gray-300"></div>
      <div className="p-3 flex-1">
        <div className=" flex justify-between items-center gap-2">
          <FilterInput />
          <FilterInput />
          <FilterInput />
        </div>
      </div>
    </div>
  );
}

export default AddDocumnet;

import SearchInput from "../../components/Inputs/SearchInput";
import FilterInput from "../../components/Inputs/FilterInput";
import CreateComponent from "../../components/Inputs/CreateComponent";
function AddDocumnet() {
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

import SearchInput from "../../components/Inputs/SearchInput";
import FilterInput from "../../components/Inputs/FilterInput";
import CreateComponent from "../../components/Inputs/CreateComponent";
import { TreeView } from "../../components";
import { api } from "../../utilities";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { SideMenuContext } from "../../store/SideMenuContext";
import previewIcon from "/icons/preview.svg";
import TrashIcon from "/icons/Trash.svg";
import toast from "react-hot-toast";
import { Modal } from "../../components";

import wordIcon from "/icons/word.svg";
import excelIcon from "/icons/excel.svg";
import pdfIcon from "/icons/pdf.svg";
import zipIcon from "/icons/zip.svg";
import rarIcon from "/icons/rar.svg";

function AddDocumnet() {
  const [FolderData, setFolderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [expandedFile, setExpandedFile] = useState({});
  const [showModal, setShowModal] = useState(false);

  const params = useParams();

  const id = params.id;

  const ModalToggler = () => {
    setShowModal((prev) => !prev);
  };

  const fetchCompanyFiles = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(`file/class?ClassificationID=${id}`);
      console.log(response);
      setFolderData(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteFile = async () => {
    try {
      const response = await api.delete(`file/${selectedFile.FileID}`);
      console.log(response);
      setSelectedFile(null);
    } catch (error) {
      if (error) {
        toast.error("failed to delete file");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeSelectedFile = (file) => {
    setSelectedFile(file);
  };

  const handleChangeExpndedFile = (file) => {
    setExpandedFile(file);
  };

  console.log(expandedFile, "fares");

  console.log(selectedFile);

  const ExtractFilePic = (exe) => {
    let src;
    if (exe === "pdf") {
      src = pdfIcon;
    } else if (exe === "word") {
      src = wordIcon;
    } else if (exe === "excel") {
      src = excelIcon;
    }
    return src;
  };

  useEffect(() => {
    fetchCompanyFiles();
  }, []);

  return (
    <>
      {showModal && (
        <Modal open={showModal} onClose={showModal ? ModalToggler : null}>
          <iframe src={selectedFile.FilePath} width={`${100}%`} height={600} />
        </Modal>
      )}
      <div className="flex flex-col md:flex-row h-full">
        <div className="p-3 flex-1">
          <div className="flex flex-wrap justify-center gap-2">
            <SearchInput />
            <FilterInput />
          </div>
          <div className="md:w-44 flex justify-center md:justify-start mt-3">
            <CreateComponent FileParentID={expandedFile.FileID} />
          </div>
          {FolderData.length > 0 && (
            <div className="mt-5">
              <TreeView
                ParentId={"FileParentID"}
                Id={"FileID"}
                NodeName={"FileName"}
                data={FolderData}
                noNavigate
                handleLeafClick={handleChangeSelectedFile}
                handleSelectExpandedNode={handleChangeExpndedFile}
                expandedFile={expandedFile}
              />
            </div>
          )}
        </div>

        <div className="h-[1px] md:h-full md:w-[1px] bg-gray-300"></div>

        <div className="p-3 flex-1">
          <div className=" flex items-center justify-center flex-wrap gap-2">
            <FilterInput />
            <FilterInput />
            <FilterInput />
          </div>

          <div className=" md:w-1/2 flex flex-col gap-6 mx-auto">
            <div className="w-full flex flex-col items-center justify-center gap-3 h-60 mt-10 border-4 border-dashed border-[#5C5E64] rounded-lg">
              {selectedFile && (
                <div>
                  <img
                    src={ExtractFilePic(selectedFile.ExtType)}
                    alt=""
                    className="h-20 w-20"
                  />
                </div>
              )}

              {selectedFile && (
                <p className=" text-2xl text-[#2B2B2B] font-bold">
                  {selectedFile.FileName}
                </p>
              )}
            </div>
            <div>
              <button
                onClick={ModalToggler}
                disabled={!selectedFile}
                className="w-full flex items-center justify-center gap-2 p-1 outline-none bg-mainBlue hover:bg-blue-400 duration-300 rounded-lg font-semibold text-white"
              >
                Preview
                <div>
                  <img src={previewIcon} alt="" className=" w-4 h-4" />
                </div>
              </button>
            </div>
            <div>
              <button
                onClick={handleDeleteFile}
                className="w-full flex items-center justify-center gap-2 p-1 outline-none font-semibold text-red-600 bg-red-200 hover:bg-red-100 duration-300 rounded-lg"
              >
                Delete
                <div>
                  <img src={TrashIcon} alt="" className=" w-4 h-4" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddDocumnet;

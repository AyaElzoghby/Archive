/* eslint-disable react/prop-types */
import { Modal } from "../../UI";
import { FileUploader } from "../inputs";
import { useState } from "react";

function FileUploaderModal({ url }) {
  const [showModal, setShowModal] = useState(null);
  return (
    <>
      <div>
        <button
          onClick={() => setShowModal("fileUploader")}
          className=" outline-none p-2 bg-mainBlue text-white text-sm hover:bg-mainGray hover:text-mainBlue duration-300 rounded-md "
        >
          {document.dir === "rtl" ? "رفع ملف" : "upload file"}
        </button>
      </div>
      <Modal
        open={showModal === "fileUploader"}
        onClose={showModal === "fileUploader" ? () => setShowModal(null) : null}
      >
        <FileUploader url={url} />
      </Modal>
    </>
  );
}

export default FileUploaderModal;

/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import Upload from "../../../public/assets/Upload.svg";

import wordIcon from "/icons/word.svg";
import excelIcon from "/icons/excel.svg";
import pdfIcon from "/icons/pdf.svg";
import zipIcon from "/icons/zip.svg";
import rarIcon from "/icons/rar.svg";
import ArrowLineUp from "/icons/ArrowLineUp.svg";
import { api } from "../../utilities";

// Utility function to format file size
const formatFileSize = (size) => {
  const k = 1024;
  const sizes = ["Byte", "KB", "MB", "GB", "TB"];
  let i = 0;
  while (size >= k && i < sizes.length - 1) {
    size /= k;
    i++;
  }
  return `${sizes[i]} ${size.toFixed(2)}`;
};

// Function to get file type icon based on file extension
const getFileIcon = (file) => {
  const fileType = file.type.split("/")[0]; // Get file type (e.g., image, video, text, etc.)

  // Default file type icon
  let icon = "/default-file-icon.png";

  if (fileType === "image") {
    icon = URL.createObjectURL(file); // Image file icon
  } else if (file.type === "application/pdf") {
    icon = pdfIcon; // PDF icon
  } else if (file.type === "application/zip") {
    icon = zipIcon; // ZIP or RAR icon
  } else if (file.name.endsWith(".rar")) {
    icon = rarIcon;
  } else if (
    file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
    file.type === "application/vnd.ms-excel"
  ) {
    icon = excelIcon; // Excel icon
  } else if (
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    file.type === "application/msword"
  ) {
    icon = wordIcon; // Word icon
  }

  return icon;
};

const  FileUploader = ({ url }) => {
  const [file, setFile] = useState(null); // Store a single file
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const token = JSON.parse(localStorage.getItem("AccessToken"));

  const handleFileUpload = async () => {
    if (!file) {
      console.log("No file selected.");
      return;
    }

    const fd = new FormData();
    fd.append("image", file);
    fd.append("LocationID", 4015299);
    fd.append("ReferenceID", 435079);
    fd.append("DocumentCode", 1);
    fd.append("DocumentClassID", 9);
    fd.append("DocumentName", "WW");
    fd.append("LangID", 1);

    try {
      setIsUploading(true);
      setUploadStatus("Uploading...");

      const response = await api.post(url, fd, {
        withCredentials: true,

        headers: {
          Authorization: `barer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: ({ loaded, total }) => {
          const percent = Math.floor((loaded * 100) / total);
          setProgress(percent);
        },
      });

      console.log(response);
      setUploadStatus("تم الرفع بنجاح");
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("لم يتم رفع الملف ");
    } finally {
      setIsUploading(false);
      setFile(null);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
      if (type === "img" && !droppedFile.type.startsWith("image/")) {
        alert("Please upload an image file.");
        return;
      }
      setFile(droppedFile); // Replace the current file with the dropped file
    }
  };

  const handleFileInput = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (type === "img" && !selectedFile.type.startsWith("image/")) {
        alert("Please upload an image file.");
        return;
      }
      setFile(selectedFile); // Replace the current file with the selected file
    }
  };

  return (
    <div className="h-full flex flex-col items-center">
      <div
        onClick={(e) => {
          e.stopPropagation(); // Prevent click propagation to parent
          document.querySelector(".input-file").click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.stopPropagation(); // Prevent propagation to parent
          handleDrop(e);
        }}
        className={`w-full px-6 py-8 border-4 border-dashed rounded-lg ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-400 bg-gray-100"
        }  justify-center items-center cursor-pointer transition-all`}
      >
          <img
            src={Upload}
            className="m-auto my-6 w-20 h-20"
            alt="Uploaded preview"
          />

        {!file && (
          <label
            className="text-center text-lg font-semibold text-gray-600 transition-all cursor-pointer"
          >
            <span className="block mb-1">
            Drag and Drop,             
            </span>
            <span className="block mb-1 text-[#227099]">
            Or browse your files              
            </span>
          </label>
        )}

        <input
          type="file"
          className="hidden input-file"
          onChange={handleFileInput}
        />

        {file && (
          <div
            onClick={(e) => e.stopPropagation()} // Prevent propagation on file preview click
            onDoubleClick={() => setFile(null)} // Remove file on double-click
            className="flex flex-col gap-1 items-center p-1 rounded-md bg-gray-200 cursor-pointer"
            title="Double-click to remove this file"
          >
            <img
              src={getFileIcon(file)}
              alt={file.name}
              className="w-8 h-8 mr-2"
            />
            <div className="text-xs font-medium">{file.name}</div>
            <div className="text-xs text-gray-500">
              {formatFileSize(file.size)}
            </div>
          </div>
        )}
      </div>

      {file && (
        <button
          onClick={handleFileUpload}
          className="mt-4 p-2 flex bg-mainBlue w-[223px] h-[48px] justify-center items-center gap-2 text-white rounded-md hover:bg-mainGray hover:text-mainBlue duration-300 "
        >
          <p className="font-[14px]">
            {document.dir === "rlt" ? "ارفع ملف" : "Upload File"}
          </p>
          <img src={ArrowLineUp} alt="" />
        </button>
      )}

      {isUploading && (
        <div className="mt-2 w-full">
          <p>{uploadStatus}</p>
          <div className="h-2 bg-gray-300 w-full">
            <div
              className="h-full bg-blue-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      {!isUploading && uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default FileUploader;

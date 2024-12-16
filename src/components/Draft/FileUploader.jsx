import { useState } from "react";

const FileUploader = () => {
  const [uploadStatus, setUploadStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // Simulate API upload with progress
  const handleFileUpload = async (file) => {
    setUploadStatus("Uploading...");
    setProgress(0);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Mock API request with progress
      const fakeUpload = new Promise((resolve) => {
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval);
              resolve();
              return 100;
            }
            return prev + 10;
          });
        }, 200);
      });

      await fakeUpload;

      // Replace this with actual API response handling
      setUploadStatus("Upload Successful!");
      setUploadedFile(URL.createObjectURL(file)); // Set preview
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Upload Failed.");
    }
  };

  // Handle file drop
  const handleFileDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  // Handle drag over (needed to allow drop)
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  // Handle drag leave
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Trigger file selection dialog
  const triggerFileDialog = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.onchange = (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        handleFileUpload(selectedFile);
      }
    };
    fileInput.click();
  };

  return (
    <div>
      <div
        onClick={triggerFileDialog}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleFileDrop}
        style={{
          border: `2px dashed ${isDragging ? "#28a745" : "#007BFF"}`,
          borderRadius: "10px",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
          color: isDragging ? "#28a745" : "#007BFF",
          backgroundColor: isDragging ? "#f8fdf8" : "#ffffff",
          position: "relative",
          overflow: "hidden",
          width: "300px",
          margin: "20px auto",
        }}
      >
        {uploadedFile ? (
          <div>
            <img
              src={uploadedFile}
              alt="Uploaded file preview"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "5px",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
          </div>
        ) : (
          <p style={{ margin: 0 }}>Click or drag a file here to upload</p>
        )}

        {uploadStatus && (
          <div style={{ marginTop: "10px" }}>
            <p style={{ margin: 0 }}>{uploadStatus}</p>
            <div
              style={{
                width: "100%",
                height: "8px",
                backgroundColor: "#e9ecef",
                borderRadius: "4px",
                overflow: "hidden",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  backgroundColor: "#007BFF",
                  transition: "width 0.2s ease",
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;

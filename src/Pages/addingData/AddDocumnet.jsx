import SearchInput from "../../components/Inputs/SearchInput";
import FilterInput from "../../components/Inputs/FilterInput";
import defaultImage from "/images/file.png";

import CreateComponent from "../../components/Inputs/CreateComponent";
import { NestedTable, TreeView } from "../../components";
import { api } from "../../utilities";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import previewIcon from "/icons/preview.svg";
import TrashIcon from "/icons/Trash.svg";
import toast from "react-hot-toast";
import { Modal } from "../../components";
import wordIcon from "/icons/word.svg";
import excelIcon from "/icons/excel.svg";
import pdfIcon from "/icons/pdf.svg";
import archieveIcon from "/assets/Archive.svg";
import NestedTree from "../../components/NestedTree";
import { useCallback } from "react";
import Viewer from "../../components/UI/Viewer";
function AddDocumnet() {
	const [FolderData, setFolderData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedFile, setSelectedFile] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [fileAttributes, setFileAttributes] = useState([]);
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
			const response = await api.delete(`file/${selectedFile?.FileID}`);
			toast.success("file deleted successfully");
			console.log(response);
			setSelectedFile(null);
		} catch (error) {
			console.error(error);
			toast.error("failed to delete file");
		} finally {
			setIsLoading(false);
		}
	};

	const handleChangeSelectedFile = (file) => {
		setSelectedFile(file);
	};

	const ExtractFilePic = (type = null, exe) => {
		let src;
		if (exe === "pdf") {
			return pdfIcon;
		} else if (exe === "word") {
			return wordIcon;
		} else if (exe === "excel") {
			return excelIcon;
		}

		if (type === 5) {
			return archieveIcon;
		}

		return defaultImage;
	};

	const getFileAttributes = useCallback(async () => {
		try {
			const response = await api.get(
				`attr/file-attr?FileID=${selectedFile?.FileID}`
			);
			console.log(response.data, "response.data");
			setFileAttributes(response.data.data);
		} catch (error) {
			console.error(error);
		}
	}, [selectedFile]);
	useEffect(() => {
		fetchCompanyFiles();
	}, [id]);
	useEffect(() => {
		getFileAttributes();
	}, [getFileAttributes]);

	console.log(selectedFile, "selectedFile");
	return (
		<>
			{showModal && (
				<Modal
					open={showModal}
					onClose={showModal ? ModalToggler : null}>
					<Viewer link={selectedFile?.FilePath}></Viewer>
				</Modal>
			)}
			<div className="flex flex-col md:flex-row h-full">
				<div className="p-3 flex-1">
					<div className="flex flex-wrap justify-center gap-2">
						<SearchInput />
						<FilterInput />
					</div>
					<div className="md:w-44 flex justify-center md:justify-start mt-3">
						<CreateComponent
							key={selectedFile?.FileID}
							onSuccess={() => {
								fetchCompanyFiles();
							}}
							fileID={selectedFile?.FileID}
						/>
					</div>
					{FolderData.length > 0 && (
						<div className="mt-5">
							<NestedTree
								setSelectedFile={handleChangeSelectedFile}
								dir={"ltr"}
								data={FolderData}
								rowKey={"FileID"}
								parentKeyName={"FileParentID"}
								renderElement={(node) => {
									return (
										<>
											<img
												className="w-6 h-6"
												src={ExtractFilePic(node.TypeID, node.ExtType)}></img>
											{node.FileName}
										</>
									);
								}}></NestedTree>
						</div>
					)}
				</div>

				<div className="h-[1px] md:h-full md:w-[1px] bg-gray-300"></div>

				<div className="p-3 flex-1">
					<div className=" flex items-center justify-center flex-wrap gap-2"></div>
					{selectedFile && selectedFile.TypeID == 5 && (
						<>
							<div className=" md:w-1/2 flex flex-col gap-6 mx-auto">
								<div className="w-full flex flex-col items-center justify-center gap-3 h-60 mt-10 border-4 border-dashed border-[#5C5E64] rounded-lg">
									<div>
										<img
											src={ExtractFilePic(
												selectedFile.TypeID,
												selectedFile.ExtType
											)}
											alt=""
											className="h-20 w-20"
										/>
									</div>
									{/* {selectedFile && (
								<p className=" text-2xl text-[#2B2B2B] font-bold">
									{selectedFile.FileName}
								</p>
							)} */}
								</div>

								{selectedFile?.TypeID !== 5 && (
									<div>
										<button
											onClick={handleDeleteFile}
											className="w-full flex items-center justify-center gap-2 p-1 outline-none font-semibold text-red-600 bg-red-200 hover:bg-red-100 duration-300 rounded-lg">
											Delete
											<div>
												<img
													src={TrashIcon}
													alt=""
													className=" w-4 h-4"
												/>
											</div>
										</button>
									</div>
								)}
							</div>
						</>
					)}
					{selectedFile?.TypeID !== 5 && (
						<div>
							<div className="min-h-[70vh]">
								<Viewer link={selectedFile?.FilePath}></Viewer>
							</div>
							<div>
								<div>
									<button
										onClick={handleDeleteFile}
										className="w-full flex items-center justify-center gap-2 p-1 outline-none font-semibold text-red-600 bg-red-200 hover:bg-red-100 duration-300 rounded-lg">
										Delete
										<div>
											<img
												src={TrashIcon}
												alt=""
												className=" w-4 h-4"
											/>
										</div>
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default AddDocumnet;

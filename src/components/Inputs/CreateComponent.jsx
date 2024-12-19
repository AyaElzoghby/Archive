/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect } from "react";
import Create from "../../../public/assets/Create.svg";
import { Modal, Spinner } from "../UI";
import ArchiveFileUploader from "./ArchiveFileUploader";
import { api } from "../../utilities";
import { useDropDown } from "../../hooks/useDropDownData";
import toast from "react-hot-toast";
import { DateArchive } from "./DateArchive";
import { Button } from "./Button";
import { Input } from "./Input";
import { CustomDropDown } from "./CustomDropDown";
import { Container } from "../Layout/Container";
import { ProgressBar } from "../UI/ProgressBar";
import { useParams } from "react-router-dom";
const CreateComponent = ({ onSuccess, fileID = null }) => {
	const [loading, setLoading] = useState("");
	const [step, setStep] = useState(1);
	const [attributes, setAttributes] = useState([]);
	const ClassficationID = useParams().id;
	const [fileForm, setFileForm] = useState({
		FileCode: "",
		FileName: "",
		attributes: {},
		TypeID: "",
		ClassificationID: ClassficationID,
		FileParentID: null,
	});

	useEffect(() => {
		setFileForm((prev) => {
			return {
				...prev,
				FileParentID: fileID,
			};
		});
	}, [fileID]);

	const [modal, setModal] = useState(false);
	const openModel = () => {
		setFileForm({
			FileCode: "",
			FileName: "",
			attributes: {},
			TypeID: fileID == null ? "5" : "",
			ClassificationID: ClassficationID,
			FileParentID: fileID,
		});
		setModal(true);
	};
	const closeModel = () => {
		setStep(1);
		setFileForm({
			FileCode: "",
			FileName: "",
			attributes: {},
			TypeID: "",
			ClassificationID: "",
			FileParentID: null,
		});
		setModal(false);
	};

	const {
		data: fileType,
		drpoDownloader,
		error,
	} = useDropDown("file_type_trx", {}, "TypeID", "TypeNameEn");

	function convertToAttributionObject(array) {
		return array.reduce((acc, item) => {
			acc[item.AttributionID] = "";
			return acc;
		}, {});
	}

	const getAttributes = useCallback(async () => {
		setLoading("attr");
		try {
			const response = await api.get("attr?TypeID=" + fileForm.TypeID);
			setAttributes(response.data.data);
			setFileForm((prev) => {
				return {
					...prev,
					attributes: convertToAttributionObject(response.data.data),
				};
			});
		} catch (err) {
			console.error("Error fetching data:", err);
		} finally {
			setLoading("");
		}
	}, [fileForm.TypeID]);

	const incrementStep = () => {
		if (step == 3) {
			return;
		}
		setStep(step + 1);
	};
	const decrementStep = () => {
		if (step == 1) {
			return;
		}
		setStep(step - 1);
	};

	const validate = (data = {}) => {
		let flag = true;
		console.log(data);
		Object.keys(data).forEach((key) => {
			if (data[key] == "") {
				if (key == "FileParentID") {
					return;
				}
				flag = false;
				toast.error("Please fill all fields");
			}
		});
		return flag;
	};

	const uploadFile = async () => {
		console.log(fileForm);
		if (!validate(fileForm)) {
			return;
		}
		setLoading("uploading");
		try {
			const formData = new FormData();
			formData.append("FileCode", fileForm.FileCode);
			formData.append("FileName", fileForm.FileName);
			formData.append("TypeID", fileForm.TypeID);
			formData.append("ClassificationID", fileForm.ClassificationID);
			formData.append("FileParentID", fileForm.FileParentID);
			formData.append("file", fileForm.file);
			formData.append("attributes", JSON.stringify(fileForm.attributes));
			const response = await api.post("file", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			toast.success("File uploaded successfully");
			onSuccess();
			closeModel();
		} catch (err) {
			console.error("Error uploading file:", err);
			toast.error("Error uploading file");
		} finally {
			setLoading("");
		}
	};
	return (
		<>
			<div className="font-tajawal  w-full">
				<div className="h-full w-full flex font-tajawal flex-col items-center">
					<div
						onClick={openModel}
						className={`w-full h-24 border-[3px] border-dashed rounded-lg p-3 border-gray-400 bg-gray-100 justify-center items-center cursor-pointer`}>
						<div className="">
							<img
								src={Create}
								className="m-auto my-2 w-6 h-6"
								alt="Uploaded preview"
							/>
							<div className=" text-center text-base font-bold text-gray-500">
								Create
							</div>
						</div>
					</div>
				</div>
			</div>

			<Modal
				dialogStyle={"min-w-[70%] h-[600px]"}
				open={modal}
				onClose={closeModel}>
				<div className="px-4 mb-4 flex justify-center">
					<p className=" text-[40px]  font-bold  text-gray-800">Create</p>
				</div>
				<ProgressBar step={step}></ProgressBar>
				<div className=" min-h-[400px] min-w-[1000px] mt-8 p-2">
					<Container
						parentStyle={step !== 1 && "hidden"}
						Buttons={
							<>
								{fileForm.FileParentID && fileForm.TypeID != 5 && (
									<Button
										loading={loading == "attr"}
										onClick={async () => {
											if (!validate(fileForm)) {
												return;
											}
											await getAttributes();
											incrementStep();
										}}
										theme={"blue"}>
										Next
									</Button>
								)}

								{((fileForm.FileParentID == null &&
									fileForm.FileParentID !== 0) ||
									fileForm.TypeID == 5) && (
									<Button
										onClick={async () => {
											await uploadFile();
										}}
										loading={loading == "uploading"}
										theme={"blue"}>
										upload
									</Button>
								)}
							</>
						}>
						<Input
							placholder={"Code"}
							value={fileForm.FileCode}
							type="number"
							onChange={(e) => {
								setFileForm({ ...fileForm, FileCode: e });
							}}
							title={"Code"}></Input>

						<Input
							onChange={(e) => {
								setFileForm({ ...fileForm, FileName: e });
							}}
							placholder={"File Name"}
							value={fileForm.FileName}
							title={"FileName"}></Input>
						{fileForm.FileParentID != null && (
							<>
								{drpoDownloader ? (
									<Spinner screenHegit={false}></Spinner>
								) : (
									<CustomDropDown
										onChange={(e) => {
											setFileForm({ ...fileForm, TypeID: e });
										}}
										title={"Type"}
										value={fileForm.TypeID}
										placholder={"type"}
										options={fileType}></CustomDropDown>
								)}
							</>
						)}
					</Container>

					<Container
						parentStyle={step !== 2 && "hidden"}
						Buttons={
							<>
								<Button
									onClick={decrementStep}
									theme={"gray"}>
									Back
								</Button>
								<Button
									loading={loading == "attr"}
									onClick={async () => {
										if (!validate(fileForm.attributes)) {
											return;
										}
										incrementStep();
									}}
									theme={"blue"}>
									Next
								</Button>
							</>
						}>
						{attributes.map((attr) => {
							const value = fileForm.attributes[attr.AttributionID];
							const onchange = (e) => {
								setFileForm({
									...fileForm,
									attributes: {
										...fileForm.attributes,
										[attr.AttributionID]: e,
									},
								});
							};
							const placeHolder = attr.AttributionName;
							switch (attr.TypeName) {
								case "Date":
									return (
										<DateArchive
											placeHolder={placeHolder}
											title={placeHolder}
											value={value}
											onChange={onchange}></DateArchive>
									);
								case "Text":
									return (
										<Input
											placholder={placeHolder}
											value={value}
											onChange={onchange}
											title={placeHolder}></Input>
									);
								case "Number":
									return (
										<Input
											type="number"
											placholder={placeHolder}
											value={value}
											onChange={onchange}
											title={placeHolder}></Input>
									);
								default:
									return (
										<Input
											placholder={placeHolder}
											value={value}
											onChange={onchange}
											title={placeHolder}></Input>
									);
							}
						})}
					</Container>

					<Container
						parentStyle={step !== 3 && "hidden" + " grid-cols-1"}
						Buttons={
							<>
								<Button
									onClick={decrementStep}
									theme={"gray"}>
									Back
								</Button>

								{fileForm.file && (
									<Button
										theme={"blue"}
										loading={loading == "uploading"}
										onClick={uploadFile}>
										upload
									</Button>
								)}
							</>
						}>
						<div className=" col-span-2">
							<ArchiveFileUploader
								setFileUploaded={(file) => {
									setFileForm({ ...fileForm, file: file });
								}}
							/>
						</div>
					</Container>
				</div>
			</Modal>
		</>
	);
};

export default CreateComponent;

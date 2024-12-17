import { useState, useEffect, useRef } from "react";
// import { api } from "../../utilities";
import { Cancel } from "../../assets/index";
import Spinner from "../UI/spinner";
import Create from "../../../public/assets/Create.svg";
import ArrowRight from "../../../public/icons/ArrowRight.svg";
import FileUploader from "./FileUploader";
import { Modal } from "../UI";
const CreateComponent = () => {
	const [loading, setLoading] = useState(true);
	const [step, setStep] = useState(1);
	const [modal, setModal] = useState(false);
	const openModel = () => setModal(true);
	const closeModel = () => setModal(false);
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

			<Modal>
				<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
					<div className="bg-white w-[1240px] h-[646px] p-6 rounded-lg shadow-lg relative overflow-hidden">
						<div className="px-4 mb-4 flex justify-center">
							<p className=" text-[40px]  font-bold  text-gray-800">Create</p>
							<button className="text-black">
								<img
									src={Cancel}
									className="h-5 w-5 font-bold"
									alt=""
								/>
							</button>
						</div>

						<div className=" overflow-hidden h-full pl-2">
							{step == 1 && (
								<div
									className=" hidden"
									id="Step1">
									<div className="flex gap-2 my-8">
										<div className="w-[100%] h-[10px] mx-auto mb-6 bg-[#227099]"></div>
										<div className="w-[100%] h-[10px] mx-auto mb-6 bg-[#F4F4F4]"></div>
										<div className="w-[100%] h-[10px] mx-auto mb-6 bg-[#F4F4F4]"></div>
									</div>
									<div className=" text-[24px] my-4 mx-6  w-[1160px] h-[328px]">
										<div className="flex py-10  justify-between">
											<div className="flex justify-between w-[510px] ">
												<p>Code</p>

												<input
													type="number"
													name=""
													id=""
													className=" w-[340px] box-border p-2 pl-4 font-tajawal center font-semibold text-base border border-inputBorder text-inputTextColor hover:outline-inputHover hover:outline-2 focus:border-inputFocuse rounded outline-none placeholder:font-light"
												/>
											</div>
											<div className="flex justify-between w-[510px] ">
												<p>Name</p>
												<input
													type="text"
													name=""
													id=""
													className=" w-[340px] box-border p-2 pl-4 font-tajawal center font-semibold text-base border border-inputBorder text-inputTextColor hover:outline-inputHover hover:outline-2 focus:border-inputFocuse rounded outline-none placeholder:font-light"
												/>
											</div>
										</div>
										<div className="flex py-10  justify-between">
											<div className="flex items-center justify-between">
												<p>Classification</p>
											</div>
											<div className="flex items-center justify-between">
												<p>Type</p>
											</div>
										</div>
										<div className="w-full font-bold font-tajawal flex justify-center">
											<button
												onClick={() => {}}
												className="mt-4 p-2 flex bg-mainBlue w-[345px] h-[48px] justify-center items-center gap-3 text-white rounded-md ">
												<p className="text-[24px]">Next </p>
												<img
													src={ArrowRight}
													alt=""
													className="w-5 h-5"
												/>
											</button>
										</div>
									</div>
								</div>
							)}
							{step == 2 && (
								<div
									className=" hidden"
									id="Step2">
									<div className="flex my-8 gap-2">
										<div className="w-[100%] h-[10px] mx-auto mb-6 bg-[#227099]"></div>
										<div className="w-[100%] h-[10px] mx-auto mb-6 bg-[#227099]"></div>
										<div className="w-[100%] h-[10px] mx-auto mb-6 bg-[#F4F4F4]"></div>
									</div>
									<div className=" text-[24px] my-4 mx-6  w-[1160px] h-[328px]">
										<div className="flex py-10  justify-between">
											<div className="flex justify-between w-[510px] ">
												<p>Code</p>

												<input
													type="number"
													name=""
													id=""
													className=" w-[340px] box-border p-2 pl-4 font-tajawal center font-semibold text-base border border-inputBorder text-inputTextColor hover:outline-inputHover hover:outline-2 focus:border-inputFocuse rounded outline-none placeholder:font-light"
												/>
											</div>
											<div className="flex justify-between w-[510px] ">
												<p>Name</p>
												<input
													type="text"
													name=""
													id=""
													className=" w-[340px] box-border p-2 pl-4 font-tajawal center font-semibold text-base border border-inputBorder text-inputTextColor hover:outline-inputHover hover:outline-2 focus:border-inputFocuse rounded outline-none placeholder:font-light"
												/>
											</div>
										</div>
										<div className="flex py-10  justify-between">
											<div className="flex items-center justify-between">
												<p>Classification</p>
											</div>
											<div className="flex items-center justify-between">
												<p>Type</p>
											</div>
										</div>
										<div className="w-full font-bold font-tajawal flex justify-center">
											<button
												onClick={() => {}}
												className="mt-4 p-2 flex bg-mainBlue w-[345px] h-[48px] justify-center items-center gap-3 text-white rounded-md ">
												<p className="text-[24px]">Next </p>
												<img
													src={ArrowRight}
													alt=""
													className="w-5 h-5"
												/>
											</button>
										</div>
									</div>
								</div>
							)}

							{step == 3 && (
								<div
									className=" "
									id="Step3">
									<div className="flex gap-2 my-4">
										<div className="w-[100%] h-[10px] mx-auto mb-6 bg-[#227099]"></div>
										<div className="w-[100%] h-[10px] mx-auto mb-6 bg-[#227099]"></div>
										<div className="w-[100%] h-[10px] mx-auto mb-6 bg-[#227099]"></div>
									</div>
									<div className=" text-[24px]  w-[1160px] h-[492px]">
										<div className="  flex justify-center">
											<div className="w-[730px]  h-[412px]">
												<FileUploader />
											</div>
										</div>
										<div className=" font-tajawal flex justify-center ">
											<button
												onClick={() => {}}
												className=" p-2 flex gap-2 bg-[#D9D9D9] w-[345px] h-[48px] justify-center items-center text-white rounded-md ">
												{" "}
												<img
													src={ArrowRight}
													alt=""
													className="w-5 h-5 rotate-180"
												/>
												<p className="text-[24px]">back </p>
											</button>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default CreateComponent;

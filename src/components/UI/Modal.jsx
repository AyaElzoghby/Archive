import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

function Modal({
	open,
	children,
	onClose,
	title,
	tableConfig,
	onSubmit,
	dialogStyle,
	type,
}) {
	const dialogRef = useRef();

	const boxRef = useRef();

	useEffect(() => {
		if (open && dialogRef.current) {
			dialogRef.current.showModal();
		} else if (dialogRef.current) {
			dialogRef.current.close();
		}
	}, [open]);

	useEffect(() => {
		if (open && dialogRef.current) {
			dialogRef.current.showModal();
		} else if (dialogRef.current) {
			dialogRef.current.close();
		}
	}, [open]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (boxRef.current && !boxRef.current.contains(event.target)) {
				onClose();
			}
		};

		if (open) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [open, onClose]);

	return createPortal(
		<dialog
			ref={dialogRef}
			onClose={onClose}
			className={` modal p-4 rounded-lg shadow-lg backdrop:bg-[#0000008C] w-[300px] sm:w-1/2 min-h-[300px] ${dialogStyle}`}>
			<div
				ref={boxRef}
				className="bg-white w-full">
				{title && (
					<div className=" text-center sm:text-lg md:text-xl lg:text-2xl text-mainBlue font-tajawal font-bold ">
						{title}
					</div>
				)}
				{children}
			</div>
		</dialog>,
		document.getElementById("modal")
	);
}

export default Modal;

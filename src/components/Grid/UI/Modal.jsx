/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

function Modal({ open, children, onClose, title, haveGrid }) {
  const dialogRef = useRef();
  const contentRef = useRef();

  // Handle modal open/close state
  useEffect(() => {
    if (dialogRef.current) {
      if (open) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [open]);

  // Close modal when clicking outside the content
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open, onClose]);

  // Close modal when pressing the Escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  // Return null if the modal is not open to avoid rendering the element in the DOM
  if (!open) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 flex justify-center items-center backdrop:bg-black backdrop:bg-opacity-50 rounded-lg"
      onClose={onClose}
    >
      <div
        ref={contentRef}
        className={`bg-white rounded-lg shadow-lg p-6 max-w-[300px] sm:max-w-1/2 sm:min-w-[350px] md:min-w-[600px] w-fit`}
      >
        {title && (
          <div className="text-center text-lg font-bold text-mainBlue mb-4">
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

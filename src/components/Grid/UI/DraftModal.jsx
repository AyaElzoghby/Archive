import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { TableButton } from "../UI";
import { RenderModalContent } from "../../../utilities/RenderFunctions";

function DraftModal({
  open,
  onClose,
  title,
  tableConfig,
  onSubmit,
  type = "Edit",
  handleHideModal,
  enCaption,
  loading = false,
  handleChange,
  manipulatedRow,
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
      className="modal rounded-lg shadow-lg p-4 backdrop:bg-[#0000008C] w-[300px] sm:w-1/2 "
    >
      <div ref={boxRef} className="bg-white w-full min-h-[350px]">
        {title && (
          <div className="text-center sm:text-lg md:text-xl lg:text-2xl text-mainBlue font-tajawal font-bold">
            {type === "add" || type === "Add"
              ? enCaption
                ? "Add"
                : "اضافة"
              : enCaption
              ? "Edit"
              : "تعديل"}
          </div>
        )}

        <div className="flex justify-between objs-center border-b pb-3 mb-6">
          <button
            onClick={handleHideModal}
            className="text-gray-500 hover:text-gray-700"
          >
            &#x2715;
          </button>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3 ">
          {tableConfig.map((key) => (
            <RenderModalContent
              key={key.keyName}
              enCaption={enCaption}
              item={key}
              type={type}
              handleChange={handleChange}
              manipulatedRow={manipulatedRow}
            />
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-8 w-[300px] mx-auto">
          <TableButton
            loading={loading}
            theme={type === "add" || type === "Add" ? "add" : "edit"}
            onClick={onSubmit}
          >
            {type === "add" || type === "Add"
              ? enCaption
                ? "Add"
                : "اضافة"
              : enCaption
              ? "edit"
              : "حفظ"}
          </TableButton>
          <TableButton
            disabled={loading}
            theme="cancel"
            onClick={handleHideModal}
          >
            {enCaption ? "cancel" : "الغاء"}
          </TableButton>
        </div>
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}

export default DraftModal;

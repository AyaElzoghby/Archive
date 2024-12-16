import React from "react";
import { trash, voltIconRed } from "../../assets/index";

const NotificationCard = ({
  MessageHead,
  MessageBody,
  MessageDateTime,
  Priority,
  onDismiss,
}) => {
  // Define priority color mapping for Tailwind classes
  const priorityColors = {
    1: "border-red-500  ",
    2: "border-yellow-500 ",
    3: "border-blue-500 ",
    4: "border-green-500 ",
  };

  return (
    <div className={`p-4  mb-4 rounded-md bg-[#FAFAFA] font-tajawal relative `}>
      <div className="absolute left-0">
        <button
          onClick={onDismiss}
          className=" text-gray-500  hover:text-gray-800"
        >
          <img src={trash} alt="" />
        </button>
      </div>

      <div className="flex gap-2 items-center font-bold text-lg m-2 mt-3 text-gray-800">
        <img
          src={voltIconRed}
          className={`${priorityColors[Priority]}  h-6 w-6`}
          alt=""
        />

        {MessageHead}
      </div>
      <div className="text-sm text-gray-700 px-3 mx-6 mb-2">{MessageBody}</div>
      <div className="text-sm absolute left-4 bottom-3  text-gray-500">
        {new Date(MessageDateTime).toLocaleString("ar-EG")}
      </div>
    </div>
  );
};

export default NotificationCard;

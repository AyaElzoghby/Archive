const TasksCard = ({
  TaskID,
  TaskNameAr,
  TaskNameEn,
  PercentComplete,
  TaskName,
  PercentCompleteStyle,
}) => {
  return (
    <div className="p-4 mb-4 rounded-md shadow-md relative bg-white">
      <div className="">
        {/* Task Name */}
        <div className="font-bold text-lg mb-2 text-gray-800">{TaskName}</div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-4 relative">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${PercentComplete}%` }}
          ></div>
          
        </div>
        <div className=" flex items-center mt-2 justify-center text-black font-semibold">
            {`(${PercentComplete}%)`}
          </div>
      </div>
    </div>
  );
};

export default TasksCard;

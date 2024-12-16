import { useState, useEffect, useContext, useRef } from "react";
import TasksCard from "../../components/UI/TasksCard";
import { api } from "../../utilities";
import { Cancel } from "../../assets/index";
import ListNumbersIcon from "/icons/ListNumbers.svg";
import { SideMenuContext } from "../../store/SideMenuContext";
import Spinner from "../../components/UI/spinner";

const TasksList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { departmentValue, organizationValue, systemValue } =
    useContext(SideMenuContext);
  const popupRef = useRef(null);

  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.get(
          `/notifications/task?${departmentValue.value}${organizationValue.value}${systemValue.value}`
        );
        setTasks(response.data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [departmentValue, organizationValue, systemValue]);

  // Close popup on clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupVisible(false);
      }
    };

    if (isPopupVisible) {
      window.addEventListener("click", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isPopupVisible]);

  // Show or hide the popup
  const togglePopup = (event) => {
    event.stopPropagation(); // Prevent togglePopup on button click propagating to window click
    setIsPopupVisible((prev) => !prev);
  };

  return (
    <div>
      {/* Trigger Button for Popup */}
      <button
        onClick={togglePopup}
        className="flex justify-center items-center"
      >
        <img
          src={ListNumbersIcon}
          alt=""
          className="cursor-pointer hover:scale-[1.2] duration-300 ease-out"
        />
      </button>

      {/* Popup Modal */}
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div
            ref={popupRef}
            className="bg-white lg:w-[60%] sm:w-[80%] h-3/5 p-6 rounded-lg shadow-lg relative overflow-hidden"
          >
            <div className="justify-between px-4 mb-4 flex">
              <h2 className="text-xl font-bold text-center text-gray-800">
                المهام
              </h2>
              <button onClick={togglePopup} className="text-black">
                <img src={Cancel} className="h-5 w-5 font-bold" alt="" />
              </button>
            </div>
            <div className="w-[100%] h-[1px] mx-auto mb-6 bg-[#227099]"></div>

            {/* Task List */}
            <div className="space-y-4 overflow-y-auto h-3/4">
              {loading ? (
                <div className="overflow-hidden flex justify-center items-center">
                  <Spinner />
                </div>
              ) : tasks.length > 0 ? (
                tasks.map((task) => <TasksCard key={task.TaskID} {...task} />)
              ) : (
                <p className="text-center text-gray-500">لا توجد مهام حالياً.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksList;

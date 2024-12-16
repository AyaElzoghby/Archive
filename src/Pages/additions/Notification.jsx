import { useState, useEffect, useRef } from "react";
import NotificationCard from "../../components/UI/NotificationCard";
import { api } from "../../utilities";
import { Cancel } from "../../assets/index";
import BellIcon from "/icons/Bell.svg";
import Spinner from "../../components/UI/spinner";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef(null);

  // Fetch notifications from API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get("notifications?DepartmentID=4015299");
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // Dismiss a notification (remove it and notify the API)
  const handleDismiss = async (id, index) => {
    try {
      await api.put(`notifications/${id}`, {
        method: "DELETE",
      });

      // Remove the notification from the state
      setNotifications((prev) =>
        prev.filter((_, notificationIndex) => notificationIndex !== index)
      );
    } catch (error) {
      console.error("Error dismissing notification:", error);
    }
  };

  // Close popup when clicking outside
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
    <div className="font-tajawal">
      {/* Trigger Button for Popup */}
      <button
        onClick={togglePopup}
        className={`flex justify-center items-center`}
      >
        <img
          src={BellIcon}
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
                الإشعارات
              </h2>
              <button onClick={togglePopup} className="text-black">
                <img src={Cancel} className="h-5 w-5 font-bold" alt="" />
              </button>
            </div>
            <div className="w-[100%] h-[1px] mx-auto mb-6 bg-[#227099]"></div>

            {/* Notifications List */}
            <div className="space-y-4 overflow-y-auto h-5/6 pl-2">
              {loading ? (
                <div className="overflow-hidden flex justify-center items-center">
                  <Spinner />
                </div>
              ) : notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <NotificationCard
                    key={notification.id}
                    {...notification}
                    onDismiss={() => handleDismiss(notification.id, index)}
                  />
                ))
              ) : (
                <p className="text-center text-gray-500">
                  لا توجد إشعارات حالياً.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;

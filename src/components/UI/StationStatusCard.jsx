import React, { useEffect, useState } from "react";
import { api } from "../../../src/utilities";
import { useContext } from "react";
import { SideMenuContext } from "../../store/SideMenuContext";

const StationStatusCard = () => {
  const { departmentValue } = useContext(SideMenuContext);
  const [stationData, setStationData] = useState([]);
 
  const fetchData = async () => {
    try {
      const response = await api.get(
        "stats/dashboard/" + departmentValue.value
      );

      setStationData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [departmentValue.value]);

  return (
    <>
     
      <div className="flex flex-wrap gap-4">
        {stationData.map((station, index) => (
          <div
            key={station.DepartmentID}
            className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 font-tajawal"
          >
            <h2 className="text-xl font-bold text-[#227099] text-center mb-4">
              {station.DepartmentName}
            </h2>
            <div>
              <h4 className="font-bold text-[#227099] text-center mb-4">
                بيانات التشغيل
              </h4>
              <div className="flex justify-between mt-4">
                <div className="text-center">
                  <p className="text-gray-700">عدد الأصول</p>
                  <p className="text-lg font-semibold">
                    {station.OpAssetCount}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-700">منسوب الساعة 8</p>
                  <p className="text-lg font-semibold">{station.OpLevel}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-700">عدد البلاغات</p>
                  <p className="text-lg font-semibold">{station.OpNotify}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-700">عدد الأعطال</p>
                  <p className="text-lg font-semibold">{station.OpFailure}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-700">عدد العمرات</p>
                  <p className="text-lg font-semibold">{station.OpSchedule}</p>
                </div>
              </div>
            </div>

            <div className="justify-center mt-6">
              <h4 className="font-bold text-[#227099] text-center mb-4">
                حالة طلمبات الرفع
              </h4>

              <div className="flex justify-around items-center">
                {/* Dynamically map Ps data */}
                {Object.keys(station)
                  .filter((key) => key.startsWith("Ps"))
                  .map((key, index) => {
                    // Extract the class name (e.g., `circle4`) from the Ps value
                    const circleClass = station[key]?.split(" ")[1];

                    // Map circle classes to Tailwind color classes
                    const colorClass =
                      {
                        circle1: "bg-[#027E01]",
                        circle2: "bg-[#0002FD]",
                        circle3: "bg-[#FBF350]",
                        circle4: "bg-[#FB0000]",
                        circle5: "bg-[#A52A2C]",
                        circle6: "hidden", // Tailwind equivalent of `display: none`
                        circle7: "bg-[#000000]",
                      }[circleClass] || "bg-gray-300"; // Default color for undefined classes

                    return (
                      <span
                        key={key}
                        // title={`طلمبه ${index + 1}`} // Tooltip showing pump count
                        className={`h-6 w-6 rounded-full ${colorClass} relative group`}
                      >
                        {/* Optional Custom Tooltip */}
                        <span className="absolute text-center top-5 w-16 left-1/2 transform -translate-x-1/2 bg-[#227099] text-white text-xs px-2 py-1 rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          طلمبه {index + 1}
                        </span>
                      </span>
                    );
                  })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default StationStatusCard;

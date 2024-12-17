import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import React, { useEffect, useState } from "react";
import { api } from "../../utilities";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const [filesByType, setFilesByType] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("chart");
        console.log(response);
        setFilesByType(response.data.filesByType || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);
  const labels = filesByType.map((item) => item.TypeName);
  const dataValues = filesByType.map((item) => item.NumberOfFiles);

  const data = {
    labels: labels.length > 0 ? labels : ["No Data"], 
    datasets: [
      {
        label: "إحصائيات",
        data: dataValues.length > 0 ? dataValues : [1], 
        backgroundColor: [
          "#227099",
          "#9AA6B2",
          "#81BFDA",
          "#0A3981",
          "#1F509A",
        ],
        borderColor: ["#227099", "#9AA6B2", "#81BFDA", "#0A3981", "#1F509A"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div
      className="p-6 bg-[#fafafa] rounded-md py-4 m-4"
      style={{ height: "400px" }}
    >
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;


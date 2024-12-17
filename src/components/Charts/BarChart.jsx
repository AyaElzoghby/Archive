import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  // Static data for the chart
  const [chartData] = useState({
    labels: [
      "Class A",
      "Class B",
      "Class C",
      "Class D",
      "Class A",
      "Class B",
      "Class C",
      "Class D",
      "Class A",
      "Class B",
      "Class C",
      "Class D",
      "Class A",
      "Class B",
      "Class C",
      "Class D",
    ],
    values: [10, 20, 30, 40, 10, 20, 30, 40, 10, 20, 30, 40, 10, 20, 30, 40],
  });

  // Array of colors for the bars
  const colors = ["#227099", "#9AA6B2", "#81BFDA"];

  // Chart.js options setup
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
      },
    },
  };

  return (
    <div className=" bg-[#fafafa] rounded-lg   py-4 m-4">
      {chartData.labels.length > 0 && (
        <Bar
          data={{
            labels: chartData.labels, // Static labels
            datasets: [
              {
                label: "عدد الاصول", // Dataset label
                data: chartData.values, // Static data values
                borderWidth: 1,
                backgroundColor: colors, // Array of colors
              },
            ],
          }}
          options={chartOptions}
        />
      )}
    </div>
  );
};

export default BarChart;

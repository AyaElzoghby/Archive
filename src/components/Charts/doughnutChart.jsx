import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
	// Static data for the chart
	const data = {
		labels: ["الكهرباء", "قطع الغيار", "الوقود", "المرتبات", "اخري"], // Labels
		datasets: [
			{
				label: "إحصائيات", // Dataset label
				data: [40, 25, 15, 10, 10], // Static values for the chart
				backgroundColor: [
					"#227099",
					"#9AA6B2",
					"#81BFDA",
					"#0A3981",
					"#1F509A",
				],
				borderColor: ["#227099","#9AA6B2","#81BFDA", "#0A3981", "#1F509A"],
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
			className=" p-6 bg-[#fafafa] rounded-md   py-4 m-4"
			style={{ height: "400px" }}>
			<Doughnut
				data={data}
				options={options}
			/>
		</div>
	);
};

export default DoughnutChart;

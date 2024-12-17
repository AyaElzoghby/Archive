import React, { useEffect, useState } from "react";
import { api } from "../utilities";

const StatsCards = () => {
	const [totalCompanies, setTotalCompanies] = useState(0);
	const [totalDocuments, setTotalDocuments] = useState(0);
	const [filesByType, setFilesByType] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await api.get("chart");
				console.log(response);

				setTotalCompanies(response.data.totalCompanies || 0);
				setTotalDocuments(response.data.totalFiles || 0);
				setFilesByType(response.data.filesByType || []);
			} catch (err) {
				console.error("Error fetching data:", err);
			}
		};
		fetchData();
	}, []);

	const staticStats = [
		{ id: 1, title: "Total Companies", value: totalCompanies, icon: "fa-file-alt" },
		{ id: 2, title: "Total Documents", value: totalDocuments, icon: "fa-users" },
	];
	const dynamicStats = filesByType.map((item, index) => ({
		id: `type-${index + 1}`, 
		title: `Total  ${item.TypeName}`, 
		value: item.NumberOfFiles, 
		icon: "fa-cogs",
	}));
	const stats = [...staticStats, ...dynamicStats];

	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-6 m-4">
			{stats.map((stat) => (
				<div className="bg-[#fafafa] rounded-lg p-6 text-center" key={stat.id}>
					<i className={`fa ${stat.icon} text-4xl text-[#2B2B2B] mb-4`}></i>
					<h5 className="font-semibold text-[#2B2B2B]">{stat.title}</h5>
					<h3 className="text-3xl font-bold text-[#2B2B2B]">{stat.value}</h3>
					<p className="text-sm text-[#5C5E64] mt-2">last update at 8:00PM</p>
				</div>
			))}
		</div>
	);
};

export default StatsCards;

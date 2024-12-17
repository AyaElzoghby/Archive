<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import axios from "axios";

const StatsCards = () => {
	const [data, setData] = useState([]);
	const [totalCompanies, setTotalCompanies] = useState(0); 

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					"http://192.168.1.29:5002/api/ar/table?sp=arc_file_chart"
				);
				console.log(response);
				
				setData(response.data);
				const totalCompaniesValue = response.data.data[0].TotalCompanies || 0; 
				console.log(totalCompaniesValue,'total companies')
				setTotalCompanies(totalCompaniesValue);
			} catch (err) {
				console.error("Error fetching data:", err);
			}
		};
		fetchData();
	}, []);

	const stats = [
		{ id: 1, title: "Total Companies", value: totalCompanies, icon: "fa-file-alt" },
		{ id: 2, title: "Total Documents", value: 100, icon: "fa-users" },
		{ id: 3, title: "Number Of Type1", value: 10, icon: "fa-cogs" },
		{ id: 4, title: "Number Of Type2", value: 30, icon: "fa-chart-bar" },
		{ id: 3, title: "Number Of Type3", value: 10, icon: "fa-cogs" },
		{ id: 4, title: "Number Of Type4", value: 30, icon: "fa-chart-bar" },
	];

	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-6 m-4">
			{stats.map((stat) => (
				<div
					className="bg-[#fafafa] rounded-lg p-6 text-center"
					key={stat.id}>
					<i className={`fa ${stat.icon} text-4xl text-[#2B2B2B] mb-4`}></i>
					<h5 className="font-semibold text-[#2B2B2B]">{stat.title}</h5>
					<h3 className="text-3xl font-bold text-[#2B2B2B]">{stat.value}</h3>
					<p className="text-sm text-[#5C5E64] mt-2">last update at 8:00PM</p>
				</div>
			))}
		</div>
	);
=======
import React from "react";

const stats = [
  { id: 1, title: "Total Companies", value: 26, icon: "fa-file-alt" },
  { id: 2, title: "Total  Documents", value: 100, icon: "fa-users" },
  { id: 3, title: "Number Of Type1", value: 10, icon: "fa-cogs" },
  { id: 4, title: "Number Of Type2", value: 30, icon: "fa-chart-bar" },
  { id: 3, title: "Number Of Type3", value: 20, icon: "fa-cogs" },
  { id: 4, title: "Number Of Type4", value: 40, icon: "fa-chart-bar" },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-6 m-4">
      {stats.map((stat) => (
        <div className="bg-[#fafafa] rounded-lg  p-6 text-center" key={stat.id}>
          <i className={`fa ${stat.icon} text-4xl text-[#2B2B2B] mb-4`}></i>
          <h5 className=" font-semibold text-[#2B2B2B]">{stat.title}</h5>
          <h3 className="text-3xl font-bold text-[#2B2B2B]">{stat.value}</h3>
          <p className="text-sm text-[#5C5E64] mt-2">last update at 8:00PM</p>
        </div>
      ))}
    </div>
  );
>>>>>>> c2bcc67f3036112437058f7945209c9edf56fe8c
};

export default StatsCards;

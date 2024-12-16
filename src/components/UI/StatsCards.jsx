import React from "react";

const stats = [
	{ id: 1, title: "احصائيات 1", value: 1200, icon: "fa-file-alt" },
	{ id: 2, title: "احصائيات 2", value: 1200, icon: "fa-users" },
	{ id: 3, title: "احصائيات 3", value: 1200, icon: "fa-cogs" },
	{ id: 4, title: "احصائيات 4", value: 1200, icon: "fa-chart-bar" },
];

const StatsCards = () => {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 m-4">
			{stats.map((stat) => (
				<div
					className="bg-white rounded-lg shadow-lg p-6 text-center"
					key={stat.id}>
					<i className={`fa ${stat.icon} text-4xl text-[#227099] mb-4`}></i>
					<h5 className="text-xl font-semibold text-[#227099]">{stat.title}</h5>
					<h3 className="text-3xl font-bold text-[#227099]">{stat.value}</h3>
					<p className="text-sm text-[#227099] mt-2">
						آخر تحديث: 2024-4-24 الساعة 8:00
					</p>
				</div>
			))}
		</div>
	);
};

export default StatsCards;

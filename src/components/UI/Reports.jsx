

const Reports = () => {
  const reports = [
    { title: "تقرير إدارة الأصول", date: "2024-4-24" },
    { title: "تقرير إدارة الأصول", date: "2024-4-24" },
    { title: "تقرير إدارة الأصول", date: "2024-4-24" },
    { title: "تقرير إدارة الأصول", date: "2024-4-24" },
  ];

  return (
    <div className="bg-white shadow-lg rounded-md p-6 w-full md:w-1/2">
      <h2 className="text-xl font-bold text-right mb-2">التقارير الحديثة</h2>
      <p className="text-gray-500 text-right mb-4">عرض المعلومات الأحدث</p>
      <ul className="space-y-4">
        {reports.map((report, index) => (
          <li
            key={index}
            className="flex justify-between items-center border-b pb-2 text-right"
          >
            <div className="text-gray-800 font-medium">{report.title}</div>
            <div className="text-gray-500 text-sm">اخر تحديث: {report.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;

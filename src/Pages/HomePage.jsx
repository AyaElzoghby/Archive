import {  WelcomeCard, StatsCards } from "../components/UI/index";
import Reports from "../components/UI/Reports";
import { FileUploader } from "../components/Grid/inputs/index";
// import GalleryViewer from "../components/Inputs/GalleryViewer";

const HomePage = () => {
  return (
    <div>
      {/* <FileUploader url={"http://192.168.1.197:5000/api/document"} /> */}
      <WelcomeCard />
      <StatsCards />
      <div className="flex justify-between gap-5 p-6">
        <Reports />
        <DoughnutChart />
      </div>
    </div>
  );
};

export default HomePage;

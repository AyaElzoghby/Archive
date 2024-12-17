import { Header } from "../components";
import Aside from "../components/Layout/Aside";
import WelcomeCard from "../components/WelcomeCard";
import StatsCards from "../components/StatsCards";
import BarChart from "../components/Charts/BarChart";
import DoughnutChart from "../components/Charts/doughnutChart";

// import GalleryViewer from "../components/Inputs/GalleryViewer";

const HomePage = () => {
  return (
    <>
      <WelcomeCard />
      <StatsCards />
      <div className=" flex flex-col gap-3">
        <div className="flex gap-3 mb">
          <BarChart />
          <BarChart />
        </div>
        <div className="flex gap-3">
          <DoughnutChart />
          <DoughnutChart />
        </div>
      </div>
    </>
  );
};

export default HomePage;

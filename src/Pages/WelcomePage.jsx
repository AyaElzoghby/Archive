import { Header } from "../components";
import Aside from "../components/Layout/Aside";
import WelcomeCard from "../components/WelcomeCard";
import StatsCards from "../components/StatsCards";
import BarChart from "../components/Charts/BarChart" ;
import DoughnutChart from "../components/Charts/doughnutChart" 

// import GalleryViewer from "../components/Inputs/GalleryViewer";

const HomePage = () => {
  return (
    <>
      <WelcomeCard />
      <StatsCards />
      <div className="flex justify-between gap-5 p-6">
      <BarChart />
      <BarChart />
      </div>
      <div className="flex justify-between gap-5 p-6">
      <DoughnutChart />
        <DoughnutChart />
      </div>
    </>
  );
};

export default HomePage;

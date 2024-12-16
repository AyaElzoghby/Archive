import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../src/Pages/RootLayout";
import WelcomePage from "./Pages/WelcomePage";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout > <WelcomePage /></RootLayout> ,
      children: [
       
      ],
    },
  ]);

  return(
    <RouterProvider router={routes}></RouterProvider>
  )
}

export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "../src/Pages/RootLayout";
import WelcomePage from "./Pages/WelcomePage";
import HomePage from "./Pages/WelcomePage";
import SideMenuProvider from "./store/SideMenuContext";
import { AuthProvider } from "./store/Auth";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthProvider>
          <SideMenuProvider>
            <RootLayout />
          </SideMenuProvider>
        </AuthProvider>
      ),
      children: [{ index: true, element: <WelcomePage /> }],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Pages/RootLayout";
import WelcomePage from "./Pages/WelcomePage";
import SideMenuProvider from "./store/SideMenuContext";
import { AuthProvider } from "./store/Auth";
import { QueryClientProvider, QueryClient } from "react-query";

import { FileType ,Calssfication } from "./Pages/addingData";

function App() {
  const queryClient = new QueryClient();
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <SideMenuProvider>
              <RootLayout />
            </SideMenuProvider>
          </QueryClientProvider>
        </AuthProvider>
      ),
      children: [
        { path: "", element: <WelcomePage /> },
        {
          path: "/FileType",
          element:<FileType />
        },{
          path: "/Calssfication",
          element:<Calssfication />
         
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;

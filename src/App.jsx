import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Pages/RootLayout";
import WelcomePage from "./Pages/WelcomePage";
import SideMenuProvider from "./store/SideMenuContext";
import { AuthProvider } from "./store/Auth";
import { QueryClientProvider, QueryClient } from "react-query";
import Chatbot from "./Pages/ChatBot";
import {
  FileType,
  Calssfication,
  AddDocumnet,
  Company,
} from "./Pages/addingData";

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
          element: <FileType />,
        },
        {
          path: "/Calssfication",
          element: <Calssfication />,
        },
        { path: "Company", element: <Company /> },
        { path: "Document/:id", element: <AddDocumnet /> },
        {path:'chatbot',element:<Chatbot></Chatbot>}
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;

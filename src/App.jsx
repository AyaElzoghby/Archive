import RootLayout from "../src/Pages/RootLayout"
import SideMenuProvider from "./store/SideMenuContext";
function App() {
  return <>
<SideMenuProvider>
<RootLayout/>
</SideMenuProvider>
  </>;
}

export default App;

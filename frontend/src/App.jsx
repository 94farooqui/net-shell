import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Hosts from "./pages/Hosts";
import Groups from "./pages/Groups";
import CredentialsManager from "./pages/CredentialsManager";
import History from "./pages/History";
import SavedCommands from "./pages/SavedCommands";
import Notes from "./pages/Notes";
import Terminal from "./pages/Terminal";
import NewHost from "./pages/NewHost";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {" "}
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="terminal" element={<Terminal />} />
          <Route path="hosts/new" element={<NewHost />} />
          <Route path="hosts" element={<Hosts />} />
          <Route path="groups" element={<Groups />} />
          <Route path="credentials-manager" element={<CredentialsManager />} />
          <Route path="history" element={<History />} />
          <Route path="saved-commands" element={<SavedCommands />} />
          <Route path="notes" element={<Notes />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

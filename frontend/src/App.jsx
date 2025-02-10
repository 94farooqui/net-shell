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
import EditHost from "./pages/EditHost";
import NewGroup from "./pages/NewGroup";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import EditGroup from "./pages/EditGroup";
import NewCredntials from "./pages/NewCredntials";
import { AuthProvider } from "./context/AuthProvider";
import PrivateRoute from "./components/PrivateRoute";
import NewCommand from "./pages/NewCommand";
import EditCommand from "./pages/EditCommand";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {" "}
      <AuthProvider>
      <BrowserRouter>
  <Routes>
    {/* Protected Routes - Require Authentication */}
    <Route element={<PrivateRoute />}>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="terminal" element={<Terminal />} />
        <Route path="hosts/edit/:hostId" element={<EditHost />} />
        <Route path="hosts/new" element={<NewHost />} />
        <Route path="hosts" element={<Hosts />} />
        <Route path="groups/new" element={<NewGroup />} />
        <Route path="groups/edit/:groupId" element={<EditGroup />} />
        <Route path="groups" element={<Groups />} />
        <Route path="credentials-manager/new" element={<NewCredntials />} />
        <Route path="credentials-manager" element={<CredentialsManager />} />
        <Route path="history" element={<History />} />
        <Route path="commands/new" element={<NewCommand />} />
        <Route path="commands/:commandId/edit" element={<EditCommand />} />
        <Route path="commands" element={<SavedCommands />} />
        <Route path="notes" element={<Notes />} />
      </Route>
    </Route>

    {/* Public Routes - No Authentication Required */}
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
  </Routes>
</BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;

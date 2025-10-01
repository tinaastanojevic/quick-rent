import Navbar from "./components/Navbar.jsx";
import HomePage from "./components/pages/HomePage.jsx";
import LoginPage from "./components/pages/LoginPage.jsx";
import RegisterPage from "./components/pages/RegisterPage";
import CategoryEquipmentsPage from "./components/pages/CategoryEquipmentsPage";
import { Route, Routes,Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import CreateEquipmentPage from "./components/pages/CreateEquipmentPage";
import AdminRequests from "./components/AdminRequests";
import RequireAuth from "./RequireAuth";
import ProfilePage from "./components/pages/ProfilePage.jsx";
import EquipmentPage from "./components/pages/EquipmentPage";
import Notifications from "./components/Notifications";

function App() {
  return (
    <div className="">
      <AuthProvider>
        <Navbar />
        <Notifications />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/category/:category"
            element={<CategoryEquipmentsPage />}
          />

          <Route
            element={
              <RequireAuth allowedRoles={["Admin", "Owner", "Customer"]} />
            }
          >
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/equipment/:id" element={<EquipmentPage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["Admin", "Owner"]} />}>
            <Route path="/addEquipment" element={<CreateEquipmentPage />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
            <Route path="/admin" element={<AdminRequests />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;

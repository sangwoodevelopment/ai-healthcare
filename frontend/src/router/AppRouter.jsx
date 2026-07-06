import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/Login/LoginPage";
import HomePage from "../pages/Home/HomePage";
import ProtectedRoute from "../components/ProtectedRoute";
import FavoritePage from "../pages/Favorite/FavoritePage.jsx";
import HospitalPage from "../pages/Hospital/HospitalPage.jsx";
import AiPage from "../pages/Ai/AiPage.jsx";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/ai" element={<ProtectedRoute><AiPage /></ProtectedRoute>} />
                <Route path="/hospitals" element={<ProtectedRoute><HospitalPage /></ProtectedRoute>} />
                <Route path="/favorites" element={<ProtectedRoute><FavoritePage /></ProtectedRoute>} />

                <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
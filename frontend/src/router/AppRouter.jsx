import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/Login/LoginPage";
import HomePage from "../pages/Home/HomePage";
import ProtectedRoute from "../components/ProtectedRoute";
import FavoritePage from "../pages/Favorite/FavoritePage.jsx";
import HospitalPage from "../pages/Hospital/HospitalPage.jsx";
import AiPage from "../pages/Ai/AiPage.jsx";
import HistoryPage from "../pages/History/HistoryPage.jsx";
import HospitalDetailPage from "../pages/Hospital/HospitalDetailPage.jsx";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/ai" element={<ProtectedRoute><AiPage /></ProtectedRoute>} />
                <Route path="/hospitals" element={<ProtectedRoute><HospitalPage /></ProtectedRoute>} />
                <Route path="/favorites" element={<ProtectedRoute><FavoritePage /></ProtectedRoute>} />
                <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>}/>
                <Route path="/histories" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
                <Route path="/hospitals/:id" element={<ProtectedRoute><HospitalDetailPage /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;
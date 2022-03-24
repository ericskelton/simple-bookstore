import react from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./Auth/ProtectedRoute";
import HomeRoute from "./Routes/Home";
import LoginRoute from "./Routes/Login";
import AdminRoute from "./Routes/Admin";
import RegisterRoute from "./Routes/Register";

  
export default function PageRouter(props) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeRoute/>}/>
                <Route path="admin" element={<AdminRoute/>}/>
            </Routes>
        </BrowserRouter>
    );
}
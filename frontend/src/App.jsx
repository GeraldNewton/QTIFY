import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import AlbumPage from "./pages/albums/AlbumPage.jsx";
import AdminPage from "./pages/Admin/AdminPage.jsx";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import AuthCallBackPage from "./pages/Auth/AuthCallBackPage.jsx";
import ChatePage from "./pages/Chat/ChatePage.jsx";
import SignUpPage from "./pages/signup/SignUpPage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/sso-callback" element={<SignUpPage />} />
        <Route path="/auth-callback" element={<AuthCallBackPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="album/:_id" element={<AlbumPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="chat" element={<ChatePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

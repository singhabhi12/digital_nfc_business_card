import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
import MainProfile from "./Pages/MainProfile/MainProfile";
import AuthProvider from "./Helper/Context";
import CreateCard from "./Pages/CreateCard/CreateCard";
import YourCard from "./Pages/YourCard/YourCard";
import ScanCard from "./Pages/ScanCard/ScanCard";
import WriteCard from "./Pages/WriteCard/WriteCard";
import SavedCard from "./Pages/SavedCard/SavedCard";
import CardProfile from "./Pages/CardProfile/CardProfile";
import BusinessCard from "./Pages/BusinessCard/BusinessCard";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<MainProfile />} />
          <Route path="/create-card" element={<CreateCard />} />
          <Route path="/card" element={<YourCard />} />
          <Route path="/card/:id" element={<CardProfile />} />
          <Route path="/profile/:id" element={<BusinessCard />} />
          <Route path="/scan-card" element={<ScanCard />} />
          <Route path="/write-card" element={<WriteCard />} />
          <Route path="/saved-cards" element={<SavedCard />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;

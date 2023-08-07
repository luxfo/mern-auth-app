import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./Loading";
import Header from "../components/Header";
import Main from "../components/Main";
import Home from "../pages/Home";
import Profile from "../pages/Profile";

function Layout() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex flex-row flex-1 h-screen overflow-hidden">
        <Suspense fallback={<Loading />}>
          <Main>
            <Routes>
              <Route index element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </Main>
        </Suspense>
      </div>
    </div>
  );
}

export default Layout;

import { Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import UsersList from "../Pages/LandingPage";
import Profile from "../Pages/Profile";
import Posts from "../Pages/Posts";
import Gallery from "../Pages/Gallery";
import ToDo from "../Pages/ToDo";
function Index() {
  const location = useLocation();

  return (
    <Suspense>
      <Routes>
        <Route path={"homePage"}>
          <Route index element={<UsersList />} />
        </Route>
        <Route path={"profile"}>
          <Route index element={<Profile />} />
        </Route>
        <Route path={"posts"}>
          <Route index element={<Posts />} />
        </Route>
        <Route path={"gallery"}>
          <Route index element={<Gallery />} />
        </Route>
        <Route path={"todo"}>
          <Route index element={<ToDo />} />
        </Route>

        <Route path="*" element={<Navigate to="/homePage" replace />} />
      </Routes>
    </Suspense>
  );
}

export default Index;

import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { tokenSelector } from "../reducers/authReducer";
import { useShallowEqualSelector } from "../hooks/useShallowSelector";

import AppContainer from "./AppContainer";
import UsersContainer from "./UsersContainer";
import AuthContainer from "./AuthContainer";
import SettingsContainer from "./SettingsContainer";
import ObjectContainer from "./ObjectContainer";
import RegionsContainer from "./RegionsContainer";
import ProjectsContainer from "./ProjectsContainer";
import MapContainer from "./MapContainer";
import ModelsContainer from "./ModelsContainer";

export default function RootContainer() {
  const token = useShallowEqualSelector(tokenSelector);

  const isAuthorized = useMemo(() => Boolean(token), [token]);

  const locatonPath = useLocation().pathname;

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized || locatonPath === "/") {
      navigate("auth");
    }
    if (isAuthorized && locatonPath === "/") {
      navigate("/dashboard/objects");
    }
  }, [isAuthorized, navigate, locatonPath]);

  return (
    <Routes>
      {isAuthorized && (
        <Route path="dashboard" element={<AppContainer />}>
          <Route path="regions/:tab?" element={<RegionsContainer />} />
          <Route path="users/:tab?" element={<UsersContainer />} />
          <Route path="settings/:tab?" element={<SettingsContainer />} />
          <Route path="objects/:tab?" element={<ObjectContainer />} />
          <Route path="projects/:tab?" element={<ProjectsContainer />} />
          <Route path="models/:tab?" element={<ModelsContainer />} />
          <Route path="map/:tab?" element={<MapContainer />} />
        </Route>
      )}
      <Route path="/auth" element={<AuthContainer />} />
    </Routes>
  );
}

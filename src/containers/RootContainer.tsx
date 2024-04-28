import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { profileSelector, tokenSelector } from "../reducers/authReducer";
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
import { CheckRole } from "../utils/CheckRole";
import { UserRoles } from "../api/AppDto";
import PageNotFoundContainer from "./PageNotFoundContainer";

export default function RootContainer() {
  const token = useShallowEqualSelector(tokenSelector);
  const profile = useShallowEqualSelector(profileSelector);

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
          {(CheckRole(UserRoles.SuperAdmin, profile) || CheckRole(UserRoles.Admin, profile)) && (
            <Route path="regions/:tab?" element={<RegionsContainer />} />
          )}
          {(CheckRole(UserRoles.SuperAdmin, profile) ||
            CheckRole(UserRoles.Admin, profile) ||
            CheckRole(UserRoles.Staff, profile)) && (
            <Route path="objects/:tab?" element={<ObjectContainer />} />
          )}
          {(CheckRole(UserRoles.SuperAdmin, profile) || CheckRole(UserRoles.Admin, profile)) && (
            <Route path="projects/:tab?" element={<ProjectsContainer />} />
          )}
          {(CheckRole(UserRoles.SuperAdmin, profile) || CheckRole(UserRoles.Admin, profile)) && (
            <Route path="models/:tab?" element={<ModelsContainer />} />
          )}
          {(CheckRole(UserRoles.SuperAdmin, profile) ||
            CheckRole(UserRoles.Admin, profile) ||
            CheckRole(UserRoles.Staff, profile)) && (
            <Route path="users/:tab?" element={<UsersContainer />} />
          )}
          <Route path="settings/:tab?" element={<SettingsContainer />} />
          <Route path="map/:tab?" element={<MapContainer />} />
          <Route path="*" element={<PageNotFoundContainer />} />
        </Route>
      )}
      <Route path="/auth" element={<AuthContainer />} />
    </Routes>
  );
}

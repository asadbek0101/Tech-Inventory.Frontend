import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { profileSelector, tokenSelector } from "../reducers/authReducer";
import { useShallowEqualSelector } from "../hooks/useShallowSelector";
import { CheckRole } from "../utils/CheckRole";
import { UserRoles } from "../api/AppDto";

import AppContainer from "./AppContainer";
import UsersContainer from "./UsersContainer";
import AuthContainer from "./AuthContainer";
import SettingsContainer from "./SettingsContainer";
import ObjectContainer from "./ObjectContainer";
import RegionsContainer from "./RegionsContainer";
import ProjectsContainer from "./ProjectsContainer";
import MapContainer from "./MapContainer";
import ModelsContainer from "./ModelsContainer";
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
          {(CheckRole(UserRoles.Programmer, profile) ||
            CheckRole(UserRoles.DepartmentHead, profile) ||
            CheckRole(UserRoles.ChiefSpecialist, profile) ||
            CheckRole(UserRoles.SeniorSpecialist, profile)) && (
            <Route path="objects/:tab?" element={<ObjectContainer />} />
          )}
          {(CheckRole(UserRoles.Programmer, profile) ||
            CheckRole(UserRoles.DepartmentHead, profile) ||
            CheckRole(UserRoles.ChiefSpecialist, profile) ||
            CheckRole(UserRoles.LeadingExpert, profile)) && (
            <Route path="regions/:tab?" element={<RegionsContainer />} />
          )}
          {(CheckRole(UserRoles.Programmer, profile) ||
            CheckRole(UserRoles.DepartmentHead, profile) ||
            CheckRole(UserRoles.ChiefSpecialist, profile)) && (
            <Route path="projects/:tab?" element={<ProjectsContainer />} />
          )}
          {(CheckRole(UserRoles.Programmer, profile) ||
            CheckRole(UserRoles.DepartmentHead, profile) ||
            CheckRole(UserRoles.ChiefSpecialist, profile)) && (
            <Route path="models/:tab?" element={<ModelsContainer />} />
          )}
          {CheckRole(UserRoles.Programmer, profile) && (
            <Route path="users/:tab?" element={<UsersContainer />} />
          )}
          {(CheckRole(UserRoles.Programmer, profile) ||
            CheckRole(UserRoles.DepartmentHead, profile) ||
            CheckRole(UserRoles.ChiefSpecialist, profile) ||
            CheckRole(UserRoles.LeadingExpert, profile) ||
            CheckRole(UserRoles.SeniorSpecialist, profile)) && (
            <Route path="settings/:tab?" element={<SettingsContainer />} />
          )}
          {(CheckRole(UserRoles.Programmer, profile) ||
            CheckRole(UserRoles.DepartmentHead, profile) ||
            CheckRole(UserRoles.ChiefSpecialist, profile) ||
            CheckRole(UserRoles.LeadingExpert, profile) ||
            CheckRole(UserRoles.SeniorSpecialist, profile)) && (
            <Route path="map/:tab?" element={<MapContainer />} />
          )}

          <Route path="*" element={<PageNotFoundContainer />} />
        </Route>
      )}
      <Route path="/auth" element={<AuthContainer />} />
    </Routes>
  );
}

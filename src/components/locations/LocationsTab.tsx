import { useEffect, useState } from "react";
import { useObyektApiContext } from "../../api/obyekt/ObyektApiContext";
import { showError } from "../../utils/NotificationUtils";

import LocationsTabLayout from "./LocationsTabLayout";

export default function LocationsTab() {
  const [locations, setLocations] = useState([]);

  const { ObyektApi } = useObyektApiContext();

  useEffect(() => {
    ObyektApi.getObyektLocations()
      .then((r) => setLocations(r?.data))
      .catch(showError);
  }, [ObyektApi]);

  return <LocationsTabLayout markerList={locations}>Locations</LocationsTabLayout>;
}

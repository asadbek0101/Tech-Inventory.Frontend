import { useCallback, useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { useObyektApiContext } from "../../api/obyekt/ObyektApiContext";
import { showError } from "../../utils/NotificationUtils";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 41.311081,
  lng: 69.240562,
};

export default function MapTab() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBR_H09LX4QrLQ1RIMRnYKct673dAJvL7A",
  });
  const [map, setMap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [avtiveObId, setActiveObId] = useState(0);
  const [data, setData] = useState([]);

  const { ObyektApi } = useObyektApiContext();

  useEffect(() => {
    ObyektApi.getObyekts("")
      .then((r) => setData(r?.data?.data))
      .catch(showError);
  }, [ObyektApi]);

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={4}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {data.length > 0 ? (
        data.map((ob: any, index) => {
          return (
            <Marker
              key={index}
              position={{ lat: Number(ob.latitude), lng: Number(ob.longitude) }}
              onClick={() => setActiveObId(ob.id)}
            >
              {avtiveObId === ob.id && (
                <InfoWindow>
                  <div>{ob.name}</div>
                </InfoWindow>
              )}
            </Marker>
          );
        })
      ) : (
        <div />
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}

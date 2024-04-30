import { useCallback, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100%",
};

interface CenterProps {
  readonly lng: number;
  readonly lat: number;
}

interface Props {
  readonly maxZoom?: number;
  readonly center?: CenterProps;
  readonly areas: CenterProps[];
}

export default function Map({
  center = { lat: 41.275652, lng: 69.219619 },
  maxZoom = 6,
  areas,
}: Props) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBR_H09LX4QrLQ1RIMRnYKct673dAJvL7A",
  });
  const [map, setMap] = useState(null);
  const [avtiveObId, setActiveObId] = useState(0);
  const [mapMaxZoom, setMapMaxZoom] = useState(maxZoom);

  const onLoad = useCallback(
    function callback(map: any) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);

      setMap(map);
    },
    [center, window],
  );

  const onUnmount = useCallback(
    function callback(map: any) {
      setMap(null);
    },
    [setMap],
  );

  const changeMaxZoom = useCallback(() => {
    setMapMaxZoom(100);
  }, []);

  setTimeout(changeMaxZoom, 1000);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      onLoad={onLoad}
      zoom={10}
      onUnmount={onUnmount}
      options={{
        maxZoom: mapMaxZoom,
        isFractionalZoomEnabled: true,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: false,
      }}
    >
      {areas.length > 0 ? (
        areas.map((ob: any, index) => {
          return (
            <Marker
              key={index}
              position={{ lat: Number(ob.lat), lng: Number(ob.lng) }}
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

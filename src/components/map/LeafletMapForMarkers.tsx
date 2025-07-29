import "./assets/leaflet-map.scss";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import { RecenterMap } from "./RecenterMap";
import { regionPolygons } from "./data";
import { useCallback } from "react";

import ShowCrimes from "./ClasterMapMarkers";
import L from "leaflet";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface Props {
  readonly markerList: {
    id: number;
    latitude: number;
    longitude: number;
    status: string;
    nameAndAddress?: string;
  }[];
  readonly center: [number, number];
  readonly zoom: number;
  readonly selectPolygonId: number;
}

const southWest = L.latLng(37.0, 55.0);
const northEast = L.latLng(46.0, 74.0);
const bounds = L.latLngBounds(southWest, northEast);

export default function LeafletMapForMarkers({
  markerList,
  center,
  zoom = 12,
  selectPolygonId,
}: Props) {
  const checkSelectedPolygon = useCallback(
    (stateId: number) => {
      return Boolean(selectPolygonId == 0 || stateId === selectPolygonId)
        ? "#1976D2"
        : "transparent";
    },
    [selectPolygonId],
  );  

  const checkSelectedBorder = useCallback(
    (stateId: number) => {
      return Boolean(stateId === selectPolygonId) ? 4 : 2;
    },
    [selectPolygonId],
  );

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: "100%", width: "100%" }}
      minZoom={7}
      maxBounds={bounds}
      maxBoundsViscosity={0.5}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {regionPolygons?.features?.map((state: any, index: any) => {
        const coordinates: any = state.coordinates[0].map((item: any) => [item[1], item[0]]);
        return (
          <Polygon
            key={index}
            pathOptions={{
              fillColor: "transparent",
              fillOpacity: 0.4,
              weight: checkSelectedBorder(state?.id),
              opacity: 1,
              dashArray: "0",
              color: checkSelectedPolygon(state?.id),
            }}
            positions={coordinates}
            eventHandlers={{
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  dashArray: "0",
                  fillColor: "transparent",
                  fillOpacity: 1,
                  weight: checkSelectedBorder(state?.id),
                  opacity: 1,
                  color: checkSelectedPolygon(state?.id),
                });
              },
              mouseout: (e: any) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.4,
                  weight: checkSelectedBorder(state?.id),
                  dashArray: "0",
                  color: checkSelectedPolygon(state?.id),
                });
              },
              click: (e: any) => {},
              zoomlevelschange: (e: any) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.4,
                  weight: checkSelectedBorder(state?.id),
                  dashArray: "0",
                  color: checkSelectedPolygon(state?.id),
                });
              },
            }}
          />
        );
      })}
      <RecenterMap center={center} zoom={zoom} />
      <ShowCrimes data={markerList} />
    </MapContainer>
  );
}

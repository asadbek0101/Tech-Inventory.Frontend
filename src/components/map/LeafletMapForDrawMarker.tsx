import { MapContainer, TileLayer, FeatureGroup, useMap } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { useCallback, useEffect, useRef } from "react";

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

interface CenterProps {
  readonly center: [number, number];
  readonly zoom?: number;
}

export function MapCenterController({ center, zoom }: CenterProps) {
  const map = useMap();

  useEffect(() => {
    map.flyTo(center, zoom ?? map.getZoom());
  }, [center, zoom, map]);

  return null;
}

interface Props {
  readonly setLatLong: (value: any) => void;
  readonly center: [number, number];
  readonly zoom?: number;
}

export default function LeafletMapForDrawMarker({ setLatLong, center, zoom = 10 }: Props) {
  const featureGroupRef = useRef<L.FeatureGroup>(null);

  const onCreated = useCallback(
    (e: any) => {
      const layer = e.layer;
      const layerGroup = featureGroupRef.current;
      if (layerGroup) {
        layerGroup.clearLayers();
        layerGroup.addLayer(layer);
      }
      setLatLong(layer.getLatLng());
    },
    [setLatLong],
  );

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <MapCenterController center={center} zoom={zoom} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
      />
      <FeatureGroup ref={featureGroupRef}>
        <EditControl
          position="topright"
          onCreated={onCreated}
          draw={{
            rectangle: false,
            polyline: false,
            polygon: false,
            circle: false,
            marker: true,
            circlemarker: false,
          }}
          edit={{ edit: false, remove: false }}
        />
      </FeatureGroup>
    </MapContainer>
  );
}

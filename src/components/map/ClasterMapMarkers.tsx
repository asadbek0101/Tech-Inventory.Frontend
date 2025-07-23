import "./assets/cluster-map-marker.scss";

import { useCallback, useEffect, useState } from "react";
import { Marker, useMap } from "react-leaflet";
import L, { LatLngBounds } from "leaflet";

import useSupercluster from "use-supercluster";

const icons: Record<string, L.DivIcon> = {};

const fetchIcon = (count: number, size: number) => {
  const key = `${count}`;
  if (!icons[key]) {
    icons[key] = L.divIcon({
      html: `<div class="cluster-marker" style="width: ${size}px; height: ${size}px;">${count}</div>`,
      className: "cluster-marker",
    });
  }
  return icons[key];
};

interface Props {
  data: any[];
}

export default function ShowCrimes({ data }: Props) {
  const [bounds, setBounds] = useState<[number, number, number, number] | undefined>();
  const [zoom, setZoom] = useState<number>(12);
  const map = useMap();
  const maxZoom = 22;

  const updateMap = () => {
    const b: LatLngBounds = map.getBounds();
    setBounds([b.getWest(), b.getSouth(), b.getEast(), b.getNorth()]);
    setZoom(map.getZoom());
  };

  const onMove = useCallback(() => {
    updateMap();
  }, [map]);

  useEffect(() => {
    updateMap();
  }, [map]);

  useEffect(() => {
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);

  const points = data.map((crime) => ({
    type: "Feature" as const,
    properties: {
      cluster: false,
      crimeId: crime.id,
      category: crime.category,
      nameAndAddress: crime?.nameAndAddress,
    },
    geometry: {
      type: "Point" as const,
      coordinates: [parseFloat(crime.longitude), parseFloat(crime.latitude)],
    },
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 17 },
  });

  return (
    <>
      {clusters.map((cluster: any) => {
        const [longitude, latitude] = cluster?.geometry?.coordinates;
        const { cluster: isCluster, point_count: pointCount } = cluster.properties;

        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              position={[latitude, longitude]}
              icon={fetchIcon(pointCount, 30 + (pointCount / points.length) * 10)}
              eventHandlers={{
                click: () => {
                  if (!supercluster) return;

                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    maxZoom,
                  );

                  map.setView([latitude, longitude], expansionZoom, { animate: true });
                },
              }}
            />
          );
        }

        return (
          <Marker
            key={`crime-${cluster.properties.crimeId}`}
            position={[latitude, longitude]}
            eventHandlers={{
              click: () => {
                console.log(cluster?.properties?.nameAndAddress);
              },
            }}
          />
        );
      })}
    </>
  );
}

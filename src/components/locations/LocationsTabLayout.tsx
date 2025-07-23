import { ReactNode, useState } from "react";

import LeafletMapForMarkers from "../map/LeafletMapForMarkers";

interface Props {
  readonly children?: ReactNode;
  readonly markerList: any[];
}

export default function LocationsTabLayout({ children, markerList }: Props) {
  const [center, setCenter] = useState<any>([41.834704258607715, 64.20046593138136]);
  const [zoom, setZoom] = useState<number>(7);
  return (
    <div className="locations-tab-layout h-100 w-100">
      <LeafletMapForMarkers markerList={markerList} center={center} zoom={zoom} />
      <div>{children}</div>
    </div>
  );
}

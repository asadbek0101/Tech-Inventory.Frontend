import Map from "../ui/Map";

interface Props {
  readonly area: any[];
  readonly center: any;
}

export default function ObjectMap({ area, center }: Props) {
  return <Map center={center} areas={area} maxZoom={6} />;
}

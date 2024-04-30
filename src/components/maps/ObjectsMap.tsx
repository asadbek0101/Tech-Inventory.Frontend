import Map from "../ui/Map";

interface Props {
  readonly objects: any[];
}

export default function ObjectsMap({ objects }: Props) {
  return <Map areas={objects} />;
}

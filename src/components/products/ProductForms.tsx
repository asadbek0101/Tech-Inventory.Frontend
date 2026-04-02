import AkumalatorsFormWrapper from "./AkumalatorsFormWrapper";
import AvtomatsFormWrapper from "./AvtomatsFormWrapper";
import BoxesFormWrapper from "./BoxesFormWrapper";
import BracketsFormWrapper from "./BracketsFormWrapper";
import CameraFormWrapper from "./CameraFormWrapper";
import ConnectorsFormWrapper from "./ConnectorsFormWrapper";
import CountersFormWrapper from "./CountersFormWrapper";
import ElectrCabelFormWrapper from "./ElectrCabelFormWrapper";
import FreezersFormWrapper from "./FreezersFormWrapper";
import GluesFormWrapper from "./GluesFormWrapper";
import MountingBoxFormWrapper from "./MountingBoxFormWrapper";
import NailsFormWrapper from "./NailsFormWrapper";
import ProjectorFormWrapper from "./ProjectorFormWrapper";
import RibbonsFormWrapper from "./RibbonsFormWrapper";
import ServersFormWrapper from "./ServersFormWrapper";
import SocketFormWrapper from "./SocketFormWrapper";
import StabilizersFormWrapper from "./StabilizersFormWrapper";
import StanchionsFormWrapper from "./StanchionsFormWrapper";
import SvetaforFormWrapper from "./SvetaforFormWrapper";
import TerminalServersFormWrapper from "./TerminalServersFormWrapper";
import UpsFormWrapper from "./UpsFormWrapper";
import UtpCabelFormWrapper from "./UtpCabelFormWrapper";
import VideoRecorderFormWrapper from "./VideoRecorderFormWrapper";
import CameraANPRFormWrapper from "./CameraANPRFormWrapper";
import CameraC327FormWrapper from "./CameraC327FormWrapper";
import CameraC733FormWrapper from "./CameraC733FormWrapper";
import CameraCHQBAFormWrapper from "./CameraCHQBAFormWrapper";
import CameraPTZFormWrapper from "./CameraPTZFormWrapper";
import CameraradarFormWrapper from "./CameraRadarFormWrapper";
import CabelHooksFormWrapper from "./CabelHooksFormWrapper";
import SipHooksFormWrapper from "./SipHooksFormWrapper";
import MiniOpticRackesFormWrapper from "./MiniOpticRackesFormWrapper";
import OdfOpticRackesFormWrapper from "./OdfOpticRackesFormWrapper";
import GofraShellsFormWrapper from "./GofraShellsFormWrapper";
import PlasticShellsFormWrapper from "./PlasticShellsFormWrapper";
import TShelvesFormWrapper from "./TShelvesFormWrapper";
import DShelvesFormWrapper from "./DShelvesFormWrapper";
import MShelvesFormWrapper from "./MShelvesFormWrapper";
import CShelvesFormWrapper from "./CShelvesFormWrapper";
import SvetaforForCameraFormWrapper from "./SvetaforForCameraFormWrapper";
import PoeSwitchesFormWrapper from "./PoeSwitchesFormWrapper";
import ComboSwitchesFormWrapper from "./ComboSwitchesFormWrapper";
import CameraVariofakalFormWrapper from "./CameraVariofakalFormWrapper";

interface Props {
  readonly initialValues: any;
  readonly setInitialValues: (value: any) => void;
}

export default function ProductForms({ initialValues, setInitialValues }: Props) {
  return (
    <>
      <CameraC733FormWrapper
        title="Yuz yoki avtotransport vositasi davlat raqamini aniqlovchi kamera(733)"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <CameraPTZFormWrapper
        title="Aynalma kamera(PTZ)"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <CameraANPRFormWrapper
        title="Davlat raqamini aniqlovchi kamera(ANPR)"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <CameraFormWrapper
        title="Kamera"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <CameraC327FormWrapper
        title="To'xtash va to'xtab turish qoidabuzarligini aniqlovchi kamera(3.27)"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <CameraCHQBAFormWrapper
        title="Chorrahadagi qoidabuzarligini aniqlovchi kamera"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <CameraradarFormWrapper
        title="Avtomabil tezligini aniqlovchi kamera(radar)"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <CameraVariofakalFormWrapper
        title="Variofokal kamera"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <TShelvesFormWrapper
        title="Telekomunikatsion javon"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <PoeSwitchesFormWrapper
        title="Switch Poe"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <UpsFormWrapper
        title="Ups"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <ConnectorsFormWrapper
        title="Konnektor"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <ElectrCabelFormWrapper
        title="Elektr kabel"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <UtpCabelFormWrapper
        title="UTP kabel"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <CabelHooksFormWrapper
        title="Kabel Xomut"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <SipHooksFormWrapper
        title="SIP Xomut"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <GofraShellsFormWrapper
        title="Gofra qobiq"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <PlasticShellsFormWrapper
        title="Plastik qobiq"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <NailsFormWrapper
        title="Burama mix"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <SocketFormWrapper
        title="Rozetka"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <AvtomatsFormWrapper
        title="Avotmat"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <MountingBoxFormWrapper
        title="Montaj qutisi"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <CountersFormWrapper
        title="Elektr energiya hisoblagichi"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <BracketsFormWrapper
        title="Kronshteyn"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <CShelvesFormWrapper
        title="Markaziy telekomunikatsion javon"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <DShelvesFormWrapper
        title="Tarqatish javon"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <MShelvesFormWrapper
        title="Asosiy elektron javon"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <AkumalatorsFormWrapper
        title="Akumalator"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <BoxesFormWrapper
        title="Korob"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <FreezersFormWrapper
        title="Qotirgich"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <GluesFormWrapper
        title="Burama mix uchun yelim pona"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <ProjectorFormWrapper
        title="Projektor"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <MiniOpticRackesFormWrapper
        title="Mini optik boks"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <OdfOpticRackesFormWrapper
        title="ODF optik boks"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <RibbonsFormWrapper
        title="SIP Lenta"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <ServersFormWrapper
        title="Server"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <StabilizersFormWrapper
        title="Stabilizator"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <StanchionsFormWrapper
        title="Ustun"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <SvetaforFormWrapper
        title="Svetafor detektor"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <SvetaforForCameraFormWrapper
        title="Svetafor detektor kamera uchun"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <ComboSwitchesFormWrapper
        title="Switch Kombo"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <TerminalServersFormWrapper
        title="Terminal server"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
      <VideoRecorderFormWrapper
        title="Video registrator"
        initialValues={initialValues}
        setInitialValues={setInitialValues}
      />
    </>
  );
}

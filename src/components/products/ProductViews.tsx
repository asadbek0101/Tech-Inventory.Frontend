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

interface Props {
  readonly initialValues: any;
  readonly setInitialValues: (value: any) => void;
}

export default function ProductViews({ initialValues, setInitialValues }: Props) {
  return (
    <>
      {Boolean(initialValues?.akumalator?.length > 0) && (
        <AkumalatorsFormWrapper
          title="Akumalator"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.avtomat?.length > 0) && (
        <AvtomatsFormWrapper
          title="Avotmat"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.box?.length > 0) && (
        <BoxesFormWrapper
          title="Korob"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.bracket?.length > 0) && (
        <BracketsFormWrapper
          title="Kronshteyn"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.electrCabel?.length > 0) && (
        <ElectrCabelFormWrapper
          title="Elektr kabel"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.utpCabel?.length > 0) && (
        <UtpCabelFormWrapper
          title="UTP kabel"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.camera?.length > 0) && (
        <CameraFormWrapper
          title="Kamera"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.anprCamera?.length > 0) && (
        <CameraANPRFormWrapper
          title="Davlat raqamini aniqlovchi kamera(ANPR)"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.c327Camera?.length > 0) && (
        <CameraC327FormWrapper
          title="To'xtash va to'xtab turish qoidabuzarligini aniqlovchi kamera(3.27)"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.c733Camera?.length > 0) && (
        <CameraC733FormWrapper
          title="Yuz yoki avtotransport vositasi davlat raqamini aniqlovchi kamera(733"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.chqbaCamera?.length > 0) && (
        <CameraCHQBAFormWrapper
          title="Chorrahadagi qoidabuzarligini aniqlovchi kamera"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.ptzCamera?.length > 0) && (
        <CameraPTZFormWrapper
          title="Aynalma kamera(PTZ)"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.speedCheckingCamera?.length > 0) && (
        <CameraradarFormWrapper
          title="Avtomabil tezligini aniqlovchi kamera(radar)"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.connector?.length > 0) && (
        <ConnectorsFormWrapper
          title="Konnektor"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.counter?.length > 0) && (
        <CountersFormWrapper
          title="Elektr energiya hisoblagichi"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.freezer?.length > 0) && (
        <FreezersFormWrapper
          title="Qotirgich"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.glueForNail?.length > 0) && (
        <GluesFormWrapper
          title="Burama mix uchun yelim pona"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.cabelHook?.length > 0) && (
        <CabelHooksFormWrapper
          title="Kabel Xomut"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.sipHook?.length > 0) && (
        <SipHooksFormWrapper
          title="SIP Xomut"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.mountingBox?.length > 0) && (
        <MountingBoxFormWrapper
          title="Montaj qutisi"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.nail?.length > 0) && (
        <NailsFormWrapper
          title="Burama mix"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.projector?.length > 0) && (
        <ProjectorFormWrapper
          title="Projektor"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.miniOptikRack?.length > 0) && (
        <MiniOpticRackesFormWrapper
          title="Mini optik boks"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.odfOpticRack?.length > 0) && (
        <OdfOpticRackesFormWrapper
          title="ODF optik boks"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.ribbon?.length > 0) && (
        <RibbonsFormWrapper
          title="SIP Lenta"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.server?.length > 0) && (
        <ServersFormWrapper
          title="Server"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.gofraShell?.length > 0) && (
        <GofraShellsFormWrapper
          title="Gofra qobiq"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.plasticShell?.length > 0) && (
        <PlasticShellsFormWrapper
          title="Plastik qobiq"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.centralTelecomunicationShelf?.length > 0) && (
        <CShelvesFormWrapper
          title="Markaziy telekomunikatsion javon"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.distributionShelf?.length > 0) && (
        <DShelvesFormWrapper
          title="Tarqatish javon"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.mainTelecomunicationShelf?.length > 0) && (
        <MShelvesFormWrapper
          title="Asosiy elektron javon"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.telecomunicationShelf?.length > 0) && (
        <TShelvesFormWrapper
          title="Telekomunikatsion javon"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.socket?.length > 0) && (
        <SocketFormWrapper
          title="Rozetka"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.stabilizer?.length > 0) && (
        <StabilizersFormWrapper
          title="Stabilizator"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.stanchion?.length > 0) && (
        <StanchionsFormWrapper
          title="Ustun"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.svetaforDetektor?.length > 0) && (
        <SvetaforFormWrapper
          title="Svetafor detektor"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.svetaforDetektorForCamera?.length > 0) && (
        <SvetaforForCameraFormWrapper
          title="Svetafor detektor kamera uchun"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.switchPoe?.length > 0) && (
        <PoeSwitchesFormWrapper
          title="Switch Poe"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.switchKombo?.length > 0) && (
        <ComboSwitchesFormWrapper
          title="Switch Kombo"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.terminalServer?.length > 0) && (
        <TerminalServersFormWrapper
          title="Terminal server"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.ups?.length > 0) && (
        <UpsFormWrapper
          title="Ups"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
      {Boolean(initialValues?.videoRecorder?.length > 0) && (
        <VideoRecorderFormWrapper
          title="Video registrator"
          initialValues={initialValues}
          setInitialValues={setInitialValues}
        />
      )}
    </>
  );
}

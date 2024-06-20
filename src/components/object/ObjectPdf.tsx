import { Document, PDFViewer, Page, StyleSheet } from "@react-pdf/renderer";
import { ObyektReportProps } from "../../api/obyekt/ObyektDto";
import PdfTitle from "../ui/PdfTitle";
import PDFHeader from "../ui/PdfHeader";
import PdfBody from "../ui/PdfBody";
import PdfFiles from "../ui/PdfFiles";

interface Props {
  readonly data: ObyektReportProps;
}

const styles = StyleSheet.create({
  empty_margin: {
    margin: "6px 0",
  },

  container: {
    width: "100%",
    height: "100%",
  },

  page: {
    width: "100%",
    padding: "30px",
  },
});

export default function ObjectPdf({ data }: Props) {
  return (
    <PDFViewer style={styles.container}>
      <Document>
        <Page size="A4" style={styles.page}>
          <PdfTitle title={data.objectClass} type="header" />

          <PDFHeader label="1.Loyiha nomi" value={data.projectName} />
          <PDFHeader label="2.Hudud" value={data.region + " " + data.district} />
          <PDFHeader label="3.Obyekt nomi va manzili" value={data.nameAndAddress} />
          <PDFHeader
            label="4.Obyekt joylashuv nuqtasi"
            value={data.latitude + " - " + data.longitude}
          />
          <PDFHeader label="5.Obyekt tasnifi" value={data.objectClass} />
          <PDFHeader label="6.Ulanish texnologiyasi" value={data.connectionType} />

          <PdfTitle title="7.Aloqa tarmog'i" />

          <PdfBody
            headers={[
              { header: "Modeli", access: "model" },
              { header: "Port raqami", access: "numberOfPort" },
            ]}
            data={data.fttXs}
            title="FTTX switch"
          />

          <PdfBody
            headers={[
              { header: "Modeli", access: "model" },
              { header: "Seriya raqami", access: "serialNumber" },
              { header: "Port raqami", access: "numberOfPort" },
            ]}
            data={data.gpoNs}
            title="GPON modem"
          />

          <PdfBody
            headers={[{ header: "Telefon raqam", access: "phoneNumber" }]}
            data={data.gsMs}
            title="GSM"
          />

          <PdfTitle title="8.Obyektdagi qurilma va jihozlar" />

          <PdfBody
            headers={[
              { header: "Modeli", access: "model" },
              { header: "Seriya raqami", access: "serialNumber" },
              { header: "Ip", access: "ip" },
              { header: "Status", access: "status" },
            ]}
            data={data.cameras}
            title="Kamera"
          />

          <PdfBody
            headers={[
              { header: "Modeli", access: "model" },
              { header: "Seriasi raqami", access: "serialNumber" },
              { header: "Ip", access: "ip" },
              { header: "Status", access: "status" },
            ]}
            data={data.raradCameras}
            title="Avtomabil tezligini aniqlovchi kamera(radar)"
          />

          <PdfBody
            headers={[
              { header: "Modeli", access: "model" },
              { header: "Seriasi", access: "serailNumber" },
              { header: "Ip", access: "ip" },
              { header: "Status", access: "status" },
            ]}
            data={data.anprCameras}
            title="Davlat raqami belgisini aniqlovchi kamera(ANPR)"
          />

          <PdfBody
            headers={[
              { header: "Modeli", access: "model" },
              { header: "Seriasi", access: "serailNumber" },
              { header: "Ip", access: "ip" },
              { header: "Status", access: "status" },
            ]}
            data={data.ptzCameras}
            title="Aylanma kamera(PTZ)"
          />

          <PdfBody
            headers={[
              { header: "Modeli", access: "model" },
              { header: "Seriasi", access: "serailNumber" },
              { header: "Ip", access: "ip" },
              { header: "Status", access: "status" },
            ]}
            data={data.c327Cameras}
            title="To'xtash va to'xtab turish qoidabuzarligini aniqlovchi kamera(3.27)"
          />

          <PdfBody
            headers={[
              { header: "Modeli", access: "model" },
              { header: "Seriasi", access: "serailNumber" },
              { header: "Ip", access: "ip" },
              { header: "Status", access: "status" },
            ]}
            data={data.chqbaCameras}
            title="Chorrahadagi qoidabuzarlikni aniqlovchi kamera"
          />

          <PdfBody
            headers={[
              { header: "Modeli", access: "model" },
              { header: "Seriasi", access: "serailNumber" },
              { header: "Ip", access: "ip" },
              { header: "Status", access: "status" },
            ]}
            data={data.c733Cameras}
            title="Yuz va avtotransport vositasi davlat raqamini aniqlovchi kamera(733)"
          />

          <PdfBody
            headers={[{ header: "Modeli", access: "model" }]}
            data={data.videoRecorders}
            title="Videoregistrator"
          />

          <PdfBody headers={[{ header: "Ip", access: "ip" }]} data={data.servers} title="Server" />

          <PdfBody
            headers={[
              { header: "Modeli", access: "model" },
              { header: "Portlar soni", access: "countOfPorts" },
            ]}
            data={data.switchPoes}
            title="Switch PoE"
          />

          <PdfBody
            headers={[
              { header: "Modeli", access: "model" },
              { header: "Portlar soni", access: "countOfPorts" },
            ]}
            data={data.switchKomboes}
            title="Switch kombo"
          />

          <PdfBody
            headers={[
              { header: "Modeli", access: "model" },
              { header: "Portlar soni", access: "countOfPorts" },
            ]}
            data={data.svetaforDetektors}
            title="Svetafor detektori"
          />

          <PdfBody
            headers={[
              { header: "Modeli", access: "model" },
              { header: "Portlar soni", access: "countOfPorts" },
            ]}
            data={data.svetaforDetektorsForCamera}
            title="Svetafor detektori kamera uchun"
          />

          <PdfBody
            headers={[{ header: "Modeli", access: "model" }]}
            data={data.terminalServers}
            title="Terminal serveri"
          />

          <PdfBody
            headers={[
              { header: "Modeli", access: "model" },
              { header: "Quvvati", access: "power" },
            ]}
            data={data.stabilizers}
            title="Stabilizator"
          />

          <PdfBody
            headers={[
              { header: "Modeli", access: "model" },
              { header: "Soni", access: "count" },
            ]}
            data={data.projectors}
            title="Projektor"
          />

          <PdfBody
            headers={[
              { header: "Quvvati", access: "power" },
              { header: "Soni", access: "count" },
            ]}
            data={data.akumalators}
            title="Akkumulyator"
          />

          <PdfBody
            headers={[
              { header: "Turi", access: "brand" },
              { header: "Seriyasi", access: "serailNumber" },
              { header: "Raqami", access: "number" },
            ]}
            data={data.centralTelecomShelfs}
            title="Markaziy telekommunikatsion javoni"
          />

          <PdfBody
            headers={[
              { header: "Turi", access: "brand" },
              { header: "Seriyasi", access: "serailNumber" },
              { header: "Raqami", access: "number" },
            ]}
            data={data.mainElectryShelfs}
            title="Asosiy elektron javoni"
          />

          <PdfBody
            headers={[
              { header: "Turi", access: "brand" },
              { header: "Seriyasi", access: "serailNumber" },
              { header: "Raqami", access: "number" },
            ]}
            data={data.distributionShelfs}
            title="Tarqatish javoni"
          />

          <PdfBody
            headers={[
              { header: "Turi", access: "brand" },
              { header: "Seriyasi", access: "serialNumber" },
              { header: "Raqami", access: "number" },
            ]}
            data={data.telecomShelfs}
            title="Telekommunikatsion javon"
          />

          <PdfBody
            headers={[
              { header: "Modeli", access: "model" },
              { header: "Quvvati", access: "power" },
            ]}
            data={data.upses}
            title="UPS"
          />

          <PdfBody
            headers={[
              { header: "Modeli", access: "model" },
              { header: "Korxona raqami", access: "numberOfConcern" },
            ]}
            data={data.counters}
            title="Elektr energiya hisoblagichi"
          />

          <PdfBody
            headers={[
              { header: "Modeli", access: "model" },
              { header: "Metri", access: "meter" },
            ]}
            data={data.utpCabels}
            title="UTP kabel"
          />

          <PdfBody
            headers={[
              { header: "Modeli", access: "model" },
              { header: "Metri", access: "meter" },
            ]}
            data={data.elektrCabels}
            title="Elektr kabel"
          />

          <PdfBody
            headers={[
              { header: "Modeli", access: "model" },
              { header: "Soni", access: "count" },
            ]}
            data={data.sockets}
            title="Rozetka"
          />

          <PdfBody
            headers={[
              { header: "Tolalar soni", access: "countOfPoints" },
              { header: "Adapter turi", access: "typeOfAdapter" },
              { header: "Portlar soni", access: "countOfPorts" },
            ]}
            data={data.oDFOpticRacks}
            title="ODF optik boks"
          />

          <PdfBody
            headers={[
              { header: "Tolalar soni", access: "countOfPoints" },
              { header: "Adapter turi", access: "typeOfAdapter" },
              { header: "Portlar soni", access: "countOfPorts" },
            ]}
            data={data.miniOpticRacks}
            title="Mini optik boks"
          />

          <PdfBody
            headers={[
              { header: "Modeli", access: "model" },
              { header: "Soni", access: "count" },
            ]}
            data={data.avtomats}
            title="Avtomat"
          />

          <PdfBody
            headers={[
              { header: "Turi", access: "stanchionType" },
              { header: "Soni", access: "count" },
            ]}
            data={data.stanchions}
            title="Ustun"
          />

          <PdfBody
            headers={[
              { header: "Modeli", access: "model" },
              { header: "Soni", access: "count" },
            ]}
            data={data.brackets}
            title="Kronshteyn"
          />

          <PdfBody
            headers={[{ header: "Soni", access: "count" }]}
            data={data.connectors}
            title="Konnektor"
          />

          <PdfBody
            headers={[{ header: "Uzunligi", access: "meter" }]}
            data={data.gofraShells}
            title="Gofra qobiq"
          />

          <PdfBody
            headers={[
              { header: "Turi", access: "type" },
              { header: "Uzunligi", access: "meter" },
            ]}
            data={data.boxes}
            title="Korob"
          />

          <PdfBody
            headers={[
              { header: "Modeli", access: "model" },
              { header: "Soni", access: "count" },
            ]}
            data={data.mountingBoxes}
            title="Montaj qutisi"
          />

          <PdfBody
            headers={[{ header: "Soni", access: "count" }]}
            data={data.freezers}
            title="Qotirgich"
          />

          <PdfBody
            headers={[{ header: "Uzunligi", access: "meter" }]}
            data={data.ribbons}
            title="SIP lenta"
          />

          <PdfBody
            headers={[{ header: "Soni", access: "count" }]}
            data={data.sipHooks}
            title="SIP xomut"
          />

          <PdfBody
            headers={[{ header: "Og'irligi", access: "weight" }]}
            data={data.nails}
            title="Burama mix"
          />

          <PdfBody
            headers={[{ header: "Soni", access: "count" }]}
            data={data.cabelHooks}
            title="Kabel xomut"
          />

          <PdfBody
            headers={[{ header: "Uzunligi", access: "meter" }]}
            data={data.plasticShells}
            title="Plastik qobiq"
          />

          <PdfTitle title="Loyiha bo'yicha biriktirilgan fayllar" />

          <PdfFiles data={data.attachments} />
        </Page>
      </Document>
    </PDFViewer>
  );
}

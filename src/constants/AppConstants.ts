export const IS_DEV = process.env.NODE_ENV !== "production";

export const API_HOST = "https://localhost:44368/api/" as string;

export const objectProductTypesOptions = [
  {
    label: "Markaziy telekommunikatsion javon",
    value: 1,
  },
  {
    label: "Asosisy elektr javoni",
    value: 2,
  },
  {
    label: "ODF optik boks",
    value: 3,
  },
  {
    label: "Switch kombo",
    value: 4,
  },
  {
    label: "Svetafor detektori",
    value: 5,
  },
  {
    label: "Svetafor detektori kamera uchun",
    value: 6,
  },
  {
    label: "Terminal Serveri",
    value: 7,
  },
  {
    label: "Stabilizator",
    value: 8,
  },
  {
    label: "Akumlator",
    value: 9,
  },
  {
    label: "Tarqatish javoni",
    value: 10,
  },
  {
    label: "Kamera",
    value: 11,
  },
  {
    label: "Projektor",
    value: 12,
  },
  {
    label: "Switch Poe",
    value: 13,
  },
  {
    label: "Mini optik boks",
    value: 14,
  },
  {
    label: "Avtomat",
    value: 15,
  },
  {
    label: "Elektr kabel",
    value: 16,
  },
  {
    label: "UTP kabel",
    value: 17,
  },
  {
    label: "Ustun",
    value: 18,
  },
  {
    label: "Rozetka",
    value: 19,
  },
  {
    label: "UPS",
    value: 20,
  },
  {
    label: "Tezlinki o'lchovchi radar",
    value: 21,
  },
  {
    label: "Telekomunikatsion javon",
    value: 22,
  },
];

export const modelTypesOptions = [
  {
    label: "All",
    value: 1,
  },
  {
    label: "Switch",
    value: 2,
  },
  {
    label: "Svetafor Detektor",
    value: 3,
  },
  {
    label: "Terminal Server",
    value: 4,
  },
  {
    label: "Stabilizator",
    value: 5,
  },
  {
    label: "Kamera",
    value: 6,
  },
  {
    label: "Projektor",
    value: 7,
  },
  {
    label: "Avtomat",
    value: 8,
  },
  {
    label: "Kabel",
    value: 9,
  },
  {
    label: "Ustun",
    value: 10,
  },
  {
    label: "Rozetka",
    value: 11,
  },
  {
    label: "Tezlikni o'lchovchi radar",
    value: 12,
  },
  {
    label: "Ups",
    value: 13,
  },
  {
    label: "FTTX",
    value: 14,
  },
  {
    label: "GPON",
    value: 15,
  },
];

export const connectionTypes = [
  {
    label: "FTTX",
    value: 1,
  },
  {
    label: "GPON",
    value: 2,
  },
  {
    label: "GSM",
    value: 3,
  },
];

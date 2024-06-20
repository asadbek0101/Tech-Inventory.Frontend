import { StyleSheet, Text, View } from "@react-pdf/renderer";

interface Props {
  readonly data: any[];
}

const styles = StyleSheet.create({
  pdf_files_container: {
    width: "100%",
    marginTop: "10px",
    display: "flex",
    flexDirection: "row",
    gap: "4px",
  },

  pdf_files_box: {
    border: "1px solid grey",
    padding: "10px 30px",
  },

  pdf_files_title: {
    fontSize: "11px",
  },
});

export default function PdfFiles({ data = [] }: Props) {
  return (
    <View style={styles.pdf_files_container}>
      {data &&
        data.map((p: any) => {
          return (
            <View style={styles.pdf_files_box}>
              <Text style={styles.pdf_files_title}>{p?.originalFileName}</Text>
            </View>
          );
        })}
    </View>
  );
}

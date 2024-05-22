import { StyleSheet, Text, View } from "@react-pdf/renderer";

interface Props{
    readonly label: string;
    readonly value: string;
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        borderBottom: "1px solid gray",
        padding: "6px 2px 2px 2px",
        marginTop: "4px"
    },

    labels: {
        width: "30%"
    },

    labels_text: {
        fontSize: "11px"
    },

    values: {
        width: "70%"
    },

    values_text: {
        fontSize: "11px"
    },

});

export default function PDFHeader({label, value}:Props){
    return (
        <View style={styles.row}>
            <View style={styles.labels}>
                <Text style={styles.labels_text}>
                    {label}
                </Text>
            </View>
            <View style={styles.values}>
                <Text  style={styles.values_text}>
                    {value}
                </Text>
            </View>
        </View>
    )
}
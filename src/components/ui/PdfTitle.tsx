import { StyleSheet, Text, View } from "@react-pdf/renderer";

interface Props{
    readonly title: string;
    readonly type?: "header" | "";
}

const styles = StyleSheet.create({
    header_title: {
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#272847",
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
    },

    header_title_text: {
        textAlign: "center",
        color: "white",
        padding: "4px 0",
        fontSize: "14px"
    },

    body_title: {
        marginTop: "10px",
        padding: "0 2px"
    },

    body_title_text: {
        fontSize: "12px"
    }
})

export default function PdfTitle({title, type = ""}:Props){

    if(type === "header"){
        return (
            <View style={styles.header_title}>
                <Text style={styles.header_title_text}>
                    {title}
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.body_title}>
            <Text style={styles.body_title_text}>
                {title}
            </Text>
        </View>
    )
}
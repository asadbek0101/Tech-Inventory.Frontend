import { StyleSheet, Text, View } from "@react-pdf/renderer";

interface HeaderProps{
    readonly header: string;
    readonly access: string;
}

interface Props{
    readonly headers: HeaderProps[];
    readonly title: string;
    readonly data: any[];
}

const styles = StyleSheet.create({
    pdf_body: {
        width: "100%",
        paddingLeft: "10px",
    },

    pdf_body_header: {
        width: "100%",
        flexDirection: "row",
        borderBottom: "1px solid gray",
        marginTop: "10px",
        paddingBottom: "2px"
    },

    pdf_body_title_view: {
        width: "30%"
    },

    pdf_body_title: {
        fontSize: "10px"
    },

    pdf_body_header_titles: {
        width: "70%",
        flexDirection: "row",
        gap: "2px"
    },

    pdf_body_header_text: {
        fontSize: "10px",
        fontWeight: "bold",
        backgroundColor: "#E5E4E2",
        padding: "2px",
        borderRadius: "2px",
    }
});


export default function PdfBody({headers, data = [], title}:Props){

    if(data.length == 0){
        return null;
    }

    return (
        <View style={styles.pdf_body}>
            <View style={styles.pdf_body_header}>
                <View style={styles.pdf_body_title_view}>
                    <Text style={styles.pdf_body_title}>
                        {title}
                    </Text>
                </View>
                <View style={styles.pdf_body_header_titles}>
                    {headers && headers.map((header, index: any)=>{
                        return (
                            <View style={{
                                width: `25%`,
                                textAlign: "center",
                            }}>
                                <Text style={styles.pdf_body_header_text}>
                                    {header.header}
                                </Text>
                            </View>
                        )
                    })}
                </View>
            </View>
            <View style={{
                flexDirection: "row",
                width: "100%"
            }}>
                <View style={{
                    width: "30%"
                }}/>
                <View style={{
                    width: "70%"
                }}>
                {data && data.map((item: any, index)=>{
                    return (
                        <View style={{
                            width: "100%",
                            flexDirection: "row",
                            padding: "10px 0 4px 0",
                            borderBottom: "1px solid gray"
                        }}>
                           {
                            headers && headers.map((header: any)=>{
                                return (
                                    <View style={{
                                        width: `25%`,
                                        textAlign: "center",
                                    }}>
                                        <Text style={{
                                            fontSize: "10px",
                                           
                                        }}>{`${item[header.access]}`}</Text>
                                    </View>
                                )
                            })
                           }
                        </View>
                    )
                })}
                </View>
            </View>
        </View>
    )
}
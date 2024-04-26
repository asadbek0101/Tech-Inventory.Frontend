import AppBox from "../app/AppBox";
import { GroupBox } from "./GroupBox";

interface Props{
    readonly data: any;
}

export default function QuestionCountForm({
    data
}:Props){
    return (
        <AppBox
            className="p-3"
            style={{
                maxHeight: "70vh",
                overflow: "hidden",
                overflowY: "auto"                
            }}
            >
            <GroupBox>
               <div className="d-flex flex-wrap">
                {data.questions && data.questions.map((c: any, index: number)=>{
                        return (
                             <div
                                key={index}
                                style={{
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    // border: "2px solid #3E8CBB",
                                    border: `1px solid ${c.answers.length > 0? "#333d41" : "rgb(202, 202, 202)" } `,
                                    backgroundColor: c.answers.length > 0? "#333d41" : "",
                                    color: c.answers.length > 0? "#fff" : "",
                                    margin: "4px",
                                    cursor: "pointer"
                                }}                            
                                >
                                {index + 1}
                            </div>
                        )
                    })}
               </div>
            </GroupBox>
        </AppBox>
    )
}
import { Bar } from "react-chartjs-2";

interface Props{
    readonly chartData: any;
}

export default function BarChart({chartData}:Props){
    return (
        <Bar
            data={chartData}
            options={{
            plugins: {
                title: {
                display: true,
                text: "Users Gained between 2016-2020"
                },
                legend: {
                display: false
                }
            }
            }}
      />
    )
}
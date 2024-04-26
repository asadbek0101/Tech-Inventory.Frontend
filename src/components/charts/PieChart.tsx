import React from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

interface Props{
    readonly chartData: any;
}

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function PieChart() {
        return (
            <Pie
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  datalabels: {
                    formatter: (value: any, ctx: any) => {
                      let sum = 0;
                      let dataArr = ctx.chart.data.datasets[0].data;
                      dataArr.map((data: any) => {
                        sum += data;
                      });
                      let percentage = ((value * 100) / sum).toFixed(2) + "%";
                      return percentage;
                    },
                    color: "#FFF",
                  },
                },
                onHover: function (e: any) {
                  e.native.target.style.cursor = "pointer";
                },
                rotation: 270,
                events: ["click"],
                onClick: function (event, element) {
                  console.log(element[0].index);
                },
              }}
              data={{
                labels: ["Above 22%", "Below 33%", "Above 55%", "Below 33%"],
                datasets: [
                  {
                    data: [22, 33, 55, 33],
                    backgroundColor: ["#3A925D", "#FD7E14", "#rdf", "#ddf"],
                    borderWidth: 0,
                  },
                ],
              }}
            />
        );
      }
      
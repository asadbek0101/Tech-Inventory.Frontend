import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { useCallback, useEffect, useRef, useState } from "react";

import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

interface Props {
  readonly labels: string[];
  readonly values: number[];
  readonly title: string;
  readonly labelType?: "inline" | "block";

  readonly onClickBar: (value: any) => void;
}

export default function BarChart({
  labels = [],
  values = [],
  title,
  labelType = "block",
  onClickBar,
}: Props) {
  const [totalCount, setTotalCount] = useState(0);

  const chartRef = useRef<any>(null);

  const data: any = {
    labels: labelType === "block" ? labels.map((label) => label.split(" ")) : labels,
    datasets: [
      {
        label: "",
        data: values,
        backgroundColor: [
          "#3C73C5",
          "#3FC195",
          "#298B69",
          "#4FB06D",
          "#43A5BE",
          "#699422",
          "#71A024",
          "#339B59",
          "#28A074",
          "#209889",
          "#1999AD",
          "#308695",
          "#5BA8A0",
          "#329D9C",
        ],
        borderWidth: 0,
        borderRadius: 10,
        barPercentage: 0.8,
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: "end",
        align: "start",
        font: {
          weight: "bold",
          size: 16,
        },
        offset: -22,
        formatter: (value: number) => {
          if (value === 0) {
            return "";
          }
          return value;
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          stepSize: values?.length > 0 && values?.some((x) => x > 100) ? 20 : 10,
          padding: 20,
        },
        grid: {
          color: "rgba(200, 201, 204, 0.2)",
        },
      },
    },
  };

  useEffect(() => {
    if (values.length > 0) {
      const total = values.reduce((acc, curr) => acc + curr, 0);
      setTotalCount(total);
    }
  }, [values]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const chart = chartRef.current;
      if (!chart) return;

      const elements = chart.getElementsAtEventForMode(
        event.nativeEvent,
        "nearest",
        { intersect: true },
        true,
      );

      if (elements.length) {
        const index = elements[0].index;
        const clickedLabel = labels[index];
        const clickedValue = values[index];

        onClickBar({ label: clickedLabel, value: clickedValue });
      }
    },
    [labels, values, onClickBar],
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFF",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <div className="w-100 d-flex justify-content-between">
        <h5
          style={{
            fontSize: "16px",
            color: "#798791",
          }}
        >
          {title}
        </h5>
        <h5
          style={{
            fontSize: "16px",
            color: "#798791",
          }}
        >
          Umumiy soni: {totalCount}
        </h5>
      </div>

      <div
        style={{
          width: "100%",
          height: "92%",
          marginTop: 20,
        }}
      >
        <Bar ref={chartRef} options={options} data={data} onClick={handleClick} />
      </div>
    </div>
  );
}

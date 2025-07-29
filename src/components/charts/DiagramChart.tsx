import "./assets/donut-chart.scss";

import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useCallback, useEffect, useRef, useState } from "react";

import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

interface Props {
  readonly labels?: string[];
  readonly values?: number[];
  readonly ids?: number[];
  readonly title?: string;

  readonly onClickPart: (value: any) => void;
  readonly onClickTitle?: () => void;
}

const chartImage = new Image();

export default function DiagramChart({
  labels = [],
  values = [],
  ids = [],
  title,
  onClickPart,
  onClickTitle,
}: Props) {
  const [totalCount, setTotalCount] = useState(0);

  const chartRef = useRef<any>(null);

  const data = {
    labels: labels,
    datasets: [
      {
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
      },
    ],
  };

  const colors = [
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
  ];

  const options: any = {
    responsive: true,
    cutout: "60%",
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        align: "center",
        display: false,
      },
      datalabels: {
        color: "#d8d8d8",
        font: {
          size: 14,
        },
        formatter: (value: number, context: any) => {
          const sum = context.chart.data.datasets[0].data.reduce((a: any, b: any) => a + b, 0);
          const percentage = ((value / sum) * 100).toFixed(1) + "%";
          return percentage;
        },
      },
      centerImage: {},
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
        const clickedId = ids?.[index];

        onClickPart({ id: clickedId });
      }
    },
    [labels, values, ids, onClickPart],
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        borderRadius: "10px",
        padding: "20px",
      }}
    >
      <div className="w-100 d-flex justify-content-between">
        <h5
          style={{
            fontSize: "16px",
            color: "#798791",
            cursor: "pointer",
          }}
          onClick={() => onClickTitle && onClickTitle()}
        >
          {title}
        </h5>
        <h5
          style={{
            fontSize: "16px",
            color: "#798791",
          }}
        >
          Umumiy: {totalCount} ta
        </h5>
      </div>

      <div
        style={{
          width: "100%",
          height: "60%",
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        {Boolean(values.some((val) => val > 0)) && (
          <Doughnut
            ref={chartRef}
            data={data}
            options={options}
            onClick={handleClick}
            plugins={[
              {
                id: "centerImagePlugin",
                beforeDraw: (chart: any) => {
                  const { width, height, ctx } = chart;
                  const imageSize = 140;
                  const x = (width - imageSize) / 2;
                  const y = (height - imageSize) / 2;

                  const pixelRatio = window.devicePixelRatio || 1;

                  ctx.save();
                  ctx.scale(1 / pixelRatio, 1 / pixelRatio);
                  ctx.clearRect(0, 0, width * pixelRatio, height * pixelRatio);

                  if (chartImage.complete) {
                    ctx.drawImage(
                      chartImage,
                      x * pixelRatio,
                      y * pixelRatio,
                      imageSize * pixelRatio,
                      imageSize * pixelRatio,
                    );
                  } else {
                    chartImage.onload = function () {
                      chart.draw();
                    };
                  }

                  ctx.restore();
                },
              },
            ]}
          />
        )}
      </div>

      {Boolean(labels.length > 0) && (
        <div className="bottom-labels d-flex gap-5 flex-wrap justify-content-center">
          {labels.map((label: any, index: number) => (
            <div key={index} className="bottom-labels-label d-flex align-items-center gap-2 ">
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50px",
                  backgroundColor: colors[index],
                }}
              />
              <span style={{ fontWeight: "400" }}>{label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

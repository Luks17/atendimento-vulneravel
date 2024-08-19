"use client";

import LineChart from "@/app/(components)/dashboard/Charts/LineChart";
import PizzaChart from "@/app/(components)/dashboard/Charts/PizzaChart";
import type { ChartProps } from "@/lib/ui/charts/Chart";
import {
  ArcElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";

Chart.defaults.responsive = true;
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  ArcElement,
  Tooltip
);

type Expected = { chartDesc: string; chartType: "line" | "pizza" } & ChartProps;

interface Props {
  content: Expected[];
}

function Totalizers({ dataJSON }: { dataJSON: string }) {
  const data: Props = JSON.parse(dataJSON);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-full">
      {data.content.map((item, i) => (
        <div
          key={i}
          className="p-10 col-span-1 h-full md:h-[49%] rounded-box bg-base-100 flex flex-col items-center"
        >
          <h2 className="text-accent font-bold mb-5">{item.chartDesc}</h2>
          {
            {
              line: <LineChart {...(item as ChartProps)} />,
              pizza: <PizzaChart {...(item as ChartProps)} />,
            }[item.chartType]
          }
        </div>
      ))}
    </div>
  );
}

export default Totalizers;

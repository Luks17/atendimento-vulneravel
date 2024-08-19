"use client";

import type { LineChartProps } from "@/lib/ui/charts/LineChart";
import {
  extractThemeColorsFromDOM,
  type ThemeColors,
} from "@/lib/ui/colors/extract";
import {
  CategoryScale,
  Chart,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement);

function LineChart({ items }: LineChartProps) {
  const [themeColors, setThemeColors] = useState<ThemeColors | null>(null);

  useEffect(() => {
    const themes = extractThemeColorsFromDOM();
    setThemeColors(themes);
  }, []);

  return (
    <Line
      data={{
        labels: items.map((item) => item.label),
        datasets: [
          {
            label: "Usuários",
            data: items.map((item) => item.value),
            backgroundColor: themeColors?.primary,
            borderColor: themeColors?.primary,
          },
        ],
      }}
    />
  );
}

export default LineChart;

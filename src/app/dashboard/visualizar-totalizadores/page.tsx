import LineChart from "@/app/(components)/dashboard/Charts/LineChart";
import { getLastMonthsUsersCount } from "@/app/actions/TotalizadoresActions";
import type { LineChartProps } from "@/lib/ui/charts/LineChart";

async function Page() {
  const { success, data } = await getLastMonthsUsersCount();

  if (success)
    return (
      // remove h-full if multiple charts
      <div className="flex w-full h-full flex-wrap gap-2">
        {/* remove h-full and w-[49%] if multiple charts */}
        <div className="p-10 h-full w-full rounded-box bg-base-100">
          <h2 className="text-accent font-bold mb-5">
            Usuários registrados nos últimos meses
          </h2>
          <LineChart {...(data as LineChartProps)} />
        </div>
      </div>
    );
}

export default Page;

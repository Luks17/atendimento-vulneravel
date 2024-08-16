import { getLastMonthsUsersCount } from "@/app/actions/TotalizadoresActions";

async function Page() {
  const { data } = await getLastMonthsUsersCount();

  return <div className="h-96"></div>;
}

export default Page;

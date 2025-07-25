import React from "react";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import { HomePage } from "./index";
import { fetchTinaData } from "@/services/tina/fetch-tina-data";

export const revalidate = 300;

export default async function Home() {
  const data = await fetchTinaData(client.queries.page, "home");

  return (
    <Layout rawPageData={data}>
      <HomePage {...data} />
    </Layout>
  );
}

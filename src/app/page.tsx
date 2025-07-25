import React from "react";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import { HomePage } from "./index";
import { fetchTinaData } from "@/services/tina/fetch-tina-data";
import { getSeo } from "../utils/metadata/get-seo";
import settings from "@/content/seo/config.json";

export const revalidate = 300;

const siteUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : settings.siteUrl;

export async function generateMetadata() {
  const data = await fetchTinaData(client.queries.page, "home");

  data.data.page.seo = {
    __typename: "PageSeo",
    canonicalUrl: `${siteUrl}/`,
  };

  if (!data.data.page.seo?.canonicalUrl) {
    data.data.page.seo.canonicalUrl = `${siteUrl}/`;
  }

  return getSeo(data.data.page.seo as any, {
    pageTitle: data.data.page.title as string,
    body: data.data.page.blocks as any,
  });
}

export default async function Home() {
  const data = await fetchTinaData(client.queries.page, "home");

  return (
    <Layout rawPageData={data}>
      <HomePage {...data} />
    </Layout>
  );
}

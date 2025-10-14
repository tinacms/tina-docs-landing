import { Footer } from "@/components/layout/nav/footer";
import client from "@/tina/__generated__/client";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { tinaField } from "tinacms/dist/react";
import { LayoutProvider } from "../components/layout/layout-context";
import { Header } from "../components/layout/nav/header";

interface NotFoundProps {
  title?: string;
  description?: string;
  rawPageData?: any;
}

export function Illustration(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 362 145" {...props}>
      <path
        fill="currentColor"
        d="M62.6 142c-2.133 0-3.2-1.067-3.2-3.2V118h-56c-2 0-3-1-3-3V92.8c0-1.333.4-2.733 1.2-4.2L58.2 4c.8-1.333 2.067-2 3.8-2h28c2 0 3 1 3 3v85.4h11.2c.933 0 1.733.333 2.4 1 .667.533 1 1.267 1 2.2v21.2c0 .933-.333 1.733-1 2.4-.667.533-1.467.8-2.4.8H93v20.8c0 2.133-1.067 3.2-3.2 3.2H62.6zM33 90.4h26.4V51.2L33 90.4zM181.67 144.6c-7.333 0-14.333-1.333-21-4-6.666-2.667-12.866-6.733-18.6-12.2-5.733-5.467-10.266-13-13.6-22.6-3.333-9.6-5-20.667-5-33.2 0-12.533 1.667-23.6 5-33.2 3.334-9.6 7.867-17.133 13.6-22.6 5.734-5.467 11.934-9.533 18.6-12.2 6.667-2.8 13.667-4.2 21-4.2 7.467 0 14.534 1.4 21.2 4.2 6.667 2.667 12.8 6.733 18.4 12.2 5.734 5.467 10.267 13 13.6 22.6 3.334 9.6 5 20.667 5 33.2 0 12.533-1.666 23.6-5 33.2-3.333 9.6-7.866 17.133-13.6 22.6-5.6 5.467-11.733 9.533-18.4 12.2-6.666 2.667-13.733 4-21.2 4zm0-31c9.067 0 15.6-3.733 19.6-11.2 4.134-7.6 6.2-17.533 6.2-29.8s-2.066-22.2-6.2-29.8c-4.133-7.6-10.666-11.4-19.6-11.4-8.933 0-15.466 3.8-19.6 11.4-4 7.6-6 17.533-6 29.8s2 22.2 6 29.8c4.134 7.467 10.667 11.2 19.6 11.2zM316.116 142c-2.134 0-3.2-1.067-3.2-3.2V118h-56c-2 0-3-1-3-3V92.8c0-1.333.4-2.733 1.2-4.2l56.6-84.6c.8-1.333 2.066-2 3.8-2h28c2 0 3 1 3 3v85.4h11.2c.933 0 1.733.333 2.4 1 .666.533 1 1.267 1 2.2v21.2c0 .933-.334 1.733-1 2.4-.667.533-1.467.8-2.4.8h-11.2v20.8c0 2.133-1.067 3.2-3.2 3.2h-27.2zm-29.6-51.6h26.4V51.2l-26.4 39.2z"
      />
    </svg>
  );
}

type LayoutProps = PropsWithChildren & {
  rawPageData?: any;
};

export default async function NotFound({
  title = "Oops, this llama took a wrong turn.",
  description = "404 - The page you’re looking for has gone on a spontaneous llama trek.",
  rawPageData,
}: NotFoundProps) {
  const { data: globalData } = await client.queries.global(
    {
      relativePath: "index.json",
    },
    {
      fetchOptions: {
        next: {
          revalidate: 3600,
        },
      },
    }
  );
  return (
    <LayoutProvider globalSettings={globalData.global} pageData={rawPageData}>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-24 items-stretch max-w-7xl mx-auto px-10">
        <div className="flex flex-col justify-center">
          <div className="mb-7">
            <h1 className="font-ibm-plex text-6xl leading-tight">{title}</h1>
            <hr
              className={`block border-none bg-[url('${
                process.env.NEXT_PUBLIC_BASE_PATH || ""
              }/svg/hr.svg')] bg-no-repeat bg-[length:auto_100%] h-[7px] w-full my-8`}
            />
            <p className="text-lg lg:text-xl lg:leading-normal block -mb-1">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/tinadocs/docs"
              className="inline-flex items-center text-[#FF9B73] hover:text-[#d28161] font-medium transition-colors group"
            >
              Documentation
              <ChevronRightIcon className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="https://tina.io/docs/beginner-tutorials/tutorial-overview"
              className="inline-flex items-center text-[#FF9B73] hover:text-[#d28161] font-medium transition-colors group"
            >
              Guides
              <ChevronRightIcon className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/tinadocs"
              className="inline-flex items-center text-[#FF9B73] hover:text-[#d28161] font-medium transition-colors group"
            >
              Home
              <ChevronRightIcon className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
        <div className="max-w-[65vw] mx-auto md:max-w-none">
          <div className="relative rounded-3xl overflow-hidden">
            <Image
              src={`${
                process.env.NEXT_PUBLIC_BASE_PATH || ""
              }/img/tina-404-not-found.webp`}
              alt="404 not found"
              width={500}
              height={450}
            />
          </div>
        </div>
      </div>
      <Footer />
    </LayoutProvider>
  );
}

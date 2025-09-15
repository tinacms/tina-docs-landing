"use client";
import React from "react";
import Link from "next/link";
import { Icon } from "../../icon";
import { useLayout } from "../layout-context";
import { Section } from "../section";
import Image from "next/image";
import { Button } from "../../ui/button";

const FooterList = ({
  title,
  links,
}: {
  title: string;
  links?: { label?: string | null; url?: string | null }[];
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-bold">{title}</h3>
      <div className="flex flex-col gap-4 text-base text-muted-foreground">
        {links?.map((link) => (
          <Link href={link?.url || ""} key={link?.label || ""} className="hover:text-accent-foreground duration-150 transition-colors">
            {link?.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export const Footer = () => {
  const { globalSettings } = useLayout();
  const { header, footer } = globalSettings!;

  

  return (
    <footer>
      <div className="border-y-[0.5px] border-sand-6 py-16 my-4">
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-6 max-w-7xl mx-auto  px-10">
          <div className="flex flex-col gap-4">
            <Image
              src={footer?.lhs?.logo || ""}
              alt="logo"
              width={150}
              height={150}
            />
            <p className="text-sm text-muted-foreground">
              {footer?.lhs?.subtext}
            </p>
            {footer?.lhs?.button?.label && footer?.lhs?.button?.url && <Button variant="outline" size="lg" className="w-fit">
              <a href={footer?.lhs?.button?.url || ""} className="hover:text-accent-foreground duration-150 transition-colors">
                {footer?.lhs?.button?.label}
              </a>
            </Button>}
          </div>
          {footer?.itemList?.map((item, index) => (
            <FooterList
              key={index}
              title={item?.title || ""}
              links={
                item?.links
                  ?.filter((link) => link !== null)
                  .map((link) => ({
                    label: link.label,
                    url: link.url,
                  })) || []
              }
            />
          ))}
        </div>
      </div>
      <div className="flex justify-center text-center items-center py-10">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {footer?.reservedText}
        </p>
      </div>
    </footer>
  );
};

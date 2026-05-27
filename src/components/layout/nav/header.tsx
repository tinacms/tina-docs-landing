"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLayout } from "../layout-context";
import { Menu, X } from "lucide-react";
import { Button } from "../../ui/button";
import { ModalButton } from "../../ui/modalButton";
import { DropdownButton } from "../../ui/dropdownButton";
import { GitHubButton } from "../../ui/githubButton";
import { SearchBar } from "../../ui/searchBar";
import { DoubleItemDropDownButton } from "../../ui/doubleItemDropDownButton";

const NavigationObjectRenderer = ({ navObject }: { navObject: any }) => {
  const template = navObject.__typename;
  const pathname = usePathname();

  switch (template) {
    case "GlobalHeaderNavObjectsDemoModal":
      return (
        <ModalButton
          variant={navObject.variant || "default"}
          size="default"
          modal="book-demo"
        >
          {navObject.label}
        </ModalButton>
      );

    case "GlobalHeaderNavObjectsNavLink": {
      const href = navObject.href || "#";
      const isExternal = href.startsWith("http");
      const isLinkActive = !isExternal && (pathname === href || (href !== "/" && pathname.startsWith(href + "/")));
      return (
        <Link
          href={href}
          className={`block duration-150 rounded-lg px-2.5 py-1 transition-colors ${isLinkActive ? "bg-accent text-accent-foreground" : "text-neutral-text hover:bg-accent/50 hover:text-accent-foreground"}`}
        >
          <span>{navObject.label}</span>
        </Link>
      );
    }

    case "GlobalHeaderNavObjectsNavDropdown":
      return <DropdownButton label={navObject.label} links={navObject.links} />;

    case "GlobalHeaderNavObjectsSearchBar":
      return (
        <div className="hidden lg:block">
          <SearchBar placeholder={navObject.label} />
        </div>
      );

    case "GlobalHeaderNavObjectsGithubButton":
      return (
        <div className="hidden lg:block">
          <GitHubButton />
        </div>
      );

    case "GlobalHeaderNavObjectsCtaButton":
      return (
        <>
          <div className="hidden lg:block">
            <Button variant={navObject.variant || "default"} size="sm" asChild>
              <Link href={navObject.url || "#"}>
                {navObject.label || "Get Started"}
              </Link>
            </Button>
          </div>
          <div className="block lg:hidden font-semibold">
            <Link href={navObject.url || "#"}>
              {navObject.label || "Get Started"}
            </Link>
          </div>
        </>
      );
    case "GlobalHeaderNavObjectsDoubleNavItemDropDown":
      return <DoubleItemDropDownButton navObject={navObject} />;

    default:
      return <span className="text-red-500">Unknown template: {template}</span>;
  }
};

export const Header = () => {
  const { globalSettings, theme } = useLayout();
  const header = globalSettings!.header!;
  const doNavObjectsIncludeSearchBar = header.navObjects!.some(
    (navObject: any) =>
      navObject.__typename === "GlobalHeaderNavObjectsSearchBar"
  );

  const navObjects = header.navObjects!;

  const [menuState, setMenuState] = React.useState(false);
  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="bg-background/50 sticky top-0 z-20 w-full border-b backdrop-blur-3xl"
      >
        <div className="mx-auto max-w-7xl px-6 transition-all duration-300">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full items-center gap-4 lg:gap-8 xl:justify-between">
              <Link
                href="https://tina.io/"
                aria-label="home"
                className="flex items-center flex-shrink-0"
              >
                <Image
                  src={header.logo!}
                  width={100}
                  height={100}
                  alt={"Logo"}
                  className="w-auto h-8 lg:h-10"
                />
              </Link>

              <div className="flex items-center gap-2 lg:hidden ml-auto">
                <div className="block lg:hidden">
                  {doNavObjectsIncludeSearchBar && (
                    <SearchBar placeholder={"Search"} />
                  )}
                </div>
                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                  className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                >
                  <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                  <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                </button>
              </div>

              <div className="hidden lg:block ml-auto">
                <ul className="flex gap-4 lg:gap-5 text-sm items-center">
                  {navObjects.map((navObject: any, index: number) => (
                    <li key={index}>
                      <NavigationObjectRenderer navObject={navObject} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl py-6 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {navObjects.map((navObject: any, index: number) => (
                    <li key={index}>
                      <NavigationObjectRenderer navObject={navObject} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLayout } from "../layout-context";
import { Menu, X } from "lucide-react";
import { Button } from "../../ui/button";
import { ModalButton } from "../../ui/modalButton";
import { DropdownButton } from "../../ui/dropdownButton";
import { GitHubButton } from "../../ui/githubButton";
import { SearchBar } from "../../ui/searchBar";
import { DoubleItemDropDownButton } from "../../ui/doubleItemDropDownButton";

const NavigationObjectRenderer = ({
  navObject,
  isMobile = false,
}: {
  navObject: any;
  isMobile?: boolean;
}) => {
  const template = navObject.__typename;

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

    case "GlobalHeaderNavObjectsNavLink":
      return (
        <Link
          href={navObject.href || "#"}
          className="text-blue-700 hover:text-blue-500 transition ease-out duration-150"
        >
          <span>{navObject.label}</span>
        </Link>
      );

    case "GlobalHeaderNavObjectsNavDropdown":
      return <DropdownButton label={navObject.label} links={navObject.links} />;

    case "GlobalHeaderNavObjectsSearchBar":
      return !isMobile ? (
        <div>
          <SearchBar placeholder={navObject.label} />
        </div>
      ) : null;

    case "GlobalHeaderNavObjectsGithubButton":
      return !isMobile ? (
        <div>
          <GitHubButton />
        </div>
      ) : (
        <GitHubButton />
      );

    case "GlobalHeaderNavObjectsCtaButton":
      return (
        <Button
          variant={navObject.variant || "default"}
          size="sm"
          className="bg-blue-600 hover:bg-blue-700 text-white transition ease-out duration-150"
          asChild
        >
          <Link href={navObject.url || "#"}>
            {navObject.label || "Get Started"}
          </Link>
        </Button>
      );
    case "GlobalHeaderNavObjectsDoubleNavItemDropDown":
      return <DoubleItemDropDownButton navObject={navObject} />;

    default:
      return <span className="text-red-500">Unknown template: {template}</span>;
  }
};

const DesktopNav = ({
  navObjects,
  header,
  stuck,
}: {
  navObjects: any[];
  header: any;
  stuck: boolean;
}) => {
  return (
    <div className="relative w-full">
      <div
        className={`absolute ${
          stuck
            ? "xl:fixed shadow-sm bg-background/50 backdrop-blur-sm animate-slide-in top-0 p-4"
            : "translate-y-2 px-4 pt-4 pb-6"
        } z-40 w-full lg:px-10 hidden xl:flex items-center justify-between transition-all duration-300`}
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
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
              className="w-auto h-8 lg:h-10 fill-orange-500"
            />
          </Link>

          <ul className="flex gap-4 items-center justify-center">
            {navObjects.map((navObject: any, index: number) => (
              <li
                key={index}
                className="flex items-center py-2 px-3 text-white hover:text-accent-foreground transition ease-out duration-150 drop-shadow-sm text-base font-medium"
              >
                <NavigationObjectRenderer navObject={navObject} />
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <Button variant="default" size="lg" asChild>
              <Link href="https://app.tina.io">My TinaCloud</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MobileNav = ({
  navObjects,
  header,
  menuState,
  toggleMenu,
}: {
  navObjects: any[];
  header: any;
  menuState: boolean;
  toggleMenu: () => void;
}) => {
  return (
    <>
      <div className="flex lg:hidden w-full py-4 pl-4 pr-18 items-center justify-between gap-6">
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
            className="w-auto h-8 fill-orange-500"
          />
        </Link>

        <div className="flex space-x-2 gap-2">
          <Button variant="default" size="sm" asChild>
            <Link href="https://app.tina.io">My TinaCloud</Link>
          </Button>
        </div>
      </div>

      {/* Mobile Slide-out Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[300px] bg-gradient-to-t from-blue-50 to-white shadow-2xl z-50 transition ease-out duration-200 ${
          menuState ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <button
          type="button"
          className="absolute top-20 left-0 -translate-x-full transition duration-150 ease-out rounded-l-full flex items-center font-medium whitespace-nowrap leading-tight hover:shadow active:shadow-none text-orange-500 hover:text-orange-400 border border-gray-100/60 bg-gradient-to-br from-white to-gray-50 pr-3 pl-4 pt-[8px] pb-[6px] text-sm cursor-pointer"
          onClick={toggleMenu}
        >
          <Menu
            className={`h-6 w-auto transition ease-out duration-200 ${
              menuState ? "opacity-0" : "opacity-100"
            }`}
          />
          <X
            className={`absolute h-6 w-auto transition ease-out duration-150 ${
              menuState ? "opacity-100" : "opacity-0"
            }`}
          />
        </button>

        <div className="h-full w-full absolute overflow-y-auto">
          <div className="flex py-4 px-6 relative z-20 justify-between items-center">
            <div className="pb-4 pt-2">
              <Link href="https://tina.io/">
                <Image
                  src={header.logo!}
                  width={100}
                  height={100}
                  alt={"Logo"}
                  className="w-auto h-8 fill-orange-500"
                />
              </Link>
            </div>
          </div>

          <Button
            variant="default"
            size="sm"
            className="mx-6 justify-center w-auto"
            asChild
          >
            <Link href="https://app.tina.io">My TinaCloud</Link>
          </Button>

          <ul className="flex flex-col py-4 px-6 relative z-20 space-y-6 text-base">
            {navObjects.map((navObject: any, index: number) => (
              <li
                key={index}
                className="flex items-center py-2 text-blue-700 hover:text-blue-500 transition ease-out duration-150 drop-shadow-sm text-lg font-medium"
              >
                <NavigationObjectRenderer
                  navObject={navObject}
                  isMobile={true}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-gray-900/70 z-30 lg:hidden ${
          menuState
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      />
    </>
  );
};

export const Header = () => {
  const { globalSettings, theme } = useLayout();
  const header = globalSettings!.header!;
  const navObjects = header.navObjects!;

  const [menuState, setMenuState] = React.useState(false);
  const [stuck, setStuck] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setStuck(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const toggleMenu = () => {
    const newMenuOpen = !menuState;
    setMenuState(newMenuOpen);
    document.body.style.overflow = newMenuOpen ? "hidden" : "auto";
  };

  return (
    <header>
      <DesktopNav navObjects={navObjects} header={header} stuck={stuck} />
      <MobileNav
        navObjects={navObjects}
        header={header}
        menuState={menuState}
        toggleMenu={toggleMenu}
      />
    </header>
  );
};

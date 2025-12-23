import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { BiLinkExternal } from "react-icons/bi";

interface DropdownLink {
  __typename?: string;
  link?: string;
  label?: string;
}

interface DropdownButtonProps {
  label: string;
  links?: DropdownLink[];
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  label,
  links,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDesktopOpen, setIsDesktopOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  //This is hard-coded because this nav bar will only ever be visible for the TinaDocs landing page (this repo is multi-zoned on the tina.io domain)
  const isActive = label === "TinaDocs";

  return (
    <>
      {/* Desktop version (lg+) */}
      <div
        ref={dropdownRef}
        className="relative group hidden xl:block"
        onMouseLeave={() => setIsDesktopOpen(false)}
      >
        <button
          className={`flex text-neutral-text items-center gap-1 duration-150 py-2 px-3 ${
            isActive || isDesktopOpen ? "bg-slate-800" : "bg-non hover:bg-slate-800"
          } rounded-md cursor-pointer`}
          onMouseEnter={() => setIsDesktopOpen(true)}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setIsDesktopOpen(!isDesktopOpen);
          }}
        >
          <span>{label}</span>
          <ChevronDown
            className='w-3 h-3'
          />
          {/* Invisible hover bridge to maintain hover state */}
          <div
            className="absolute left-0 top-full h-2 min-w-full"
            aria-hidden="true"
          />
        </button>
        {links && links.length > 0 && (
          <div
            className={`absolute top-full left-0 mt-2 w-max bg-background border border-slate-800 rounded-lg shadow-lg transition-all duration-200 z-50 ${
              isDesktopOpen
                ? "opacity-100 visible pointer-events-auto"
                : "opacity-0 invisible pointer-events-none"
            }`}
          >
            <ul className="py-2">
              {links.map((linkItem, index) => (
                <li key={index} className="flex items-center p-2">
                  <Link
                    target={
                      linkItem?.link?.startsWith("http") &&
                      !linkItem?.link?.startsWith("https://tina.io")
                        ? "_blank"
                        : "_self"
                    }
                    rel={
                      linkItem?.link?.startsWith("http") &&
                      !linkItem?.link?.startsWith("https://tina.io")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    href={linkItem.link || "#"}
                    className="text-muted-foreground hover:text-white hover:bg-slate-800/50 w-full p-2 rounded-lg text-base duration-150 flex items-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDesktopOpen(false);
                    }}
                  >
                    {linkItem.label}
                    {linkItem?.link?.startsWith("http") &&
                      !linkItem?.link?.startsWith("https://tina.io") && (
                        <span className="text-muted-foreground">
                          <BiLinkExternal />
                        </span>
                      )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Mobile version (below lg) - Inline list */}
      <div className="block xl:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex text-neutral-text items-center gap-2 duration-150 w-full hover:cursor-pointer"
        >
          <span>{label}</span>
          <ChevronDown
            className={`w-3 h-3 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isOpen && links && links.length > 0 && (
          <div className="mt-4 space-y-3">
            {links.map((linkItem, index) => (
              <Link
                key={index}
                href={linkItem.link || "#"}
                className="text-muted-foreground hover:text-accent-foreground pl-4 text-base duration-150 flex items-center gap-2"
              >
                {linkItem.label}
                {linkItem?.link?.startsWith("http") &&
                  !linkItem?.link?.startsWith("https://tina.io") && (
                    <span className="text-white">
                      <BiLinkExternal />
                    </span>
                  )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

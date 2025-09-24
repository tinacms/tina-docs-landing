import React from "react";
import Link from "next/link";
import { BiChevronDown } from "react-icons/bi";

export const DoubleItemDropDownButton = ({ navObject }: { navObject: any }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  if (!navObject || !navObject.label) {
    return null;
  }

  return (
    <>
      {/* Desktop version (lg+) - Hover dropdown */}
      <div className="relative group hidden lg:block">
        <span className="flex items-center cursor-pointer text-neutral-text">
          {navObject.label}
          <BiChevronDown className="ml-1 w-3 h-3 transition-transform group-hover:rotate-180" />
        </span>
        {navObject.items && navObject.items.length > 0 && (
          <ul className="absolute left-0 top-full mt-2 w-48 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="py-2">
              {navObject.items.map((subItem: any, subIndex: any) => (
                <div
                  key={`${subIndex}-${subItem?.hrefLeft || "no-href"}`}
                  className="flex items-center gap-2 px-4 py-2"
                >
                  <Link
                    className="text-muted-foreground hover:text-accent-foreground text-sm duration-150"
                    href={subItem?.hrefLeft || "#"}
                  >
                    {subItem?.labelLeft || "No Label"}
                  </Link>
                  <span className="text-muted-foreground">•</span>
                  <Link
                    className="text-muted-foreground hover:text-accent-foreground text-sm duration-150"
                    href={subItem?.hrefRight || "#"}
                  >
                    {subItem?.labelRight || "No Label"}
                  </Link>
                </div>
              ))}
            </div>
          </ul>
        )}
      </div>

      {/* Mobile version (below lg) - Click dropdown */}
      <div className="block lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex text-neutral-text items-center gap-1 duration-150 w-full hover:cursor-pointer"
        >
          <span>{navObject.label}</span>
          <BiChevronDown
            className={`ml-1 w-3 h-3 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        {isOpen && navObject.items && navObject.items.length > 0 && (
          <div className="mt-4 space-y-3">
            {navObject.items.map((subItem: any, subIndex: any) => (
              <div
                key={`${subIndex}-${subItem?.hrefLeft || "no-href"}`}
                className="flex items-center gap-2 pl-4"
              >
                <Link
                  className="text-muted-foreground hover:text-accent-foreground text-sm duration-150"
                  href={subItem?.hrefLeft || "#"}
                >
                  {subItem?.labelLeft || "No Label"}
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link
                  className="text-muted-foreground hover:text-accent-foreground text-sm duration-150"
                  href={subItem?.hrefRight || "#"}
                >
                  {subItem?.labelRight || "No Label"}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

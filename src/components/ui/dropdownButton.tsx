import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

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

  return (
    <>
      {/* Desktop version (lg+) - Hover dropdown */}
      <div className="relative group hidden lg:block">
        <button className="flex text-neutral-text items-center gap-1 duration-150">
          <span>{label}</span>
          <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
        </button>
        {links && links.length > 0 && (
          <div className="absolute top-full left-0 mt-2 w-48 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <ul className="py-2">
              {links.map((linkItem, index) => (
                <li key={index}>
                  <Link
                    href={linkItem.link || "#"}
                    className="text-muted-foreground hover:text-accent-foreground block px-4 py-2 text-sm duration-150"
                  >
                    {linkItem.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Mobile version (below lg) - Inline list */}
      <div className="block lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex text-neutral-text items-center gap-1 duration-150 w-full hover:cursor-pointer"
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
                className="text-muted-foreground hover:text-accent-foreground block pl-4 text-sm duration-150"
              >
                {linkItem.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

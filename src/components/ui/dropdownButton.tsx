import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface DropdownLink {
  navLink?: {
    href?: string;
    label?: string;
  };
}

interface DropdownButtonProps {
  label: string;
  links?: DropdownLink[];
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  label,
  links,
}) => {
  return (
    <div className="relative group">
      <button className="flex text-neutral-text items-center gap-1 duration-150">
        <span>{label}</span>
        <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
      </button>
      {links && links.length > 0 && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-background border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <ul className="py-2">
            {links.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.navLink?.href || "#"}
                  className="text-muted-foreground hover:text-accent-foreground block px-4 py-2 text-sm duration-150"
                >
                  {link.navLink?.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

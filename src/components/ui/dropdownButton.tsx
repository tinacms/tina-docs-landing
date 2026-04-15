import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

function isRouteActive(
  pathname: string,
  links: DropdownLink[] | undefined
): boolean {
  if (!links) return false;
  return links.some((linkItem) => {
    const href = linkItem.link || "";
    if (!href || href === "#") return false;
    // Only match relative (internal) links against the current pathname
    if (href.startsWith("http")) return false;
    // Exact match or prefix match for nested routes (e.g. /docs/*)
    return pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
  });
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  label,
  links,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();
  const isActive = isRouteActive(pathname, links);

  return (
    <>
      {/* Desktop version (lg+) - Hover dropdown */}
      <div className="relative group hidden lg:block">
        <button className={`flex items-center gap-1 duration-150 rounded-lg px-2.5 py-1 transition-colors ${isActive ? "bg-accent text-accent-foreground" : "text-neutral-text hover:bg-accent/50 hover:text-accent-foreground"}`}>
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
          className={`flex items-center gap-1 duration-150 w-full hover:cursor-pointer rounded-lg px-2.5 py-1 transition-colors ${isActive ? "bg-accent text-accent-foreground font-medium" : "text-neutral-text"}`}
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

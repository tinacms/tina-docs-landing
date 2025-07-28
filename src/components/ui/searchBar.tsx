import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  className = "",
}) => {
  return (
    <div className="relative mx-4">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input
        type="text"
        placeholder={placeholder}
        className={`pl-10 pr-4 py-1 text-sm  border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-48 ${className}`}
      />
    </div>
  );
};

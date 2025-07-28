import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Github } from "lucide-react";
import { Button } from "./button";
import { getGitHubStarCount } from "@/src/utils/github-star-helper";

const formatStarCount = (count: number) => {
    const rounded = Math.round(count / 100) * 100;
    return `${(rounded / 1000).toFixed(1)}k`;
  };

export const GitHubButton = () => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const fetchStarCount = async () => {
      const count = await getGitHubStarCount('tinacms', 'tinacms');
      setCount(count);
    };
    fetchStarCount();
  }, []);

  return (
    <Link
      href="https://github.com/tinacms/tinacms"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1"
    >
      <Github className="w-4 h-4" />
      {formatStarCount(count)}
    </Link>
  );
};

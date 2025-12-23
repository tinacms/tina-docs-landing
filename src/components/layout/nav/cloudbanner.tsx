"use client";

import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";
import { GitHubButton } from "../../ui/githubButton";

export function CloudBanner() {
  return (
    <div
      className="relative z-10 w-full flex flex-col items-center justify-center 
        py-3 px-4 text-base leading-[1.2] text-white bg-gradient-to-br from-[#111110] to-slate-800
        lg:flex-row lg:pl-8 lg:pr-10"
    >
      <div className="flex items-center mt-[0.3rem] mb-2 lg:mb-0 gap-2">
        <Link
          className="text-white hover:text-[#EC4816] transition-colors duration-200 flex items-center gap-1"
          href={`https://github.com/tinacms/tinacms`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Loving Tina? <FaStar className="ml-1" /> us on GitHub
        </Link>
        <GitHubButton />
      </div>
    </div>
  );
}

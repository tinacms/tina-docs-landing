"use client";
import { useTina } from "tinacms/dist/react";
import { Blocks } from "@/components/blocks";
import ErrorBoundary from "@/components/error-boundary";

export interface ClientPageProps {
  data: {
    page: any;
  };
  variables: {
    relativePath: string;
  };
  query: string;
}

export default function ClientPage(props: ClientPageProps) {
  const { data } = useTina({ ...props });
  return (
    <ErrorBoundary>
      <Blocks {...data?.page} />
    </ErrorBoundary>
  );
}

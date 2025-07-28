import { tinaField } from "tinacms/dist/react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { Copy, Check, ArrowRight } from "lucide-react";
import { useState } from "react";
import { PageBlocksHero } from "@/tina/__generated__/types";

const CodeButton = ({ label }: { label: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(label);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center justify-between gap-2 h-9 px-4 border border-white/20 rounded-md bg-transparent text-white font-mono text-sm hover:bg-white/5 transition-all duration-200 ease-in-out hover:cursor-pointer"
    >
      <span className="transition-all duration-200">{label}</span>
      <div className="relative w-4 h-4 flex-shrink-0">
        <Copy
          className={`absolute inset-0 w-4 h-4 transition-all duration-200 ease-in-out ${
            copied ? "opacity-0 scale-75" : "opacity-100 scale-100"
          }`}
        />
        <Check
          className={`absolute inset-0 w-4 h-4 text-green-400 transition-all duration-200 ease-in-out ${
            copied ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        />
      </div>
    </button>
  );
};

export default function Hero({ data }: { data?: PageBlocksHero }) {
  return (
    <Section>
      <div className="text-center">
        {data?.title && (
          <h1
            className="text-balance text-4xl font-bold lg:text-6xl"
            data-tina-field={tinaField(data, "title")}
          >
            {data.title}
          </h1>
        )}
        {data?.tagline && (
          <p
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
            data-tina-field={tinaField(data, "tagline")}
          >
            {data.tagline}
          </p>
        )}

        {data?.actions && data?.actions.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {data.actions.map(
              (action, index) =>
                action && (
                  <div key={index} data-tina-field={tinaField(action)}>
                    {action.__typename === "PageBlocksHeroActionsCodeButton" ? (
                      <CodeButton label={action.label || ""} />
                    ) : action.__typename === "PageBlocksHeroActionsActions" ? (
                      <Button
                        asChild
                        variant={(action.variant as any) || "default"}
                        size={"default"}
                        arrow={action.arrow || false}
                      >
                        <a href={action.url || "#"}>
                          {action.label}
                          {action.arrow && (
                            <ArrowRight className="w-4 h-4 ml-1" />
                          )}
                        </a>
                      </Button>
                    ) : null}
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </Section>
  );
}

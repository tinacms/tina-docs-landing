import { Section } from "@/components/layout/section";
import Image from "next/image";

// Formatter function that converts {text} to bold text
function formatQuoteWithBrackets(text: string) {
  const parts = text?.split(/(\{[^}]*\})/g);

  return parts?.map((part, index) => {
    if (part.startsWith("{") && part.endsWith("}")) {
      const content = part?.slice(1, -1);
      return <strong key={index}>{content}</strong>;
    }
    return part;
  });
}

export default function Banner({ data }: { data: any }) {
  return (
    <Section className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 px-10 lg:px-0 items-center">
      {data.image && (
        <Image src={data.image} alt={data.title || 'Untitled Image'} width={200} height={200} className="w-40 h-40 md:w-52 md:h-52"/>
      )}
      <div className="flex flex-col max-w-2xl">
        <div className="flex text-4xl md:text-5xl pb-6">
          <p className="italic">
            <span className="text-primary font-bold">"</span>
            {formatQuoteWithBrackets(data.quote)}
            <span className="text-primary font-bold">"</span>
          </p>
        </div>
        <p className="text-lg md:text-xl">{data.author}</p>
        <p className="text-lg md:text-xl text-muted-foreground font-semibold">
          {data.authorInfo}
        </p>
      </div>
    </Section>
  );
}

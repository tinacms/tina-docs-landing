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
    <Section className="flex justify-center gap-16 items-center">
      {data.image && (
        <Image src={data.image} alt={data.title} width={200} height={200} />
      )}
      <div className="flex flex-col max-w-2xl">
        <div className="flex text-5xl pb-6">
          <p className="italic">
            <span className="text-orange-500 font-bold">"</span>
            {formatQuoteWithBrackets(data.quote)}
            <span className="text-orange-500 font-bold">"</span>
          </p>
        </div>
        <p className="text-xl">{data.author}</p>
        <p className="text-xl text-muted-foreground font-semibold">
          {data.authorInfo}
        </p>
      </div>
    </Section>
  );
}

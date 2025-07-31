import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { Section } from "../../layout/section";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";

type ContentGridItem = {
  title: string;
  subtext: TinaMarkdownContent;
  links?: {
    label: string;
    url: string;
  };
};

const ContentGridItem = ({
  item,
  onlyYBorder = false,
}: {
  item: ContentGridItem;
  onlyYBorder: boolean;
}) => {
  return (
    <div
      className={`flex flex-col gap-4 border-sand-6 px-10 py-16 ${
        onlyYBorder ? "border-y-[0.5px]" : "border-[0.5px]"
      }`}
    >
      <h3 className="text-3xl font-bold">{item.title}</h3>
      <TinaMarkdown content={item.subtext} />
      {item.links && (
        <Link
          href={item.links.url}
          data-tina-field={tinaField(item, "links")}
          className="inline-flex items-center text-[#FF9B73] hover:text-[#d28161] font-medium transition-colors group"
        >
          Learn more
          <ChevronRightIcon className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
};

export default function ContentGrid({ data }: { data: any }) {
  console.log("content grid", data);
  return (
    <Section className="flex flex-col gap-16 items-center justify-center">
      <h2 className="text-5xl font-bold">{data.title}</h2>
      <div className="relative grid grid-cols-3 w-full h-[750px]">
        {data.itemList.map((item: any, index: number) => (
          <ContentGridItem key={index} item={item} onlyYBorder={index === 1} />
        ))}
        {data.image && (
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[75%] aspect-[16/7]">
            <Image
              src={data.image}
              alt=""
              fill
              className="object-cover rounded-t-lg"
              data-tina-field={tinaField(data, "image")}
            />
          </div>
        )}
      </div>
    </Section>
  );
}

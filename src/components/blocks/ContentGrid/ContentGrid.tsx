import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { Section } from "../../layout/section";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { ChevronRightIcon, Plus } from "lucide-react";
import Image from "next/image";
import { Icon } from "../../icon";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type ContentGridItem = {
  title: string;
  subtext: TinaMarkdownContent;
  icon?: string;
  links?: {
    label: string;
    url: string;
  };
};

const MobileContentGridItem = ({
  item,
  onlyYBorder = false,
  index,
}: {
  item: ContentGridItem;
  onlyYBorder: boolean;
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      layout
      className={`flex flex-col gap-4 border-sand-6 px-10 py-8 md:py-16  ${
        index % 2 === 0 ? "border-[0.5px]" : "border-x-[0.5px]"
      }`}
    >
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-3xl font-bold">{item.title}</h3>
        <Plus
          className={`w-6 h-6 text-[#FF9B73] ${
            isOpen ? "rotate-135" : ""
          } transition-transform duration-300`}
        />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden flex flex-col gap-4"
          >
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
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
      <div className="flex items-center gap-3">
        {item.icon && (
          <div>
            <Icon
              data={{
                name: item.icon,
                color: "primary",
                size: "small",
                style: "regular",
              }}
              tinaField={tinaField(item, "icon")}
            />
          </div>
        )}
        <h3
          className="text-3xl font-bold"
          data-tina-field={tinaField(item, "title")}
        >
          {item.title}
        </h3>
      </div>
      <div data-tina-field={tinaField(item, "subtext")}>
        <TinaMarkdown content={item.subtext} />
      </div>
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
  return (
    <Section className="flex !px-0 md:!px-10 flex-col gap-16 items-center justify-center">
      <h2 className="text-5xl font-bold px-2 md:px-0">{data.title}</h2>

      <div className="px-10 block md:hidden">
        <Image
          src={data.image}
          alt=""
          width={500}
          height={300}
          className="rounded-lg w-full h-auto"
        />
      </div>

      {/* Mobile version - show on small screens, hide on md+ */}
      <div className="block md:hidden w-full">
        {data.itemList.map((item: any, index: number) => (
          <MobileContentGridItem
            key={index}
            item={item}
            onlyYBorder={index === 1}
            index={index}
          />
        ))}
      </div>

      {/* Desktop version - hide on small screens, show on md+ */}
      <div className="relative hidden md:grid grid-cols-1 md:grid-cols-3 w-full md:h-[750px]">
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

// import { PageBlocksLogoGrid } from "@/tina/__generated__/types";
import { Section } from "../../layout/section";

export default function LogoGrid({ data }: { data: any }) {
  console.log(data);
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <Section className="max-w-5xl! grid grid-cols-6">
      <div className="col-span-2 border-[0.5px] border-sand-6 py-12 px-6 text-3xl font-semibold">
        {data.title}
      </div>
      {array.map((item, index) => (
        <div key={index} className={`border-r-[0.5px] border-sand-6 ${(index < 4 && index >= 0) ? 'border-y-[0.5px]' : 'border-b-[0.5px]'} ${index === 4 ? 'border-l-[0.5px]' : ''}`}>
          {item}
        </div>
      ))}
      
    </Section>
  );
}

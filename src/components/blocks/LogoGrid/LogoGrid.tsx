import { Section } from "../../layout/section";
import Image from "next/image";

export default function LogoGrid({ data }: { data: any }) {
  return (
    <Section className="max-w-5xl! grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      <div className="col-span-2 md:border-[0.5px] border-sand-6 h-30 md:h-44 text-3xl font-semibold flex items-center justify-center">
        {data.title}
      </div>
      {data.logos.map((item: any, index: number) => (
        <div key={index} className={`md:border-r-[0.5px] border-sand-6 h-30 p-6 md:p-0 md:h-44 flex items-center justify-center ${(index < 4 && index >= 0) ? 'md:border-y-[0.5px]' : 'md:border-b-[0.5px]'} ${index === 4 ? 'md:border-l-[0.5px]' : ''}`}>
          <Image src={item.image} alt={item.alt} width={100} height={100} className='grayscale'/>
        </div>
      ))}
      
    </Section>
  );
}

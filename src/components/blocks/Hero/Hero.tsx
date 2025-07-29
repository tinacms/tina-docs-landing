import { tinaField } from "tinacms/dist/react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { Copy, Check, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { PageBlocksHero } from "@/tina/__generated__/types";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import Lenis from "lenis";
import { CodeButton } from "@/components/ui/code-button";

function InformationBlock({ title, description }: { title: string, description: string }) {
  return (
    <div className='flex flex-col border border-white/20 rounded-md p-4 bg-red-500/30'>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default function Hero({ data }: { data?: PageBlocksHero }) {
  const { scrollYProgress } = useScroll();
  const [quartScreen, setQuartScreen] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("Window.innerHeight", window.innerHeight);
      setQuartScreen(window.innerHeight / 4);
      console.log("quartScreen", quartScreen);
    }
  }, []);

  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, quartScreen, quartScreen]
  );

  const x = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0, quartScreen * 2]);

  const boxesOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);
  const boxesX = useTransform(
    scrollYProgress,
    [0.85, 1],
    [0, -quartScreen * 2]
  );
  const boxesY = useTransform(scrollYProgress, [0.85, 1], [0, -50]);

  // useMotionValueEvent(scrollYProgress, "change", (latestValue) => {
  //   console.log("Progress:", latestValue);
  // });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

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
        {data?.media && (
          <div className="relative min-h-[100vh]">
            {/* Boxes underneath */}
            <motion.div
              style={{ x: boxesX, y: boxesY, opacity: boxesOpacity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 z-0"
            >
              <InformationBlock title="Title" description="Description" />
              <InformationBlock title="Title" description="Description" />
              <InformationBlock title="Title" description="Description" />
            </motion.div>

            {/* Image above */}
            <motion.div
              className="mt-8 flex justify-center relative z-10"
              style={{ y, x }}
            >
              <Image
                src={data.media}
                alt={data.title || ""}
                width={1000}
                height={1000}
              />
            </motion.div>
          </div>
        )}
      </div>
    </Section>
  );
}

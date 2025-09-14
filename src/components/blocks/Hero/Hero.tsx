import { tinaField } from "tinacms/dist/react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import { Copy, Check, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PageBlocksHero } from "@/tina/__generated__/types";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  useSpring,
} from "motion/react";
import Lenis from "lenis";
import { CodeButton } from "@/components/ui/code-button";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { Icon } from "../../icon";

function InformationBlock({
  title,
  description,
  icon,
}: {
  title: string;
  description: TinaMarkdownContent;
  icon?: string;
}) {
  return (
    <div className="max-w-md flex flex-col gap-4 border border-white/20 rounded-md p-4 bg-[#191918]/60 shadow-lg text-left 2xl:w-lg w-sm">
      <div className="flex items-center gap-2">
        {icon && (
          <Icon
            data={{
              name: icon,
              color: "primary",
              size: "small",
              style: "regular",
            }}
          />
        )}
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>

      <TinaMarkdown content={description} />
    </div>
  );
}

export default function Hero({ data }: { data?: PageBlocksHero }) {
  const heroComponentRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroComponentRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("ScrollYProgress: ", latest);
  });

  const [screenHeight, setScreenHeight] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== "undefined") {
        setScreenHeight(window.innerHeight);
        setScreenWidth(window.innerWidth);
      }
    };

    updateDimensions();

    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const VERTICAL_OFFSET = screenHeight * 0.3; //Offset of image from top of screen
  const TOP_PADDING_OFFSET = 48;

  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, VERTICAL_OFFSET, VERTICAL_OFFSET]
  );

  const x = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 0, screenWidth * 0.15]
  );

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.1, 0.85]);

  const boxesOpacityBase = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);
  const boxesXBase = useTransform(
    scrollYProgress,
    [0.7, 1],
    [0, screenWidth * -0.3]
  );
  const boxesYBase = useTransform(
    scrollYProgress,
    [0.7, 1],
    [VERTICAL_OFFSET, VERTICAL_OFFSET + TOP_PADDING_OFFSET]
  );

  const boxesOpacity = useSpring(boxesOpacityBase, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001,
  });
  const boxesX = useSpring(boxesXBase, {
    stiffness: 200,
    damping: 25,
    restDelta: 0.001,
  });
  const boxesY = useSpring(boxesYBase, {
    stiffness: 200,
    damping: 25,
    restDelta: 0.001,
  });

  const SMOOTHNESS = 4;
  const WHEEL_MULTIPLIER = 0.8;

  useEffect(() => {
    const lenis = new Lenis({
      duration: SMOOTHNESS, // Higher = smoother/slower
      easing: (t: number): number => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: WHEEL_MULTIPLIER, // Lower = slower scroll response
      touchMultiplier: WHEEL_MULTIPLIER * 0.6, // Even slower on touch
      infinite: false,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <Section
      className="max-w-full bg-gradient-to-b from-[#111110] via-[#111110] to-[#182449] bg-fixed"
      ref={heroComponentRef}
    >
      <div className="text-center max-w-7xl mx-auto px-6">
        {data?.title && (
          <h1
            className="text-balance text-4xl md:text-5xl font-bold lg:text-6xl max-w-xl text-center mx-auto"
            data-tina-field={tinaField(data, "title")}
          >
            {data.title}
          </h1>
        )}
        {data?.tagline && (
          <p
            className="mt-4 text:sm md:text-base lg:text-lg text-muted-foreground max-w-md mx-auto"
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
          <>
            <div className="hidden lg:block relative min-h-[100vh] lg:mx-10 justify-center">
              {/* Boxes underneath */}
              <motion.div
                style={{ x: boxesX, y: boxesY, opacity: boxesOpacity }}
                className="absolute left-1/2 -translate-x-1/2 flex flex-col gap-12 z-0"
              >
                <InformationBlock
                  title={data?.informationBlock1?.title || "Undefined Title"}
                  description={data?.informationBlock1?.desc}
                  icon={data?.informationBlock1?.icon || undefined}
                />
                <InformationBlock
                  title={data?.informationBlock2?.title || "Undefined Title"}
                  description={data?.informationBlock2?.desc}
                  icon={data?.informationBlock2?.icon || undefined}
                />
                <InformationBlock
                  title={data?.informationBlock3?.title || "Undefined Title"}
                  description={data?.informationBlock3?.desc}
                  icon={data?.informationBlock3?.icon || undefined}
                />
              </motion.div>

              {/* Image above */}
              <motion.div
                className="mt-16 flex justify-center relative z-10"
                style={{ y, x, scale }}
              >
                <div className="relative inline-block">
                  {/* Main image - top layer (base position) */}
                  <Image
                    src={data.media}
                    alt={data.title || ""}
                    width={2400}
                    height={1350}
                    quality={100}
                    className="border-[0.5px] border-[#252934] rounded-lg shadow-[#182449] shadow-md relative w-3xl left-24 z-10"
                  />

                  {/* Background image - bottom layer, positioned down and to the left */}
                  {data?.mediaBackground && (
                    <Image
                      src={data.mediaBackground || ""}
                      alt={data.title || ""}
                      width={2400}
                      height={1350}
                      quality={100}
                      className="absolute top-20 -left-24 border-[0.5px] border-[#252934] rounded-lg shadow-[#182449] shadow-md z-0"
                    />
                  )} 
                </div>
              </motion.div>
            </div>

            <div className="block lg:hidden pt-16 px-10 min-h-[30vh] md:min-h-[50vh] overflow-hidden p-10">
              <div className="absolute left-1/2 -translate-x-1/2 bg-[#252934] rounded-lg border-[0.5px] border-sand-6 shadow-xl p-2 w-[calc(100%-2rem)] max-w-2xl">
                <Image
                  src={data.media}
                  alt={data.title || ""}
                  width={1000}
                  height={1000}
                  className=" border-[#F6F6F513] rounded-lg shadow-xl "
                />
              </div>
            </div>
          </>
        )}
      </div>
    </Section>
  );
}

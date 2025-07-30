import { PageBlocksMediaFeature } from "@/tina/__generated__/types";
import { Section } from "../../layout/section";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon, PlayIcon } from "lucide-react";
import { useState } from "react";

function YouTubeVideoPlayer({ mediaContent }: { mediaContent: any }) {
  const [showVideo, setShowVideo] = useState(false);

  // Debug logging to see the actual data structure
  console.log("YouTubeVideoPlayer mediaContent:", mediaContent);

  if (showVideo) {
    return (
      <div className="relative w-full aspect-[16/9]">
        <iframe
          src={mediaContent.videoSrc}
          title={mediaContent.alt || "YouTube Video"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg"
        />
      </div>
    );
  }

  // Handle thumbnail - it might be a string URL or an object with url property
  const thumbnailSrc =
    typeof mediaContent.thumbnail === "string"
      ? mediaContent.thumbnail
      : mediaContent.thumbnail?.url || mediaContent.thumbnail;

  return (
    <div
      className="relative w-full aspect-[16/9] cursor-pointer group"
      onClick={() => setShowVideo(true)}
    >
      <Image
        src={thumbnailSrc}
        fill
        alt={mediaContent.alt || "Untitled Image"}
        className="rounded-lg"
      />
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors rounded-lg">
        <div className="bg-white/90 hover:bg-white group-hover:scale-110 transition-all duration-200 rounded-full p-4 shadow-lg">
          <PlayIcon
            className="w-8 h-8 text-gray-900 ml-1"
            fill="currentColor"
          />
        </div>
      </div>
    </div>
  );
}

function renderMediaContent(mediaContent: any) {
  // Debug logging to see the actual data structure
  console.log("renderMediaContent called with:", mediaContent);

  if (mediaContent.__typename.includes("YoutubeVideo")) {
    return <YouTubeVideoPlayer mediaContent={mediaContent} />;
  }
  if (mediaContent.__typename.includes("Image")) {
    return (
      <div>
        <Image
          src={mediaContent.image.url}
          alt={mediaContent.image.alt || "Untitled Image"}
          width={mediaContent.image.width}
          height={mediaContent.image.height}
        />
      </div>
    );
  }
  return null;
}

function renderFeatures(features: any[]) {
  if (!features || features.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-slate-11">
        <p>No features to display</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {features.map((feature, index) => (
        <div
          key={index}
          data-tina-field={tinaField(feature)}
          className={`p-8 ${
            features.length === 2 && index === 0
              ? "border-b-[0.5px] border-sand-6"
              : ""
          }`}
        >
          <div className="space-y-4">
            <h3
              data-tina-field={tinaField(feature, "title")}
              className="text-2xl font-semibold text-sand-12"
            >
              {feature.title}
            </h3>

            <div
              data-tina-field={tinaField(feature, "description")}
              className="text-sand-12 font-light"
            >
              <TinaMarkdown content={feature.description} />
            </div>

            {feature.link && (
              <Link
                href={feature.link}
                data-tina-field={tinaField(feature, "link")}
                className="inline-flex items-center text-[#FF9B73] hover:text-[#d28161] font-medium transition-colors group"
              >
                Learn more
                <ChevronRightIcon className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function mediaBlock(data: any) {
  const isMediaOnRight = data.isMediaOnRight;

  return (
    <div className="w-full border-y-[0.5px] border-sand-6 px-10">
      <div
        className={` max-w-7xl mx-auto border-x-[0.5px] border-sand-6 flex items-center  h-full justify-center ${
          isMediaOnRight ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div className="w-3/5 p-20 border-r-[0.5px] border-sand-6 bg-gradient-to-b from-transparent via-transparent to-[#182449]">
          {data?.mediaContent?.[0] &&
            renderMediaContent(data?.mediaContent?.[0])}
        </div>
        <div className="w-2/5">{renderFeatures(data.features || [])}</div>
      </div>
    </div>
  );
}

export default function MediaFeature({
  data,
}: {
  data: PageBlocksMediaFeature;
}) {
  console.log(data);
  return (
    <div className='py-10'>
      {data.MediaBlock &&
        data.MediaBlock.map((block: any) => mediaBlock(block))}
    </div>
  );
}

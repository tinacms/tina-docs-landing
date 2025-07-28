interface TextNode {
    type: string;
    text: string;
  }
  
  interface LinkNode {
    type: string;
    children: TextNode[];
  }
  
  
  interface ContentBody {
    children: any[];
  }

export const formatExcerpt = (
    body: ContentBody,
    excerptLength: number
  ): string => {
    return body?.children
      ?.filter((c: any) => c.type === "p")
      ?.reduce((excerpt: string, child: any) => {
        // Combine all of child's text and link nodes into a single string
        const paragraphText = child.children
          .filter((c: any) => c.type === "text" || c.type === "a")
          .reduce((text: string, child: TextNode | LinkNode) => {
            if (child.type === "text") {
              return text + (text ? " " : "") + (child as TextNode).text;
            }
            if (child.type === "a") {
              return (
                text +
                (text ? " " : "") +
                (child as LinkNode).children.map((c) => c.text).join(" ")
              );
            }
            return text;
          }, "");
  
        // Add paragraph to excerpt with space separator
        const updatedExcerpt = excerpt
          ? `${excerpt} ${paragraphText}`
          : paragraphText;
  
        // Truncate if the combined text is too long
        if (updatedExcerpt.length > excerptLength) {
          return `${updatedExcerpt.substring(0, excerptLength)}...`;
        }
  
        return updatedExcerpt;
      }, "");
  };
  
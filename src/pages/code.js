import { useEffect, useState } from "react";
import Head from "next/head";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import ReactMarkdown from "react-markdown";
import codeFrontmatter from "remark-code-frontmatter";
import rehypeFormat from "rehype-format";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { js_beautify } from "js-beautify";

import { fetchCode } from "@/lib/services";

const code = () => {
  const [result, setResult] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const source = await fetchCode();

      source.addEventListener("message", (e) => {
        if (e.data != "[DONE]") {
          let payload = JSON.parse(e.data);
          let text = payload.content;
          setResult((perv) => `${perv}${text}`);
        } else {
          source.close();
        }
      });
    };

    fetch();
  }, []);

  return (
    <>
      <Head>
        <title>{"Hosh sabs | Data"}</title>
      </Head>
      <div className="p-10 text-justify content rounded-xl w-[95vw] block mx-auto my-10 max-w-[100rem]">
        <ReactMarkdown
          rehypePlugins={[rehypeFormat]}
          remarkPlugins={[codeFrontmatter]}
          children={result}
          components={{
            code({ node, className, children, ...props }) {
              const notBlock = ["manifest.json", "popup.html", "background.js"];
              let lang = "";
              if (children.startsWith("javascript")) {
                children = children.replace("javascript", "");
                lang = "javascript";
              } else if (children.startsWith("html")) {
                children = children.replace("html", "");
                lang = "html";
              } else if (children.startsWith("json")) {
                children = children.replace("json", "");
                lang = "json";
              }

              if (notBlock.includes(`${children}`)) {
                return <span className="bg-primary/30">{children}</span>;
              }

              return (
                <div className="my-2 w-full">
                  <p className="w-fit mt-2 ml-3 px-3 py-1 text-white bg-secondary rounded-t-lg text-xs shadow-xl">
                    {lang}
                  </p>
                  <SyntaxHighlighter
                    customStyle={{ margin: "0 0 10px 0 !important" }}
                    children={js_beautify(String(children).replace(/\n$/, ""))}
                    showInlineLineNumbers
                    language={lang === "html" ? "markup" : lang}
                    style={dracula}
                    {...props}
                  />
                </div>
              );
            },
          }}
        />
      </div>
    </>
  );
};

export default code;

import Head from "next/head";

import { fetchData } from "@/lib/services";

export async function getServerSideProps({ req }) {
  let ticket = null;
  if (req?.cookies?.ticket && req.cookies.ticket !== "undefined") {
    ticket = req.cookies.ticket;
  }

  try {
    const { result } = await fetchData(ticket);

    return {
      props: {
        data: result ? result : "<h1>Failed to fetch data!</h1>",
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        data: "<h1>Failed to fetch data!</h1>",
      },
    };
  }
}

const data = ({ data }) => {
  //could use dompurify
  const cleanHTML = data
    .replace("<i>", "&lt;i&gt")
    .replace("</i>", "&lt;/i&gt");

  return (
    <>
      <Head>
        <title>{"Hosh sabs | Data"}</title>
      </Head>
      <div
        className="p-10 text-2xl content rounded-xl w-[95vw] mx-auto mt-10 flex-col max-w-[100rem]"
        dangerouslySetInnerHTML={{ __html: cleanHTML }}
      />
    </>
  );
};

export default data;

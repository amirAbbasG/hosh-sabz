import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

import { errorMessage, successMessage } from "@/lib/toast";
import { setCookieApi } from "@/lib/cookie";
import { loginApi } from "@/lib/services";

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [isSubmmiting, setIsSubmmiting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmmiting(true);
    try {
      const data = await loginApi({ username, password });
      if (data.status && data.status !== 200) {
        errorMessage(`login failed: ${data.message}`);
      } else {
        localStorage.setItem("ticket", data.ticket);
        await setCookieApi(data.ticket);
        successMessage("login succesfuly");
        router.push("/data");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmmiting(false);
    }
  };

  return (
    <>
      <Head>
        <title>{"Hosh sabs | Login"}</title>
      </Head>
      <div className="flex min-h-screen items-center justify-center p-10">
        <form
          className="flex flex-col border border-primary bg-primary/10 rounded-xl p-6 gap-4 shadow-xl"
          onSubmit={handleSubmit}
        >
          <h2 className="font-bold text-secondary text-center text-xl mb-4">
            Login
          </h2>
          <input
            type="text"
            placeholder="Username"
            className="input"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Password"
            className="input"
            onChange={(e) => setpassword(e.target.value)}
          />
          <button
            disabled={isSubmmiting}
            type="submit"
            className="w-full mt-4 py-2 bg-primary hover:bg-opacity-70 rounded-lg cursor-pointer text-white font-semibold shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}

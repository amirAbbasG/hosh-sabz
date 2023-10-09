import Image from "next/image";
import { Inter } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { ToastContainer } from "react-toastify";

import { logoutApi } from "@/lib/cookie";
import { successMessage } from "@/lib/toast";

import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

const Layout = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    try {
      await logoutApi(); //remove ticket cookie
      localStorage.removeItem("ticket");
      router.push("/");
      successMessage("logout succesfuly");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={inter.className}>
      {/* nav bar for data and code page */}
      {pathname !== "/" && (
        <header className="w-full flex justify-center items-center p-5">
          <nav className=" py-3 px-6 gap-4 content rounded-full shadow-xl">
            <Link
              href="/data"
              className={pathname === "/data" ? "link active" : "link"}
            >
              Data
            </Link>
            <Link
              href="/code"
              className={pathname === "/code" ? "link active" : "link"}
            >
              Code
            </Link>

            {/* logout button */}
            <button
              type="button"
              title="logout"
              onClick={logout}
              className="flex justify-center items-center p-3 rounded-full bg-secondary/20"
            >
              <Image
                src="/logout.png"
                alt="logout"
                width={12}
                height={12}
                className="fill-white"
              />
            </button>
          </nav>
        </header>
      )}

      <main className="h-screen w-full flex flex-col items-center">
        {children}
      </main>
      <ToastContainer />
    </div>
  );
};

export default Layout;

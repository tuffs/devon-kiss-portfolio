import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Layouts/Navbar";

const displayYear = new Date().getFullYear();
const copyrightString = `Copyright &copy; ${displayYear}. All rights reserved.`;

function Copyright({ content }) {
  return (
    <div className="text-md" dangerouslySetInnerHTML={{ __html: content }} />
  );
}

export default function Welcome({ auth }) {
  return (
    <>
      <Head title="Devon Kiss: Software Engineering Portfolio" />
      <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
        <Navbar />

        <main className="mt-24 h-[100vw]">
          <div className="flex flex-cols">
            <div className="w-1/6">&nbsp;</div>
            <div className="w-4/6 text-center text-7xl text-slate-400 animate-fade-in-up animate-blur-in opacity-0">
              <h1 className="heading__intro">
                You Dream.{" "}
                <span className=" text-slate-500/50 ">We Build.</span>
              </h1>
            </div>
            <div className="w-1/6">&nbsp;</div>
          </div>
        </main>

        <footer className="flex flex-col h-[35vh] pt-32 pb-12 text-center font-bold text-xl text-slate-100">
          DEVON KISS: SOFTWARE ENGINEERING PORTFOLIO
          <Copyright content={copyrightString} />
          {!auth.user ? (
            <div className="w-full mt-auto text-center text-xs">
              <Link href={route("login")} className="text-white">
                Log in
              </Link>
            </div>
          ) : null}
        </footer>
      </div>
    </>
  );
}

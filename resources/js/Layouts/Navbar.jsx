import { Head, Link } from "@inertiajs/react";

export default function Navbar({ auth }) {
  return (
    <nav className="flex flex-cols gap-4">
      {auth.user ? (
        <>
          <Link href={route("projects.index")} className="text-white text-2xl">
            Projects
          </Link>
          <Link href={route("projects.create")} className="text-white text-2xl">
            Add Project
          </Link>
          <Link href={route("dashboard")} className="text-white text-2xl">
            Admin Dashboard
          </Link>

          <Link
            href={route("logout")}
            method="post"
            className="text-white text-2xl"
          >
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link href={route("projects.index")} className="text-white text-2xl">
            Projects
          </Link>
        </>
      )}
    </nav>
  );
}

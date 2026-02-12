import ApplicationLogo from "@/Components/ApplicationLogo";
import { Head, Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header / Branding */}
      <header className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <ApplicationLogo className="h-10 w-auto fill-current text-gray-800" />
            </Link>

            {/* Optional: add public nav links later if needed */}
            <div className="flex items-center space-x-6">
              <Link
                href={route("projects.index")}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Projects
              </Link>
              <Link
                href="#!"
                className="text-sm text-gray-700 hover:text-gray-950"
              >
                Articles
              </Link>
              <Link
                href={route("login")}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Log in
              </Link>
              <Link
                href={route("register")}
                className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-white border-t py-6 text-center text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Devon Kiss. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

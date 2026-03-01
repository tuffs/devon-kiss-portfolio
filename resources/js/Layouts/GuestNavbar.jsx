import { Link } from "@inertiajs/react";
import { BiCodeAlt, BiMenu } from "react-icons/bi";
import Dropdown from "@/Components/Dropdown";

export default function GuestNavbar() {
  return (
    <div className="border-b border-b-white p-3 flex flex-row justify-between items-center">
      {/* Logo, Far Left Area */}
      <div className="p-1 text-slate-100">
        <Link href="/">
          <div className="inline-flex items-center">
            <BiCodeAlt
              className="shrink-0 text-lg md:text-2xl"
              aria-hidden="true"
            />
            <span className="font-mono text-lg md:text-2xl my-0">
              &nbsp;DEVON KISS
            </span>
          </div>
        </Link>
      </div>

      {/* Right Side Links (Desktop & Mobile) */}
      <div className="flex flex-row items-center">
        {/* Desktop Links */}
        <div className="hidden md:flex p-1 space-x-2">
          <Link
            href={route("projects.index")}
            className="text-slate-300 hover:text-slate-200 text-sm"
          >
            Projects
          </Link>
        </div>
        {/* Mobile Dropdown Links */}
        <div className="flex md:hidden p-1">
          <Dropdown className="bg-inherit">
            <Dropdown.Trigger>
              <span className="inline-flex rounded-md ">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent px-3 py-2 text-sm font-medium leading-4 text-gray-400 transition duration-150 ease-in-out hover:text-gray-600 focus:outline-none bg-inherit"
                >
                  <BiMenu className="text-2xl" />
                </button>
              </span>
            </Dropdown.Trigger>
            <Dropdown.Content>
              <div className="bg-black border border-slate-600 shadow-xl rounded-sm mt-3">
                <Dropdown.Link
                  href={route("projects.index")}
                  className=" bg-inherit text-slate-200 hover:text-slate-300"
                >
                  Projects
                </Dropdown.Link>
              </div>
            </Dropdown.Content>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

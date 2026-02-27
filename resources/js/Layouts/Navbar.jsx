import { Link, usePage } from "@inertiajs/react";
import { BiCodeAlt, BiMenu } from "react-icons/bi";
import Dropdown from "@/Components/Dropdown";

export default function Navbar() {
  const user = usePage().props.auth.user ?? null;

  return (
    <>
      <div className="border-b border-b-white p-3 flex flex-row justify-between items-center">
        <div className="p-1 text-slate-100">
          <Link href="/">
            <div className="inline-flex items-center">
              <BiCodeAlt className="shrink-0 text-xl" aria-hidden="true" />
              <span className="font-mono text-sm md:text-base my-0">
                &nbsp;DEVON KISS
              </span>
            </div>
          </Link>
        </div>

        <div className="hidden md:flex md:flex-row justify-between p-1">
          {user ? (
            <div className="p-1 space-x-2">
              <Link
                href={route("projects.index")}
                className="text-slate-300 hover:text-slate-200 text-sm"
              >
                Projects
              </Link>
              <Link
                href={route("projects.create")}
                className="text-slate-300 hover:text-slate-200 text-sm"
              >
                Add Project
              </Link>
            </div>
          ) : (
            <div className="p-1 space-x-2">
              <Link
                href={route("projects.index")}
                className="text-slate-300 hover:text-slate-200 text-sm"
              >
                Projects
              </Link>
            </div>
          )}
        </div>

        <div className="flex md:hidden p-1">
          {user ? (
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
                  <Dropdown.Link
                    href={route("projects.create")}
                    className="bg-inherit text-slate-200 hover:text-slate-300"
                  >
                    + Project
                  </Dropdown.Link>
                </div>
              </Dropdown.Content>
            </Dropdown>
          ) : null}
        </div>

        <div className="flex flex-row justify-between p-1">
          {user ? (
            <div className="text-xs">
              <div className="relative ms-3 bg-inherit">
                <Dropdown className="bg-inherit">
                  <Dropdown.Trigger>
                    <span className="inline-flex rounded-md ">
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-transparent px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none bg-inherit"
                      >
                        {user.name}
                        <svg
                          className="-me-0.5 ms-2 h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </span>
                  </Dropdown.Trigger>

                  <Dropdown.Content>
                    <div className="bg-black border border-slate-600 shadow-xl rounded-sm mt-5">
                      <Dropdown.Link
                        href={route("profile.edit")}
                        className=" bg-inherit text-slate-200 hover:text-slate-300"
                      >
                        Profile
                      </Dropdown.Link>
                      <Dropdown.Link
                        href={route("logout")}
                        method="post"
                        as="button"
                        className="bg-inherit text-slate-200 hover:text-slate-300"
                      >
                        Log Out
                      </Dropdown.Link>
                    </div>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </>
  );
}

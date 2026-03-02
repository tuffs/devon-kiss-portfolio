import LinkedButton from "@/Components/LinkedButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FiExternalLink, FiEdit2 } from "react-icons/fi";
import { Head, router, usePage, Link } from "@inertiajs/react";

export default function Dashboard({ projects }) {
  const { auth } = usePage().props;

  const handleDelete = (project) => {
    if (confirm("Are you sure you want to delete this project?")) {
      router.delete(route("projects.destroy", project));
    }
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Admin Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="pl-6 md:pl-10 mb-0 md:mb-6">
            {auth.user?.is_admin && (
              <LinkedButton location={"/projects/create"} size={"md"}>
                Create New Project
              </LinkedButton>
            )}
          </div>
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
            <div className="flex flex-rows">
              <div className="w-full my-4 shadow rounded-md bg-inherit">
                <div>
                  <h3 className="text-2xl font-bold text-indigo-800">
                    Project Title
                  </h3>
                </div>
                <div>Description</div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="w-full border rounded-lg p-4 bg-gray-50 hover:shadow-xl"
                >
                  <a
                    href={`/projects/${project.slug}`}
                    className="font-bold text-lg text-indigo-600"
                  >
                    {project.title}
                  </a>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                    {project.short_description}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:underline flex items-center gap-2"
                    >
                      <FiExternalLink size={16} />
                      Visit Link
                    </a>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-4 border-t pt-4">
                    {auth.user?.is_admin && (
                      <Link
                        href={route("projects.edit", project.id)}
                        className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-2"
                      >
                        <FiEdit2 size={16} />
                        Edit Project
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

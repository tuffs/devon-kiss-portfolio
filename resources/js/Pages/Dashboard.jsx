import LinkedButton from "@/Components/LinkedButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="border rounded-lg p-4 bg-gray-50 shadow-sm"
                >
                  <a
                    href={`/projects/${project.slug}`}
                    className="font-bold text-lg text-indigo-600"
                  >
                    {project.title}
                  </a>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <a
                      href={project.url}
                      target="_blank"
                      className="text-sm text-blue-500 hover:underline"
                    >
                      Visit Link
                    </a>
                    <span className="text-xs text-gray-400">
                      ID: {project.id}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-4 border-t pt-4">
                    {auth.user?.is_admin && (
                      <>
                        <Link
                          href={route("projects.edit", project.id)}
                          className="text-indigo-600 hover:text-indigo-800 font-bold"
                        >
                          Edit Project
                        </Link>
                        <button
                          onClick={() => handleDelete(project)}
                          className="text-red-500 font-bold cursor-pointer transition hover:text-red-700"
                        >
                          Delete Project
                        </button>
                      </>
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

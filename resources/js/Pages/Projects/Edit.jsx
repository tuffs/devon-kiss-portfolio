import { Head, router, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ProjectForm from "./Form";

export default function Edit({ project }) {
  const { data, setData, post, processing, errors } = useForm({
    _method: "PUT",
    title: project.title || "",
    slug: project.slug || "",
    short_description: project.short_description || "",
    description: project.description || "",
    url: project.url || "",
    github_url: project.github_url || "",
    video_url: project.video_url || "",
    image: null,
    featured: project.featured === 1 || project.featured === true,
    order: project.order ?? 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("projects.update", project.id), {
      forceFormData: true,
    });
  };

  const handleDeleteProject = () => {
    const ok = window.confirm(
      "Are you absolutely sure you wish to delete this project?",
    );
    if (!ok) return;

    router.delete(route("projects.destroy", project.id), {
      preserveScroll: true,
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title={`Edit ${project.title}`} />
      <div className="py-12 max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Edit Project</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <ProjectForm
            data={data}
            setData={setData}
            errors={errors}
            processing={processing}
            submit={handleSubmit}
            submitLabel="Update Project"
            imagePath={project.image_path}
          />
        </div>

        <div className="mt-12 p-8 rounded-lg border border-red-300 bg-gradient-to-br from-red-50 to-red-100 text-red-900 w-full shadow-sm">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 mt-1">
              <svg
                className="w-6 h-6 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-red-900 mb-2">
                Danger Zone
              </h3>
              <p className="text-md text-red-800 leading-relaxed">
                This action cannot be undone. This will permanently delete your
                project, remove all associated data, and delete any uploaded
                images.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-red-200">
            <button
              className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-sm"
              onClick={() => handleDeleteProject()}
            >
              Delete Project
            </button>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

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

        <div className="mt-12 p-4 border border-red-600 bg-red-200 text-red-700 w-full">
          <h3 className="text-2xl font-bold">Danger Zone!</h3>
          <p className="text-md py-3 pb-12">
            Delete your project by pressing the button below. To do so, press on
            the button below and confirm that you want to delete the project.
            This will remove both the data and the image.{" "}
          </p>
          <div className="mx-auto text-center">
            <button
              className="text-xl text-white bg-red-700 border border-red-800 p-2"
              onClick={() => handleDeleteProject()}
            >
              DANGER: Press to Delete Project!
            </button>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

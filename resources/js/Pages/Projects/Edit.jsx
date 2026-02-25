import { Head, useForm } from "@inertiajs/react";
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
      </div>
    </AuthenticatedLayout>
  );
}

import { Head, Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function ProjectShow({ project }) {
  return (
    <GuestLayout>
      <Head title={project.title} />

      <div className="py-12">
        <div className="max-w-5xl mx-auto sm:px-6 lg:px-8">
          <Link
            href={route("projects.index")}
            className="text-indigo-600 hover:text-indigo-800 mb-6 inline-block"
          >
            ← Back to Projects
          </Link>

          <article className="bg-white rounded-lg shadow overflow-hidden">
            {project.image_path && (
              <img
                src={project.image_path}
                alt={project.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            )}

            <div className="p-8">
              <h1 className="text-4xl font-bold mb-4">{project.title}</h1>

              {project.featured && (
                <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded mb-6">
                  Featured Project
                </span>
              )}

              {project.short_description && (
                <p className="text-xl text-gray-700 mb-6">
                  {project.short_description}
                </p>
              )}

              <div className="prose max-w-none mb-8">
                <p>{project.description}</p>
              </div>

              <div className="flex flex-wrap gap-6">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    View Live Project
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
                  >
                    View on GitHub
                  </a>
                )}
              </div>
            </div>
          </article>
        </div>
      </div>
    </GuestLayout>
  );
}

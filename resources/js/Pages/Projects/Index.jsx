import { Head, Link } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function ProjectsIndex({ projects, flash }) {
  // Access the message via flash.message from ProjectController
  //  rediected responses on success.

  const message = flash?.message;

  return (
    <GuestLayout>
      <Head title="Devon Kiss - My Official Portfolio of Software Engineering Work." />

      <div className="py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              My Memorable Projects
            </h1>

            <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
              A selection of my work - ranging from full applications to simple
              website and small experiments.
            </p>
          </div>

          {message && (
            <div className="w-full bg-green-100 text-green-600">{message}</div>
          )}

          {projects.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              No projects available yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {projects.map((project) => (
                <div
                  key={project.slug}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  {project.image_url && (
                    <div className="aspect-video bg-gray-100">
                      <img
                        src={project.image_url}
                        alt={`${project.title} Project by Devon Kiss`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      <Link href={route("projects.show", project.slug)}>
                        {project.title}
                      </Link>
                    </h2>

                    {project.featured && (
                      <span className="inline-block mt-2 bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        Featured
                      </span>
                    )}

                    <p className="mt-3 text-gray-600 line-clamp-3">
                      {project.short_description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-4">
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className=""
                        >
                          Live Demo →
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          className="text-sm font-medium text-gray-700 hover:text-gray-900"
                        >
                          View on GitHub →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </GuestLayout>
  );
}

import { Head, useForm, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState } from "react";

export default function Create() {
  // setup the form input data with useForm asigned to destructured items
  // `data, setData, post, proessign, and errors` from `useForm`

  const { data, setData, post, processing, errors } = useForm({
    title: "",
    slug: "",
    short_description: "",
    description: "",
    url: "",
    github_url: "",
    video_url: "",
    image: null,
    featured: false,
    order: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateSlug = () => {
    if (data.title) {
      const slug = data.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      setData("slug", slug);
    }
  };

  const removeImage = () => {
    setData("image", null);
    setImagePreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("projects.store"), {
      forceFormData: true, // Ensures file upload triggers multipart/form-data
      onSuccess: () => {
        // Clear image preview from memory
        setImagePreview(null);
      },
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Create Project" />

      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Create Project</h1>
            <p className="mt-2 text-gray-600">
              Add a new project to your portfolio
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="space-y-6"
            >
              {/* Title Field */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Project Title <span className="text-red-600">*</span>
                  <input
                    id="title"
                    type="text"
                    onChange={(e) => setData("title", e.target.value)}
                    placeholder="My Amazing Web App"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    required
                  />
                  <InputError message={errors.title} className="mt-2" />
                </label>
              </div>

              {/* A Slug Field with Auto-Generate */}
              <div>
                <label
                  htmlFor="slug"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  URL Slug <span className="text-red-600">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    id="slug"
                    type="text"
                    value={data.slug}
                    onChange={(e) => setData("slug", e.target.value)}
                    placeholder="my-amazing-web-app"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                    required
                  />
                  <button
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition"
                    onClick={handleGenerateSlug}
                    type="button"
                  >
                    Generate
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Unique URL-friendly slug for /projects/:slug
                </p>
                <InputError message={errors.slug} className="mt-2" />
              </div>

              {/* Short Description Field */}
              <div>
                <label htmlFor="short_description" className="">
                  Short Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="short_description"
                  value={data.short_description}
                  onChange={(e) => setData("short_description", e.target.value)}
                  placeholder="A brief, compelling description of your project..."
                  rows="2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
                  maxLength="255"
                  required
                />
                <div className="mt-1 flex justify-between">
                  <p className="text-xs text-gray-500">
                    Used in project listings
                  </p>
                  <p className="text-xs text-gray-500">
                    {data.short_description.length}/255
                  </p>
                </div>
                <InputError
                  message={errors.short_description}
                  className="mt-2"
                />
              </div>

              {/* Full Description Field */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Description <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="description"
                  value={data.description}
                  onChange={(e) => setData("description", e.target.value)}
                  placeholder="Detailed description of project: what problem(s) does it solve, how did you use a technology in an interesting way, or how does this project meet the customers unique needs?"
                  rows="6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
                  required
                />
                <InputError message={errors.description} className="mt-2" />
              </div>

              {/* Project Live URL */}
              <div>
                <label
                  htmlFor="url"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Live Demo URL{" "}
                  <span className="text-gray-500 text-xs">(optional)</span>
                </label>
                <input
                  type="url"
                  id="url"
                  value={data.url}
                  onChange={(e) => setData("url", e.target.value)}
                  placeholder="https://myproject.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
                <p className="mt-1 text-xs text-gray-600">
                  Link where visitors can see the project in action
                </p>
                <InputError message={errors.url} className="mt-2" />
              </div>

              {/* GitHub URL */}
              <div>
                <label
                  htmlFor="github_url"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  GitHub URL{" "}
                  <span className="text-gray-500 text-xs">(optional)</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 font-medium">
                    https://github.com/
                  </span>
                  <input
                    id="github_url"
                    type="text"
                    value={data.github_url}
                    onChange={(e) => setData("github_url", `${e.target.value}`)}
                    placeholder="username/project-name"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Enter username/project-name (e.g., devon/my-project)
                </p>
                <InputError message={errors.github_url} className="mt-2" />
              </div>

              {/* Video URL */}
              <div>
                <label
                  htmlFor="video_url"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Video URL{" "}
                  <span className="text-gray-500 text-xs">(optional)</span>
                </label>
                <input
                  type="url"
                  id="video_url"
                  value={data.video_url}
                  onChange={(e) => setData("video_url", e.target.value)}
                  placeholder="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                />
                <p className="mt-1 text-xs text-gray-500">
                  YouTube or Vimeo embed URL for project demonstration
                </p>
                <InputError message={errors.video_url} className="mt-2" />
              </div>

              {/* Image Upload with Drag & Drop */}
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Project Image{" "}
                  <span className="text-gray-500 text-xs">(optional)</span>
                </label>
                <div className="flex flex-col gap-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-indigo-400 hover:bg-indigo-50 transition bg-gray-50">
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <label htmlFor="image" className="cursor-pointer block">
                      <div className="text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-12l-3.172-3.172a4 4 0 00-5.656 0L28 28M12 28l-3.172-3.172a4 4 0 00-5.656 0L2 28"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="mt-2 text-sm text-gray-600">
                          <span className="font-medium text-indigo-600 hover:text-indigo-500">
                            Click to upload
                          </span>
                          {" or drag and drop"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, GIF, WebP up to 5MB
                        </p>
                      </div>
                    </label>
                  </div>

                  {/* Image Preview */}
                  {imagePreview && (
                    <div className="relative">
                      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="mt-2 flex gap-2">
                        <p className="text-xs text-gray-500 flex-1">
                          Image preview
                        </p>
                        <button
                          type="button"
                          onClick={removeImage}
                          className="px-3 py-1 text-xs bg-red-100 text-red-700 hover:bg-red-200 rounded transition font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <InputError message={errors.image} className="mt-2" />
              </div>

              {/* Featured Checkbox */}
              <div className="flex items-start gap-3 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                <input
                  id="featured"
                  type="checkbox"
                  checked={data.featured}
                  onChange={(e) => setData("featured", e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer mt-0.5"
                />
                <div>
                  <label
                    htmlFor="featured"
                    className="text-sm font-medium text-gray-900 cursor-pointer"
                  >
                    Featured Project
                  </label>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Display this project prominently on your portfolio homepage
                  </p>
                </div>
              </div>

              {/* Display Order */}
              <div>
                <label
                  htmlFor="order"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Display Order{" "}
                  <span className="text-gray-500 text-xs">(optional)</span>
                </label>
                <input
                  id="order"
                  type="number"
                  value={data.order}
                  onChange={(e) => setData("order", e.target.value)}
                  placeholder="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  min="0"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Lower numbers appear first in the listing
                </p>
                <InputError message={errors.order} className="mt-2" />
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 pt-8 border-t border-gray-200">
                <PrimaryButton
                  disabled={processing}
                  className="inline-flex items-center px-6 py-2"
                >
                  {processing ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    "Create Project"
                  )}
                </PrimaryButton>
                <Link
                  href={route("projects.index")}
                  className="inline-flex items-center px-6 py-2 bg-gray-200 border border-transparent rounded-lg font-semibold text-sm text-gray-700 uppercase tracking-widest hover:bg-gray-300 focus:bg-gray-300 active:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

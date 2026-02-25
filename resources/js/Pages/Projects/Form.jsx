import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useState, useEffect } from "react";

export default function ProjectForm({
  data,
  setData,
  errors,
  processing,
  submit,
  submitLabel,
  imagePath = null,
}) {
  const [imagePreview, setImagePreview] = useState(
    imagePath ? `/storage/${imagePath}` : null,
  );

  // Synchronize preview if the imagePath prop changes (initial or edit)
  useEffect(() => {
    if (imagePath && !data.image) {
      setImagePreview(`/storage/${imagePath}`);
    }
  }, [imagePath]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData("image", file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
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
    // Note: If you want to explicitly delete the image on update,
    // you might need an additional field like 'remove_image'
  };

  return (
    <form onSubmit={submit} encType="multipart/form-data" className="space-y-6">
      {/* Title Field */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Project Title <span className="text-red-600">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={data.title}
          onChange={(e) => setData("title", e.target.value)}
          placeholder="My Amazing Web App"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          required
        />
        <InputError message={errors.title} className="mt-2" />
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
        <label
          htmlFor="short_description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Short Description <span className="text-red-600">*</span>
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
          <p className="text-xs text-gray-500">Used in project listings</p>
          <p className="text-xs text-gray-500">
            {data.short_description ? data.short_description.length : 0}/255
          </p>
        </div>
        <InputError message={errors.short_description} className="mt-2" />
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
          placeholder="Detailed description of project..."
          rows="6"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
          required
        />
        <InputError message={errors.description} className="mt-2" />
      </div>

      {/* URLs Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            value={data.url || ""}
            onChange={(e) => setData("url", e.target.value)}
            placeholder="https://myprojecturl.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
          <InputError message={errors.url} className="mt-2" />
        </div>

        {/* GitHub URL */}
        <div>
          <label
            htmlFor="github_url"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            GitHub Repo URL{" "}
            <span className="text-gray-500 text-xs">(optional)</span>
          </label>
          <input
            type="url"
            id="github_url"
            value={data.github_url || ""}
            onChange={(e) => setData("github_url", e.target.value)}
            placeholder="https://github.com/tuffs/my-repo-name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
          <InputError message={errors.github_url} className="mt-2" />
        </div>
      </div>

      {/* Video URL */}
      <div>
        <label
          htmlFor="video_url"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Video / Embed URL{" "}
          <span className="text-gray-500 text-xs">(optional)</span>
        </label>
        <input
          type="url"
          id="video_url"
          value={data.video_url || ""}
          onChange={(e) => setData("video_url", e.target.value)}
          placeholder="https://www.youtube.com/embed/..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        />
        <InputError message={errors.video_url} className="mt-2" />
      </div>

      {/* Image Upload with Preview & Keyboard Support */}
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
            <label
              htmlFor="image"
              className="cursor-pointer block focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
              tabIndex="0"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  document.getElementById("image").click();
                }
              }}
            >
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
                    Click to Upload
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
                  Current image preview
                </p>
                <button
                  type="button"
                  onClick={removeImage}
                  className="px-3 py-1 text-xs bg-red-100 text-red-700 hover:bg-red-200 rounded transition font-medium"
                >
                  Remove Selection
                </button>
              </div>
            </div>
          )}
        </div>
        <InputError message={errors.image} className="mt-2" />
      </div>

      {/* Featured & Order Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
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
              Display this project prominently on the portfolio homepage
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
            onChange={(e) => setData("order", parseInt(e.target.value) || 0)}
            placeholder="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            min="0"
          />
          <InputError message={errors.order} className="mt-2" />
        </div>
      </div>

      <div className="flex gap-4 pt-8 border-t border-gray-200">
        <PrimaryButton disabled={processing}>
          {processing ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing...
            </span>
          ) : (
            submitLabel
          )}
        </PrimaryButton>
      </div>
    </form>
  );
}

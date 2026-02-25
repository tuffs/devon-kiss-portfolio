import { Head, useForm, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import FlashMessage from "@/Components/FlashMessage";
import { useState } from "react";
import ProjectForm from "./Form";

export default function Create({ flash }) {
  // setup the form input data with useForm asigned to destructured items
  // `data, setData, post, proessign, and errors` from `useForm`

  const { data, setData, post, processing, errors } = useForm({
    title: "",
    slug: "",
    short_description: "",
    description: "",
    url: "",
    github_url: "https://github.com/tuffs/",
    video_url: "",
    image: null,
    featured: false,
    order: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("projects.store"), {
      forceFormData: true,
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Create Project" />
      <div className="py-12 max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Create Project</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <ProjectForm
            data={data}
            setData={setData}
            errors={errors}
            processing={processing}
            submit={handleSubmit}
            submitLabel="Create Project"
          />
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

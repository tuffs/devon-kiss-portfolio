<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->is_admin;
    }

    public function rules(): array
    {
        $project = $this->route('project'); // present on update routes

        return [
            'title'             => ['required', 'string', 'max:255'],
            'slug'              => [
                'required',
                'string',
                'max:255',
                Rule::unique('projects', 'slug')->ignore($project?->id),
            ],
            'short_description' => ['required', 'string', 'max:255'],
            'description'       => ['required', 'string'],
            'url'               => ['nullable', 'url'],
            'github_url'        => ['nullable', 'url', 'starts_with:https://github.com/'],
            'video_url'         => ['nullable', 'url'],
            'image'             => ['nullable', 'image', 'mimes:jpeg,png,gif,webp', 'max:5120'],
            'featured'          => ['sometimes', 'boolean'],
            'order'             => ['required', 'integer', 'min:0'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            // unchecked checkbox should become false
            'featured' => $this->boolean('featured'),

            // "just work" default if blank/missing
            'order' => $this->filled('order') ? (int) $this->input('order') : 1,
        ]);
    }

    public function messages(): array
    {
        return [
            'title.required'             => 'Project title is required.',
            'slug.required'              => 'URL slug is required.',
            'slug.unique'                => 'Slug already exists, try again.',
            'short_description.required' => 'Short description is required.',
            'short_description.max'      => 'Short description must not exceed 255 characters.',
            'description.required'       => 'Full description is required.',
            'image.image'                => 'The uploaded file must be an image.',
            'image.mimes'                => 'The image must be a jpeg, png, gif, or webp file.',
            'image.max'                  => 'Image may not be greater than 5MB.',
        ];
    }
}

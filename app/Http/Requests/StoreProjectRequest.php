<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProjectRequest extends FormRequest {
  /**
   * Determine if the user is authorized to make this request
   */
  public function authorize(): bool {
    return auth()->check() && auth()->user()->is_admin;
  }

  /**
   * Get the validation rules that apply to the request
   */
  public function rules(): array {
    return [
      'title'               => 'required|string|max:255',
      'slug'                => 'required|string|max:255|unique:projects,slug',
      'short_description'   => 'required|string|max:255',
      'description'         => 'required|string',
      'url'                 => 'nullable|url',
      'github_url'          => 'nullable|url',
      'video_url'           => 'nullable|url',
      'image'               => 'nullable|image|mimes:jpeg,png,gif,webp|max:5120',
      'featured'            => 'boolean',
      'order'               => 'nullable|integer|min:0',
    ];
  }

  /**
   * Get custom messages for validator errors.
   */
  public function messages(): array {
    return [
      'title.required'              => 'Project title is required.',
      'slug.required'               => 'URL slug is required.',
      'slug.unique'                 => 'Slug already exists, try again.',
      'short_description.required'  => 'Short description is required.',
      'short_description.max'       => 'Short description must not exceed 255 characters.',
      'description:required'        => 'Full description is required.',
      'image.image'                 => 'The uploaded file must be an image',
      'image:mimes'                 => 'The image must be a: jpeg, png, gif, or webp file type',
      'image.max'                   => 'Image may not be > 5MB.',
    ];
  }
}

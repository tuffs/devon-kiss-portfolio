<?php

use App\Models\Project;

it('exists', function () {
    expect(class_exists(Project::class))->toBeTrue();
});

it('has the expected fillable attributes', function () {
    $project = new Project;

    expect($project->getFillable())->toEqual([
      'title',
      'slug',
      'description',
      'short_description',
      'url',
      'github_url',
      'image_url',
      'featured',
      'order'
    ]);
});

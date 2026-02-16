<?php

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it ('can generate a valid project with realistic data', function () {
  $user = User::factory()->create();

  $project = Project::factory()
    ->for($user)
    ->create();

  expect($project)->toBeInstanceOf(Project::class)
    ->title->toBeString()->not()->toBeEmpty()
    ->slug->toBeString()->toMatch('/^[a-z0-9-]+$/')
    ->description->toBeString()->toBeLongerThan(200)
    ->short_description->toBeString()
    ->url->toBeString()->toStartWith('https://')
    ->github_url->toBeString()->toStartWith('https://')
    ->image_path->toBeString()->toStartWith('public/storage')
    ->video_url->toBeString()->toStartWith('https://')
    ->featured->toBeBool()
    ->order->toBeInt()
    ->user_id->toBe($user->id);

  expect(strlen($project->short_description))->toHaveLengthBetween(50, 160);
});

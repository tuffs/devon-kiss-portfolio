<?php

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('authorized users can create projects', function () {
  $admin = User::factory()->create(['is_admin' => true]);

  $projectData = [
    'title' => "Controller Test Project",
    'slug' => "controller-test-project",
    'description' => "Controller Test Project regular Description",
    'short_description' => "Short Controller Test Description",
    'url' => "https://controller-test-project.com/",
    'github_url' => 'https://github.com/tuffs/controller-test-project',
    'image_path' => '/projects/my-controller-test-project.png',
    'featured' => false,
    'order' => 0,
    'video_url' => 'https://youtube.com/?w=2342334234',
  ];

  $response = $this
    ->actingAs($admin)
    ->post(route('projects.store'), $projectData);

  $response->assertRedirect(route('projects.index'));
  $this->assertDatabaseHas('projects', [
    'title' => "Controller Test Project",
    'user_id' => $admin->id,
  ]);
});

test('unauthorized users can not create projects', function () {
  $user = User::factory()->create(['is_admin' => false]);

  $projectData = [
    'title' => "Controller Test Project",
    'slug' => "controller-test-project",
    'description' => "Controller Test Project regular Description",
    'short_description' => "Short Controller Test Description",
    'url' => "https://controller-test-project.com/",
    'github_url' => 'https://github.com/tuffs/controller-test-project',
    'image_path' => '/projects/my-controller-test-project.png',
    'featured' => false,
    'order' => 0,
    'video_url' => 'https://youtube.com/?w=2342334234',
  ];

  $response = $this
    ->actingAs($user)
    ->post(route('projects.store'), $projectData);

  $response->assertStatus(403);
  $this->assertDatabaseMissing('projects', [
    'title' => "Controller Test Project",
  ]);
});

test('authorized users can edit projects', function () {
});

test('authorized users can delete projects', function () {
  $user = User::factory()->create([
    'is_admin' => true
  ]);
  $project = Project::factory()->create(['user_id' => $user->id]);

  $response = $this
    ->actingAs($user)
    ->delete(route('projects.destroy', $project));

  $response->assertRedirect(route('projects.index'));
  $this->assertDatabaseMissing('projects', ['id' => $project->id]);
});

test('unauthorized users can not delete projects', function () {
  $admin = User::factory()->create(['is_admin' => true]);
  $user = User::factory()->create();

  $project = Project::factory($admin)->create(['user_id' => $admin->id]);

  $response = $this
    ->actingAs($user)
    ->delete(route('projects.destroy', $project));

  $response->assertStatus(403);
  $this->assertDatabaseHas('projects', [
    'id' => $project->id,
    'user_id' => $admin->id,
  ]);
});

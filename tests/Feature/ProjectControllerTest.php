<?php

use App\Models\Project;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

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

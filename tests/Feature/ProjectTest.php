<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectTest extends TestCase {
  use RefreshDatabase;
  public function test_project_page_shows_empty_set_of_projects(): void {
    // check for No Projects Available Response, first
    $response = $this->get('/projects');
    $response->assertOk();

    $response->assertInertia(fn ($page) =>
      $page
        ->component('Projects/Index')
        ->has('projects', 0)
    );
  }

  public function test_projects_page_is_displayed(): void {
    $user = User::factory()->create();
    $projects = Project::factory(10)->for($user)->create();

    // Test that there are
    $response = $this->get('/projects');
    $response->assertOk();
  }

  public function test_multiple_projects_are_displayed(): void {
    // Create Projects (needs a User as well)
    $user = User::factory()->create();
    $projects = Project::factory(10)->for($user)->create();

    // Assert that the page no longer shows the empty message
    $response = $this->get('/projects');
    $response->assertOk();
    $response->assertDontSee('No projects available yet.');

    // Assert that at least two projects are visible by checking
    // for their titles
    $response->assertSee($projects[0]->title);
    $response->assertSee($projects[1]->title);

    $response->assertInertia(fn ($page) =>
      $page
        ->component('Projects/Index')
        ->has('projects', 10)
    );
  }
}

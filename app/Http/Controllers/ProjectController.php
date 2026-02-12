<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
      $projects = Project::query()
        ->orderBy('order')
        ->orderBy('title')
        ->get([
          'id',
          'title',
          'slug',
          'short_description',
          'image_url',
          'url',
          'github_url',
          'featured',
          'order',
        ]);

      return Inertia::render('Projects/Index', [
        'projects' => $projects,
      ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project) {
      // Optional: you can eager-load or limit fields if needed
      return Inertia::render('Projects/Show', [
        'project' => $project->only([
          'title',
          'slug',
          'description',
          'short_description',
          'url',
          'github_url',
          'image_url',
          'featured',
          'order',
          'created_at',
        ]),
      ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}

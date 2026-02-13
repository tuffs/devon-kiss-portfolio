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
    public function create() {
      // Renders the React form for creating a project
      return Inertia::render('Projects/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
      // Stores validated data into the database
      // based on the provided request

      $validated = $this->fieldValidation($request);

      // user_id is excluded from the $fillable array,
      // this value is based off of user relationship
      // to the database table entry for Projects

      $request->user()->projects()->create($validated);

      return redirect()->route('projects.index')
        ->with('message', 'Project created successfully.');
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
    public function edit(Project $project) {
        // Passes the project instance to the React Edit view
        return Inertia::render('Projects/Edit', [
          'project' => $project
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project) {
      // Updates validated data into the database
      // based on the provided request
      $validated = $this->fieldValidation($request, $project);

      $project->update($validated);

      return redirect()->route('projects.index')
        ->with('message', 'Project updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()->route('projects.index')
          ->with('message', 'Project deleted successfully');
    }

    /*
     * Validation function for our create and update
     * methods.
     */
    protected function fieldValidation(Request $request, ?Project $p = null) {
      return $request->validate([
        'title'              =>    'required|string|max:255',
        'slug'               =>    'required|string|unique:projects,slug' . ($p?','.$p->id:''),
        'description'        =>    'required|string',
        'short_description'  =>    'required|string|max:255',
        'url'                =>    'nullable|url',
        'github_url'         =>    'nullable|url',
        'featured'           =>    'boolean',
        'order'              =>    'integer',
      ]);
    }
}

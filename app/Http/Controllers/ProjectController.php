<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProjectController extends Controller {
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
          'image_path',
          'video_url',
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
    public function store(StoreProjectRequest $request) {
      /*
      * Die and Dump for Ensuring Image Files Hit the Server
      */

      // dd($request->allFiles(), $request->file('image'));

      /*
      * Validate our $request instance's data
      */
      $validated = $request->validated();

      /*
      * Handle image upload for filename as UUID value w/ extension
      */
      if ($request->hasFile('image')) {
        $file = $request->file('image');

        // This explicitly uses the 'public' disk (storage/app/public)
        $path = $file->store('projects', 'public');

        // Verify it actually hit the disk
        if (!Storage::disk('public')->exists($path)) {
           return back()->withErrors(['image' => 'File failed to save to disk.']);
        }

        $validated['image_path'] = $path;
      }

      /*
       * Actually create the database table entry here.
       */
      auth()->user()->projects()->create($validated);

      /*
       * Redirect the
       */
      return redirect()->route('projects.index')
        ->with('message', 'Project created successfully!');
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
          'image_path',
          'video_url',
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
    public function update(StoreProjectRequest $request, Project $project) {
      // Updates validated data into the database
      // based on the provided request
      $validated = $request->validated();
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
        'image_path'         =>    'string',
        'video_url'          =>    'string',
      ]);
    }
}

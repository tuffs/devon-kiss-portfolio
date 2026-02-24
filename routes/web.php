<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProjectController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
  return Inertia::render('Welcome', [
    'canLogin' => Route::has('login'),
    'canRegister' => Route::has('register'),
    'laravelVersion' => Application::VERSION,
    'phpVersion' => PHP_VERSION,
  ]);
});

// Authenticated Project Routes: ProjectController@{@create, @store, @edit, @update}
Route::middleware(['auth', 'admin'])->group(function () {
  // Full resource CRUD (except index & show which are already public)
  Route::resource('projects', ProjectController::class)
    ->only(['create', 'store', 'edit', 'update', 'destroy']);
});

// Public Project Routes: ProjectController@index, ProjectController@show
Route::prefix('projects')->name('projects.')->group(function () {
  Route::get('/', [ProjectController::class, 'index'])
    ->name('index');

  Route::get('/{project:slug}', [ProjectController::class, 'show'])
    ->name('show');
});

Route::middleware(['auth'])->group(function () {
  Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['verified'])
    ->name('dashboard');

  Route::middleware('verified')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
  });
});

require __DIR__.'/auth.php';

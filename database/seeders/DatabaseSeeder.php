<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application database.
   */
  public function run(): void {

    Storage::disk('public')->deleteDirectory('projects');

    $this->call([
      UserSeeder::class,
      AdminSeeder::class,
      ProjectSeeder::class,
    ]);

  }
}

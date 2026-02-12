<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder {
  public function run(): void {

    // @TODO: Replace this with where('isAdmin', true)->first();
    //        When I have migrated the database appropriately
    //        to include this particular field.
    $admin = User::where('email', 'devon@3dmandt.com')->first();

    if ($admin) {
      Project::factory()
        ->for($admin)
        ->count(10)
        ->create();
    }
  }
}


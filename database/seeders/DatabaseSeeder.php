<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application database.
     */
    public function run(): void {

      $this->call([
        UserSeeder::class,
        AdminSeeder::class,
        ProjectSeeder::class,
      ]);

    }
}

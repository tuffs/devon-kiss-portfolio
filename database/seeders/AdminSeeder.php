<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void {
    $admin = \App\Models\User::updateOrCreate(
      ['email' => 'devon@3dmandt.com'],
      [
        'name' => 'Devon',
        'password' => Hash::make(env('ADMIN_PASSWORD', 'password')),
      ]
    );

    // Give Devon 10 projects using the Factory
    \App\Models\Project::factory()
      ->count(10)
      ->for($admin) // handles the foreign key (user_id) automagically
      ->create();
  }
}

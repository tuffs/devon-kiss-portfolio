<?php

namespace Database\Seeders;


use App\Models\User;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void {
    // Check if admin already exists, preventing dupes
    if (!User::where('is_admin', true)->where('email', 'devon@3dmandt.com')->exists()) {
      User::factory()->admin()->create();
    }
  }
}

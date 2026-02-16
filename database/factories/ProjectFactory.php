<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ProjectFactory extends Factory {
    protected $model = Project::class;

    public function definition(): array {
      $title = $this->faker->unique()->catchPhrase();

      return [
        'title' => $title,
        'slug' => Str::slug($title),
        'short_description' => $this->faker->realTextBetween(100,160),
        'description' => $this->faker->paragraphs(4, true),
        'url' => 'https://' . $this->faker->domainName() . '/' . $this->faker->slug(),
        'github_url' => 'https://github.com/' . $this->faker->userName() . '/' . Str::slug($title),
        'featured' => $this->faker->boolean(20), // 20% change of being true
        'order' => $this->faker->numberBetween(1, 100),
        'image_path' => 'public/storage/image_' . $this->faker->unique()->numberBetween(500, 1000) . '.png',
        'video_url' => 'https://' . $this->faker->domainName() . '/' . $this->faker->slug(),
      ];
    }

    // Useful state: make a featured project, realistically
    public function featured() {
      return $this->state(fn (array $attributes) => [
        'featured' => true,
        'order' => $this->faker->numberBetween(1, 10), // featured item usually higher up
      ]);
    }
}

<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    protected static ?string $password;

    /*
     * Basic user creation with User::definition() Implement User::definition();
     */
    public function definition(): array {
        return [
            'name'               =>    fake()->name(),
            'email'              =>    fake()->unique()->safeEmail(),
            'email_verified_at'  =>    now(),
            'password'           =>    static::$password ??= Hash::make('password'),
            'remember_token'     =>    Str::random(10),
        ];
    }

    /*
     * Define specific state for the site administrator User
     * We are specifying obfuscated Name, Email Address,
     * and Password via the Environment Variables
     * Finally, we implement the lynch pin option for users which
     * tells us this *IS* an Admin, officially, with 'is_admin' => true
     * in our attributes alias.
     */
    public function admin(): static {
      return $this->state(fn (array $attributes) => [
        'name'                   =>    env('ADMIN_NAME', 'Admin Name'),
        'email'                  =>    env('ADMIN_EMAIL', 'admin@test.com'),
        'password'               =>    Hash::make(env('ADMIN_PASSWORD', 'admin_password')),
        'is_admin'               =>    true,
      ]);
    }

    /*
     * Ensures that the email_verified_at is NULL with the unverified method
     * such as User::admin()->unverified();
     */
    public function unverified(): static {
        return $this->state(fn (array $attributes) => [
            'email_verified_at'  =>    null,
        ]);
    }
}

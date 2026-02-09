<?php

use Pest\Expectation;
/*
 * -----------------------
 * Pest Configuration
 * -----------------------
 *
 * Here is where you can register Pest plugins,
 * custom expectations, and other configuration
 * that should be applied globally.
 *
 */

uses(Tests\TestCase::class)->in('Unit', 'Feature');

expect()->extend('toHaveLengthBetween', function (int $min, int $max) {
  $length = strlen($this->value);

  return $this->toBeGreaterThanOrEqual($min)
              ->toBeLessThanOrEqual($max);
});

expect()->extend('toBeLongerThan', function (int $minLength) {
  $actLength = strlen($this->value);
  return $this->toBeGreaterThan($minLength);
});

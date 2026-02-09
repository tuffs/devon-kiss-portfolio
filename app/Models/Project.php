<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model {
  use HasFactory;

  protected $fillable = [
    'title',
    'slug',
    'description',
    'short_description',
    'url',
    'github_url',
    'image_url',
    'featured',
    'order',
  ];

  protected $casts = [
    'featured' => 'boolean',
    'order' => 'integer',
  ];

  public function user() {
    return $this->belongsTo(User::class);
  }
}

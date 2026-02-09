<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            // Raname image_path -> image_url
            $table->renameColumn('image_path', 'image_url');

            // Add missing columns
            $table->string('short_description')->nullable()->after('description');
            $table->string('github_url')->nullable()->after('url');
            $table->boolean('featured')->default(false)->after('image_url');
            $table->unsignedInteger('order')->default(0)->after('featured');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn([
                'short_description',
                'github_url',
                'featured',
                'order',
            ]);

            // Reverse the rename (put back original name)
            $table->renameColumn('image_url', 'image_path');
        });
    }
};

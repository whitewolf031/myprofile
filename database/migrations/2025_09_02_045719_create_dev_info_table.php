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
        Schema::create('dev_info', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('position');
            $table->integer('experience')->default(0);
            $table->string('profile_image')->nullable();
            $table->text('about')->nullable();
            $table->string('email')->unique();
            $table->string('phone')->unique()->nullable();
            $table->string('file_path'); // resume uchun
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dev_info');
    }
};

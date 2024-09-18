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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('fullname')->nullable();
            $table->unsignedSmallInteger('age')->nullable();
            $table->string('address')->nullable();
            $table->string('description', 1500)->nullable();
            $table->enum('last_education', ['S3', 'S2', 'S1', 'SMA/Sederajat', 'SMP/Sederajat', 'SD/Sederajat'])->nullable();
            // $table->enum('last_education', ['S3', 'S2', 'S1', 'SMA/Sederajat', 'SMP/Sederajat', 'SD/Sederajat'])->default('S1')->nullable();
            $table->string('document_url')->nullable();
            // $table->string('document_url')->nullable()->default('http://localhost:8000/files/applications/default.pdf');
            // $table->string('image')->nullable()->default('http://localhost:8000/files/profiles/default.png');
            $table->unsignedBigInteger('user_id')->nullable();
            // $table->unsignedBigInteger('dream_job')->nullable();
            // $table->enum('status', ['unemployed', 'employed'])->default('unemployed');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');//SET NULL
            // $table->foreign('dream_job')->references('id')->on('categories')->onDelete('cascade');//SET NULL
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};

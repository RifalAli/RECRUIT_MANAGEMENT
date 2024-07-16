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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('location');
            $table->string('description');
            $table->string('image')->default('http://localhost:8000/files/companies/default.png');
            $table->unsignedBigInteger('user_id')->nullable();
            $table->unsignedBigInteger('job_count')->default(0);
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');//SET NULL
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};

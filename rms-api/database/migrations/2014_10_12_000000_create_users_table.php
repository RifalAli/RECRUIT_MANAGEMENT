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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->boolean('verify')->default(0);
            $table->string('otp', 6)->nullable();
            $table->string('nik', 16);
            $table->string('phone', 12);
            $table->date('birthdate');
            $table->string('token')->nullable();
            $table->enum('role', ['job seeker', 'company', 'admin'])->default('job seeker');
            $table->string('image')->default('default.png');
            $table->enum('status', ['active','inactive'])->default('active');
            $table->boolean('isBanned')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};

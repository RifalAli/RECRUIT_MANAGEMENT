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
        Schema::create('main_jobs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->float('salary', 10, 2)->default(0.00);
            $table->timestamp('expire_at')->default(now());
            $table->unsignedBigInteger('cat_id')->nullable();
            $table->unsignedBigInteger('company_id')->nullable();
            $table->string('icon')->default('http://localhost:8000/files/jobs/default.png');
            $table->longText('description')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->enum('type', ['full time', 'part time'])->default('full time');
            $table->boolean('is_featured')->nullable();
            $table->foreign('cat_id')->references('id')->on('categories')->onDelete('cascade');
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');//SET NULL
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('main_jobs');
    }
};

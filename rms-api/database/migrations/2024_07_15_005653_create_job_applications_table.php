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
        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();
            // $table->string('title');
            // $table->longText('description')->nullable();
            // $table->string('document_url')->default('http://localhost:8000/files/applications/default.pdf');
            $table->enum('status', ['pending', 'accepted', 'rejected'])->default('pending');
            // $table->timestamp('application_date')->default(now());
            $table->unsignedBigInteger('profile_id')->nullable();
            $table->unsignedBigInteger('company_id')->nullable();
            $table->unsignedBigInteger('job_id')->nullable();

            $table->foreign('profile_id')->references('id')->on('profiles')->onDelete('cascade');
            $table->foreign('company_id')->references('id')->on('companies')->onDelete('cascade');//SET NULL
            $table->foreign('job_id')->references('id')->on('main_jobs')->onDelete('cascade');//SET NULL
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_applications');
    }
};

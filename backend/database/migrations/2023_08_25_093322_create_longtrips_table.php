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
        Schema::create('longtrips', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('desc');
            $table->decimal('price');
            $table->string('trip');
            $table->string('options');
            $table->string('deactivate')->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('longtrips');
    }
};

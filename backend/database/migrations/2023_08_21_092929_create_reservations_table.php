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
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->string('startPoint');
            $table->string('endPoint');
            $table->string('disp');
            $table->boolean('tripType');
            $table->datetime('date')->nullable();
            $table->decimal('price');
            $table->decimal('distance');
            $table->decimal('min');
            $table->decimal('heure')->nullable();
            $table->string('status')->default('Encore');
            $table->string('deactivate')->default('active');
            $table->unsignedBigInteger('vehicule_id');
            $table->foreign('vehicule_id')->references('id')->on('vehicules')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservations');
    }
};

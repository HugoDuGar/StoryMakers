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
        Schema::create('chapter_events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('number');
            $table->text('body');
            $table->unsignedBigInteger('history_id');
            $table->timestamps();

            $table->foreign('history_id')->references('id')->on('history_for_your_events')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chapter_events');
    }
};

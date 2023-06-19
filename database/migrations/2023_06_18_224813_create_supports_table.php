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
        Schema::create('supports', function (Blueprint $table) {
            $table->id();
            $table->string('cpf');
            $table->string('protocolo');
            $table->enum('canal', ['email', 'whatsapp','loja', 'site']);
            $table->date('data');
            $table->string('tipo_de_suporte');
            $table->text('detalhes_suporte');
            $table->enum('status',['a', 'p', 'c']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('supports');
    }
};

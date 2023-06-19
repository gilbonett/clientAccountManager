<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Support extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'protocolo',
        'cpf',
        'canal',
        'tipo_de_suporte',
        'detalhes_suporte',
        'data',
        'status'
    ];

}

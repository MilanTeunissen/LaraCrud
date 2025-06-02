<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class product extends Model
{
    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }
    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'user_id',
    ];

}

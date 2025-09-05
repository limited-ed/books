<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reviews extends Model
{
    /** @use HasFactory<\Database\Factories\ReviewsFactory> */
    use HasFactory;

    protected $table = 'reviews';
    protected $fillable=['username', 'rating', 'comment'];

    public function book():BelongsTo
    {
        $this->belongsTo(Books::class);
    }
}

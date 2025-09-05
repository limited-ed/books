<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

use Illuminate\Database\Eloquent\Builder;
/** @mixin Builder */
class Books extends Model
{
    /** @use HasFactory<\Database\Factories\BooksFactory> */
    use HasFactory;

    protected $table = 'books';
    protected $fillable = ['title','author','year','genre','description'];

    function reviews():HasMany
    {
        return $this->hasMany(Reviews::class);
    }
}

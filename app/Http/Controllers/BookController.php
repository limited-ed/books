<?php

namespace App\Http\Controllers;

use App\Models\Books;
use Illuminate\Http\Request;

class BookController extends Controller
{
    function index()
    {
        $books=Books::all();
        return response()->json($books);
    }

    public function show($id)
    {
        $book = Books::with('reviews')->where('id', $id)->first();
        return response()->json($book);
    }
}

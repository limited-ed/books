<?php

namespace App\Http\Controllers;

use App\Models\Books;
use App\Models\Reviews;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReviewsController extends Controller
{
    //
    function store(Request $request, $id)
    {
        if (Books::where('id', $id)->exists()) {
            $validator = Validator::make(
                $request->all(),
                [
                    'username' => 'required|max:50',
                    'rating' => 'required|numeric|between:1,5'
                ],
                [
                    'required' => 'Поле :attribute не должно быть пустым',
                    'username.max' => 'Имя пользователя должно быть не более 50 символов',
                    'rating.between' => 'Рейтинг должен быть между :min и :max.'
                ]
            );

            $validator->validate();

            $review = new Reviews();
            $review->books_id = $id;
            $review->username = $request->username;
            $review->rating = $request->rating;
            $review->comment = $request->comment;

            try {
                $review->save();
                return response()->json($review);
            } catch (\Exception $e) {
                return response()->json([
                    'message' => 'Произошла ошибка при сохранении данных'
                ], 500);
            }
        } else {
            return response()->json([
                "message" => "Book not found",
                404
            ]);
        }
    }
}

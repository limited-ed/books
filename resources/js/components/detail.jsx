import React from 'react';
import { useEffect, useState } from 'react';
import apiConfiguration from './../settings.js';
import { useParams } from 'react-router-dom';


function Detail() {
    const { id } = useParams();
    const [book, setBook] = useState({ author: "", description: "", genre: "", id: 0, reviews: [], title: "", year: 0 })
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false)
    const [validation, setValidation] = useState({});
    const [review, setReview] = useState({ username: "", rating: 0, comment: "" })


    const fetchData = async (id) => {
        try {
            let path = apiConfiguration.apiEndpoints.books.replace(":id", id.toString())
            const response = await fetch(path)
            if (!response.ok) {
                throw new Error("Ошибка сервера");
            }
            let data = await response.json();
            if (!data.reviews) data.reviews = [];
            setBook(data);
        } catch (error) {
            setError(true);
        }
        finally {
            setLoading(false);
        }
    }


    const sendReview = async (review) => {
        try {
            let path = apiConfiguration.apiEndpoints.reviews.replace(":id", id.toString());
            const response = await fetch(path,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify(review)
                });
            if (!response.ok) {
                throw JSON.parse(await response.text());
            }
            let newReview = await response.json();
            setBook({ ...book, reviews: [...book.reviews, newReview] });
            setReview({ comment: "", rating: 0, username: "" });
            setValidation({});
            setError(false);
        }
        catch (error) {
            if (typeof (error.errors) === "undefined") {
                setError(true);
            }
            let ve = {}
            for (var prop in error.errors) {
                ve[prop] = error.errors[prop].join("");
            }
            setValidation(ve);
        }
        finally {

        }
    }

    useEffect(() => {
        if (id) {
            fetchData(Number(id));
        }
    }, []);


    if (loading && !error) {
        return (
            <h5>Загрузка</h5>
        )
    }

    const hidden = {
        display: error ? 'block' : 'hidden'
    }

    function addReview(formData) {
        setError(false);
        const data = {
            username: formData.get('username'),
            rating: +formData.get('rating'),
            comment: formData.get('comment')
        };
        sendReview(data);
    }

    return (
        <>
            <div className={!error ? "invisible" : ""}> Ошибка сервера</div>
            <div className={!error ? "book-detail" : "invisible"}>
                Книга # {id}
                <div className='book'>
                    <h4>
                        Автор: {book?.author}
                    </h4>
                    <h4>
                        Название: {book?.title}
                    </h4>
                    <h4>
                        <span>Год: {book?.year} </span><span>Жанр: {book?.genre}</span>
                    </h4>
                    <p>Описание:</p>
                    <p>
                        {book?.description}
                    </p>
                </div>
                <div className="reviews">
                    <details>
                        <summary>Отзывы: {book?.reviews.length}</summary>
                        <div>
                            {book?.reviews.map((review, index) => (
                                <div className='review' key={index}>
                                    <p>
                                        <span>Имя:</span> {review.username}
                                    </p>
                                    <p className={review.rating<3?"red":"green"}>
                                        <span>Рейтинг: </span> {review.rating}
                                    </p>
                                    <div>
                                        <span className='comment-header'>Коментарий:</span> 
                                        <p className='comment'>{review.comment}</p> 
                                    </div>

                                </div>
                            ))}
                        </div>

                    </details>
                    <div className="review-form">
                        <h5>Оставить отзыв {validation.username}</h5>

                        <form action={addReview}>
                            <div className={typeof (validation.username) != 'undefined' ? "error" : "normal"}>
                                <label htmlFor="username">Введите имя (50 символов)</label>
                                <input type="text" name="username" placeholder="Имя пользователя"/>
                                <p> Ошибка: <span>{validation.username}</span></p>
                            </div>

                            <div className={typeof (validation.rating) != 'undefined' ? "error" : "normal"}>
                                <label htmlFor="rating">Введите рейтинг (1-5)</label>
                                <input type="number" name="rating" placeholder="Рейтинг" />

                                <p> Ошибка: <span className="font-normal">{validation.rating}</span></p>
                            </div>

                            <div className='normal'>
                                <label htmlFor="comment">Введите имя (50 символов)</label>
                                <textarea name="comment" placeholder="Коментарий" cols={70} rows={7}></textarea>
                            </div>

                            <button className="btn" type="submit" >
                                Отправить отзыв
                            </button>
                        </form>


                    </div>
                </div>

            </div>
        </>

    );

}

export default Detail;
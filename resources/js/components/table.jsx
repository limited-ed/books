import React from 'react';
import { NavLink } from 'react-router-dom';

function Table(props) {
    return (
        <div className="books-component">
            <table >
                <thead className="books-header">
                    <tr>
                        <th>Название</th>
                        <th>Автор</th>
                        <th>Год</th>
                        <th>Жанр</th>
                        <th>Описание</th>
                        <th>Подробнее</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {
                        props.books.map((book, index) => (
                            <tr key={index} className="bg-gray-100">
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.year}</td>
                                <td>{book.genre}</td>
                                <td>{book.description}</td>
                                <td><NavLink to={"/book/" + book.id}>Подробнее</NavLink> </td>
                            </tr>
                        ))
                    }


                </tbody>
            </table>
        </div>
    );
};

export default Table;
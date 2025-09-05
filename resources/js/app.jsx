import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router";

import Books from './components/books';
import Detail from './components/detail'

import '../css/app.css';

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Books />} />
                    <Route path="/book/:id" element={<Detail />} />
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    );
}
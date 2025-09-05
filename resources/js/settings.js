export const apiConfiguration = {
    apiHost: 'http:\\localhost:8000',
    apiEndpoints: {
        allBooks: '/api/books',
        books:'/api/books/:id',
        reviews:'/api/books/:id/reviews',

    }
};

export default apiConfiguration;
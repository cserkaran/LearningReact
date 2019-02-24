import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import {shuffle,sample} from 'underscore';

const authors = [
    {
        name:'Mark Twain',
        imageUrl: 'images/authors/marktwain.jpg',
        imageSource: 'Wikimedia commons',
        books:['The Adventures of Huckleberry Finn']
    },
    {
        name:'Joseph Conrad',
        imageUrl: 'images/authors/josephconrad.jpg',
        imageSource: 'Wikimedia commons',
        books:['Heart of Darkness']
    },
    {
        name:'J K Rowling Conrad',
        imageUrl: 'images/authors/jkrowling.jpg',
        imageSource: 'Wikimedia commons',
        books:['Harry Potter and the Sorcerers Stone']
    },
    {
        name:'Stephen King',
        imageUrl: 'images/authors/stephenking.jpg',
        imageSource: 'Wikimedia commons',
        books:['The Shining', 'IT']
    },
    {
        name:'Charles Dickens',
        imageUrl: 'images/authors/charlesdickens.jpg',
        imageSource: 'Wikimedia commons',
        books:['David Copperfield', 'A tale of two cities']
    },
    {
        name:'William Shakespeare',
        imageUrl: 'images/authors/williamshakespeare.jpg',
        imageSource: 'Wikimedia commons',
        books:['Hamlet', 'Macbeth', 'Romeo and Juliet']
    }
]

function getTurnData(authors){
    const allBooks = authors.reduce(function(p,c,i){
        return p.concat(c.books);
    },[]);


    const fourRandomBooks = shuffle(allBooks).slice(4);

    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) => 
            author.books.some((title) => title === answer))
    };
}

const state = { 
    turnData: getTurnData(authors),
    highlight:''
}

function onAnwserSelected(answer){
    const isCorrect = state.turnData.author.books.some((book) => book === answer);
    state.highlight = isCorrect ? 'correct' : 'wrong';
    render();
}

function render(){
    ReactDOM.render(<AuthorQuiz {...state} onAnwserSelected={onAnwserSelected}/>, document.getElementById('root'));
}

render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

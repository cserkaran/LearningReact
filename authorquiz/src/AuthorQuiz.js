import React from 'react';
import './App.css';
import './bootstrap.min.css'
import { Link } from 'react-router-dom';

function Hero(){
  return (
    <div className="row">
      <div className="jumbotron col-10 offset-1">
        <h1>Author Quiz</h1>
        <p>Select the book written by the author shown</p>
      </div>
    </div>
  );
}

function Book({title,onClick}){
  return (<div className="answer" onClick={() => {onClick(title);}} >
    <h4>{title}</h4>
  </div>)
}

function Turn({author,books,highlight,onAnwserSelected}){

  function highlightToBgColor(highlight){
    const mapping = { 
      'none': '',
      'correct' : 'green',
      'wrong' : 'red'
    };

    return mapping[highlight];
  }

  return(<div className="row turn" style={{ backgroundColor: highlightToBgColor(highlight)}}>
    <div className="col-4 offset-1">
      <img src={author.imageUrl} className="authorImage" alt="Author"></img>
    </div>
    <div className="col-6">
      {books.map((title) =>  <Book title={title} key={title} onClick={onAnwserSelected} />)}
    </div> 
  </div>);
}

function Continue({show,onContinue}) { 
  return(
    <div className="   continue">
    {
      show ? 
        <div className="col-11">
          <button className="btn btn-primary btn-lg float-right" onClick={onContinue}>Continue</button>
        </div>
        : null
    }</div>
  );
}

function Footer(){
  return(<div id="footer" className="row">
    <div className="col-12">
      <p className="text-muted credit">All images are from <a href="http://commons.wikimedia.org/wiki/Main">Wikimedia Commons</a></p>
    </div>
  </div>);
}

function AuthorQuiz({turnData,highlight,onAnwserSelected,onContinue}) {
 
    return (
      <div className="container-fluid">
         <Hero/>
         <Turn {...turnData} highlight={highlight} onAnwserSelected={onAnwserSelected}/>
         <Continue show={highlight === 'correct'} onContinue={onContinue}/>
         <Footer/>
         <p><Link to="/add">Add and author</Link></p>
      </div>
    );
}

export default AuthorQuiz;

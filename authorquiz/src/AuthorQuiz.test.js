import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';
import Enzyme,{mount,shallow,render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'; 
Enzyme.configure({ adapter: new Adapter() });

const state = { 
  turnData: { 
    books: ['The Shining', 'IT', 'David Copperfield', 'A Tale of Two Cities', 'Hamlet'],
    author: { 
      name: 'Charles Dickens',
      imageUrl:'images/authors/charlesdickens.jpg',
      imageSource: 'Wikimedia Commons',
      books: ['David Copperfield','A Tale of Two Cities']
    },
  },
  highlight: 'none'
}

describe("Author Quiz", () => {
  it("renders without crashing", () => { 
    const div = document.createElement('div');
    ReactDOM.render(<AuthorQuiz {...state}  onAnwserSelected={() => {}}/>, div);
  });


    describe("When no answer has been selected", () => { 
      let wrapper;
      beforeAll(() => { 
      wrapper = mount(<AuthorQuiz {...state } onAnwserSelected={() => {}}/>);
      });
      
      it("should have no background color", () => { 
        expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('');
      });
    });

    describe("When wrong answer has been selected", () => { 
      let wrapper;
      beforeAll(() => { 
      wrapper = mount(<AuthorQuiz {...(Object.assign({},state,{highlight:'wrong'})) } onAnwserSelected={() => {}}/>);
      });
      
      it("should have red background color", () => { 
        expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('red');
      });
    });


    describe("When correct answer has been selected", () => { 
      let wrapper;
      beforeAll(() => { 
      wrapper = mount(<AuthorQuiz {...(Object.assign({},state,{highlight:'correct'})) } onAnwserSelected={() => {}}/>);
      });
      
      it("should have green background color", () => { 
        expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('green');
      });
    });


    describe("When the first answer is selected", () => { 
      let wrapper;

      const handleAnswerSelected = jest.fn();
      beforeAll(() => { 
      wrapper = mount(<AuthorQuiz {...state} onAnwserSelected={handleAnswerSelected}/>);
      wrapper.find('.answer').first().simulate('click');
      });
      
      it("onAnwserSelected should be  called", () => { 
        expect(handleAnswerSelected).toHaveBeenCalled();
      });

      it("should recieve The Shining", () => { 
        expect(handleAnswerSelected).toHaveBeenCalledWith("The Shining");
      });

    });

  });


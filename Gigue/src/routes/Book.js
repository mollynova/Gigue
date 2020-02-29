import React from 'react';

const BookInfo = props => {
  const rows = props.bookData.map((row, index) => {
    return (
      <div className='book' key={index}>
        <h1>{row.name}</h1>
        <h3>{row.authors[0]}</h3>
        <p>{row.numberOfPages} pages</p>
        <p>{row.isbn}</p>
        <button onClick={() => props.removeBook(index)}>Remove</button>
      </div>
    );
  });
  return <div>{rows}</div>;
};

class Book extends React.Component {
  render() {

    // Step #4 - Fetching Data
    const { bookData } = this.props;
    return <BookInfo bookData={bookData}  />;
  }
}

export default Book;
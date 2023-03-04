import React, { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

function LibraryApp() {
  const [books, setBooks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [offset, setOffset] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);
  const [popularSubjects, setPopularSubjects] = useState([
    "History",
    "Science",
    "Fiction",
    "Biography",
    "Mystery"
  ]);

  useEffect(() => {
    // Fetch popular books
    fetchPopularBooks();
  }, []);

  // Function to search books by title or author
  const searchBooks = async (searchTerm) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&startIndex=${offset}&maxResults=10`
      );
      setBooks(response.data.items);
      setTotalBooks(response.data.totalItems);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to fetch popular books by subject
  const fetchPopularBooks = async (subject) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=subject:${subject}&maxResults=10`
      );
      return response.data.items;
    } catch (error) {
      console.log(error);
    }
  };
  const handleClear = () => {
    setBooks("");
    setSearchText([]);
    setOffset(0);
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // Function to handle search submit
  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setOffset(0);
    searchBooks(searchText);
  };

  // Function to handle pagination
  const handlePagination = (newOffset) => {
    setOffset(newOffset);
    searchBooks(searchText);
  };

  // Function to handle popular subject click
  const handlePopularSubjectClick = async (subject) => {
    const popularBooks = await fetchPopularBooks(subject);
    setBooks(popularBooks);
    setSearchText(subject);
  };

  return (
    <div className="App">
      <Header />
      <form className="search-box" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search book"
          value={searchText}
          onChange={handleSearchChange}
        />
        <button type="submit">
          <SearchIcon />
        </button>
        <button type="button" onClick={handleClear}>
          <ClearIcon />
        </button>
      </form>
      {books.length > 0 && (
        <div>
          <p className="small_heading">
            Showing {offset + 1}-{offset + books.length} results
          </p>
          <ul>
            {books.map((book) => (
              <li key={book.id}>{book.volumeInfo.title}</li>
            ))}
          </ul>
          {offset > 0 && (
            <button onClick={() => handlePagination(offset - 10)}>
              Previous
            </button>
          )}
          {offset + books.length < totalBooks && (
            <button onClick={() => handlePagination(offset + 10)}>Next</button>
          )}
        </div>
      )}
      <div>
        <h2 className="head_text">Popular Subjects</h2>
        <ul>
          {popularSubjects.map((subject) => (
            <li
              key={subject}
              onClick={() => handlePopularSubjectClick(subject)}
            >
              {subject}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LibraryApp;

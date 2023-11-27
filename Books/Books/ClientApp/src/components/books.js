import { useEffect, useState } from "react";
import ModalButton from "./ModalBtn";

const URL = '/api/books';
const Books = () => {

    const [allBooks, setBooks] = useState([]);

    const getBooks = async () => {
        const options = {
            method: 'GET',
            headers: new Headers()
        }
        const result = await fetch(URL, options);

        if (result.ok) {
            const books = await result.json();
            setBooks(books);
            return books;
        }
        return [];
    }

    const addBook = async () => {

        const titleFromUser = document.querySelector('#title').value;
        const yearOfPublicationFromUser = document.querySelector('#yearOfPublication').value;
        const genreFromUser = document.querySelector('#genre').value;

        const newBook = {
            title: titleFromUser,
            yearOfPublication: yearOfPublicationFromUser,
            genre: genreFromUser
        };

        const headers = new Headers();
        headers.set('Content-Type', 'application/json')

        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(newBook)
        };

        const result = await fetch(URL, options);

        if (result.ok) {
            const book = await result.json();
            allBooks.push(book);
            setBooks(allBooks.slice());

        }
    }

    const updateBook = async (oldBook) => {

        const headers = new Headers();
        headers.set('Content-Type', 'application/json')

        const options = {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(oldBook)
        };

        const result = await fetch(URL, options);

        if (result.ok) {
            const book = await result.json();
            const updatedBook = allBooks.findIndex(b => b.id === oldBook.id);
            allBooks[updatedBook] = book;
            setBooks(allBooks.slice());

        }
    }

    const deleteBook = (id) => {

        const options = {
            method: 'DELETE',
            headers: new Headers()
        }

        fetch(URL, `/${id}`, options);
        setBooks(allBooks.filter(b => b.id != id));
    }

    useEffect(() => {
        getBooks();
    }, [])
    return (
        <div>
            <div>
                <p>Adding books</p>
                <div style={{ margin: '10px' }}>
                    <input id="title" type="text" placeholder="Book title"/>
                </div>
                <div style={{ margin: '10px' }}>
                    <input id="yearOfPublication" type="text" placeholder="Year of book publication"/>
                </div>
                <div style={{ margin: '10px' }}>
                    <input id="genre" type="text" placeholder="Book genre"/>
                </div>
                <button onClick={() => addBook()}>Add book</button>
            </div>
            <div>
                {allBooks.map(b => <BookItem key={b.id} book={b} deleteAction={deleteBook} updateAction={updateBook} />)}
            </div>
        </div>
    )
}

export default Books;

const BookItem = ({ book, deleteAction, updateAction }) => {
    return (
        <div style={{backgroundColor: 'whitesmoke', margin: '10px', borderRadius: '10px', padding: '10px'}}>
            <h2>{book.title}</h2>
            <p>{book.yearOfPublication}</p>
            <p>{book.genre}</p>

            <div style={{display: 'flex'}}>
            <button onClick={() => deleteAction(book.id)}>Delete</button>
            <ModalButton btnName={'Update'} title={'Update book'}
                modalContent={
                    <div>
                        <div style={{ margin: '10px' }}>
                            <input id="title" type="text"
                                defaultValue={book.title}
                                onChange={e => book.title = e.target.value}
                            />
                        </div>
                        <div style={{ margin: '10px' }}>
                            <input id="yearOfPublication" type="text"
                                defaultValue={book.yearOfPublication}
                                onChange={e => book.yearOfPublication = e.target.value}
                            />
                        </div>
                        <div style={{ margin: '10px' }}>
                            <input id="genre" type="text"
                                defaultValue={book.genre}
                                onChange={e => book.genre = e.target.value}
                            />
                        </div>
                        <button onClick={() => updateAction(book)}>Update book</button>
                    </div>
                } />
            </div>         

        </div>
    )
}
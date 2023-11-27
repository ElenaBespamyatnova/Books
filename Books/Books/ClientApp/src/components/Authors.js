import { Button } from "bootstrap";
import { useEffect } from "react";
import { useState } from "react";
import ModalButton from "./ModalBtn";

const URL = '/api/authors';
const Authors = () => {

    const [allAuthors, setAuthors] = useState([]);

    const getAuthors = async () => {

        const options = {
            method: 'GET',
            headers: new Headers()
        }
        const result = await fetch(URL, options);

        if (result.ok) {
            const authors = await result.json();
            setAuthors(authors);
            return authors;
        }
        return [];
    }

    const addAuthor = async () => {

        const nameFromUser = document.querySelector('#name').value;
        const surnameFromUser = document.querySelector('#surname').value;
        const birthDateFromUser = document.querySelector('#birthDate').value;

        const newAuthor = {
            name: nameFromUser,
            surname: surnameFromUser,
            birthDate: birthDateFromUser
        };

        const headers = new Headers();
        headers.set('Content-Type', 'application/json');

        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(newAuthor)
        };

        const result = await fetch(URL, options);

        if (result.ok) {
            const authors = await result.json();
            allAuthors.push(authors);
            setAuthors(allAuthors.slice());
        }
    }

    const updateAuthor = async (oldAuthor) => {

        const headers = new Headers();
        headers.set('Content-Type', 'application/json');

        const options = {
            method: 'PATCH',
            headers: headers,
            body: JSON.stringify(oldAuthor)
        };

        const result = await fetch(URL, options);

        if (result.ok) {
            const author = await result.json();
            const updatedAuthor = allAuthors.findIndex(a => a.id === author.id);
            allAuthors[updatedAuthor] = author;
            setAuthors(allAuthors.slice());
        }
    }

    const deleteAuthor = async (id) => {

        const options = {
            method: 'DELETE',
            headers: new Headers()
        }
        fetch(URL + `/${id}`, options);
        setAuthors(allAuthors.filter(a => a.id != id));
    }
    useEffect(() => {
        getAuthors();
    }, [])

    return (
        <div>
            <div>
                <p>Adding authors</p>
                <div style={{ margin: '10px' }}>
                    <input id="name" type="text" placeholder="Author name"/>
                </div >
                <div style={{ margin: '10px' }}>
                    <input id="surname" type="text" placeholder="Author surname"/>
                </div>
                <div style={{ margin: '10px' }}>
                    <input id="birthDate" type="text" placeholder="Author date of birth"/>
                </div>

                <button onClick={() => addAuthor()}>Add author</button>
            </div>
            <div>
                {allAuthors.map(a => <AuthorItem key={a.id} author={a} deleteAction={deleteAuthor} updateAction={updateAuthor} />)}
            </div>
        </div>
    )
}

export default Authors;

const AuthorItem = ({ author, deleteAction, updateAction }) => {
    return (
        <div style={{backgroundColor: 'whitesmoke', margin: '10px', borderRadius: '10px', padding: '10px'}}>
            <h3>{author.name} {author.surname}</h3>
            <p>{author.birthDate}</p>
            <div style={{display: 'flex'}}>
            <button onClick={() => deleteAction(author.id)}>Delete</button>
            <ModalButton btnName={'Update'} title={'Update author'}
                modalContent={
                    <div>
                        <div style={{ margin: '10px' }}>
                            <input id="name" type="text"
                                defaultValue={author.name}
                                onChange={e => author.name = e.target.value} />
                        </div >
                        <div style={{ margin: '10px' }}>
                            <input id="surname" type="text"
                                defaultValue={author.surname}
                                onChange={e => author.surname = e.target.value} />
                        </div>
                        <div style={{ margin: '10px' }}>
                            <input id="birthDate" type="text"
                                defaultValue={author.birthDate}
                                onChange={e => author.birthDate = e.target.value} />
                        </div>

                        <button onClick={() => updateAction(author)}>Update author</button>
                    </div>
                } />
            </div>
            
        </div>
    )
}
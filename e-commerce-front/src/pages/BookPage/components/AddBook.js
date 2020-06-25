import React, { useState, useEffect } from "react";
import { bookService } from "../../../services/bookService";

export const AddBook = (props) => {
  const [name, setName] = useState(null);
  const [author, setAuthor] = useState(null);
  const [price, setPrice] = useState(null);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!!props.book) {
      let book = props.book;
      console.log(book);
      setName(book.name);
      setAuthor(book.author);
      setPrice(book.price);
      setImage(book.picByte);
    } else {
      setName(null);
      setAuthor(null);
      setPrice(null);
      setImage(null);
    }
  }, []);
  function submit() {
    if (!!props.book) {
      //update
      bookService
        .updateBook({ id: props.book.id, name, author, price })
        .then((res) => {
          props.getBooks();
        });
    } else {
      bookService.addBookImage(file).then((res) => {
        if (res.status == 200) {
          bookService.addBook({ name, author, price }).then((res) => {
            console.log(res.data);
            props.getBooks();
          });
        }
      });
    }
  }

  function upload(e) {
    let files = e.target.files;

    setFile(files[0]);
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (e) => {
      console.log(e.target.result);
      setImage(e.target.result);
    };
  }
  return (
    <div>
      {!!props.book ? (
        <h1>Edit Book - {props.book.id}</h1>
      ) : (
        <h1>Add Book Admin</h1>
      )}

      <form>
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          placeholder="Book Name"
          name="name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <label for="author">Author</label>
        <input
          type="text"
          class="form-control"
          id="author"
          placeholder="author"
          name="author"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />

        <label>Price</label>
        <input
          type="number"
          class="form-control"
          id="price"
          placeholder="price"
          name="price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />

        <br />

        {!props.book && (
          <>
            <input type="file" onChange={upload} />
            <img height="200" width="200" src={image} />
          </>
        )}

        <br />
        <button type="button" class="btn btn-success" onClick={submit}>
          Save Book
        </button>
      </form>
    </div>
  );
};

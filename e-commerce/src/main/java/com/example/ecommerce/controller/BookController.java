package com.example.ecommerce.controller;

import com.example.ecommerce.entity.Book;
import com.example.ecommerce.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.print.attribute.standard.Media;
import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/books")
public class BookController {

    @Autowired
    private BookRepository bookRepository;


    private byte[] bytes;

    @GetMapping("/list")
    public List<Book> getBooks() {
        return bookRepository.findAll();
    }

    @GetMapping("/{id}")
    public Book getBookById(@PathVariable("id") Long id) {
        return bookRepository.findById(id).orElse(null);
    }


    @PostMapping(value = "/upload",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        this.bytes = file.getBytes();
    }

    @PostMapping("/add")
    public Book createBook(@RequestBody Book book) throws IOException {
        book.setPicByte(this.bytes);

        Book save = bookRepository.save(book);
        this.bytes = null;
        return save;

    }

    @PutMapping("/update")
    public void updateBook(@RequestBody Book book) {
        Book old = bookRepository.findById(book.getId()).orElse(null);
        if(book.getPicByte()==null){
            book.setPicByte(old.getPicByte());
        }
        bookRepository.save(book);
    }


    @DeleteMapping(path = { "/{id}" },produces = MediaType.APPLICATION_JSON_VALUE)
    public Book deleteBook(@PathVariable("id") long id) {
        Book book = bookRepository.findById(id).orElse(null);
        bookRepository.deleteById(id);
        return book;
    }
}

const express = require('express');
const router = express.Router();
const path = require('path')
const Book = require('../models/book');
const Author = require('../models/author');
const multer = require('multer');
const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
const uploadPath = path.join('public', Book.coverImageBasePath)
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})





// All books route
router.get('/', (req, res) => {
    res.render('books/index')

});

// New books Routes
router.get('/new', async (req, res) => {

    renderNewPage(res, new Book())

});

//Create book routes
router.post('/', upload.single('cover'), async (req, res) => {


    const fileName = req.file != null ? req.file.filename : 
    null

    const book = await new Book({
        title: req.body.title,
        author: req.body.author,
        publishedDate: new Date(req.body.publishedDate),
        pageCount: req.body.pageCount,
        coverImageName: fileName,
        description: req.body.description
    });


    try {

        const newBook = await book.save();
        // res.redirect(`books/${newBook.id}`)
        res.redirect('books')

    } catch {

        renderNewPage(res, book, true)
    }


});


async function renderNewPage(res, book, hasError = false) {
    try {
        const authors = await Author.find({});
        const params = {
            authors: authors,
            book: book
        };
        if (hasError) {
            params.errorMessage = 'Error Creating Book'
        }
        res.render('books/new', params)
    } catch {
        res.redirect('books/')

    }
}


module.exports = router;
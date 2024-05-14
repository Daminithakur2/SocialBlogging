const express = require("express")
const app = express()
const mongoose = require("mongoose");
const port = 5000;
const vaildator = require("validator")
app.use(express.json())
mongoose
    .connect("mongodb+srv://daminithakur296:damini221@cluster0.yyqdbtk.mongodb.net/",
     {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } )
    .then(() => {
        console.log("database is connected");
    })
    .catch((error) => {
        console.log("datdase is not connected", error);
    }); 
    const booksSchema=new mongoose.Schema({
        userName:String,
        email:String,
        title:String,
        author:String,
    });
    const Book=mongoose.model("Book",booksSchema);
     app.post("/books",async(req,res)=>{
        const{title,author,userName,email}=req.body;
        if(!userName || !author|| !title || !email){
            res.status(400).json({message:"All field are required"});

        } else if(!vaildator.isEmail(email)){
            res.status(400).json({message:"please enter the vaild email"});
        } else{
            const book =new Book({
                userName,
                email,
                title,
                author,
            });
            try{
                const newBook=await book.save();
                res.status(201).json(newBook);

            } catch(error){
                console.log(error,"dgfhjk");
                res.status(400).json({message:error.message});
            }
        }
     }); 
      app.put("/book/:id",async (req,res)=>{
        const id =req.params.id;
        const {userName,author,title,email} = req.body
        if(!userName || !author|| !title || !email){
            res.status(400).json({message:"All field are required"});

        } else if(!vaildator.isEmail(email)){
            res.status(400).json({message:"please enter the vaild email"});
        } else{
            try{
                const updatedBook =await Book.findByIdAndUpdate(
                    id,{
                        title,
                        author,
                        userName,
                        email,
                    },
                    {new:true}
                );
                res.json(updatedBook);
            } catch (error){
                console.log(error,'fhjkbb')
            }
        }
    });
    app.delete("/book/:id",async(req,res)=>{
        try{
            const id=req.params.id
            const deleteBook=await Book.findByIdAndDelete(id);
            res.json({message:"book delete successfully"});
 }catch(err){
    console.log(err,"ghjkj")
 }
    });
// const book = [
//     { id: 1, title: "Js", author: "Eren" },
//     { id: 2, title: "Js2", author: "levi" }
// ];
// app.get("/books/:id", (req, res) => {
//     const id = req.params.id
// })
// app.post("/book", (req, res) => {
//     const { title, author } = req.body;
//     const id = book.length + 1;
//     const newBook = { id, title, author };
//     book.push(newBook);
//     res.json(newBook);

// });
// app.delete("/book/:id", (req, res) => {
//     const id = req.res.id
//     const bookIndex = book.findIndex((item) => item.id == id)
//     const .deleteBook = book.splice(bookIndex, 1)
//     res.json(deleteBook)
// });
// app.put("/book/:id", (req, res) => {
//     const id = req.params.id;
//     const { title, author } = req.body;
//     const bookIndex = book.findIndex((item) => item.id == id);
//     book[bookIndex] = { id, title, author };
//     res.json(book[bookIndex])
// })
// app.patch("/book/:id", (req, res) => {
//     const id = req.params.id
//     const updates = req.body
//     const bookIndex = book.findIndex((item) => item.id == id)
//     const updateBook = { ...book[bookIndex], ...updates }
//     book[bookIndex] = updateBook
//     res.json(updateBook)
// })

// app.get('/book', (req, res) => {
//     res.json(book);
// });
app.get("/books",async(req,res)=>{
    try{
        const book=await Book.find();
        res.json(book);
    } catch(err){
        console.log(err);
    }
})
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})
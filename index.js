const express = require("express");
const app = express();
const port = 8080;
const path = require("path"); // Used to work with file and folder paths
const { v4: uuidv4 } = require("uuid"); // Used to generate unique IDs
const methodoverride = require("method-override"); // Allows HTML forms to use PATCH and DELETE methods

app.use(methodoverride('_method')); // Converts POST request into PATCH/DELETE when ?_method=PATCH or DELETE is used
app.use(express.urlencoded({ extended: true })); // Reads form data and stores it inside req.body

app.set("view engine", "ejs"); // Tells Express to use EJS as the template/view engine
app.set("views", path.join(__dirname, "views")); // Sets the location of the views folder

app.use(express.static(path.join(__dirname, "public"))); // Makes files inside public folder accessible to the browser

let posts=[
    {
        id:uuidv4(),
        username:"koushik_prasad",
        content : "i love coding"
    },
    {
        id:uuidv4(),
        username:"falana sahab",
        content : "i love bakchodi"
    },
    {
        id:uuidv4(),
        username:"dhimkana sahab",
        content : "i also love bakchodi "
    }   
];

app.get("/", (req, res)=>{
    res.send("Server working well");
})

app.listen(port,()=>{
    console.log(`App listen to port: ${port}`);
})

app.get("/posts", (req, res) => {
    res.render("index.ejs",{posts});
    console.log("user on post section");
})

app.get("/posts/new",(req, res)=>{
    res.render("new.ejs");
})

app.post("/posts", (req,res)=>{
    let {username, content}=req.body;
    let id=uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts")
})

app.get("/posts/:id", (req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id == p.id);
    res.render("show.ejs",{post})
});

app.patch("/posts/:id", (req,res)=>{
    let {id}= req.params;
    let newcontent=req.body.content;
    let post =posts.find((p)=> id==p.id);
    post.content = newcontent;
    console.log(post);
    res.redirect("/posts");
});


app.get("/posts/:id/edit",(req,res)=>{
    let{id}= req.params;
    let post= posts.find((p)=> id==p.id);
    res.render("edit.ejs", {post})
})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts= posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
});
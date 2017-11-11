import express from 'express';
import bodyParser from 'body-parser';
import Realm from 'realm';
import serverRender from "./serverRender";

const app = express();
//TODO: refactor to a react application

let PostSchema ={
    name: 'Post',
    properties: {
        timestamp: 'date',
        title: 'string',
        content: 'string'
    }
};

const blogRealm = new Realm({
    path: 'blog.realm',
    schema: [PostSchema]
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');


app.get('/',function (req,res) {
    //let posts = blogRealm.objects('Post').sorted('timestamp', true);
    serverRender()
        .then(({initialMarkup}) =>{
            res.render('index.ejs', {
                //posts: posts,
                initialMarkup
            });
        })
        .catch()

});

app.get('/posts', function (req,res) {
    let posts = blogRealm.objects('Post').sorted('timestamp', true);
    console.log(posts);
    res.send(posts);
});

app.post('/write', function(req, res) {
    let title = req.body['title'],
    content = req.body['content'],
    timestamp = new Date();
    blogRealm.write(() => {
        blogRealm.create('Post', {title: title, content: content, timestamp: timestamp});
    });
    //res.render('index.ejs');
});
app.listen(process.env.PORT || 3000,function(){
    console.log(`blog is served from port ${process.env.PORT || 3000}`)
});
import express from 'express';
import bodyParser from 'body-parser';
import Realm from 'realm';

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

app.set('view engine', 'ejs');

app.get('/',function (req,res) {
    let posts = blogRealm.objects('Post').sorted('timestamp', true);
    res.render('index.ejs', {posts: posts});
});

app.get('/write',function (req,res) {
    res.sendFile(__dirname+ '/public/write.html')
});

app.post('/write', function(req, res) {
    let title = req.body['title'],
    content = req.body['content'],
    timestamp = new Date();
    blogRealm.write(() => {
        blogRealm.create('Post', {title: title, content: content, timestamp: timestamp});
    });
    res.sendFile(req.body);
});
app.listen(process.env.PORT || 3000,function(){
    console.log(`blog is served from port ${process.env.PORT || 3000}`)
});
import express from 'express';
const router = express.Router();

import Realm from 'realm';
import {PostSchema} from './realm_schemas';

const blogRealm = new Realm({
    path: 'blog.realm',
    schema: [PostSchema]
});

router.get('/posts', function (req,res) {
    let posts = blogRealm.objects('Post').sorted('timestamp', true);
    //console.log(Array.from(posts));
    //converts realm objects to array so I can map through on front-end
    res.send(Array.from(posts));
});

router.post('/write', function(req, res) {
    let title = req.body['title'],
        content = req.body['content'],
        timestamp = new Date();
    blogRealm.write(() => {
        blogRealm.create('Post', {title: title, content: content, timestamp: timestamp});
    });
    //res.render('index.ejs');
});

export default router;
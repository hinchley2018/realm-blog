import express from 'express';
import bodyParser from 'body-parser';

import router from './api';
import serverRender from "./serverRender";

const app = express();

//set up middleware
app.use('/api',router);
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


app.listen(process.env.PORT || 3000,function(){
    console.log(`blog is served from port ${process.env.PORT || 3000}`)
});
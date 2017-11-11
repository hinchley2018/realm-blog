import React from 'react';

const PostsList = (props) => {
    let posts = props.posts;
    if (posts) {
        console.log(posts);
        posts = posts.map(post =>{
             return <li key={post.timestamp}>{post.title}:{post.content}</li>
         });
    }

    return (
        <div>
            <ul>
                {posts}
            </ul>
        </div>
    )
};

export default PostsList;
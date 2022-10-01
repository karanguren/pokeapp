import React, { useState, useEffect } from "react";
import axios from "axios";


const baseURL = "https://pokeapi.co/api/v2/pokemon/";

export default function Post() {
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios.get(`${baseURL}/1`).then((response) => {
            setPost(response.data);
        });
    }, []);

    function createPost() {
        axios
            .post(baseURL, {
                title: "Hello World!",
                body: "This is a new post."
            })
            .then((response) => {
                setPost(response.data);
            });
    }

    if (!post) return "No post!"

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <button onClick={createPost}>Create Post</button>
        </div>
    );
}
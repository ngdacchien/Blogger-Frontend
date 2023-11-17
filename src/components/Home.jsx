import React, { useState, useEffect, createContext } from 'react';
import '../css/Home.css';
import { AiOutlineTags, AiOutlineClockCircle, AiOutlineComment, AiOutlineShareAlt } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from 'axios';

// Tạo một React Context
const PostContext = createContext();

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('/api/posts');
            setPosts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <section className='blog'>
                <div className='container grid3'>
                    {/* Truyền dữ liệu posts vào PostContext.Provider */}
                    <PostContext.Provider value={posts}>
                        {/* Render các bài viết trong posts */}
                        {posts.map((post) => (
                            <div className='post' key={post.id}>
                                <h2 className='post-title'>{post.title}</h2>
                                <p className='post-content'>{post.content}</p>
                                <div className='post-meta'>
                                    <div className='post-meta-item'>
                                        <AiOutlineTags /> {post.tags}
                                    </div>
                                    <div className='post-meta-item'>
                                        <AiOutlineClockCircle /> {post.created_at}
                                    </div>
                                    <div className='post-meta-item'>
                                        <AiOutlineComment /> {post.comments}
                                    </div>
                                    <div className='post-meta-item'>
                                        <AiOutlineShareAlt /> {post.shares}
                                    </div>
                                </div>
                                <Link to={`/post/${post.id}`} className='post-link'>Read More</Link>
                            </div>
                        ))}
                    </PostContext.Provider>
                </div>
            </section>
        </>
    );
}

export default Home;
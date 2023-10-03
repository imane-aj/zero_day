import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Pages/components/Home/Header';
import Footer from '../Pages/components/Home/Footer';
import Info from '../Pages/components/Home/Info';
import { ShowPost } from '../../Redux/BlogSlice';
import axios from 'axios';

import { Link } from 'react-router-dom';


import { useSelector } from 'react-redux';


import { imgUrl, url } from '../../redux/Utils';
import { useDispatch } from 'react-redux';
const BlogDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ShowPost(id))
  }, [dispatch])

  const data = useSelector((state) => state.blog.article)
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  return (
    <>
      <Header />


      <section id="bloghero" class="d-flex align-items-center">
        <div class="container" data-aos="zoom-out" data-aos-delay="100">
          <h1>Comapny's News

          </h1>
          <h2>LATEST NEWS
          </h2>
          <p>Explore our latest insights and stories that inform, inspire, and captivate</p>
          <div class="d-flex">
          </div>
        </div>
      </section>


      <section id="blog" className="blog">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row g-5">
            <div className="col-lg-9">
              <article className="blog-details">
                <div className="content">
                  <div className="post-img">
                    <img src={imgUrl + `images/blog/${data?.data?.img}`} alt="" className="img-fluid" />
                  </div>

                  <h2 className="title">
                    {data?.data?.title}
                  </h2>

                  <div className="meta-top">
                    <ul>
                      <li className="d-flex align-items-center">

                      </li>
                      <li className="d-flex align-items-center">
                        {' '}
                        <a href="blog-details.html">
                          <time dateTime="2020-01-01">{data?.data?.created_at ? formatDate(data.data.created_at) : ''}</time>
                        </a>
                      </li>
                      <li className="d-flex align-items-center">

                      </li>
                    </ul>
                  </div>


                  <p>
                    {data?.data?.article}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
      <Info />
      <Footer />
    </>
  )
}

export default BlogDetails
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Pages/components/Home/Header';
import Footer from '../Pages/components/Home/Footer';
import blog from '../Pages/components/img/blog.jpg';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { deletePost, posts } from '../../Redux/BlogSlice';
import { imgUrl, url } from '../../Redux/Utils';
import { useDispatch } from 'react-redux';
import AOS from 'aos';
import 'aos/dist/aos.css';


const Blog = ({ searchQuery }) => {
  const blog = useSelector((state) => state.blog.data)
  const searchResults = useSelector((state) => state.blog.search)
  const [dataToDisplay, setDataToDisplay] = useState([]); // Initially set to all data
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(posts(`${url}blog?page=1`));
  }, [dispatch]);

  const handlePagination = (url) => {
    console.log('Pagination URL:', url);
    dispatch(posts(url));
  };


  useEffect(() => {
    if (searchResults.data && searchQuery) {
      setDataToDisplay(searchResults.data);
    } else {
      setDataToDisplay(blog?.ar2?.data);
    }
  }, [searchResults, blog?.ar2?.data, searchQuery]);

  const data = useSelector((state) => state.blog.article)
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  useEffect(() => {
    AOS.init();
  }, [])

  // useEffect(() => {
  //   axios.get('http://localhost:8000/api/blog')
  //     .then(response => {

  //       setPosts(response.data);
  //       console.log(response.data.data)
  //       console.log(posts)
  //     })
  //     console.log(posts)
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Use smooth scrolling effect
    });
  };
  return (
    <>
      <Header />
      <section id="bloghero" class="d-flex align-items-center">
        <div class="container" data-aos="zoom-in" >
          <h1>Comapny's News

          </h1>
          <h2>LATEST NEWS
          </h2>
          <p>Explore our latest insights and stories that inform, inspire, and captivate</p>
          <div class="d-flex">
          </div>
        </div>
      </section>
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <section id="blog" className="blog">
            <div className="container">
              <div className="row gy-4 posts-list" data-aos="fade-up">
                {dataToDisplay?.map((val, idx) => (

                  <div className="col-xl-4 col-md-6" data-aos="fade-up">
                    <div className="post-item position-relative h-100">
                      <div className="post-img position-relative overflow-hidden">
                        <img src={imgUrl + `images/blog/${val?.img}`} className="img-fluid" alt="" style={{ height: '250px', objectFit: 'cover' }} />

                      </div>
                      <div className="post-content d-flex flex-column">
                        <h3 className="post-title" style={{ height: '100px', overflow: 'hidden' }}>{val.title}</h3>
                        <div className="meta d-flex align-items-center">
                          <div className="d-flex align-items-center">
                            <span className="ps-2">{val.created_at ? formatDate(val.created_at) : ''}</span>
                          </div>

                        </div>
                        <p style={{ height: '100px', overflow: 'hidden' }}>
                          {val.article.split('\n').slice(0, 2).join('\n')}
                        </p>
                        <hr />
                        <Link to={`/blog-details/${val.id}`} className="readmore stretched-link" onClick={scrollToTop}>
                          <span>Read More</span>
                          <i className="bi bi-arrow-right" style={{ background: 'transparent' }}></i>
                        </Link>
                      </div>
                    </div>
                  </div>



                ))}
              </div>
            </div>
            <div className='mt-10 flex flex-row justify-between'>
              {blog?.ar2?.next_page_url && (
                <button className='text-black hover:bg-bodydark1 transition duration-700 dark:text-white px-6 py-3 bg-white rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark'
                  onClick={() => handlePagination(blog?.ar2?.next_page_url)}>
                  Next <i class="fa-solid fa-chevron-right" style={{ background: 'transparent' }}></i>
                </button>
              )}
              {blog?.ar2?.prev_page_url && (
                <button className='text-black hover:bg-bodydark1 transition duration-700 dark:text-white px-6 py-3 bg-white rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark'
                  onClick={() => handlePagination(blog?.ar2?.prev_page_url)}>
                  <i class="fa-solid fa-chevron-left" style={{ background: 'transparent' }}></i> Previous
                </button>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Pagination buttons */}

      <Footer />
    </>
  )
}

export default Blog
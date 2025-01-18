import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

import { MdOutlineAddBox } from 'react-icons/md';
import CourseTable from '../components/home/courseTable'; // Ensure file name matches this casing exactly
import Navbar from '../components/Navbar/Navbar';

const Home = () => {
  const [course, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/course')
      .then((response) => {
        setCourses(response.data.data || []); // Ensure courses is always an array
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className='p-4'>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl my-8'>Course List</h1>
          <Link to='/course/create'>
            <MdOutlineAddBox className='text-sky-800 text-4xl' />
          </Link>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          <CourseTable course={course} />
        )}
      </div>
    </>
  );
};

export default Home;

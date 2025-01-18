import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowCourse = () => {
  const [course, setCourse] = useState(null); // Initialize as null to handle loading state properly
  const [loading, setLoading] = useState(false);
  
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/course/${id}`)
      .then((response) => {
        setCourse(response.data); // Assume response.data is the course object
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching course:', error);
        setLoading(false);
      });
  }, [id]); // Add `id` to the dependency array

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Course</h1>
      {loading ? (
        <Spinner />
      ) : course ? ( // Check if course exists
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{course._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Course Name</span>
            <span>{course.courseName}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Description</span>
            <span>{course.description}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Instructor</span>
            <span>{course.instructor}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>{new Date(course.createdAt).toLocaleString()}</span> {/* Fix Date */}
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
            <span>{new Date(course.updatedAt).toLocaleString()}</span> {/* Fix Date */}
          </div>
        </div>
      ) : (
        <p>Course not found</p> // Handle case where course is null
      )}
    </div>
  );
};

export default ShowCourse;

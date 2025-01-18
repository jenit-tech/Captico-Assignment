import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditCourse = () => {
  const [courseName, setCourseName] = useState('');
    const [description, setDescription] = useState('');
    const [instructor, setInstructor] = useState('');
    const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/course/${id}`)
      .then((response) => {
        setCourseName(response.data.courseName);
        setDescription(response.data.description)
        setInstructor(response.data.instructor)
       
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Chack console');
        console.log(error);
      });
  }, [])

  const handleEditCourse = () => {
    const data = {
      courseName,
      description,
      instructor,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/course/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Course Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
       
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Course</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500 block mb-2">
            Course Name
          </label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md"
            placeholder="Enter course name"
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500 block mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md resize-none"
            rows="4"
            placeholder="Enter course description"
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500 block mb-2">
            Instructor
          </label>
          <input
            type="text"
            value={instructor}
            onChange={(e) => setInstructor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-md"
            placeholder="Enter instructor name"
          />
        </div>

        <button
          className="p-2 bg-sky-300 hover:bg-sky-400 text-white font-semibold rounded-md mt-6"
          onClick={handleEditCourse}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  )
}

export default EditCourse









































import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const CreateCourse = () => {
  const [courseName, setCourseName] = useState('');
  const [description, setDescription] = useState('');
  const [instructor, setInstructor] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveCourse = async () => {
    const data = {
      courseName,
      description,
      instructor,
    };

    try {
      setLoading(true);
      await axios.post('http://localhost:5555/course', data);
      enqueueSnackbar('Course created successfully', { variant: 'success' });
      navigate('/');
    } catch (error) {
      enqueueSnackbar('Failed to create course. Please try again.', { variant: 'error' });
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4 text-center">Create Course</h1>
      {loading && <Spinner />}
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
          onClick={handleSaveCourse}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default CreateCourse;

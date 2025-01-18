import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const CourseTable = ({ course }) => {
  return (
    <table className='w-full border-separate border-spacing-2'>
      <thead>
        <tr>
          <th className='border border-slate-600 rounded-md'>No</th>
          <th className='border border-slate-600 rounded-md'>Course Name</th>
          <th className='border border-slate-600 rounded-md'>Description</th>
          <th className='border border-slate-600 rounded-md'>Instructor</th>
         
        
        </tr>
      </thead>
      <tbody>
        {course.map((course, index) => (
          <tr key={course._id} className='h-8'>
            <td className='border border-slate-700 rounded-md text-center'>
              {index + 1}
            </td>
            <td className='border border-slate-700 rounded-md text-center'>
              {course.courseName}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {course.description}
            </td>
            <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
              {course.instructor}
            </td>
            
            <td className='border border-slate-700 rounded-md text-center'>
              <div className='flex justify-center gap-x-4'>
                <Link to={`/course/details/${course._id}`}>
                  <BsInfoCircle className='text-2xl text-green-800' />
                </Link>
                <Link to={`/course/edit/${course._id}`}>
                  <AiOutlineEdit className='text-2xl text-yellow-600' />
                </Link>
                <Link to={`/course/delete/${course._id}`}>
                  <MdOutlineDelete className='text-2xl text-red-600' />
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CourseTable;

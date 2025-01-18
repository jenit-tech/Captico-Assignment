import express, { response } from 'express';
import { Course } from '../models/course.js';
import {User } from '../models/user.js'

const router = express.Router();

router.post('/signup', async (request, response) => {
  try {
   
    if (
      !request.body.name ||
      !request.body.email ||
      !request.body.password 
    ) {
      return response.status(400).send({
        message: 'Send all required fields: invoiceNumber, clientName, date, amount, status',
      });
    }

    
    const newUser = {
      name: request.body.name,
      email: request.body.email,
      password: request.body.password
    };

    
    const user = await User.create(newUser);

    
    return response.status(201).send(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
  
})

router.post('/login', async (request, response) => {
  try {
    const { email, password } = request.body;

    
    const user = await User.findOne({ email: email });

    if (!user) {
      
      return response.status(404).send({ message: "User not found" });
    }

   
    if (user.password === password) {
     
      response.status(201).send({ 
        message: "Login successful",
        user,
      });
    } else {
      
      response.status(401).send({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error.message);
    response.status(500).send({ message: "Internal server error" });
  }
});



router.post('/', async (request, response) => {
  try {
    
    if (
      !request.body.courseName ||
      !request.body.description ||
      !request.body.instructor 
    ) {
      return response.status(400).send({
        message: 'Send all required fields: CourseName, Description, Instructor ',
      });
    }

    
    const newCourse = {
      courseName: request.body.courseName,
      description: request.body.description,
      instructor : request.body.instructor,
      
    };

    
    const course = await Course.create(newCourse);

   
    return response.status(201).send(course);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});



router.get('/', async (request, response) => {
  try {
    const courses = await Course.find({});

    return response.status(200).json({
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const course = await Course.findById(id);

    return response.status(200).json(course);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.courseName||
      !request.body.description ||
      !request.body.instructor 
    ) {
      return response.status(400).send({
        message: 'Send all required fields: CourseName, Description, Instructor ',
      });
    }

    const { id } = request.params;

    const course = await Course.findByIdAndUpdate(id, request.body);

    if (!course) {
      return response.status(404).json({ message: 'Course not found' });
    }

    return response.status(200).send({ message: 'Course updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return response.status(404).json({ message: 'Course not found' });
    }

    return response.status(200).send({ message: 'Course deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;

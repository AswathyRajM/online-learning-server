import express from 'express';
import CourseModel from '../models/Course.model.js';
import { io } from '../index.js';
const router = express.Router();

router.post('/', async (request, response) => {
  try {
    const courses = new CourseModel(request.body);
    await courses.save();
    response.send(courses);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get('/all', async (request, response) => {
  try {
    const courses = await CourseModel.find({});
    response.send(courses);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get('/search', async (request, response) => {
  try {
    const searchTerm = request.query.query;
    CourseModel.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } }, // 'i' option for case-insensitive search
        { instructor: { $regex: searchTerm, $options: 'i' } },
      ],
    })
      .then(async (course) => {
        response.send(course);
      })
      .catch((err) => {
        console.log(err);
        response.status(500).send(err);
      });
  } catch (e) {
    console.log(e);
  }
});

router.patch('/addLike', async (request, response) => {
  const { _id, likes } = request.body;

  CourseModel.findOneAndUpdate({ _id }, { likes })
    .then(async (course) => {
      await course.save();
      io.emit('course_liked', {
        _id,
        likes: course.likes,
      });
      response.send(course);
    })
    .catch((err) => {
      response.status(500).send(err);
    });
});

router.get('/:id', async (request, response) => {
  try {
    const course = await CourseModel.findOne({ _id: request.params.id });
    response.send(course);
  } catch (error) {
    response.status(500).send({ error });
  }
});

export default router;

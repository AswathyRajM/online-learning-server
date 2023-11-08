import express from 'express';
import CourseModel from '../models/Course.model.js';
import { io } from '../index.js';
const router = express.Router();

// router.post('/', async (request, response) => {
//   try {
//     const courses = new CourseModel(request.body);
//     console.log(courses);
//     await courses.save();
//     response.send(courses);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });

router.get('/all', async (request, response) => {
  try {
    const courses = await CourseModel.find({});
    response.send(courses);
  } catch (error) {
    response.status(500).send(error);
  }
});

// router.get('/course/:id', async (request, response) => {
//   try {
//     const course = await CourseModel.findOne({ _id: request.params.id });
//     response.send(course);
//   } catch (error) {
//     response.status(500).send({ error });
//   }
// });

router.get('/search', async (request, response) => {
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
});

router.patch('/update/:id', async (request, response) => {
  const _id = request.params.id;
  const update = {};
  for (const key of Object.keys(request.body)) {
    if (request.body[key] !== '') {
      update[key] = request.body[key];
    }
  }

  CourseModel.findOneAndUpdate({ _id }, { $set: update }, { new: true })
    .then(async (course) => {
      await course.save();
      if (request.body.likes)
        io.on('connection', (socket) => {
          socket.emit('course_liked', {
            _id,
            totalLike: course.likes,
          });
        });
      response.send(course);
    })
    .catch((err) => {
      response.status(500).send(err);
    });
});

export default router;

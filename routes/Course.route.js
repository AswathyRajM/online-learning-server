import express from 'express';
import CourseModel from '../models/Course.model.js';
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

// router.post('/search', async (request, response) => {
//   const searchTerm = request.query.searchTerm;

//   CourseModel.find(
//   // Find documents matching any of these values
//   {
//     $or: [
//       { name: { $in: ['foo', 'bar'] } },
//       { instructor: { $in: ['foo', 'bar'] } },
//     ],
//   }
// );

//   CourseModel.findOneAndUpdate(courseId, { $set: update }, { new: true })
//     .then(async (course) => {
//       await course.save();
//       response.send(course);
//     })
//     .catch((err) => {
//       res.status(500).send(err);
//     });
// });

router.patch('/update/:id', async (request, response) => {
  const courseId = request.params.id;
  const update = {};
  for (const key of Object.keys(request.body)) {
    if (req.body[key] !== '') {
      update[key] = req.body[key];
    }
  }
  CourseModel.findOneAndUpdate(courseId, { $set: update }, { new: true })
    .then(async (course) => {
      await course.save();
      response.send(course);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

export default router;

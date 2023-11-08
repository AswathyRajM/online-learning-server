import express from 'express';
import StudentModel from '../models/Student.model.js';
const router = express.Router();

// router.post('/course', async (request, response) => {
//   try {
//     const courses = new CourseModel(request.body);
//     await courses.save();
//     response.send(courses);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// });

router.get('/all', async (request, response) => {
  try {
    const courses = await StudentModel.find({});
    response.send(courses);
  } catch (error) {
    response.status(500).send(error);
  }
});

// // router.get('/course/:id', async (request, response) => {
// //   try {
// //     const course = await CourseModel.findOne({ _id: request.params.id });
// //     response.send(course);
// //   } catch (error) {
// //     response.status(500).send({ error });
// //   }
// // });

// router.patch('/course/:id', async (request, response) => {
//   const courseId = request.params.id;
//   const update = {};
//   for (const key of Object.keys(request.body)) {
//     if (req.body[key] !== '') {
//       update[key] = req.body[key];
//     }
//   }
//   CourseModel.findOneAndUpdate(courseId, { $set: update }, { new: true })
//     .then(async (course) => {
//       await course.save();
//       response.send(course);
//     })
//     .catch((err) => {
//       res.status(500).send(err);
//     });
// });

export default router;

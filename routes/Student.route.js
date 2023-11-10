import express from 'express';
import StudentModel from '../models/Student.model.js';
const router = express.Router();

router.post('/course', async (request, response) => {
  try {
    const student = new StudentModel(request.body);
    await student.save();
    response.send(student);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get('/course/all', async (request, response) => {
  try {
    let studentId = '654de006d12fa6fc90e0ab94';
    const student = await StudentModel.findOne({ _id: studentId })
      .populate('courses.courseId')
      .exec();

    const inProgressCourses = student.courses.filter(
      (course) => course.progress < 100
    );
    const completedCourses = student.courses.filter(
      (course) => course.progress === 100
    );

    response.json({ inProgressCourses, completedCourses });
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

router.patch('/course', async (request, response) => {
  const { courseId, progress } = request.body;
  const studentId = '654de006d12fa6fc90e0ab94';

  const update = {};
  for (const key of Object.keys(request.body)) {
    if (request.body[key] !== '') {
      update[key] = request.body[key];
    }
  }

  let condition = { _id: studentId, 'courses.courseId': courseId };
  let query = { $set: { 'courses.$.progress': progress } };

  StudentModel.findOneAndUpdate(condition, query, { new: true })
    .then(async (student) => {
      await student.save();
      response.send('updated');
    })
    .catch((err) => {
      console.log(err);
      response.status(500).send(err);
    });
});

export default router;

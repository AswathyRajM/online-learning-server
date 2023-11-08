import mongoose, { Schema } from 'mongoose';

const CourseSchema = new mongoose.Schema({
  courseId: { type: Schema.Types.ObjectId, ref: 'course' },
  completed: {
    type: Boolean,
    default: false,
  },
});

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  courses: [CourseSchema],
});

const StudentModel = mongoose.model('student', StudentSchema);
export default StudentModel;

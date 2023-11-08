import mongoose, { Schema } from 'mongoose';

const SyllabusSchema = new mongoose.Schema({
  week: {
    type: Number,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  enrollmentStatus: {
    type: String,
    default: 'Open',
  },
  thumbnail: {
    type: String,
    default:
      'https://ik.imagekit.io/aswathy/Alemeno-Online-Courses/images/image-not-found?updatedAt=1699284459026',
  },
  duration: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  prerequisites: [String],
  syllabus: [SyllabusSchema],
  enrolledStudents: [{ type: Schema.Types.ObjectId, ref: 'student' }],
  likes: {
    type: Number,
    default: 0,
  },
  price: {
    type: String,
  },
});

const CourseModel = mongoose.model('course', CourseSchema);
export default CourseModel;

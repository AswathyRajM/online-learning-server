import Course from '../models/Course.model';

class CourseController {
  static getAllCourses = (req, res) => {
    const id = req.params.id;
    Course.find(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            resultCode: 0,
            message: 'Course not found',
            error_code: '404',
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          resultCode: 0,
          message: err.message || 'Server Error',
          error_code: '400',
        });
      });
  };

  static findAllCourse = (req, res) => {
    const id = req.params.id;
    Course.findAllCourses()
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            resultCode: 0,
            message: 'Course not found',
            error_code: '404',
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          resultCode: 0,
          message: err.message || 'Server Error',
          error_code: '400',
        });
      });
  };
}

export default CourseController;

import College from "../models/College.js";
import Course from "../models/Course.js";
import User from "../models/User.js";

// @desc Get all colleges
export const getColleges = async (req, res) => {
  try {
    const colleges = await College.find().populate("coursesOffered");
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get single college by ID
export const getCollegeById = async (req, res) => {
  try {
    const college = await College.findById(req.params.id).populate("coursesOffered");
    if (!college) return res.status(404).json({ message: "College not found" });
    res.json(college);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Add new college
export const addCollege = async (req, res) => {
  const { name, location, facilities, eligibilityCriteria } = req.body;

  try {
    const college = new College({
      name,
      location,
      facilities,
      eligibilityCriteria,
    });

    const savedCollege = await college.save();
    res.status(201).json(savedCollege);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc Add course to a college
export const addCourseToCollege = async (req, res) => {
  const { title, stream, duration, description, careerPaths } = req.body;

  try {
    const course = new Course({
      title,
      stream,
      duration,
      description,
      careerPaths,
      college: req.params.collegeId,
    });

    const savedCourse = await course.save();

    const college = await College.findById(req.params.collegeId);
    college.coursesOffered.push(savedCourse._id);
    await college.save();

    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Student enroll in a course
export const enrollCourse = async (req, res) => {
  try {
    const { collegeId, course } = req.body;

    const college = await College.findById(collegeId);
    if (!college) {
      return res.status(404).json({ message: "College not found" });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // prevent duplicate enrollment
    const alreadyEnrolled = user.enrollments.some(
      (e) => e.college.toString() === collegeId && e.course === course
    );
    if (alreadyEnrolled) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    user.enrollments.push({ college: collegeId, course });
    await user.save();

    res.status(201).json({ message: "Enrolled successfully", enrollments: user.enrollments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
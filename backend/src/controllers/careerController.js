import Course from "../models/Course.js";

// @desc Get all career paths for a course
export const getCareerPaths = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    res.json(course.careerPaths);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Add a career path to a course (Admin only)
export const addCareerPath = async (req, res) => {
  const { title, type, description } = req.body;

  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.careerPaths.push({ title, type, description });
    await course.save();

    res.status(201).json(course.careerPaths);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

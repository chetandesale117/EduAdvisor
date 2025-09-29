import User from "../models/User.js";
import College from "../models/College.js";

// ✅ Student enroll in a course
export const enrollCourse = async (req, res) => {
  try {
    const { collegeId, course } = req.body;

    const college = await College.findById(collegeId);
    if (!college) return res.status(404).json({ message: "College not found" });

    const student = await User.findById(req.user._id);
    if (!student) return res.status(404).json({ message: "User not found" });

    // prevent duplicate
    const already = student.enrollments.some(
      (e) => e.college.toString() === collegeId && e.course === course
    );
    if (already) return res.status(400).json({ message: "Already enrolled in this course" });

    student.enrollments.push({ college: collegeId, course });
    await student.save();

    res.status(201).json({ message: "Enrolled successfully", enrollments: student.enrollments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get my enrollments
export const getEnrollments = async (req, res) => {
  try {
    const student = await User.findById(req.user._id).populate(
      "enrollments.college",
      "name location"
    );
    res.json(student.enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

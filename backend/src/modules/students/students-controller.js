const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const students = await getAllStudents(req.query);
    res.status(200).json({students: students });
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const studentData = req.body;
    const newStudent = await addNewStudent(studentData);
    res.status(201).json(newStudent);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const studentId = req.params.id;
    const updateData = { ...req.body, id: studentId };
    const updatedStudent = await updateStudent(updateData);
    res.status(200).json(updatedStudent);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const studentId = req.params.id;
    const student = await getStudentDetail(studentId);
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const studentId = req.params.id;
    const { status, reviewerId } = req.body;
    const result = await setStudentStatus({ userId: studentId, reviewerId, status });
    res.status(200).json(result);
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
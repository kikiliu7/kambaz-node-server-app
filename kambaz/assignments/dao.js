import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function AssignmentsDao() {
  const findAssignmentsForCourse = (courseId) =>
    model.find({ course: courseId });

  const createAssignment = (assignment) =>
    model.create({ ...assignment, _id: uuidv4() });

  const updateAssignment = (assignmentId, assignment) =>
    model.updateOne({ _id: assignmentId }, { $set: assignment });

  const deleteAssignment = (assignmentId) =>
    model.deleteOne({ _id: assignmentId });

  const findAssignmentById = (assignmentId) =>
    model.findById(assignmentId);

  return { findAssignmentsForCourse, createAssignment, updateAssignment, deleteAssignment, findAssignmentById };
}
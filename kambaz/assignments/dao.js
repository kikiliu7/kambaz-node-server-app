import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {
  
  const createAssignment = (assignment) => {
    const newAssignment = { ...assignment, _id: uuidv4() };
    db.assignments = [...db.assignments, newAssignment];
    return newAssignment;
  };

  const findAllAssignments = () => db.assignments;

  const findAssignmentsForCourse = (courseId) => 
    db.assignments.filter((assignment) => assignment.course === courseId);

  const findAssignmentById = (assignmentId) => 
    db.assignments.find((assignment) => assignment._id === assignmentId);

  const updateAssignment = (assignmentId, assignmentUpdates) => {
    db.assignments = db.assignments.map((a) => 
      (a._id === assignmentId ? { ...a, ...assignmentUpdates } : a)
    );
    return db.assignments.find((a) => a._id === assignmentId);
  };

  const deleteAssignment = (assignmentId) => {
    db.assignments = db.assignments.filter((a) => a._id !== assignmentId);
    return { status: "OK" };
  };

  return {
    createAssignment,
    findAllAssignments,
    findAssignmentsForCourse,
    findAssignmentById,
    updateAssignment,
    deleteAssignment,
  }}

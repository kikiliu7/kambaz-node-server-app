import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
import userModel from "../users/model.js";

export default function EnrollmentsDao() {
  const enrollUserInCourse = (userId, courseId) =>
    model.create({ _id: `${userId}-${courseId}`, user: userId, course: courseId });

  const unenrollUserFromCourse = (user, course) =>
    model.deleteOne({ user, course });

  const unenrollAllUsersFromCourse = (courseId) =>
    model.deleteMany({ course: courseId });

  const findCoursesForUser = (userId) =>
    model.find({ user: userId });

  const findUsersForCourse = async (courseId) => {
    const enrollments = await model.find({ course: courseId });
    const userIds = enrollments.map((e) => e.user);
    return userModel.find({ _id: { $in: userIds } });
  };

  return { enrollUserInCourse, unenrollUserFromCourse, unenrollAllUsersFromCourse, findCoursesForUser, findUsersForCourse };
}
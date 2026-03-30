export default function EnrollmentsDao(db) {
  const enrollUserInCourse = (userId, courseId) => {
    const newEnrollment = { _id: Date.now().toString(), user: userId, course: courseId };
    db.enrollments = [...db.enrollments, newEnrollment];
    return newEnrollment;
  };

  const unenrollUserFromCourse = (userId, courseId) => {
    db.enrollments = db.enrollments.filter(
      (e) => !(e.user === userId && e.course === courseId)
    );
    return { status: "OK" };
  };

  const findCoursesForUser = (userId) => {
    return db.enrollments
      .filter((e) => e.user === userId)
      .map((e) => db.courses.find((c) => c._id === e.course));
  };

  return { enrollUserInCourse, unenrollUserFromCourse, findCoursesForUser };
}
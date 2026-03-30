import EnrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app, db) {
  const dao = EnrollmentsDao(db);
  
  app.post("/api/enrollments/:courseId", (req, res) => {
    const { courseId } = req.params;
    const currentUser = req.session["currentUser"];
    if (!currentUser) return res.sendStatus(401);

    const enrollment = dao.enrollUserInCourse(currentUser._id, courseId);
    res.json(enrollment);
  });

  app.delete("/api/enrollments/:courseId", (req, res) => {
    const { courseId } = req.params;
    const currentUser = req.session["currentUser"];
    if (!currentUser) return res.sendStatus(401);

    const status = dao.unenrollUserFromCourse(currentUser._id, courseId);
    res.json(status);
  });
}
import EnrollmentsDao from "./dao.js";

export default function EnrollmentRoutes(app) {
  const dao = EnrollmentsDao();

  app.post("/api/enrollments/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const currentUser = req.session["currentUser"];
    if (!currentUser) return res.sendStatus(401);
    const enrollment = await dao.enrollUserInCourse(currentUser._id, courseId);
    res.json(enrollment);
  });

  app.delete("/api/enrollments/:courseId", async (req, res) => {
    const { courseId } = req.params;
    const currentUser = req.session["currentUser"];
    if (!currentUser) return res.sendStatus(401);
    const status = await dao.unenrollUserFromCourse(currentUser._id, courseId);
    res.json(status);
  });
}
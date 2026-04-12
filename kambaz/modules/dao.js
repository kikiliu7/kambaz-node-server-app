import { v4 as uuidv4 } from "uuid";
import model from "../courses/model.js";

export default function ModulesDao(db) {
  async function findModulesForCourse(courseId) {
   const course = await model.findById(courseId);
   return course.modules;
  }

 async function createModule(courseId, module) {
   const newModule = { ...module, _id: uuidv4() };
   const status = await model.updateOne(
     { _id: courseId },
     { $push: { modules: newModule } }
   );
   return newModule;
  }

async function deleteModule(courseId, moduleId) {
   const status = await model.updateOne(
     { _id: courseId },
     { $pull: { modules: { _id: moduleId } } }
   );
   return status;
  } 
  
  async function updateModule(moduleId, moduleUpdates) {
    const course = await model.findOne({ "modules._id": moduleId });
    if (course) {
      const module = course.modules.id(moduleId);
      Object.assign(module, moduleUpdates);
    }
    return module;
  }
  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule,
  };
}
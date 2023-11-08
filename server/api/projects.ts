import {Project} from "~/types/Project";
import ProjectModel from "~/server/models/ProjectModel";
import connectDB from "./db";

export default defineEventHandler(async (event) => {
  if (event.req.method === "GET") {
    await connectDB();
    //get projects collection from db
    const projects: Project[] = await ProjectModel.find({});
    return projects;
  }
  if (event.req.method === "POST" || event.req.method === "PUT" || event.req.method === "DELETE") {
    return "Hey, you shouldn't be here!"
  }

});
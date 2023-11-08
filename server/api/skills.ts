import { Skill } from "~/types/Skill";
import SkillModel from "~/server/models/SkillModel";
import connectDB from "./db";

export default defineEventHandler(async (event) => {
  if (event.req.method === "GET") {
    await connectDB();
    //get skills collection from db
    const skills: Skill[] = await SkillModel.find({});
    return skills;
  }
  if (event.req.method === "POST" || event.req.method === "PUT" || event.req.method === "DELETE") {
    return "Hey, you shouldn't be here!"
  }
});

import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    skillName: { type: String, required: true },
    color: {
      dark: { type: String, required: true },
      light: { type: String, required: true },
    },
    percentage: { type: String, required: true },
    imgPath: { type: String, required: true },
  });
  
  const SkillModel = mongoose.model('Skill', skillSchema, 'Skills');
  
  export default SkillModel;
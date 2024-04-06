import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    skillName: { type: String, required: true },
    color: {
      dark: { type: String, required: true },
      light: { type: String, required: true },
    },
    percentage: { type: String, required: true },
    iconName: { type: String, required: true },
    experience: {type: Number, required: true},
    category: { type: String, enum: ['Technical', 'Language', 'Other'], required: true },
  });
  
  const SkillModel = mongoose.model('Skill', skillSchema, 'Skills');
  
  export default SkillModel;
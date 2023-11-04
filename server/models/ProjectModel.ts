import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    "Name": { type: String, required: true },
    "Description": { type: String, required: true },
    "Categories": {type: [String], required: true},
    "Technologies": {type: [String], required: true},
    "Image": { type: String, required: true },
    "WebP": { type: String, required: true },
    "Github": { type: String, required: false },
    "ProjectFolder": { type: String, required: false },
    "Website": { type: String, required: false }
  });
  
  const ProjectModel = mongoose.model('Project', projectSchema, 'Projects');
  
  export default ProjectModel;
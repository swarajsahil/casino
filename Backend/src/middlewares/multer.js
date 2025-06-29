import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, "./public/uploads"); // Ensure the uploads folder exists
  },
  filename: function (req, file, cb) {
      // Optional: Use Date.now() to ensure unique filenames
      const uniqueName = Date.now() + "-" + file.originalname;
      cb(null, uniqueName); 
  }
});
  
export const upload = multer({ 
    storage, 
})
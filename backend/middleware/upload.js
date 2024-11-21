const multer = require("multer");
const path = require("path");
const allowedMimeTypes = [
  "image/jpeg", // JPEG images
  "image/png", // PNG images
  "application/pdf", // PDF documents
  "text/plain", // Plain text files (.txt)
  "application/vnd.ms-excel", // Old Excel files (.xls)
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // New Excel files (.xlsx)
  "application/xml", // XML files
  "text/xml", // Text-based XML
];
// Define storage settings
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("destination");
    cb(null, "uploads/files"); // Directory where files will be saved
  },
  filename: function (req, file, cb) {
    // Rename the file to include a timestamp to avoid conflicts
    console.log("filename");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});

// Set file filter (optional)
const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Unsupported file type!"), false); // Reject the file
  }
};

// Initialize Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit files to 5MB
  fileFilter: fileFilter,
});

module.exports = upload;

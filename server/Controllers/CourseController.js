// controllers/courseController.js
const Course = require("../models/CourseModel");

exports.createCourse = async (req, res) => {
  try {
    const {
      title,
      short_desc,
      long_desc,
      price,
      duration,
      teacher_id,
      youtube_link,
      language,
      skill_level,
    } = req.body;

    const chapters = JSON.parse(req.body.chapters); // comes as string from FormData

    // Map chapter files
    const chapterData = chapters.map((chapter, index) => ({
      chapter_name: chapter.chapter_name,
      study_file: req.files[`chapters[${index}][study_file]`]?.[0]?.path || "",
    }));

    const course = new Course({
      title,
      short_desc,
      long_desc,
      price,
      duration,
      teacher_id,
      coverphoto: req.files.coverphoto?.[0]?.path || "",
      youtube_link,
      language,
      skill_level,
      chapters: chapterData,
    });

    await course.save();

    res.status(201).json({ success: true, course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Course creation failed" });
  }
};

const Course = require('../Models/CourseModel');

exports.updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
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

    // ✅ Handle chapters safely
    let chapters;
    if (typeof req.body.chapters === 'string') {
      chapters = JSON.parse(req.body.chapters);
    } else {
      chapters = req.body.chapters || [];
    }

    // 🧠 Build updated chapters with file path fallback
    const updatedChapters = chapters.map((chapter, index) => ({
      chapter_name: chapter.chapter_name,
      study_file:
        req.files?.[`chapters[${index}][study_file]`]?.[0]?.path || chapter.study_file || "",
    }));

    // 📦 Course data to update
    const updateData = {
      title,
      short_desc,
      long_desc,
      price,
      duration,
      teacher_id,
      youtube_link,
      language,
      skill_level,
      chapters: updatedChapters,
    };

    // ✅ Handle optional cover photo
    if (req.files?.coverphoto?.[0]) {
      updateData.coverphoto = req.files.coverphoto[0].path;
    }

    const updated = await Course.findByIdAndUpdate(courseId, updateData, { new: true });

    res.status(200).json({ success: true, course: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update course" });
  }
};

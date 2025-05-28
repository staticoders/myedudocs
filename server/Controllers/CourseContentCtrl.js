const CourseContentModel = require('../Models/CourseConjtent');

// Controller function to handle form submission
const createCourseContent = async (req, res) => {
    try {
        console.log("Incoming form data:", req.body);
        const { content_subject, content_category, content, author } = req.body;

        // Optional: Basic validation
        if (!content_subject || !content_category || !content) {
            return res.status(400).json({ error: 'All required fields must be filled.' });
        }

        const newContent = new CourseContentModel({
            content_subject,
            content_category,
            content,
            author
        });

        const savedContent = await newContent.save();
        res.status(201).json({ message: 'Course content uploaded successfully.', data: savedContent });

    } catch (error) {
        console.error('Error uploading content:', error);
        res.status(500).json({ error: 'Server error. Could not upload content.' });
    }
};


module.exports = {
    createCourseContent,
};
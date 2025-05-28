
const CourseContent = require('../Models/CourseConjtent');


const updateStaus = async (req, res) => {
    try {
        const id = req.params.id;
        const resp = await CourseContent.findByIdAndUpdate(
            id,
            { approved: true },
            { new: true, runValidators: true }
        );
        if (!resp) {
            return res.status(404).json({ message: 'Course content not found' });
        }
        console.log("Course ID:", req.params.id);
        res.status(200).json({ message: 'Course content updated successfully', resp });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = updateStaus;
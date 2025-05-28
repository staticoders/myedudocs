const CourseContentModel=require('../Models/CourseConjtent');


const courseContentDetails=async(req,res)=>{
    try {
        const id=req.params.id;
        const contents=await CourseContentModel.findById(id)
        if(!contents){
            res.status(404).json({message:"Content not found"});
        }
        res.status(200).json({message:"Content found",contents});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error"});
        
    }
}

module.exports=courseContentDetails


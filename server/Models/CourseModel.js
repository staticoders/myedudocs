const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    cname: {
      type: String,
      required: true,
      trim: true,
    },

    cinstructor: {
      type: String,
      required: true,
      trim: true,
    },

    cdur: {
      type: Number,
      required: true,
      
    },

    clesson: {
      type: Number,
      required: true,
      
    },

    cskill_level: {
      type: String,
      required: true,
    },

    clanguage: {
      type: String,
      required: true,
    },

    c_category: {
      type: String,
      required: true,
    },

    cprice: {
      type: Number,
      required: true,
     
    },

    cimage: {
      type: String,
      required: true,
    //   validate: {
    //     validator: function (v) {
    //       return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v); // URL validation
    //     },
    //     message: (props) => `${props.value} is not a valid URL for the image!`,
    //   },
    },
    cvdolink: {
      type: String,
      required: true,
    },
    cdesc: {
      type: String,
      required: true,
      },

    approved_by_admin:{
      type:String,
      default:"N/A"
    }
  },
  
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create the Course model based on the schema
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;

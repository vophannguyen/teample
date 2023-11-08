import { useState } from "react";
import { useDeleteTaskMutation, useEditTaskMutation } from "./studentSlice"
// import seed from "../seed.js"


// Display to user single student full, name, email, image, and gpa 
function studentDetails({ Student }) {
  // Display the appropriate student when the url matches "/students/:studentId"
  return (
    <>
      <div>`Student ${studentFirstName} ${studentLastName}`</div>
      <br />
      <div>`Contact Email ${studentEmail}`</div>
      <br />
      <image />
      <br />
      <div>`GPA ${studentGPA}`</div>
      {/* Display name of their campus (or helpful message if they don't have one) 
      if campus */}
    </>
  )
}
export default studentDetails

// Clicking on a student from the students view should navigate to show that selected student

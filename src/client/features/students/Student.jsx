//This file is just for viewing a single selected Student, with all their details
import { Link } from "react-router-dom";
import { useGetSingleStudentQuery } from "./studentSlice";

// Display to user single student full, name, email, image, and gpa 
const StudentDetailCard = ({ student }) => {
  return (
    <>
      <li className="student-details-card">
        <div>{`Student ${student.id.studentFirstName} ${student.id.studentLastName}`}</div>
        <br />
        <div>{`Contact Email ${student.id.studentEmail}`}</div>
        <br />
        <image />
        <br />
        <div>{`GPA ${student.id.studentGPA}`}</div>
        {/* Display name of their campus (or helpful message if they don't have one) 
      if campus */}
        <div>{student.id.studentCampus ? student.id.studentCampus : `Campus not listed`}</div>
      </li>
    </>
  )
}

function studentDetails({ student }) {
  // Display the appropriate student when the url matches "/students/:studentId"
  return "is working?"
}
export default studentDetails

// Clicking on a student from the students view should navigate to show that selected student

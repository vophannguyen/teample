import { useSelector } from "react-redux";
import { selectToken } from "../auth/authSlice";
import NewStudent from "./NewStudent";
import { Link } from "react-router-dom";
import { useGetStudentsQuery } from "./studentSlice";
// Need to pull in our seed.js data

import "./Students.less";

const StudentCard = ({ student }) => {
  return (
    <li className="student-card">
      <h2>{student.firstName}</h2>
      <Link to={`students/${student.id}`} className="details-btn">{student.firstName} details</Link>
    </li>
  )
};
/** Main interface for user to interact with their tasks */
export default function Students() {
  const { data: students, isLoading } = useGetStudentsQuery();
  console.log(students);

  //additional features: add filter
  return (
    <div className="students">
      <section className="roster">
        <h1>Students</h1>
        {isLoading && <p>Loading student roster...</p>}
        {students && (
          <ul>
            {students.map((student) => (
              <StudentCard key={student.id} task={student} /> //Is this the like to single student detail card?
            ))}
          </ul>
        )}
      </section>
      <aside className="add-form">
        <h2>Add New Student</h2>
        <NewStudent />
        <h2>Students</h2>
      </aside>
    </div>
  );
}

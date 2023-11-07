import { Link } from "react-router-dom";
import { useGetStudentsQuery } from "./studentSlice";
import NewStudentForm from "./NewStudentForm"
import "./Students.less";

const StudentCard = ({ student }) => {
  return (
    <li className="student-card">
      <h2>{student.firstname}</h2>
      <Link to={`students/${student.id}`} className="details-btn">{student.firstname} details</Link>
    </li>
  )
};


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
            <StudentCard key={student.id} task={student} />
          ))}
        </ul>
      )}
      </section>
      <aside className="add-form">
        <h2>Add New Student</h2>
        <NewStudentForm />
        <h2>Students</h2>
      </aside>
    </div>
  );
}

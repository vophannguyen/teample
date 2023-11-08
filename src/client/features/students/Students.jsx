import { Link } from "react-router-dom";
import { useGetStudentsQuery } from "./studentSlice";
import NewStudentForm from "./NewStudentForm";
import "./Students.less";

const StudentCard = ({ student, onDelete }) => {
  return (
    <li className="student-card">
      <Link to={`students/${student.id}`} className="details-btn">{student.firstName} {student.lastname}</Link>
      <button className="delete-btn" onClick={() => onDelete(student.id)}>x</button>

    </li>
  );
};

export default function Students() {
  const { data: students, isLoading, isError } = useGetStudentsQuery();
  console.log("students", students);
  console.log("loading", isLoading);
  console.log("error", isError);

  const onDelete = (id) => {
    console.log("Delete", id);
  };
  //additional features: add filter
  return (
    <div className="students">
      <section className="roster">
        <h1>Students</h1>
        {isLoading && <p>Loading student roster...</p>}
        <ul>
          {students?.map((student) => (
            <StudentCard student={student} key={student.id} onDelete={onDelete} />
          ))}
        </ul>
      </section>
      <aside className="add-form">
        <h2>New Student Form</h2>
        <NewStudentForm />
      </aside>
    </div>
  );
}
import { Link, useNavigate } from "react-router-dom";
import { useGetStudentsQuery, useDeleteStudentMutation } from "./studentSlice";
import NewStudentForm from "./NewStudentForm";
import "./Students.less";

const StudentCard = ({ student, onDelete }) => {
  return (
    <li className="student-card">
      <Link to={`/students/${student.id}`} className="details-btn">{student.firstName} {student.lastName}</Link>
      <button className="delete-btn" onClick={() => onDelete(student.id)}>x</button>
    </li>
  );
};

export default function Students() {
  const { data: students, isLoading, useSort } = useGetStudentsQuery();
  const [ useDelete ] = useDeleteStudentMutation();
  const navigate = useNavigate();

  console.log(students)

  const onDelete = async (id) => {
    try {
      await useDelete(id).unwrap();
      navigate("/");
    } catch (err) {
      console.error(err);
    } 
  };

  const onSort = async (lastName) => {
    try {
      await useSort(lastName).map;
    } catch (err) {
      next (err)
    }
  }

  return (
    <div className="students">
      <section className="roster">
        <h1>Students</h1>
        {isLoading && <p>Loading student roster...</p>}
        <button onClick={onSort}>Sort A-Z</button>
        <ul>
          {students?.map((student) => (
            <StudentCard
              student={student}
              key={student.id}
              onDelete={onDelete}
            />
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

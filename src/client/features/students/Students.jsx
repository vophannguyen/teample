import { Link, useNavigate } from "react-router-dom";
import { useGetStudentsQuery, useDeleteStudentMutation } from "./studentSlice";
import NewStudentForm from "./NewStudentForm";
import "./Students.less";
import { useState } from "react";

const StudentCard = ({ student, onDelete }) => {
  return (
    <li className="student-card">
      <div className="student-single">
        <img src={student.imageUrl} alt="" />
        <Link to={`/students/${student.id}`} className="details-btn">
          {student.firstName} {student.lastName} GPA: {student.gpa}
        </Link>
      </div>
      <button className="delete-btn" onClick={() => onDelete(student.id)}>
        x
      </button>
    </li>
  );
};

export default function Students() {
  const { data: students, isLoading, isError } = useGetStudentsQuery();
  const [useDelete] = useDeleteStudentMutation();
  const navigate = useNavigate();
  const [next, setNext] = useState(10);
  const [min, setMin] = useState(0);
  const [sortData, setSortData] = useState(null);
  const [controlSort, setControlSort] = useState(true);
  // console.log(students)
  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (isError) {
    return;
  }
  const max = students.length;
  const studentOf10 = students.slice(min, next);
  ///////////////////////handle next and previus page student
  //next button
  const handleNext = function () {
    setSortData(null);
    setControlSort(true);
    if (next + 10 > max) {
      setMin(() => next);
      setNext(() => max);
    } else {
      setMin(() => next);
      setNext(() => next + 10);
    }
  };
  //back button
  function handleBack() {
    setSortData(null);
    setControlSort(true);
    if (min - 10 <= 0) {
      setMin(() => 0);
      setNext(() => next - 10);
    } else {
      setMin(() => min - 10);
      setNext(() => next - 10);
    }
  }
  const onDelete = async (id) => {
    try {
      await useDelete(id).unwrap();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  ////////////////end handle next and previous page students
  //////////start handle sort
  function handleSort() {
    setControlSort(() => !controlSort);
    // console.log(controlSort);
    if (controlSort) {
      // console.log(controlSort);

      setSortData(() => studentOf10.sort((a, b) => a.gpa - b.gpa));
      // console.log(studentOf10);
    } else {
      setSortData(() => studentOf10.sort((a, b) => b.gpa - a.gpa));
    }
  }
  // studentOf10.sort((a, b) => a.gpa - b.gpa);
  const newData = sortData ? sortData : studentOf10;
  //additional features: add filter
  return (
    <div className="students">
      <section className="roster">
        <h1>Students</h1>
        {isLoading && <p>Loading student roster...</p>}
        <ul>
          {newData?.map((student) => (
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
      {next < max && (
        <button className="next" onClick={handleNext}>
          ⏩
        </button>
      )}
      {min > 0 && (
        <button className="pre" onClick={handleBack}>
          ⏮
        </button>
      )}
      <button className="sort" onClick={handleSort}>
        {!controlSort ? <div>⏬</div> : <div>⏫</div>}
      </button>
    </div>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { useGetStudentsQuery, useDeleteStudentMutation } from "./studentSlice";
import NewStudentForm from "./NewStudentForm";
import { useState } from "react";
import DropDown from "../../layout/DropDown";

const StudentCard = ({ student, onDelete, onSort }) => {
  return (
    <li className="mb-4 flex justify-between rounded-md border hover:shadow-md">
      <div className=" ml-4  mr-4 flex items-center  px-2 py-2 ">
        <img src={student.imageUrl} alt="" className=" w-[4rem]" />
        <Link to={`/students/${student.id}`} className="">
          {student.firstName} {student.lastName} GPA: {student.gpa}
        </Link>
      </div>
      {/* <button className="delete-btn" onClick={() => onDelete(student.id)}>
        x
      </button> */}
      <DropDown
        onClick={() => onDelete(student.id)}
        id={student.id}
        onSort={onSort}
      />
    </li>
  );
};

export default function Students() {
  const { data: students, isLoading, isError } = useGetStudentsQuery();
  const [useDelete] = useDeleteStudentMutation();
  const navigate = useNavigate();
  const [next, setNext] = useState(7);
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
    if (next + 7 > max) {
      setMin(() => next);
      setNext(() => max);
    } else {
      setMin(() => next);
      setNext(() => next + 7);
    }
  };
  //back button
  function handleBack() {
    setSortData(null);
    setControlSort(true);
    if (min - 7 <= 0) {
      setMin(() => 0);
      setNext(() => 7);
    } else {
      setMin(() => min - 7);
      setNext(() => next - 7);
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
    <div className="flex gap-1 ">
      <section className="mr-[1rem] w-[25rem] flex-initial px-5 lg:w-[40rem]">
        <h1 className=" mb-[2rem] border-b border-b-orange-900 py-2 text-center text-2xl">
          Students
        </h1>
        {isLoading && <p>Loading student roster...</p>}
        <ul className="relative">
          {newData?.map((student) => (
            <StudentCard
              student={student}
              key={student.id}
              onDelete={onDelete}
              onSort={handleSort}
            />
          ))}
          {next < max && (
            <button className="absolute right-0" onClick={handleNext}>
              {`>>>`}
            </button>
          )}
          {min > 0 && (
            <button className=" absolute left-0" onClick={handleBack}>
              {`<<<`}
            </button>
          )}
        </ul>
      </section>
      <aside className="mt-10 h-[24rem] w-[12rem] flex-initial  rounded-md border-2 border-r border-slate-600 py-4 text-center shadow-2xl lg:w-[15rem]">
        <h2 className=" mb-4 text-xl font-semibold sm:text-2xl">
          New Student Form
        </h2>
        <NewStudentForm />
      </aside>
    </div>
  );
}

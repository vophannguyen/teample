//just testing
import {
  useGetStudentQuery,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
} from "./studentSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../layout/Button";

/** Allows user to read, update, and delete a task */
export default function StudentDetails() {
  const [deleteStudent] = useDeleteStudentMutation();
  const [message, setMessage] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateStudent] = useUpdateStudentMutation();
  const { data, isLoading, isError } = useGetStudentQuery(id);
  console.log(isLoading);
  if (isLoading) {
    return;
  }
  if (data === undefined) {
    navigate("/*");
  }
  const validateEmail = (e) => {
    const emailRegex =
      /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-0]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
    const email = e.target.value;
    setIsValid(emailRegex.test(email));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const editStudent = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      imageUrl:
        formData.get("imageUrl") ||
        "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
      gpa: formData.get("gpa") || 0.0,
    };

    try {
      if (!isValid) {
        setMessage("Required: valid email address");
      } else {
        console.log(editStudent);
        const response = await updateStudent({ id, ...editStudent }).unwrap();
        console.log(response);
        e.target.reset();
        setEdit(false);
        navigate(`/students/${id}`);
        if (response.Notice) {
          alert("Email already exists in the database");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onEdit = (e) => {
    e.preventDefault();
    setEdit(true);
  };

  const onDelete = async (id) => {
    try {
      await deleteStudent(id).unwrap();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const onNavigate = () => {
    navigate("/");
  };

  const editForm = (
    <form
      className="flex h-[40rem] w-[15rem]  flex-col items-center  gap-6 rounded-3xl border-2 bg-slate-300 px-1 shadow-2xl lg:w-[20rem]"
      type="text"
      onSubmit={onSubmit}
    >
      <h3 className=" mb-6 mt-10 text-2xl font-semibold">Update Student</h3>
      <input name="firstName" type="text" placeholder="Firstname" required />
      <input name="lastName" type="text" placeholder="Lastname" required />
      <input
        name="email"
        type="text"
        placeholder="Email"
        onChange={validateEmail}
        required
      />
      <input name="imageUrl" type="text" placeholder="Image URL" />
      <input
        name="gpa"
        type="number"
        inputMode="decimal"
        min={0.0}
        max={4.0}
        step="0.01"
        placeholder="GPA"
      />
      <Button className="mt-8" type="submit">
        Save
      </Button>
      {message && <p>{message}</p>}
      <div
        className="absolute translate-x-[9rem] cursor-pointer"
        onClick={() => setEdit(() => false)}
      >
        ✖
      </div>
    </form>
  );

  return (
    <div className="flex items-center justify-center gap-8">
      {data ? (
        <section className="h-[40rem] w-[20rem] rounded-3xl border-2 px-8 shadow-xl lg:w-[30rem]">
          <article className=" mt-10 flex h-[35rem] flex-col gap-4 lg:ml-12">
            <img
              src={data.imageUrl}
              alt={data.firstName}
              className="w-[20rem] rounded-3xl"
            />
            <h2 className=" font-semibold">First Name: {data.firstName}</h2>
            <h2 className="font-semibold">Last Name: {data.lastName}</h2>
            <h3 className="font-semibold">GPA: {data.gpa}</h3>
            <h3 className="font-semibold">Contact: {data.email}</h3>
          </article>
          {!edit && (
            <aside className="flex gap-8">
              <Button className="edit-btn" onClick={onEdit}>
                Edit
              </Button>
              <Button className="delete-btn" onClick={() => onDelete(data.id)}>
                Delete
              </Button>
              <Button className="return-btn" onClick={onNavigate}>
                Return
              </Button>
            </aside>
          )}
        </section>
      ) : (
        <p>Loading...</p>
      )}
      {edit && editForm}
    </div>
  );
}

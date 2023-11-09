//just testing
import {
  useGetStudentQuery,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
} from "./studentSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

/** Allows user to read, update, and delete a task */
export default function StudentDetails() {
  const [deleteStudent] = useDeleteStudentMutation();
  const [message, setMessage] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [updateStudent] = useUpdateStudentMutation();
  const { data } = useGetStudentQuery(id);

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
        const response = await updateStudent({ id, ...editStudent });
        console.log(response);
        e.target.reset();
        console.log(response);
        setEdit(false);
        navigate(`/students/${id}`);
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
    <form className="edit-form" type="text" onSubmit={onSubmit}>
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
      <button className="add-btn" type="submit">
        Save
      </button>
      {message && <p>{message}</p>}
    </form>
  );

  return (
    <>
      {data ? (
        <section className="student-details">
          <article className="col-left">
            <img src={data.imageUrl} alt={data.firstName} />
            <h2>
              {data.firstName} {data.lastName}
            </h2>
            <h3>GPA: {data.gpa}</h3>
            <h3>Contact: {data.email}</h3>
          </article>
          <aside>
            <button className="edit-btn" onClick={onEdit}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => onDelete(data.id)}>
              Delete
            </button>
            <button className="return-btn" onClick={onNavigate}>
              Return
            </button>
          </aside>
        </section>
      ) : (
        <p>Loading...</p>
      )}
      {edit && editForm}
    </>
  );
}

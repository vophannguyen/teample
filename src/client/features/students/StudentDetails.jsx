
//just testing
import { useGetStudentQuery, useDeleteStudentMutation, useUpdateStudentMutation } from "./studentSlice"
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

/** Allows user to read, update, and delete a task */
export default function StudentDetails() {
  const [ useDelete ] = useDeleteStudentMutation();
  const [ useUpdate ] = useUpdateStudentMutation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetStudentQuery(id);
 
  const onEdit = async (e) => {
    e.preventDefault();
  };

  const onDelete = async (id) => {
    try {
      await useDelete(id).unwrap();
      navigate("/");
    } catch(err) {
      console.log(err);
    }
  };

  const onNavigate = () => {
    navigate("/");
  };

  return data ? (
    <section className="student-details">
      <article className="col-left">
        <img src={data.imageUrl} alt={data.firstName} />
        <h2>{data.firstName} {data.lastName}</h2>
        <h3>GPA: {data.gpa}</h3>
        <h3>Contact: {data.email}</h3>
      </article>
      <aside>
        <button className="edit-btn" onClick={() => onEdit(data.id)}>Edit Profile</button>
        <button className="delete-btn" onClick={() => onDelete(data.id)}>Delete</button>
        <button className="return-btn" onClick={onNavigate}>Return</button>
      </aside>
    </section>
  ) : (<p>Loading...</p>)
}
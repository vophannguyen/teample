
//just testing
import { useGetStudentQuery } from "./studentSlice"
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
// import { useDeleteTaskMutation, useEditTaskMutation } from "./studentSlice";

/** Allows user to read, update, and delete a task */
export default function StudentDetails({ student }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetStudentQuery(id);
  const [editTask] = useEditTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const [description, setDescription] = useState(task.description);

  /** Updates the task's `done` status */
  const toggleTask = async (evt) => {
    const done = evt.target.checked;
    editTask({ ...task, done });
  };

  /** Saves the task's description */
  const save = async (evt) => {
    evt.preventDefault();
    editTask({ ...task, description });
  };

  /** Deletes the task */
  const onDelete = async (evt) => {
    evt.preventDefault();
    deleteTask(task.id);
  };
  
  return (
    <article className="details-card">
      <h2>Single Student View</h2>
    </article>
  )
}
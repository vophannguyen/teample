import { useState } from "react";
import { useDeleteTaskMutation, useEditTaskMutation } from "./studentSlice";

/** Allows user to read, update, and delete a task */
export default function Student({ task }) {
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
    <>
      <div>`Student ${studentFirstName} ${studentLastName}`</div>
      <br />
      <div>`Contact Email ${studentEmail}`</div>
      <br />
      <image />
      <br />
      <div>`GPA ${studentGPA}`</div>
      {/* Display name of their campus (or helpful message if they don't have one) 
      if campus */}
      {/* <div>{studentCampus ? studentCampus : `Campus not listed`}</div> */}
    </>
  )
}

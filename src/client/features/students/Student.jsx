//just testing
import { useGetStudentQuery } from "./studentSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
// import { useDeleteTaskMutation, useEditTaskMutation } from "./studentSlice";

/** Allows user to read, update, and delete a task */
export default function Student({ student }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetStudentQuery(id);
  // const [editTask] = useEditTaskMutation();
  // const [deleteTask] = useDeleteTaskMutation();

  // const [description, setDescription] = useState(task.description);

  /** Updates the task's `done` status */
  // const toggleTask = async (evt) => {
  //   const done = evt.target.checked;
  // editTask({ ...task, done });
  // };

  /** Saves the task's description */
  // const save = async (evt) => {
  //   evt.preventDefault();
  // editTask({ ...task, description });
  // };

  /** Deletes the task */
  // const onDelete = async (evt) => {
  //   evt.preventDefault();
  //   deleteTask(task.id);
  // };
}
// Display to user single student full, name, email, image, and gpa
function studentDetails({ student }) {
  // Display the appropriate student when the url matches "/students/:studentId"
  return (
    <article>
      <h2>Single Student View</h2>
    </article>
    // <li>
    //   <form onSubmit={save}>
    //     <input type="checkbox" checked={task.done} onChange={toggleTask} />
    //     <input
    //       type="text"
    //       value={description}
    //       onChange={(e) => setDescription(e.target.value)}
    //       required
    //     />
    //     <button>Save</button>
    //     <button onClick={onDelete} aria-label="delete">
    //       🞪
    //     </button>
    //   </form>
    // </li>
  );
}

// Clicking on a student from the students view should navigate to show that selected student

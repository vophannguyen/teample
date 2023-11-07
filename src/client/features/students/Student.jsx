import { useState } from "react";
import { useDeleteTaskMutation, useEditTaskMutation } from "./studentSlice"
import seed from "../seed.js"


// Display to user single student full, name, email, image, and gpa 
function studentDetails({ Student }) {
  return (
    <>
      <p>"testing student render"</p>
    </>
  )
}
export default studentDetails

// Display name of their campus (or helpful message if they don't have one)

// Display the appropriate student when the url matches "/students/:studentId"

//Clicking on a student from the students view should navigate to show that selected student





// export default function Student({ task }) {
//   const [editTask] = useEditTaskMutation();
//   const [deleteTask] = useDeleteTaskMutation();

//   const [description, setDescription] = useState(task.description);

//   /** Updates the task's `done` status */
//   const toggleTask = async (evt) => {
//     const done = evt.target.checked;
//     editTask({ ...task, done });
//   };

//   /** Saves the task's description */
//   const save = async (evt) => {
//     evt.preventDefault();
//     editTask({ ...task, description });
//   };

//   /** Deletes the task */
//   const onDelete = async (evt) => {
//     evt.preventDefault();
//     deleteTask(task.id);
//   };

//   return (
//     <li>
//       <form onSubmit={save}>
//         <input type="checkbox" checked={task.done} onChange={toggleTask} />
//         <input
//           type="text"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//         <button>Save</button>
//         <button onClick={onDelete} aria-label="delete">
//           🞪
//         </button>
//       </form>
//     </li>
//   );
// }

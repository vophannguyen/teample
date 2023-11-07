import React from "react";
import { useState } from "react";

/** Form for creating new tasks */
export default function NewStudentForm() {
  // const [createStudent] = useCreateStudentMutation();
  const [message, setMessage] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target); 
    //do not execute a dispatch if field is empty
    const newStudent = { 
      firstName: formData.get("firstName"), 
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      imageUrl: formData.get("imgUrl") || "defaultimageurl",
      gpa: formData.get("gpa") 
  };
    console.log(newStudent)

    // if (newStudent.firstname.trim() == "") {

    // }
    // try {
    //   await createStudent({ student: newStudent });
    //   e.target.reset();
    // } catch (err) {
    //   console.log(err);
    // }
  };

  return (
    <form onSubmit={onSubmit}>
      <input name="firstName" placeholder="Firstname" />
      <input name="lastName" placeholder="Lastname" />
      <input name="email" placeholder="Email" />
      <input name="imageUrl" placeholder="Image URL" />
      <input name="gpa" placeholder="GPA" />
      <button className="add-btn" type="submit">Add to roster</button>
    </form>
  );
}

import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateStudentMutation } from "./studentSlice";


export default function NewStudentForm() {
  const [createStudent] = useCreateStudentMutation();
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(true);
  const [message, setMessage] = useState("");
  
  const validateEmail = (e) => {
    const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-0]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
    const email = e.target.value;
    setIsValid(emailRegex.test(email));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target); 

    const newStudent = { 
      firstName: formData.get("firstName"), 
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      imageUrl: formData.get("imageUrl") || "https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
      gpa: formData.get("gpa"),
    };
    
    //do not dispatch if email is invalid
      try {
        if (!isValid) {
          setMessage("Required: valid email address")
        } else {
          const response = await createStudent( newStudent ).unwrap();
          console.log(response);
          e.target.reset();
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      }

    };

  return (
    <form classname="create-form" type="text" onSubmit={onSubmit}>
      <input name="firstName" type="text" placeholder="Firstname" required />
      <input name="lastName" type="text" placeholder="Lastname" required />
      <input name="email" type="text" placeholder="Email" onChange={validateEmail} required />
      <input name="imageUrl" type="text" placeholder="Image URL" />
      <input name="gpa" type="number" inputMode="decimal" min={0.00} max={4.00} step="0.01" placeholder="GPA" />
      <button className="add-btn" type="submit">Add Student</button>
      { message && <p>{message}</p> }
    </form>
  );
}

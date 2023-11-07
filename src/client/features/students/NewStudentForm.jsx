
/** Form for creating new tasks */
export default function NewStudentForm() {
  // const [createStudent] = useCreateStudentMutation();

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target); 
    //do not execute a dispatch if field is empty
    const newStudent = { 
      firstName: formData.get("firstname"), 
      lastName: formData.get("lastname"),
      email: formData.get("email"),
      imageURL: formData.get("imgURL") || "defaultimageurl",
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
      <input name="firstname" placeholder="Firstname" />
      <input name="lastname" placeholder="Lastname" />
      <input name="email" placeholder="Email" />
      <input name="imageURL" placeholder="Image URL" />
      <input name="gpa" placeholder="GPA" />
      <button className="add-btn" type="submit">Add Student</button>
    </form>
  );
}

import { useGetStudentsQuery } from "./studentSlice";
import "./Students.less";

export default function filter() {
    const { data: students, isLoading } = useGetStudentsQuery();
    console.log(students)

    const onSortByName = async (lastName) => {
        
    }
}
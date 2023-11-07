import api from "../../store/api";

const studentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/students",
      providesTags: ["Students"],
    }),
    getTask: builder.query({
      query: (id) => `/students/${id}`,
      providesTags: ["Students"],
    }),
    createStudent: builder.mutation({
      query: (student) => ({
        url: "/students",
        method: "POST",
        body: student,
      }),
      invalidatesTags: ["Students"],
    }),
    editStudent: builder.mutation({
      query: (student) => ({
        url: `/student/${student.id}`,
        method: "PUT",
        body: student,
      }),
      invalidatesTags: ["Students"],
    }),
    deleteStudent: builder.mutation({
      query: (id) => ({
        url: `/students/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Students"],
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentQuery,
  useCreateStudentMutation,
  useEditStudentMutation,
  useDeleteStudentMutation,
} = studentsApi;

import api from "../../store/api";

const studentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "/students",
      transformResponse: (response) => response.students,
      providesTags: ["Students"],
    }),
    getStudent: builder.query({
      query: (id) => `/students/${id}`,
      transformResponse: (response) => response.student,
      providesTags: ["Students"],
    }),
    createStudent: builder.mutation({
      query: (data) => ({
        url: "/students/create",
        method: "POST",
        body: data,
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
    updateStudent: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/students/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Students"],
      transformResponse: (response) => response,
    }),
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentQuery,
  useCreateStudentMutation,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
} = studentsApi;

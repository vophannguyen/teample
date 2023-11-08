import api from "../../store/api";

const studentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "/students",
      transformResponse: (response) => response.students,
      providesTags: ["Students"],
    }),
    getStudent: builder.query({
      query: (id) => "/students/${id}",
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
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentQuery,
  useCreateStudentMutation,
} = studentsApi;

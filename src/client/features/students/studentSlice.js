import api from "../../store/api";

const studentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "/students",
      transformResponse: (response) => response.data,
      providesTags: ["Students"],
    }),
    getStudent: builder.query({
      query: (id) => "/students/${id}",
      transformResponse: (response) => response.data,
      providesTags: ["Students"],
    }),
    createStudent: builder.mutation({
      query: (student) => ({
        url: "/students/create",
        method: 'POST',
        body: student,
      }),
      invalidatesTags: ["Students"],
    })
  }),
});

export const {
  useGetStudentsQuery,
  useGetStudentQuery,
  useCreateStudentMutation
} = studentsApi;

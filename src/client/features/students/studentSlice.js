import api from "../../store/api";

const studentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "/students",
      transformResponse: (response) => response.data,
      providesTags: ["Students"],
    }),
    getSingleStudent: builder.query({
      query: () => "/students/:studentId",
      transformResponse: (response) => response.data,
      providesTags: ["SingleStudent"],
    })
  }),
});

export const {
  useGetStudentsQuery, useGetSingleStudentQuery
} = studentsApi;

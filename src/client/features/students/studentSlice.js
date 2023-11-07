import api from "../../store/api";

const studentsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => "/students",
      providesTags: ["Students"],
    }),
  }),
});

export const {
  useGetStudentsQuery,
} = studentsApi;

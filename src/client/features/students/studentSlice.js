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


//? should this file be for our slices and not tha api?
import { createSlice } from "@reduxjs/toolkit"

const studentSlice = createSlice({
  name: "students",
  initialState: [],
  reducers: {
    addStudent: (state, { payload }) => {
      return state.concat([{ student: payload, done: false }])
    }
    viewSingleStudent: (state, { payload }) => {
      return state.concat([{ student: payload }])
    }
  }
})

export const { addStudent } = studentSlice.actions

export default studentSlice.reducer
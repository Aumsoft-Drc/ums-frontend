import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/auth-slice"
import courseReducer from "./slices/course-slice"
import notificationReducer from "./slices/notification-slice"
import profileReducer from "./slices/profile-slice"
import permissionReducer from "./slices/permission-slice"
import roleReducer from "./slices/role-slice"
import universityReducer from "./slices/university-slice"
import departmentReducer from "./slices/department-slice"
import programReducer from "./slices/program-slice"
import cohortReducer from "./slices/cohort-slice"
import roomReducer from "./slices/room-slice"
import academicPeriodReducer from "./slices/academic-period-slice"
import courseOfferingReducer from "./slices/course-offering-slice"
import courseScheduleReducer from "./slices/course-schedule-slice"
import enrollmentReducer from "./slices/enrollment-slice"
import assignmentReducer from "./slices/assignment-slice"
import submissionReducer from "./slices/submission-slice"
import examReducer from "./slices/exam-slice"
import examResultReducer from "./slices/exam-result-slice"
import courseResultReducer from "./slices/course-result-slice"
import deliberationSessionReducer from "./slices/deliberation-session-slice"
import deliberationResultReducer from "./slices/deliberation-result-slice"
import transcriptReducer from "./slices/transcript-slice"
import appealReducer from "./slices/appeal-slice"
import feeTypeReducer from "./slices/fee-type-slice"
import feePaymentReducer from "./slices/fee-payment-slice"
import budgetReducer from "./slices/budget-slice"
import digitalResourceReducer from "./slices/digital-resource-slice"
import categoryReducer from "./slices/category-slice"
import tagReducer from "./slices/tag-slice"
import postReducer from "./slices/post-slice"
import noticeReducer from "./slices/notice-slice"
import chatGroupReducer from "./slices/chat-group-slice"
import contactMessageReducer from "./slices/contact-message-slice"
import cardRequestReducer from "./slices/card-request-slice"
import documentReducer from "./slices/document-slice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    notifications: notificationReducer,
    profile: profileReducer,
    permissions: permissionReducer,
    roles: roleReducer,
    universities: universityReducer,
    departments: departmentReducer,
    programs: programReducer,
    cohorts: cohortReducer,
    rooms: roomReducer,
    academicPeriods: academicPeriodReducer,
    courseOfferings: courseOfferingReducer,
    courseSchedules: courseScheduleReducer,
    enrollments: enrollmentReducer,
    assignments: assignmentReducer,
    submissions: submissionReducer,
    exams: examReducer,
    examResults: examResultReducer,
    courseResults: courseResultReducer,
    deliberationSessions: deliberationSessionReducer,
    deliberationResults: deliberationResultReducer,
    transcripts: transcriptReducer,
    appeals: appealReducer,
    feeTypes: feeTypeReducer,
    feePayments: feePaymentReducer,
    budgets: budgetReducer,
    digitalResources: digitalResourceReducer,
    categories: categoryReducer,
    tags: tagReducer,
    posts: postReducer,
    notices: noticeReducer,
    chatGroups: chatGroupReducer,
    contactMessages: contactMessageReducer,
    cardRequests: cardRequestReducer,
    documents: documentReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

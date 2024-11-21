import { tasksAction } from "../store/TasksSlice";

export const projectOptions = [
  { value: "1", label: "Project A" },
  { value: "2", label: "Project B" },
];
export const issueTypeOptions = [
  { value: "bug", label: "Bug" },
  { value: "feature", label: "Feature" },
];
export const reporterOptions = [
  { value: "user1", label: "User 1" },
  { value: "user2", label: "User 2" },
];
export const assigneeOptions = [
  { value: "user1", label: "User 1" },
  { value: "user2", label: "User 2" },
];
export const priorityOptions = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
];

export const inputsArray = [
  {
    label: "Project",
    type: "select",
    options: projectOptions,
    field: "project",
  },
  {
    label: "Issue Type",
    type: "select",
    options: issueTypeOptions,
    field: "issue",
  },
  {
    label: "Summary",
    type: "text",
    placeholder: "Enter summary",
    field: "summary",
  },
  {
    label: "attachments",
    type: "file",
    placeholder: "Enter summary",
    field: "attachments",
  },
  {
    label: "priority",
    type: "select",
    placeholder: "Enter priority",
    options: priorityOptions,

    field: "priority",
  },
  {
    label: "assignee",
    type: "select",
    options: assigneeOptions,

    placeholder: "Enter summary",
    field: "assignee",
  },
  {
    label: "reporter",
    type: "searchSelect",
    options: assigneeOptions,
    placeholder: "Enter reporter",
    field: "reporter",
  },

  {
    label: "businessImpacts",
    type: "textBox",
    placeholder: "Enter businessImpacts",
    field: "businessImpacts",
  },
  {
    label: "description",
    type: "textBox",
    placeholder: "Enter description",
    field: "description",
  },
  {
    label: "deliveryDate",
    type: "date",
    placeholder: "Enter deliveryDate",
    field: "deliveryDate",
  },
];

export const actionMapping = {
  allTasks: tasksAction.setAllTasks,
  myTasks: tasksAction.setMyTasks,

  //posts: postAction.setDashBoardposts,
  // Add other slices and their corresponding actions here
};

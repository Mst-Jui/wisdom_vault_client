"use server";
import { serverMutation, serverFetch, deleteMutation } from "../server";

export const addLessons = async (data) => {
  const resData = await serverMutation("/api/lessons", "POST", data);
  return resData;
};

export const updateLessons = async (data, id) => {
  const resData = await serverMutation(`/api/lessons/${id}`, "PATCH", data);
  return resData;
};

export const deleteLesson = async (id, userId) => {
  const resData = await deleteMutation(
    `/api/lessons/${id}?userId=${userId}`
  );
  return resData;
};

export const getMyLessons = async (creatorId) => {
  const resData = await serverFetch(`/api/lessons/user/${creatorId}`);
  return resData;
};

export const getLessonDetails = async (id) => {
  const resData = await serverFetch(`/api/lessons/${id}`);
  return resData;
};

export const getFeaturedLessons = async (limit = 6) => {
  const resData = await serverFetch(`/api/lessons/featured?limit=${limit}`);
  return resData;
};

export const getTopContributors = async (limit = 6) => {
  const resData = await serverFetch(`/api/top-contributors?limit=${limit}`);
  return resData;
};
export const getMostSaved = async (limit = 6) => {
  const resData = await serverFetch(`/api/lessons/most-saved?limit=${limit}`);
  return resData;
};

export const toggleFavorite = async (lessonId, userId) => {
  const resData = await serverMutation("/api/favorites/toggle", "POST", {
    lessonId,
    userId,
  });
  return resData;
};

export const getMyFavorites = async (userId) => {
  const resData = await serverFetch(`/api/favorites/${userId}`);
  return resData;
};

export const updateProfile = async (data, userId) => {
  const resData = await serverMutation(`/api/users/${userId}`, "PATCH", data);
  return resData;
};

export const getProfileStats = async (userId) => {
  const resData = await serverFetch(`/api/users/${userId}/profile-stats`);
  return resData;
};

export const getDashboardOverview = async (userId) => {
  const resData = await serverFetch(
    `/api/users/${userId}/dashboard-overview`
  );
  return resData;
};

export const getAllUsers = async (requesterId) => {
  const resData = await serverFetch(`/api/users?requesterId=${requesterId}`);
  return resData;
};

export const updateUserRole = async (userId, role, requesterId) => {
  const resData = await serverMutation(`/api/users/${userId}/role`, "PATCH", {
    role,
    requesterId,
  });
  return resData;
};

export const deleteUser = async (userId, requesterId) => {
  const resData = await deleteMutation(
    `/api/users/${userId}?requesterId=${requesterId}`
  );
  return resData;
};

export const getAdminLessons = async (requesterId) => {
  const resData = await serverFetch(
    `/api/admin/lessons?requesterId=${requesterId}`
  );
  return resData;
};

export const ignoreReports = async (lessonId, requesterId) => {
  const resData = await serverMutation(
    `/api/admin/lessons/${lessonId}/ignore-reports`,
    "PATCH",
    { requesterId }
  );
  return resData;
};

export const getReportedLessons = async (requesterId) => {
  const resData = await serverFetch(
    `/api/admin/reported-lessons?requesterId=${requesterId}`
  );
  return resData;
};

export const getLessonReports = async (lessonId, requesterId) => {
  const resData = await serverFetch(
    `/api/admin/lessons/${lessonId}/reports?requesterId=${requesterId}`
  );
  return resData;
};

export const getAdminActivity = async (adminId) => {
  const resData = await serverFetch(`/api/users/${adminId}/admin-activity`);
  return resData;
};


export const getMostSavedLessons = async (limit = 6) => {
  const resData = await serverFetch(
    `/api/lessons/most-saved?limit=${limit}`
  );

  return resData;
};

export const getAdminDashboardOverview = async (requesterId) => {
  const resData = await serverFetch(
    `/api/admin/dashboard-overview?requesterId=${requesterId}`
  );
  return resData;
};
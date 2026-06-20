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
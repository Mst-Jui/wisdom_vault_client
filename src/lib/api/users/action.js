'use server';

import { serverMutation } from '../server';

export const addLessons = async (data) => {
  const resData = await serverMutation('/api/lessons', 'POST', data);
  return resData;
};
export const updateLessons = async (data, id) => {
  const resData = await serverMutation(`/api/lessons/${id}`, 'PATCH', data);
  return resData;
};
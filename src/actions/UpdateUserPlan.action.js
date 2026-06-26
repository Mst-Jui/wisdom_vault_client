'use server';

import { serverMutation } from "./helpers/serverMutation";



export const UpdateUserPlan = async (userId) => {
  const result = await serverMutation(
    `/api/me/update-plan/${userId}`,
    'PUT',
    {},
    null,
  );

  return result;
};
// src/utils/apiHelper.js
import { apiCall } from "../apiCall";

import { useDispatch } from "react-redux";
import { loadingAction } from "../store/loadingData";

export const useApiHelper = () => {
  const dispatch = useDispatch();

  const handleApiCall = async (
    method,
    url,
    body,
    onSuccess,
    onFailure,
    componentAction,
    dealy
  ) => {
    dispatch(loadingAction.toggleLoading(true));
    await new Promise((resolve) => setTimeout(resolve, (dealy = 1000)));
    try {
      const data = await apiCall(method, url, body);
      if (data.status === "ok") {
        onSuccess(data);
      } else {
        if (onFailure) onFailure(data);
      }
    } catch (error) {
      console.error(error);
      if (onFailure) onFailure(error);
    } finally {
      dispatch(loadingAction.toggleLoading(false));
    }
  };

  return { handleApiCall };
};

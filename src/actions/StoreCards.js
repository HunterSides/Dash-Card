import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  LIKE,
  DELETE
} from "../constants/actionTypes";

import * as api from "../api/index.js";

export const getProposals = () => async dispatch => {
  try {
    const { data } = await api.fetchProposals();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createProposal = proposal => async dispatch => {
  try {
    const { data } = await api.createProposal(proposal);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProposal = (id, proposal) => async dispatch => {
  try {
    const { data } = await api.updateProposal(id, proposal);

    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const likeProposal = id => async dispatch => {
  try {
    const { data } = await api.likeProposal(id);

    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProposal = id => async dispatch => {
  try {
    await api.deleteProposal(id);

    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

import axios from "axios";

const url = "http://localhost:5000/store-cards";

export const fetchStoreCards = () => axios.get(url);
export const fetchCardWithNumber = () =>
  axios.get(`${url}/store-cards/unknown?number=${number}`);
export const createProposal = newProposal => axios.Proposal(url, newProposal);
export const likeProposal = id => axios.patch(`${url}/${id}/likeProposal`);
export const updateProposal = (id, updatedProposal) =>
  axios.patch(`${url}/${id}`, updatedProposal);
export const deleteProposal = id => axios.delete(`${url}/${id}`);

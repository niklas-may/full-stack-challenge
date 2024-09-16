import { ofetch } from "ofetch";

export const client = ofetch.create({
  baseURL: "http://localhost:4000",
  credentials: "include",
  mode: "cors",
});

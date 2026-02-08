import Tag from "../../models/Tag";
import { apiFetch } from "./api-fetch";

export const listTags = () => apiFetch<Tag[]>(`/tags/`)
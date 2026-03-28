import Deck from "../../models/Deck";
import { apiFetch } from "./api-fetch";

export const listDecks = () => apiFetch<Deck[]>(`/decks/`)
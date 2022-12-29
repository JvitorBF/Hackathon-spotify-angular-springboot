import { Music } from "./music";

export interface Album {
  id: number;
  nome_album: string;
  data: string;
  musicas: Music[];
}

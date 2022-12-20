import { Album } from "./album";

export interface Artist {
  id: number;
  posicao: number;
  nome_artista: string;
  album: Album[];
}


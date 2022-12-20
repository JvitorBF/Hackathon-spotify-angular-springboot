import { Music } from "./music";

export interface Playlist {
  id: number;
  posicao: number;
  nome_playlist: string;
  descricao: string;
  usuario: number;
  musica: Music[];
}

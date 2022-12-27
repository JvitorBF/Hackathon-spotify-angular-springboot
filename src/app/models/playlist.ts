import { Music } from './music';

export interface Playlist {
  id: number;
  nome_playlist: string;
  descricao: string;
  usuario: number;
  musica: Music[];
}

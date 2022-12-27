import { Album } from './album';

export interface Artist {
  id: number;
  nome_artista: string;
  album: Album[];
}


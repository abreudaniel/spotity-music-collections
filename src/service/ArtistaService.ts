import api from './api';

export interface Artist {
    id: string;
    name: string;
    images: Array<{
        url: string;
        height: number;
        width: number;
    }>;
    genres: string[];
    followers: {
        total: number;
    };
    popularity: number;
    external_urls: {
        spotify: string;
    };
}

export interface TopArtistsResponse {
    items: Artist[];
    total: number;
    limit: number;
    offset: number;
    previous: string | null;
    next: string | null;
}

export interface Album {
    id: string;
    name: string;
    album_type: 'album' | 'single' | 'compilation';
    release_date: string;
    total_tracks: number;
    images: Array<{
        url: string;
        height: number;
        width: number;
    }>;
    external_urls: {
        spotify: string;
    };
    artists: Array<{
        id: string;
        name: string;
        external_urls: {
            spotify: string;
        };
    }>;
}

export interface AlbumsResponse {
    items: Album[];
    total: number;
    limit: number;
    offset: number;
    previous: string | null;
    next: string | null;
}


export class ArtistService {
    /**
     * Busca os artistas mais ouvidos pelo usuário
     * @param timeRange - Período de tempo para análise (long_term, medium_term, short_term)
     * @param limit - Número máximo de artistas para retornar (máx: 50)
     * @param offset - Número de artistas para pular (para paginação)
     */
    static async getTopArtists(
        timeRange: 'medium_term',
        limit: number = 20,
        offset: number = 0
    ): Promise<TopArtistsResponse> {
        try {
            const response = await api.get<TopArtistsResponse>('/me/top/artists', {
                params: {
                    time_range: timeRange,
                    limit,
                    offset
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar artistas preferidos:', error);
            throw error;
        }
    }

    /**
     * Busca os detalhes de um artista específico
     * @param artistId - ID do artista no Spotify
     */
    static async getArtist(artistId: string): Promise<Artist> {
        try {
            const response = await api.get<Artist>(`/artists/${artistId}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar detalhes do artista:', error);
            throw error;
        }
    }


    /**
     * Busca os álbuns de um artista específico
     * @param artistId - ID do artista no Spotify
     * @param include_groups - Tipos de álbuns a serem incluídos
     * @param limit - Número máximo de álbuns para retornar (máx: 50)
     * @param offset - Número de álbuns para pular (para paginação)
     */
    static async getArtistAlbums(
        artistId: string,
        include_groups: Array<'album' | 'single' | 'compilation' | 'appears_on'> = ['album'],
        limit: number = 20,
        offset: number = 0
    ): Promise<AlbumsResponse> {
        try {
            const response = await api.get<AlbumsResponse>(`/artists/${artistId}/albums`, {
                params: {
                    include_groups: include_groups.join(','),
                    limit,
                    offset,
                    market: 'BR' // Você pode ajustar o mercado conforme necessário
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar álbuns do artista:', error);
            throw error;
        }
    }



}

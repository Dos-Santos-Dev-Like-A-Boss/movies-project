export interface IMovie {
    score: number;
    show: {
        id: number;
        url: string;
        summary: string;
        name: string;
        type: string;
        genres: string[];
        premiered: string;
        rating: {
            average: number;
        }
        image: {
            medium: string;
            original: string;
        } | null;
    }
}

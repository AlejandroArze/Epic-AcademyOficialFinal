export interface Category
{
    id?: string;
    title?: string;
    slug?: string;
}

export interface Course
{
    id?: string;
    title?: string;
    slug?: string;
    description?: string;
    category?: string;
    duration?: number;
    steps?: {
        order?: number;
        title?: string;
        subtitle?: string;
        content?: string;
    }[];
    totalSteps?: number;
    updatedAt?: number;
    featured?: boolean;
    progress?: {
        currentStep?: number;
        completed?: number;
    };
}

export interface VideoInfo {
    url?: string;  // Puede ser URL de video local o de YouTube
    subtitlesUrl?: string;
    poster?: string;
    type?: 'local' | 'youtube';  // Tipo opcional para mayor claridad
}

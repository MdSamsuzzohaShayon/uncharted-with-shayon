import { useCallback } from 'react';

interface MediaItem {
    id: number;
    name: string;
    url: string;
    mime: string;
    size: number;
    width?: number;
    height?: number;
}

export const useStrapiMediaLibrary = () => {
    const openMediaLibrary = useCallback((): Promise<MediaItem | null> => {
        return new Promise((resolve) => {
            // Open Strapi's built-in media library modal
            const mediaLibraryEvent = new CustomEvent('strapi:open-media-library', {
                detail: {
                    onSelect: (media: MediaItem[]) => {
                        if (media && media.length > 0) {
                            resolve(media[0]);
                        } else {
                            resolve(null);
                        }
                    },
                    onClose: () => {
                        resolve(null);
                    },
                },
            });

            window.dispatchEvent(mediaLibraryEvent);

            // Fallback: Listen for media selection
            const handleMediaSelect = (event: any) => {
                if (event.detail && event.detail.media) {
                    resolve(event.detail.media[0] || null);
                    window.removeEventListener('strapi:media-selected', handleMediaSelect);
                }
            };

            window.addEventListener('strapi:media-selected', handleMediaSelect);

            // Timeout fallback
            setTimeout(() => {
                window.removeEventListener('strapi:media-selected', handleMediaSelect);
                resolve(null);
            }, 60000);
        });
    }, []);

    return { openMediaLibrary };
};
import type { IArticle } from "../types";


export const dummyCommentsData = [
    {
        id: 1,
        name: 'Sarah Johnson',
        content: 'This looks absolutely incredible! Adding this to my bucket list for next year. Thanks for the detailed guide!',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
        id: 2,
        name: 'Michael Chen',
        content: 'I visited here last summer and your photos bring back so many amazing memories. The sunrise at the viewpoint is truly unforgettable.',
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    {
        id: 3,
        name: 'Emma Rodriguez',
        content: 'Great tips about the best time to visit! I went during monsoon season and it was still beautiful but definitely different.',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    }
]


// Related Articles (Dummy Data)
export const relatedArticlesData = [
    {
        id: 1,
        title: 'Hidden Gems of the Swiss Alps',
        slug: 'hidden-gems-swiss-alps',
        published_date: '2024-01-15',
        featured_image: { url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80' }
    },
    {
        id: 2,
        title: 'Santorini: Beyond the Postcards',
        slug: 'santorini-beyond-postcards',
        published_date: '2024-01-10',
        featured_image: { url: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&q=80' }
    },
    {
        id: 3,
        title: 'Kyoto Temple Trail Guide',
        slug: 'kyoto-temple-trail',
        published_date: '2024-01-05',
        featured_image: { url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80' }
    }
];


export const prevArticleData = {
    id: 1,
    title: 'Exploring the Norwegian Fjords',
    slug: 'norwegian-fjords',
    featured_image: { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80' }
};

export const nextArticleData = {
    id: 2,
    title: 'Sahara Desert: A Night Under Stars',
    slug: 'sahara-desert-night',
    featured_image: { url: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=600&q=80' }
};

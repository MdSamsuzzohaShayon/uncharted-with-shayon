// utils/cache.ts

interface ICacheItem<T> {
    data: T
    timestamp: number
    ttl: number
}

class ArticleCache {
    private cache = new Map<string, ICacheItem<any>>()
    private defaultTTL = 5 * 60 * 1000 // 5 minutes

    set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
        this.cache.set(key, {
            data,
            timestamp: Date.now(),
            ttl
        })
    }

    get<T>(key: string): T | null {
        const item = this.cache.get(key)

        if (!item) return null

        const isExpired = Date.now() - item.timestamp > item.ttl

        if (isExpired) {
            this.cache.delete(key)
            return null
        }

        return item.data as T
    }

    clear(): void {
        this.cache.clear()
    }

    remove(key: string): void {
        this.cache.delete(key)
    }
}

export const articleCache = new ArticleCache()
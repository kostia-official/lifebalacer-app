import { CachePersistor } from 'apollo3-cache-persist';
import { InMemoryCache, NormalizedCacheObject } from '@apollo/client';

export class ApolloPersistCache {
  private loadCachePromise: Promise<any> | null = null;
  public isLoaded = false;

  public persistor: CachePersistor<NormalizedCacheObject>;

  constructor(cache: InMemoryCache) {
    this.persistor = new CachePersistor({
      cache,
      storage: window.localStorage,
      debounce: 500,
      maxSize: false
    });
  }

  public async load() {
    if (this.loadCachePromise) return this.loadCachePromise;

    this.loadCachePromise = this.loadHandler();

    return this.loadCachePromise;
  }

  private async loadHandler() {
    await this.persistor.restore();

    this.isLoaded = true;
  }
}

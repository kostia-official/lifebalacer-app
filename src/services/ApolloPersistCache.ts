import { CachePersistor, PersistentStorage } from 'apollo3-cache-persist';
import { InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { PersistedData } from 'apollo3-cache-persist/lib/types';

export class ApolloPersistCache {
  private loadCachePromise: Promise<any> | null = null;
  public isLoaded = false;

  public persistor: CachePersistor<NormalizedCacheObject>;

  constructor(cache: InMemoryCache) {
    const storage = window.localStorage as PersistentStorage<PersistedData<NormalizedCacheObject>>;
    this.persistor = new CachePersistor({ cache, storage: storage });
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

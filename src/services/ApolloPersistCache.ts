import { persistCache, PersistentStorage } from 'apollo3-cache-persist';
import { PersistedData } from 'apollo3-cache-persist/lib/types';
import { NormalizedCacheObject } from '@apollo/client';
import { cache } from '../apollo/cache';

class ApolloPersistCache {
  private loadCachePromise: Promise<any> | null = null;
  public isLoaded = false;

  public async load() {
    if (this.loadCachePromise) return this.loadCachePromise;

    this.loadCachePromise = this.loadHandler();

    return this.loadCachePromise;
  }

  private async loadHandler() {
    const storage = window.localStorage as PersistentStorage<PersistedData<NormalizedCacheObject>>;
    await persistCache({ cache, storage });
    this.isLoaded = true;
  }
}

export const apolloPersistCache = new ApolloPersistCache();

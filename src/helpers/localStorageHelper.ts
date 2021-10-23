export class LocalStorageHelper<T extends unknown> {
  protected key: string;

  constructor(key: string, defaultValue?: T) {
    this.key = key;

    const oldValue = this.get();

    if (!oldValue && defaultValue) {
      this.set(defaultValue);
    }
  }

  set(value: unknown): void {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  get(): T | undefined {
    try {
      const value = localStorage.getItem(this.key);
      return value && JSON.parse(value);
    } catch (err) {
      return undefined;
    }
  }

  clear(): void {
    localStorage.removeItem(this.key);
  }
}

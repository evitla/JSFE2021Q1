import { DatabaseRecordModel } from './models/database-record-model';

export class Database {
  db: IDBDatabase | null;

  constructor(
    private readonly dbName: string,
    private readonly store: string,
    private readonly dbVersion?: number
  ) {
    this.db = null;
  }

  init() {
    const openRequest = window.indexedDB.open(this.dbName, this.dbVersion);

    openRequest.onupgradeneeded = () => {
      this.db = openRequest.result;
      const store = this.db.createObjectStore(this.store, {
        keyPath: 'id',
        autoIncrement: true,
      });
      store.createIndex('name', 'name');
      store.createIndex('email', 'email', { unique: true });
      store.createIndex('score', 'score');
    };

    openRequest.onsuccess = () => {
      this.db = openRequest.result;
    };
  }

  write(data: DatabaseRecordModel): Promise<DatabaseRecordModel> {
    return new Promise((resolve) => {
      const transaction = this.db?.transaction(this.store, 'readwrite');
      const store = transaction?.objectStore(this.store);
      store?.put(data);

      if (transaction) {
        transaction.oncomplete = () => {
          resolve(data);
        };
      }
    });
  }

  updateScore(email: string, score: number): Promise<DatabaseRecordModel> {
    return new Promise((resolve) => {
      const transaction = this.db?.transaction(this.store, 'readwrite');
      const store = transaction?.objectStore(this.store);
      const request = store?.index('email').openCursor(null, 'next');
      if (request) {
        request.onsuccess = () => {
          const cursor = request?.result;
          if (cursor) {
            const currentValue: DatabaseRecordModel = cursor.value;
            if (currentValue.email === email) {
              currentValue.score = score;
              const updateRequest = cursor.update(currentValue);
              updateRequest.onsuccess = () => {
                resolve(currentValue);
              };
            }
            cursor.continue();
          }
        };
      }
    });
  }

  getAll(): Promise<DatabaseRecordModel[]> {
    return new Promise((resolve) => {
      const transaction = this.db?.transaction(this.store, 'readonly');
      const store = transaction?.objectStore(this.store);
      const request = store?.getAll();

      if (transaction) {
        transaction.oncomplete = () => {
          if (request) resolve(request.result);
        };
      }
    });
  }

  getFiltered(
    filter: (item: DatabaseRecordModel) => boolean
  ): Promise<DatabaseRecordModel[]> {
    return new Promise((resolve) => {
      const transaction = this.db?.transaction(this.store, 'readonly');
      const store = transaction?.objectStore(this.store);
      const result: DatabaseRecordModel[] = [];

      if (store) {
        const request = store?.index('score').openCursor(null, 'prev');

        if (request) {
          request.onsuccess = () => {
            const cursor = request?.result;
            if (cursor) {
              const currentValue: DatabaseRecordModel = cursor.value;
              if (filter(currentValue)) {
                result.push(currentValue);
              }
              cursor.continue();
            }
          };
        }
      }

      if (transaction) {
        transaction.oncomplete = () => {
          resolve(result);
        };
      }
    });
  }
}

/**
 * AppService - Service for managing app data using IndexedDB
 */
export default class HistoryService {
  constructor() {
    this.dbName = 'HistoryServiceDB';
    this.dbVersion = 1;
    this.storeName = 'historyStore';
    this.db = null;
  }

  /**
   * Initialize the IndexedDB database
   */
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => {
        reject(new Error('Failed to open database'));
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        
        // Create object store if it doesn't exist
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id' });
          
          // Create index for lastUpdate to enable efficient sorting
          store.createIndex('lastUpdate', 'lastUpdate', { unique: false });
          // Create index for name to enable searching by name
          store.createIndex('name', 'name', { unique: false });
        }
      };
    });
  }

  /**
   * Ensure database is initialized
   */
  async ensureInit() {
    if (!this.db) {
      await this.init();
    }
  }

  /**
   * Generate a random ID
   * @returns {string} A random ID string
   */
  generateId() {
    return 'hist_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
  }

  /**
   * Create a new record
   * @param {string} name - Name for the record
   * @param {Object} content - JSON object to store
   * @returns {Promise<Object>} The created record with generated ID
   */
  async create(name, content) {
    await this.ensureInit();
    
    const record = {
      id: this.generateId(),
      name,
      lastUpdate: new Date().toISOString(),
      content
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.add(record);

      request.onsuccess = () => {
        resolve(record);
      };

      request.onerror = () => {
        reject(new Error(`Failed to create record: ${request.error?.message || 'Unknown error'}`));
      };
    });
  }

  /**
   * Update an existing record
   * @param {string} id - Unique ID for the record
   * @param {string} name - Name for the record
   * @param {Object} content - JSON object to store
   * @returns {Promise<Object>} The updated record
   */
  async update(id, name, content) {
    await this.ensureInit();
    
    const record = {
      id,
      name,
      lastUpdate: new Date().toISOString(),
      content
    };

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      const request = store.put(record);

      request.onsuccess = () => {
        resolve(record);
      };

      request.onerror = () => {
        reject(new Error(`Failed to update record: ${request.error?.message || 'Unknown error'}`));
      };
    });
  }

  /**
   * Read a record by ID
   * @param {string} id - Unique ID for the record
   * @returns {Promise<Object|null>} The record or null if not found
   */
  async read(id) {
    await this.ensureInit();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result || null);
      };

      request.onerror = () => {
        reject(new Error(`Failed to read record: ${request.error?.message || 'Unknown error'}`));
      };
    });
  }

  /**
   * Read a record by name
   * @param {string} name - Name of the record
   * @returns {Promise<Object|null>} The record or null if not found
   */
  async readByName(name) {
    await this.ensureInit();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const index = store.index('name');
      const request = index.get(name);

      request.onsuccess = () => {
        resolve(request.result || null);
      };

      request.onerror = () => {
        reject(new Error(`Failed to read record by name: ${request.error?.message || 'Unknown error'}`));
      };
    });
  }

  /**
   * Delete a record by ID
   * @param {string} id - Unique ID for the record
   * @returns {Promise<boolean>} True if deleted, false if not found
   */
  async delete(id) {
    await this.ensureInit();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      
      // First check if the record exists
      const getRequest = store.get(id);
      
      getRequest.onsuccess = () => {
        if (!getRequest.result) {
          resolve(false); // Record not found
          return;
        }
        
        // Record exists, delete it
        const deleteRequest = store.delete(id);
        
        deleteRequest.onsuccess = () => {
          resolve(true);
        };
        
        deleteRequest.onerror = () => {
          reject(new Error(`Failed to delete record: ${deleteRequest.error?.message || 'Unknown error'}`));
        };
      };

      getRequest.onerror = () => {
        reject(new Error(`Failed to check record existence: ${getRequest.error?.message || 'Unknown error'}`));
      };
    });
  }

  /**
   * Delete a record by name
   * @param {string} name - Name of the record
   * @returns {Promise<boolean>} True if deleted, false if not found
   */
  async deleteByName(name) {
    const record = await this.readByName(name);
    if (record) {
      return await this.delete(record.id);
    }
    return false;
  }

  /**
   * List all records sorted by lastUpdate (newest first)
   * @param {boolean} ascending - Sort order (default: false for newest first)
   * @returns {Promise<Array>} Array of records sorted by lastUpdate
   */
  async listByLastUpdate(ascending = false) {
    await this.ensureInit();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const index = store.index('lastUpdate');
      
      const request = index.openCursor(null, ascending ? 'next' : 'prev');
      const results = [];

      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          results.push(cursor.value);
          cursor.continue();
        } else {
          resolve(results);
        }
      };

      request.onerror = () => {
        reject(new Error(`Failed to list records: ${request.error?.message || 'Unknown error'}`));
      };
    });
  }

  /**
   * Get all records (no specific order)
   * @returns {Promise<Array>} Array of all records
   */
  async getAll() {
    await this.ensureInit();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(new Error(`Failed to get all records: ${request.error?.message || 'Unknown error'}`));
      };
    });
  }

  /**
   * Get the most recent lastUpdate timestamp from all records
   * @returns {Promise<string|null>} The most recent lastUpdate ISO string or null if no records exist
   */
  async getLastUpdated() {
    await this.ensureInit();

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const index = store.index('lastUpdate');
      
      // Open cursor in reverse order to get the most recent first
      const request = index.openCursor(null, 'prev');

      request.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          // First record is the most recent
          resolve(cursor.value);
        } else {
          // No records found
          resolve(null);
        }
      };

      request.onerror = () => {
        reject(new Error(`Failed to get most recent lastUpdate: ${request.error?.message || 'Unknown error'}`));
      };
    });
  }

  /**
   * Close the database connection
   */
  close() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}
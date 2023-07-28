import { openDB } from 'idb';

const DATABASE_NAME = 'jate';
const DATABASE_VERSION = 1;
const OBJECT_STORE_NAME = 'jate';

const initdb = async () => {
  try {
    const db = await openDB(DATABASE_NAME, DATABASE_VERSION, {
      upgrade(database) {
        if (!database.objectStoreNames.contains(OBJECT_STORE_NAME)) {
          database.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id', autoIncrement: true });
          console.log(`${OBJECT_STORE_NAME} database created`);
        }
      },
    });
    console.log('Database initialized:', db);
    return db;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const db = await initdb();
    const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
    const store = tx.objectStore(OBJECT_STORE_NAME);
    const id = await store.put({ content });
    console.log('Content added to the database with ID:', id);
    await tx.complete;
    return id;
  } catch (error) {
    console.error('Error putting content to the database:', error);
    throw error;
  }
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    const db = await initdb();
    const tx = db.transaction(OBJECT_STORE_NAME, 'readonly');
    const store = tx.objectStore(OBJECT_STORE_NAME);
    const content = await store.getAll();
    console.log('Content retrieved from the database:', content);
    await tx.complete;
    return content;
  } catch (error) {
    console.error('Error getting content from the database:', error);
    throw error;
  }
};

export default initdb;
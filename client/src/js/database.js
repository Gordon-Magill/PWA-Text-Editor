import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate_DB', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate_table')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate_table', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // Open the database
  const jateDB = await openDB('jate_DB',1)
  // Create a new transaction with the 'table'
  const putTx = jateDB.transaction('jate_table','readwrite')
  // Define an objectStore pointing towards the table
  const jate_table = putTx.objectStore('jate_table')
  // Modify the 
  const table_update = jate_table.put({id:1, content})
  const result = await table_update
  console.log('Content updated in db: ', result)
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // console.error('getDb not implemented')
  const jateDB = await openDB('jate_DB',1)
  const getTx = jateDB.transaction('jate_table','readwrite')
  const jate_table = getTx.objectStore('jate_table')
  const request = jate_table.getAll()
  const result = await request
  console.log('Got table content: ', result)
  return result
};

initdb();

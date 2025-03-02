import Dexie from 'dexie';

// Initialize Dexie database
const db = new Dexie('NotesDatabase');
db.version(1).stores({
  notes: '++id, residentName, dateTime, content, authorName, synced',
});

export default db;
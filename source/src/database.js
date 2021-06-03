import Dexie from 'dexie';

const database = new Dexie('theme-bujo');

database.version(2).stores({
  habits: '++id,name',
  habitCompletions: '++id,habitId,date',
  collections: '++id,name,bullets',
  logs: '++id,date,bullets',
  bullets: '++id,type,content,children',
});

export default database;

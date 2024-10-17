// src/components/Database.jsx

const Database = {
    save(key, data) {
        try {
          localStorage.setItem(key, JSON.stringify(data));
          console.log(`${key} saved successfully`);
        } catch (error) {
          console.error(`Error saving data to ${key}:`, error);
        }
      },
  
      get(key) {
        try {
          const data = localStorage.getItem(key);
          return data ? JSON.parse(data) : null;
        } catch (error) {
          console.error(`Error retrieving data from ${key}:`, error);
          return null;
        }
      },
  
      delete(key) {
        try {
          localStorage.removeItem(key);
          console.log(`${key} deleted successfully`);
        } catch (error) {
          console.error(`Error deleting ${key}:`, error);
        }
      },
  };
  
  export default Database;
  
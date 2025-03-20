# Local-First Development

Learn how to build applications that work offline and prioritize local data storage.

## What is Local-First Development?

Local-first development prioritizes:
- Offline functionality
- Data persistence
- User privacy
- Performance

## Storage Options

### 1. LocalStorage
```javascript
// Storing data
localStorage.setItem('todos', JSON.stringify(todos));

// Retrieving data
const todos = JSON.parse(localStorage.getItem('todos')) || [];
```

### 2. IndexedDB
```javascript
// Basic IndexedDB setup
const request = indexedDB.open('myDatabase', 1);

request.onupgradeneeded = (event) => {
    const db = event.target.result;
    const store = db.createObjectStore('todos', { keyPath: 'id' });
};
```

### 3. File System Access (Where Available)
```javascript
// Modern browsers only
async function saveFile(content) {
    try {
        const handle = await window.showSaveFilePicker();
        const writable = await handle.createWritable();
        await writable.write(content);
        await writable.close();
    } catch (err) {
        console.error('Failed to save file:', err);
    }
}
```

## Example: Quiz App with Local Storage

See our [Quiz Application](../apps/quiz-app/) for an example of:
- Local data persistence
- Offline functionality
- Progress saving
- Score tracking

## Best Practices

1. **Data Management**
   - Regular saving
   - Version control
   - Data validation
   - Error handling

2. **User Experience**
   - Loading states
   - Error messages
   - Progress indicators
   - Offline indicators

3. **Performance**
   - Efficient storage
   - Data compression
   - Batch operations
   - Cache management

## Implementation Patterns

1. **Auto-Save**
```javascript
function autoSave(data) {
    const timestamp = Date.now();
    try {
        localStorage.setItem('autosave', JSON.stringify({
            data,
            timestamp
        }));
    } catch (error) {
        console.error('Auto-save failed:', error);
    }
}
```

2. **Data Sync (When Online)**
```javascript
async function syncData() {
    if (navigator.onLine) {
        const localData = JSON.parse(localStorage.getItem('offlineChanges')) || [];
        try {
            await sendToServer(localData);
            localStorage.removeItem('offlineChanges');
        } catch (error) {
            console.error('Sync failed:', error);
        }
    }
}
```

## Testing Local-First Applications

1. **Offline Testing**
   - Disable network
   - Test data persistence
   - Verify sync behavior

2. **Storage Limits**
   - Test with large datasets
   - Handle storage errors
   - Implement cleanup

## Resources
- [MDN Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [File System Access API](https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API) 
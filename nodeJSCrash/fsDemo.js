// import fs from 'fs';
import { write } from 'fs';
import fs from 'fs/promises'

// readFile - callback
/*
fs.readFile('./test.txt', 'utf8', (err, data) => {
    if(err) throw err
        console.log(data);
});

// readFileSync() - Synchronous version
const data = fs.readFileSync('./test.txt', 'utf8');
console.log(data);


// readFile - Promise .then()

fs.readFile('./test.txt', 'utf8')
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
*/

// ReadFile() - async/await
const readFile = async () => {
    try {
        const data = await fs.readFile('./test.txt', 'utf8');
        console.log(data);
    } catch (err) {
        console.log(err);
    }
}

// writeFile()

const writeFile = async () => {
    try {
        await fs.writeFile('./test.txt', 'Hello, I am writing to this file', 'utf8');
        console.log('File written to...');
    } catch (err) {
        console.log(err);
    }
}

// appendFile()
const appendFile = async () => {
    try {
        await fs.appendFile('./test.txt', '\nThis is appended text', 'utf8');
        console.log('File appended to...');
    } catch (err) {
        console.log(err);
    }
}

writeFile();
appendFile();
readFile();
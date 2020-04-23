async function writeUser(username) {
    console.log(`touched username ${username}`);
    const db = await open({
      filename: '/tmp/database3.db',
      driver: sqlite3.Database
    })
    await db.exec('CREATE TABLE IF NOT EXISTS user (name)');
    await db.exec(`INSERT INTO user VALUES ("${username}")`);
    const result = await db.get('SELECT * FROM user');
    console.log('Expected result', result);
  }
  
  module.exports.writeUser = writeUser;
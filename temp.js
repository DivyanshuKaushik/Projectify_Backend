const bcrypt = require('bcryptjs');

async function run() {
    const hashed = await bcrypt.hash('password', 12);
    console.log(hashed);
}
run()


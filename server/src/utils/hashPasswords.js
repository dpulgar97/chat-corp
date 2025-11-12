import bcrypt from 'bcrypt';

const users = [
  { username: 'admin', password: 'admin123' },
  { username: 'user1', password: 'user123' }
];

const SALT_ROUNDS = 10;

const hashPasswords = async () => {
  for (const user of users) {
    const hashed = await bcrypt.hash(user.password, SALT_ROUNDS);
    console.log(`${user.username}: "${hashed}"`);
  }
};

hashPasswords();
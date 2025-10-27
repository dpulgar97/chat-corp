export const users = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123', // "admin123" hasheada con bcrypt
    role: 'admin'
  },
  {
    id: '2',
    username: 'user1',
    email: 'user1@example.com',
    password: '$2b$10$LqU6s3K9qF4X8Z1v2W3Y4eJ3a9v1qY4J3sV9EeJ3a9v1qY4J3sV9E', // "user123"
    role: 'user'
  }
];
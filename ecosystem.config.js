module.exports = {
  apps: [
    {
      name: 'cms-main',
      script: './dist/server.js',
      args: ['master'],
      instances: 1,
      autorestart: true,
      exec_mode: 'cluster',
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        TZ: 'Asia/Ho_Chi_Minh',
        PORT: process.env.PORT,
      },
    },
  ],
};

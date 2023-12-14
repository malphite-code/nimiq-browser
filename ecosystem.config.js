module.exports = {
    apps : [
      {
        name: 'node-miner', // application name 
        script: 'app.js', // script path to pm2 start
        instances: 2, // number process of application
        autorestart: true, //auto restart if app crashes
        watch: false,
        max_memory_restart: '4G', // restart if it exceeds the amount of memory specified
        env: {
          NODE_ENV: 'development'
        },
        env_production: {
          NODE_ENV: 'production'
        }
      }
    ],
  };
  
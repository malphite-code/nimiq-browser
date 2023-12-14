### How to start

1. Clone project

2. Install

```
cd nimiq-browser
npm install
```

3. Update your config
```
const token = "6sBXGL6gXJijiCBA" --> Get after register account
const url = "https://nimiq.vercel.app?wallet=[address]&host=pool.nimiq.watch&port=8443&threads=4&autostart=1"
```

4. Start mining
```
node app.js
```

### Multi Browser
```
sudo npm i -g pm2
pm2 start
```
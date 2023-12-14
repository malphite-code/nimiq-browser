### How to start

1. Clone project

2. Install

```
cd nimiq-browser
npm install
```

3. Update config.json

```
{
    "host": "pool.acemining.co",                       --> Pool host
    "port": "8443",                                    --> Pool port
    "wallet": "NQ08SUEHT0GSPCDJHUNXQ50HB0M0ABHAPP03",  --> Your Nimiq wallet address
    "threads": 8,                                      --> CPU threads to Mining
    "autostart": true,                                 --> Auto start mining
    "token": null                                      --> Get from Browsercloud Dashboard
}
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
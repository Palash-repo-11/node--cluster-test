const cluster = require('cluster');
const os = require('os');
const express = require('express');
const app = express();
const numCPUs = os.cpus().length;
const PORT = process.env.PORT || 4000;

if(cluster.isPrimary){
    for(let i = 0; i < numCPUs-2; i++){
        cluster.fork();
    }
}
else{
    app.get('/', (req, res) => {
        res.send({message:`Hello from the clustered Express server! ${process.pid}`});
    });
    
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} with PID: ${process.pid}`);
    });
    
}


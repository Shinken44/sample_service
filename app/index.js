const config = require('./../config') 

const express = require('express')
const app = express()

const configPath = `${__dirname}/test_config.json`; 

app.get('/', (request, response) => {
    response.send('Test config Service')
})

app.get('/config/get-*', (request, response) => {
    config.load(configPath)
        .then((res) => {            
            const key = request.url.replace("/config/get-", "");
            const value = config.getValue(key);
            if (value != undefined) {
                response.send(`Key: "${key}". Value = ${value}`);
            }
            else {
                response.send(`Key: "${key}". Value not find`);
            }
        })
        .catch((err) => {
            response.send("load: failed");
            console.log(`config.load error: ${err}`);
        })    
})

app.get('/config/set-*', (request, response) => {
    config.load(configPath)
        .then((res) => {
            const data = request.url.replace("/config/set-", "");
            const key = data.replace(/-.*/g, "");
            const value = data.replace(/.*-/g, "");
            
            config.setValue(key, value);
            
            config.save(configPath)
                .then((res) => {                        
                    response.send(`Key: "${key}". Value = ${value}`);            
                })
                .catch((err) => {
                    response.send("save: failed");
                    console.log(`config.save error: ${err}`);
                })
        })
        .catch((err) => {
            response.send("load: failed");
            console.log(`config.load error: ${err}`);
        })    
})

app.get('/integration/set-*', (request, response) => {
    config.load(configPath)
        .then((res) => {
            const moduleType = request.url.replace("/integration/set-", "");
            
            let result = false;
            switch (moduleType) {
                case "office-monitor":                    
                    config.setValue("imType", moduleType);
                    config.setValue("imIP", "127.0.0.1");
                    config.setValue("imPort", 80);
                    config.setValue("imLogin", "");
                    config.setValue("imPassword", "");
                    result = true;
                    break;
                case "orion":
                    config.setValue("imType", moduleType);
                    config.setValue("imIP", "127.0.0.1");
                    config.setValue("imPort", 8090);
                    config.setValue("imOuterPoints", "Дверь 1, Дверь 2");  
                    result = true;                  
                    break;
                case "perco":                    
                    config.setValue("imType", moduleType);
                    config.setValue("imIP", "127.0.0.1");
                    config.setValue("imPort", 8080);
                    config.setValue("imPercoServerIP", "127.0.0.1");
                    config.setValue("imPercoServerPort", 211);
                    config.setValue("imPercoLogin", "ADMIN");
                    config.setValue("imPercoPassword", "");
                    config.setValue("imKey", "SECRET");
                    result = true;
                    break;
                default:
                    console.log(`unknown module type ${moduleType}`);
            }
            
            if (result) {
                config.save(configPath)
                    .then((res) => {                        
                        response.send(`Set integration module type "${moduleType}" - success`);
                    })
                    .catch((err) => {
                        response.send(`Set integration module type (${moduleType}" - failed`);
                        console.log(`config.save error: ${err}`);
                    })
            }
            else {
                response.send(`Unknown integration module type ${moduleType}`);
            }

        })
        .catch((err) => {
            response.send("load: failed");
            console.log(`config.load error: ${err}`);
        });
})

app.get('/integration/get', (request, response) => {
    config.load(configPath)
        .then((res) => {  
            let integrationConfig = {};
            switch (config.getValue("imType")) {
                case "office-monitor":                    
                    integrationConfig = {
                        "type": config.getValue("imType"),
                        "ip": config.getValue("imIP"),
                        "port": config.getValue("imPort"),
                        "login": config.getValue("imLogin"),
                        "password": config.getValue("imPassword"),
                    }
                    response.send(JSON.stringify(integrationConfig, null, 2));
                    break;
                case "orion":
                    integrationConfig = {
                        "type": config.getValue("imType"),
                        "ip": config.getValue("imIP"),
                        "port": config.getValue("imPort"),
                        "outerPoints": config.getValue("imOuterPoints"),                        
                    }
                    response.send(JSON.stringify(integrationConfig, null, 2));
                    break;
                case "perco":                    
                    integrationConfig = {
                        "type": config.getValue("imType"),
                        "ip": config.getValue("imIP"),
                        "port": config.getValue("imPort"),
                        "percoServerIP": config.getValue("imPercoServerIP"),
                        "percoServerPort": config.getValue("imPercoServerPort"),
                        "percoLogin": config.getValue("imPercoLogin"),
                        "key": config.getValue("imKey")                        
                    }
                    response.send(JSON.stringify(integrationConfig, null, 2));                    
                    break;
                default:
                    response.send("Integration module type undefined");
                    console.log(`unknown module type ${moduleType}`);
            }
        })
        .catch((err) => {
            response.send("load: failed");
            console.log(`config.load error: ${err}`);
        });
})

module.exports = app
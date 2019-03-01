const fs = require("fs");

let config = {};

function load(path) {
    return new Promise(function(resolve, reject) {        
        fs.readFile(path, "utf8", (err, data) => {
            if (err) {
                reject(Error(`readFile - ${err}`))
            }

            try {
                config = JSON.parse(data);
                resolve(true);
            }
            catch (err) {
                reject(Error(`readFile - ${err}`))
            }
        })
    })
}

function save(path) {
    return new Promise(function(resolve, reject) {
        const data = JSON.stringify(config, null, 2);
        
        fs.writeFile(path, data, "utf8", (err) => {
            if (err) {
                reject(Error(`writeFile - ${err}`))
            }            
            resolve(true);            
        })
    })
}

function getValue(key) {
    return config[key];
}

function setValue(key, value) {
    config[key] = value;
}

module.exports = {
    load,
    save,
    getValue,
    setValue
}
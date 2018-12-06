function getDivisions() {
    return new Promise(function(resolve, reject) {        
        // getDivisionsFromCOM((err, divisions) => {
        //     if (err) {
        //         reject(Error('getDivisions - ${err}'))
        //     }
        //     resolve(divisions)
        // })

        divisions = '{divisions:[{"name":"first","id":1,"desc":"333"},{"name":"second","id":2,"desc":"234"},{"name":"third","id":3,"desc":"4382"}]}'
        resolve(divisions)
    })
}

function getStaffs(divisionId) {
    return new Promise(function(resolve, reject) {        
        // getStaffsFromCOM(divisionId, (err, staffs) => {
        //     if (err) {
        //         reject(Error('getStaffs - ${err}'))
        //     }
        //     resolve(staffs)
        // })

        staffs = '{staffs:[{"name":"first","id":1,"tab_n":"333"},{"name":"second","id":2,"tab_n":"234"},{"name":"third","id":3,"tab_n":"4382"}]}'
        resolve(staffs)
    })
}

function getStatus(staffId) {
    return new Promise(function(resolve, reject) {        
        // getStatusFromCOM(staffId, (err, status) => {
        //     if (err) {
        //         reject(Error('getStatus - ${err}'))
        //     }
        //     resolve(status)
        // })

        status = '{"status":"in"}'
        resolve(status)
    })
}

module.exports = {
    getDivisions,
    getStaffs,
    getStatus
}
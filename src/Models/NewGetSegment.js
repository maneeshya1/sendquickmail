var dbConn = require('./../../config/db.config');
exports.searchUsersByFirstName = (searchTerm) => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            'CALL GetUserByFirstName(?)',
            [searchTerm],
            (err, results) => {
                if (err) {
                    console.error('Error executing stored procedure:', err);
                    reject(err);
                    return;
                }
                const users = results[0];
                resolve(users);
            }
        );
    });
};

exports.searchUsersByEmail = (search_term) => {
    console.log('test email', search_term);
    return new Promise((resolve, reject) => {
        dbConn.query(
            'CALL GetUserByEmail(?)',
            [search_term],
            (err, results) => {
                if (err) {
                    console.error('Error executing stored procedure:', err);
                    reject(err);
                    return;
                }
                const users = results[0];
                resolve(results);
            }
        );
    });
};

exports.searchUsersByLastName = (searchTerm) => {
    return new Promise((resolve, reject) => {
        dbConn.query(
            'CALL GetUserBylastName(?)',
            [searchTerm],
            (err, results) => {
                if (err) {
                    console.error('Error executing stored procedure:', err);
                    reject(err);
                    return;
                }
                const users = results[0];
                resolve(users);
            }
        );
    });
};
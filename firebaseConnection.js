
function getAllCustomers(firebase) {

    const customers = firebase.database().ref('mainProjectDB/Customers');

    return customers;
}

module.exports.getCustomers = getAllCustomers;



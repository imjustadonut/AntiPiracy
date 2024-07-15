let endpoint_info = {
    name: 'getlicense',
    description: 'Get a license for a product.',
    method: 'GET',
}

let endpoint_function = (req, res) => {
    res.send('getlicenselol');
}

let path = '/getlicense';

module.exports = {
    endpoint_info: endpoint_info,
    endpoint_function: endpoint_function,
    path: path
};
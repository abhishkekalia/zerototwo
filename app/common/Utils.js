let Utils = {
    gurl: (usersPath)=> {
        // return `http://192.168.0.23/zerototwo/index.php/Webservice/${usersPath}`;
        return 'http://192.168.0.23/zerototwo/index.php/Webservice';
    },
    murl: (usersPath)=> {
        return `http://192.168.0.23/zerototwo/index.php/Webservice/${usersPath}`;
    },
};

module.exports = Utils;
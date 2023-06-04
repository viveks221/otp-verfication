const packages = require('../../helpers');
const { randomToken } = packages.module;
const { TOKEN_FORMAT, TOKEN_LENGHT }  = require('../../constants');


module.exports = () => randomToken.generate(TOKEN_FORMAT, TOKEN_LENGHT); // siddhesh , poonamMohata(b3)  said it looks cool
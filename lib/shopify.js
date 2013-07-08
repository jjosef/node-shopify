function ShopifyConnect(params) {
    var utils         = require('./utils'),
    check             = require('validator').check,
    querystring       = require('querystring');
    https             = require('https'),
    $scope            = this;

  var defaults = {
    shop_name: '',
    scope: 'write_products,write_content,write_themes,write_customers,write_orders,write_scripts_tags,write_fulfillments,write_shipping',
    key: '',
    secret: '',
    redirect: ''
  };
  
  $scope.config = utils.extend(defaults, params);
  
  $scope.createURL = function() {
    return 'https://' + $scope.config.shop_name + '.myshopify.com/admin/oauth/authorize?'
      + 'client_id=' + $scope.config.key 
      + '&scope=' + $scope.config.scope 
      + '&redirect_url=' + $scope.config.redirect;
  };
  
  $scope.getAccessToken = function(code, callback) {
    if(typeof req.params.code === 'undefined') {
      callback({
        error: true,
        message: 'No code parameter given'
      }, null);
    }

    var opts = {
      host: $scope.config.shop_name + '.myshopify.com',
      path: 'admin/oauth/access_token',
      port: 443,
      method: 'POST'
    };
    
    var q = querystring.stringify({
      client_id: $scope.config.key,
      client_secret: $scope.config.secret,
      code: code
    });

    var shReq = https.request(opts, function(res) {
      var data = '';
      res.on('data', function(chunk) {
        data += chunk;
        callback(null, data);
      });
    });
    
    shReq.on('error', function(e) {
      callback({
        error: true,
        message: 'There was an error connecting to the authentication server'
      }, null);
    });
    
    shReq.write(q);
    shReq.end();
  };
  
  return $scope;
}

module.exports = ShopifyConnect;
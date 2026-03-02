function RestResponse(message, data, errors) {
  this.message = message;
  this.data = data;
  this.errors = errors;
}

module.exports = RestResponse;

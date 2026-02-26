function RestApiResponseData(message, data, errors) {
  this.message = message;
  this.data = data;
  this.errors = errors;
}

RestApiResponseData.prototype.setMessage = function setMessage(message) {
  this.message = message;

  return this;
};

RestApiResponseData.prototype.setData = function setData(data) {
  this.data = data;

  return this;
};

RestApiResponseData.prototype.addError = function addError(error) {
  if (!this.errors) {
    this.errors = [];
  }

  this.errors.push(error);

  return this;
};

RestApiResponseData.prototype.success = function success() {
  this.message = "success";

  return this;
};

module.exports = RestApiResponseData;

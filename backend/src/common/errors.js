var handleReturnCall = function (statusCode) {

if(statusCode >= 400) {
  switch (statusCode) {
    case 400:
      return {
        statusCode: statusCode,
        message: "Missing parameter or unexisting user"
      };
    case 401:
      return {
        statusCode: statusCode,
        message: "Unauthorized"
      };
      case 403:
      return {
        statusCode: statusCode,
        message: "Forbidden"
      };
    default:
      return {
        statusCode: 500,
        message: "Something broke"
      };
  }
}
  return null;
};

exports.handleReturnCall = handleReturnCall;

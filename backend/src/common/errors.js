
// exports.genericErrorHandler = (error, req, res, next) => {
//     if (error instanceof SyntaxError) {
//         res.status(400).send({
//             errorCode: 'PARSE_ERROR',
//             message: 'Arguments could not be parsed, make sure request is valid.'
//         });
//     } else {
//         res.status(500).send('Something broke!', error);
//     }
// }


var handleReturnCall = function (statusCode) {

if(statusCode >= 400) {
  switch (statusCode) {
    case 400:
      return {
        statusCode: statusCode,
        message: "Missing parameter or unexisting user"
      };
      break;
    case 401:
      return {
        statusCode: statusCode,
        message: "Unauthorized"
      };
      break;
      case 403:
      return {
        statusCode: statusCode,
        message: "Forbidden"
      };
      break;
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


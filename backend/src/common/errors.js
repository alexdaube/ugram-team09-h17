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


var handleReturnCall = function(err, response) {

  if(err == 401){
    return {
      statusCode: 401,
      message: "Unauthorized"
    };
  }
  return null;
};

exports.handleReturnCall = handleReturnCall;
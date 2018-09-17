const respondJSON = (request, response, content, type, status) => {
    response.writeHead(status, { 'Content-Type': type });
    response.write(JSON.stringify(content));
    response.end();
};

const respondXML = (request, response, content, type, status) => {
    response.writeHead(status, { 'Content-Type': type });
    response.write(content);
    response.end();
};

const sendJSON = (request, response, idValue, messageValue, statusCode) => {
    //messgae to send
    const responseJSON = {
        id: idValue,
        message: messageValue
    };
    respondJSON(request, response, responseJSON, 'application/json', statusCode);
};

const sendXML = (request, response, idValue, messageValue, statusCode) => {
    let responseXML = '<response>';
    responseXML = `${responseXML} <id>${idValue}</id>`;
    responseXML = `${responseXML} <message>${messageValue}</message>`;
    responseXML = `${responseXML} </response>`; 

    respondXML(request, response, responseXML, 'text/xml', statusCode);
};

const success = (request, response, acceptedTypes, params) => {
    if(acceptedTypes[0] === 'text/xml'){
        sendXML(request, response, 'success', 'This is a successful response.', 200);
    }else{
        sendJSON(request, response, 'success', 'This is a successful response.', 200);
    }
};

const badRequest = (request, response, acceptedTypes, params) => {
    if(acceptedTypes[0] === 'text/xml'){
        sendXML(request, response, 'Bad request', 'Missing valid query parameter set to true.', 400);
    }else{
        if(params.valid == "true")
            sendJSON(request, response, '', 'This request has the required parameters', 200);
        else
            sendJSON(request, response, 'Bad request', 'Missing valid query parameter set to true.', 400);
    }
};

const unauthorized = (request, response, acceptedTypes, params) => {
    if(acceptedTypes[0] === 'text/xml'){
        sendXML(request, response, 'Unauthorized', 'Missing loggedIn query parameter set to yes.', 401);
    }else{
        if(params.loggedin == "yes")
            sendJSON(request, response, '', 'You have successfully viewed this content.', 200);
        else
            sendJSON(request, response, 'Unauthorized', 'Missing loggedIn query parameter set to yes.', 401);
    }
};

const forbidden = (request, response, acceptedTypes, params) => {
    if(acceptedTypes[0] === 'text/xml'){
        sendXML(request, response, 'Forbidden', 'You do not have access to this content.', 403);
    }else{
        sendJSON(request, response, 'Forbidden', 'You do not have access to this content.', 403);
    }
};

const internal = (request, response, acceptedTypes, params) => {
    if(acceptedTypes[0] === 'text/xml'){
        sendXML(request, response, 'Internal', 'Internal Service Error. Something went wrong', 500);
    }else{
        sendJSON(request, response, 'Internal', 'Internal Service Error. Something went wrong', 500);
    }
};

const notImplemented = (request, response, acceptedTypes, params) => {
    if(acceptedTypes[0] === 'text/xml'){
        sendXML(request, response, 'Not Implemented', 'A get request for this page has not been implemented yet. Check again later for updated content.', 501);
    }else{
        sendJSON(request, response, 'Not Implemented', 'A get request for this page has not been implemented yet. Check again later for updated content.', 501);
    }
};

const notFound = (request, response, acceptedTypes, params) => {
    if(acceptedTypes[0] === 'text/xml'){
        sendXML(request, response, 'not found', 'The page you are looking was not found', 404);
    }else{
        sendJSON(request, response, 'not found', 'The page you are looking was not found', 404);
    }
};

module.exports = {
    success,
    badRequest,
    unauthorized,
    forbidden,
    internal,
    notImplemented,
    notFound,
};

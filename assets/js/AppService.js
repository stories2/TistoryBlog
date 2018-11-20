app.service("TistoryAppService", function ($log, $http, $window) {

    var setToken = function (tokenVal) {
        $window.localStorage.setItem("token", tokenVal)
        printLogMessage("TistoryAppService", "setToken", "update token: " + tokenVal, LOG_LEVEL_DEBUG)
    }

    var getToken = function () {
        var token = $window.localStorage.getItem("token")
        printLogMessage("TistoryAppService", "getToken", "return token: " + token, LOG_LEVEL_DEBUG)
        return token == null || token === undefined ? undefined : token
    }

    var removeToken = function () {
        $window.localStorage.removeItem("token");
        printLogMessage("TistoryAppService", "removeToken", "token removed", LOG_LEVEL_INFO)
    }

    var printLogMessage = function (className, methodName, message, logLevel) {
        var logDateTime = new Date().toISOString();
        var logMsg = "" + logDateTime + " ";
        if (logLevel == LOG_LEVEL_VERBOSE) {
            logMsg = logMsg + "V: ";
            logMsg = logMsg + "[" + className + "] {" + methodName + "} (" + message + ")";
            $log.log(logMsg);
        }
        else if (logLevel == LOG_LEVEL_INFO) {
            logMsg = logMsg + "I: ";
            logMsg = logMsg + "[" + className + "] {" + methodName + "} (" + message + ")";
            $log.log(logMsg);
        }
        else if (logLevel == LOG_LEVEL_DEBUG) {
            logMsg = logMsg + "D: ";
            logMsg = logMsg + "[" + className + "] {" + methodName + "} (" + message + ")";
            $log.log(logMsg);
        }
        else if (logLevel == LOG_LEVEL_WARN) {
            logMsg = logMsg + "W: ";
            logMsg = logMsg + "[" + className + "] {" + methodName + "} (" + message + ")";
            $log.log(logMsg);
        }
        else if (logLevel == LOG_LEVEL_ERROR) {
            logMsg = logMsg + "E: ";
            logMsg = logMsg + "[" + className + "] {" + methodName + "} (" + message + ")";
            $log.warn(logMsg);
        }
        else {
            logMsg = logMsg + "W: ";
            logMsg = logMsg + "[" + className + "] {" + methodName + "} (" + message + ")";
            $log.error(logMsg);
        }
        return;
    };
    var postReq = function (url, data, successFunc, failFunc) {
        printLogMessage("TistoryAppService", "postReq", "send data to url: " + url, LOG_LEVEL_INFO);
        // data["seconds"] = this.PreventCache()
        var token = getToken()

        if (token !== undefined) {
            $http.defaults.headers.common['Authorization'] = token
            printLogMessage("TistoryAppService", "postReq", "request with token", LOG_LEVEL_INFO)
        }

        $http({
            method: "POST",
            dataType: 'json',
            url: url,
            cache: false,
            contentType: 'application/json',
            data: data,
            crossDomain: true,
            // headers: {
            //     "Authorization": token
            // },
            xhrFields: {
                withCredentials: false
            },
            beforeSend: function (xhr) {
                if (typeof token != 'undefined') {
                    printLogMessage("TistoryAppService", "postReq", "auth: " + token, LOG_LEVEL_DEBUG);
                    xhr.setRequestHeader("Authorization", token);
                }
                else {
                    printLogMessage("TistoryAppService", "postReq", "no token sending", LOG_LEVEL_WARN);
                }
            }
        })
            .then(function (receivedData) {
                printLogMessage("TistoryAppService", "postReq", "data received successfully", LOG_LEVEL_INFO);
                successFunc(receivedData);
            })
            .catch(function (xhr, textStatus, errorThrown) {
                printLogMessage("TistoryAppService", "postReq", "something has problem: " + textStatus, LOG_LEVEL_ERROR);
                failFunc(xhr.responseText, textStatus);
            });
    };
    var getReq = function (url, data, successFunc, failFunc) {
        printLogMessage("TistoryAppService", "getReq", "send data to url: " + url, LOG_LEVEL_INFO);
        // data["seconds"] = this.PreventCache()
        var token = getToken()

        if (token !== undefined) {
            $http.defaults.headers.common['Authorization'] = token
            printLogMessage("TistoryAppService", "getReq", "request with token", LOG_LEVEL_INFO)
        }

        $http({
            type: "GET",
            dataType: 'json',
            url: url,
            cache: false,
            contentType: 'application/x-www-form-urlencoded',
            params: data,
            async: false,
            crossDomain: true,
            // headers: {
            //     "Authorization": token
            // },
            xhrFields: {
                withCredentials: false
            },
            beforeSend: function (xhr) {
                if (typeof token != 'undefined') {
                    printLogMessage("TistoryAppService", "getReq", "auth: " + token, LOG_LEVEL_DEBUG);
                    xhr.setRequestHeader("Authorization", token);
                }
                else {
                    printLogMessage("TistoryAppService", "getReq", "no token sending", LOG_LEVEL_WARN);
                }
            }
        })
            .then(function (receivedData) {
                printLogMessage("TistoryAppService", "getReq", "data received successfully", LOG_LEVEL_INFO);
                successFunc(receivedData);
            })
            .catch(function (xhr, textStatus, errorThrown) {
                printLogMessage("TistoryAppService", "getReq", "something has problem: " + textStatus, LOG_LEVEL_ERROR);
                failFunc(xhr.responseText, textStatus);
            });
    };
    return {
        'printLogMessage': printLogMessage,
        'postReq': postReq,
        'getReq': getReq,
        'setToken': setToken,
        'getToken': getToken,
        'removeToken': removeToken
    };
});
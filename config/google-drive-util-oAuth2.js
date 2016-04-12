var google = require('googleapis');
var readline = require('readline-sync');
var fs = require("fs");

var OAUTH_SETTING_FILE = "google.conf";
var OAUTH_FILE = "google.auth";

var OAuth2Client = google.auth.OAuth2;
var drive = google.drive('v2');

function createOAuth2Client(settings) {
    return new OAuth2Client(    settings.CLIENT_ID,
                                settings.CLIENT_SECRET,
                                settings.REDIRECT_URL);
}

function readLineSync(msg)
{
    return readline.question(msg);
}

function readLinesSync(msgs, callback)
{
    for (var i=0; i<msgs.length; i++)
    {
        msgs[i] = readLineSync(msgs[i]);
    }
    
    callback(msgs);
}

function askAccessToken(settings, oauth, callback) {
    // generate consent page url
    var url = oauth.generateAuthUrl({
            access_type: settings.ACCESS_TYPE, // will return a refresh token
            scope: settings.SCOPE // can be a space-delimited string or an array of scopes
        });

    console.log('Visit the url: ', url);
    
    var code = readLineSync('Enter the code here:');
    // request access token
    oauth.getToken(code, callback);
}

function saveAccessToken(callback) {
    var oauthSettings = JSON.parse(fs.readFileSync(OAUTH_SETTING_FILE, 'utf8'));
    
    var oauth = createOAuth2Client(oauthSettings);
    
    askAccessToken( oauthSettings,
                    oauth,
                    function(err, tokens) {
                        if (err) {
                            console.log('err: ', err);
                        }
                        else {
                            fs.writeFileSync(   OAUTH_FILE,
                                                JSON.stringify(tokens));
                            callback();
                        }
                    });
}

function readToken(callback)
{
    var oauthSettings = JSON.parse(fs.readFileSync(OAUTH_SETTING_FILE, 'utf8'));
    var token = fs.readFileSync(OAUTH_FILE, 'utf8');
    
    var oauth = createOAuth2Client(oauthSettings);
    oauth.setCredentials(JSON.parse(token));
    
    callback(oauth);
}

function readTokenSync()
{
    var oauth;
    
    readToken(function(_oauth) {
        oauth = _oauth;
    });
    
    while (oauth === undefined) {
        desync.runLoopOnce();
    }
    
    return oauth;
}

function isFolder(res)
{
    return (res.mimeType == "application/vnd.google-apps.folder");
}

function getFolderInfo(oauth, folderId, path, callback)
{
    var args = {    auth: oauth,
                    folderId: folderId};
    
    drive.children.list(    args,
                            function(err, res) {
                                if (err) {
                                    console.log('err:', err);
                                }
                                else {
                                    var items = res.items;
                                    for (var i=0; i<items.length; i++) {
                                        var item = items[i];
                                        getFileInfo(oauth, item.id, path, callback);
                                    }
                                }
                            }
                       );
}

function getFileInfo(oauth, fileId, path, callback)
{
    var args = {    auth: oauth,
                    fileId: fileId};
    
    drive.files.get(    args,
                        function(err, res) {
                            if (err) {
                                console.log('err:', err);
                            }
                            else {
                                callback(path, res);
                            }
                        });
}

function _defaultCallback(err, res, callback)
{
    if (err) {
        console.log('err:', err);
    }
    else {
        callback(res);
    }
}

function createFolder(oauth, folderId, name, callback)
{
    var args = {    auth: oauth,
                    resource: { "parents" : [{ "id" : folderId }],
                                "mimeType" : "application/vnd.google-apps.folder",
                                "title" : name}};
    drive.files.insert( args,
                        function(err, res) {
                            _defaultCallback(err, res, callback);
                        });
}

function renameFile(oauth, fileId, name, callback)
{
    var args = {    auth: oauth,
                    fileId: fileId,
                    resource: {"title" : name}};
    drive.files.patch(  args,
                        function(err, res) {
                            _defaultCallback(err, res, callback);
                        });
}

function duplicateFile(oauth, fileId, callback)
{
    var args = {    auth: oauth,
                    fileId: fileId};
    
    drive.files.copy(   args,
                        function(err, res) {
                            _defaultCallback(err, res, callback);  
                        });
}

function moveFile(oauth, fileId, folderId, callback)
{
    var args = {    auth: oauth,
                    fileId: fileId,
                    resource: { "parents" : [{"id": folderId}]}};
    
    drive.files.update( args,
                        function(err, res) {
                            _defaultCallback(err, res, callback);
                        });
}

function copyFile(oauth, fileId, folderId, callback)
{
    getFileInfo(    oauth,
                    fileId,
                    "",
                    function(path, originRes) {
                        duplicateFile(  oauth,
                                        fileId,
                                        function(newRes) {
                                            renameFile( oauth,
                                                        newRes.id,
                                                        originRes.title,
                                                        function(renameRes) {
                                                            moveFile(   oauth,
                                                                        newRes.id,
                                                                        folderId,
                                                                        callback);
                                                        });
                                        });
                    });
}

function copyFolder(oauth, srcFolderId, destFolderId, path, callback)
{
    getFileInfo(    oauth,
                    srcFolderId,
                    path,
                    function(srcPath, srcRes) {
                        if (isFolder(srcRes)) {
                            createFolder(oauth, destFolderId, srcRes.title, function(destFolderRes) {
                                getFolderInfo(oauth, srcRes.id, srcPath+srcRes.title+"/", function(srcFolderPath, srcFolderRes) {
                                    copyFolder(oauth, srcFolderRes.id, destFolderRes.id, srcFolderPath, callback);
                                });
                            });
                        }
                        else {
                            copyFile(oauth, srcRes.id, destFolderId, function(destFileDest) {
                                callback(srcPath, destFileDest);
                            });
                        }
                    });
}

function searchFilesByTitle(oauth, keyword, max_results, callback)
{
    var args = {    auth: oauth,
                    q: "title = '"+keyword+"'"};
    if (max_results > 0)
    {
        args["maxResults"] = max_results;
    }
    
    drive.files.list( args,
                    function(err, res) {
                        _defaultCallback(err, res, callback);
                    });
}

module.exports.readLineSync = readLineSync;
module.exports.readLinesSync = readLinesSync;

module.exports.saveAccessToken = saveAccessToken;
module.exports.readToken = readToken;
module.exports.readTokenSync = readTokenSync;

module.exports.isFolder = isFolder;
module.exports.getFolderInfo = getFolderInfo;
module.exports.getFileInfo = getFileInfo;

module.exports.createFolder = createFolder;
module.exports.renameFile = renameFile;
module.exports.duplicateFile = duplicateFile;
module.exports.moveFile = moveFile;
module.exports.copyFile = copyFile;
module.exports.copyFolder = copyFolder;
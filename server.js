/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var COMMENTS_FILE = path.join(__dirname, 'comments.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

var COMMENTS_ARRAY = [
    {
        id: 0,
        author: 'Pete Hunt',
        text: 'Hey there!'
    },
    {
        id: 1,
        author: 'Paul O’Shannessy',
        text: 'React is *great*!'
    },
    {
        id: 2,
        author: 'Dhyey Thakore',
        text: 'Welcome to React **Performance Example**'
    }
]

app.get('/api/comments', function(req, res) {
    res.json(COMMENTS_ARRAY);
});

app.post('/api/comments', function(req, res) {
    var newComment = {
      id: COMMENTS_ARRAY.length,
      author: req.body.author,
      text: req.body.text,
    };
    COMMENTS_ARRAY.unshift(newComment);
    console.log(COMMENTS_ARRAY);
    res.json(COMMENTS_ARRAY);
});


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

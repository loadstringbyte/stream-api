const http = require("http")
const fs = require("fs");
const url = require("url")


// a really horrible bodged compression algorithm that only works on 2 characters
function rlexc(data) {
    for(var i=0; i<data.length; i++) {
        if(data[i] == data[i + 1] && data[i] == 'l') {
            ret = data.replace(data[i+1], '{')
            ret1 = ret.replace(data[i], '')
        }
    }
    return ret1
}

function rlexd(data) {
    for(var i=0; i<data.length; i++) {
        if(data[i] == "{") {
            ret = data.replace(data, 'l')

        }
        console.log(data)
    }

    return ret
}

// stream logic
function Write(data) {
    stream = fs.createWriteStream("endstream/index.json")

    stream.write(data, "UTF-8")
    stream.end();

    stream.on("error", function(err) {
        console.log(err.stack)
    })
}

function Read() {
    data = ''
    stream = fs.createReadStream("endstream/index.json")
    
    stream.setEncoding("UTF-8")

    stream.on("data", (chunk) => {
        data += chunk

    })

    stream.on("error", (err) => {
        return err
    })
    return data
}

// http
http.createServer( (req, res) => {

    input_data = rlexc("ll")
    Write(input_data);

    raw_output = Read();
    mod_output = rlexd(raw_output);

    res.end(mod_output)

}).listen(8080)
const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let item = "Enter numbers below.";

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = (resultMessage = "") => {
  return `
  <body>
    <p>${item}</p>
    <div id="result">${resultMessage}</div>
    <form id="sumForm" method="POST">
      <span>Sum of numbers:</span><br>
      <input type="text" name="num1" /> <br>
      <input type="text" name="num2" />
      <button type="submit">Calculate</button>
    </form>
    <script>
      document.getElementById('sumForm').onsubmit = function(event) {
        event.preventDefault();
        const formData = new FormData(this);
        const searchParams = new URLSearchParams();
        for (const pair of formData) {
          searchParams.append(pair[0], pair[1]);
        }
        fetch('/', {
          method: 'POST',
          body: searchParams,
        })
        .then(response => response.text())
        .then(text => {
          document.getElementById('result').textContent = 'Result: ' + text;
        });
        .catch(error => console.error('Error:', error));

      };
    </script>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      // here, you can add your own logic
      const num1 = parseFloat(body.num1);
      const num2 = parseFloat(body.num2);

      if (!isNaN(num1) && !isNaN(num2)) {
        const result = num1 + num2;
        res.end(form(`The sum of ${num1} and ${num2} is ${result}.`));
        
      } else {
      
        // Your code changes would end here
        res.writeHead(303, {
          Location: "/",
        });
        res.end();
      }
    });
  } else {
    res.end(form());
  }
});

// event listener to log each request
server.on("request", (req) => {
  console.log("event received:", req.method, req.url);
});

server.listen(3000);
console.log("The server is listening on port http://localhost:3000.");


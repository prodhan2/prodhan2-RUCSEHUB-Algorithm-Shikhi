// netlify/functions/app.js

// exports.handler ব্যবহার করুন — Netlify এর জন্য CommonJS mandatory
exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: "Hello from Node.js on Netlify!"
    })
  };
};

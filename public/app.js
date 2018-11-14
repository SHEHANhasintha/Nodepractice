/*
* front end logic for the application
*
*
*/

//container for the front end application
const app = {};

app.config = {
  'sessionToken' : false
}

//AJAX client for the restful api
app.client = {};

//Interface for making api calls
app.client.request = function(headers,path,method,queryStringObject,payload,callback){
  console.log('a')
  //console.log(path,method,'sssssssssssssss')
  //set Default
  headers = typeof(headers) == 'object' && headers !== null ? headers : {};
  path = typeof(path) == 'string' ? path : '/';
  method = typeof(method) == 'string' && ['POST', 'GET', 'PUT', 'DELETE'].indexOf(method) > -1 ? method : false;
  queryStringObject = typeof(queryStringObject) == 'object' && queryStringObject !== null ? queryStringObject : false;
  payload =  typeof(payload) == 'object' && payload !== null ? payload : false;
  callback = typeof(callback) == 'function' ? callback : false;
  //console.log(headers,'headers',path,'path',method,'method',queryStringObject,'queryStringObject',payload,'payload',callback)

  //for the each queryString parameter has already been added prepend a new
  let requestUrl = path + '?';
  let counter = 0;
  for (let queryKey in queryStringObject){
    if (queryStringObject.hasOwnProperty(queryKey)){
      counter++;
      // if at least one querystring parameter has already been added, prepend new once with ampresent
      if (counter > 1){
        requestUrl += '&';
      }
      //add the key and value
      requestUrl += queryKey + '=' + queryStringObject[queryKey]
    }
  }
  let xhr = new XMLHttpRequest();
  xhr.open(method,requestUrl,true);
  xhr.setRequestHeader("Content-Type","application/json");

  //for each header sent add it to the request
  for (let headerKey in headers){
    if (headers.hasOwnProperty(headerKey)){
      xhr.setRequestHeader(headerKey,headers[headerKey]);
    }
  }

  //if there is a current session token exist add that to the header
  if (app.config.sessionToken){
    xhr.setRequestHeader("token",app.config.sessionToken.token);
  }

  //when the request comes back handle the responce
  xhr.onreadystatechange = function(){

    if(xhr.readyState == XMLHttpRequest.DONE){
      let statusCode = xhr.status;
      let responceReturned = xhr.responseText;
      //callback if requested
      if (callback){
        try{
          let parsedResponce = JSON.parse(responceReturned);
          callback(statusCode,parsedResponce);
        } catch(e){
          callback(statusCode,false);
        }
      }
    }
  }

  //send the payload as JSON
  let payloadString = JSON.stringify(payload);
  xhr.send(payloadString);
}

// Bind the forms
app.bindForms = function(){
  console.log('b')
  if(document.querySelectorAll("form")){
    let forms = document.querySelectorAll("form")
    forms.forEach(function(e){
      console.log(e)

      e.addEventListener("submit", function(e){

        // Stop it from submitting
        e.preventDefault();
        var formId = this.id;
        var path = this.action;
        var method = this.method.toUpperCase();

        // Hide the error message (if it's currently shown due to a previous error)
        document.querySelector("#"+formId+" .formError").style.display = 'hidden';

        // Turn the inputs into a payload
        var payload = {};
        var elements = this.elements;
        for(var i = 0; i < elements.length; i++){
          if(elements[i].type !== 'submit'){
            var valueOfElement = elements[i].type == 'checkbox' ? elements[i].checked : elements[i].value;
            payload[elements[i].name] = valueOfElement;
            
            console.log(elements[i].value,elements[i].name == '_method',['DELETE','PUT'].indexOf(elements[i].value) > -1,'dear');
            if ((elements[i].name == '_method')  && (['DELETE','PUT'].indexOf(elements[i].value) > -1)){
              method = elements[i].value;
              console.log(elements[i].value,'dog')
            }
          }
        }

        //console.log(payload,path,method,this._method,this.elements,'gggggggggggggg')
        // Call the API
        app.client.request(undefined,path,method,undefined,payload,function(statusCode,responsePayload){
          // Display an error on the form if needed
          console.log(statusCode,'nopeeeeeeeeeeeeeeeeeeeeeeeeeee')
          if(statusCode !== 200){
            if(statusCode == 403){
              // log the user out
              app.logUserOut();

            } else {
              // Try to get the error from the api, or set a default error message
              var error = typeof(responsePayload.Error) == 'string' ? responsePayload.Error : 'An error has occured, please try again';

              // Set the formError field with the error text
              document.querySelector("#"+formId+" .formError").innerHTML = error;

              // Show (unhide) the form error field on the form
              document.querySelector("#"+formId+" .formError").style.display = 'block';
            }
          } else {
            // If successful, send to form response processor
            app.formResponseProcessor(formId,payload,responsePayload);
          }

        });
      });
    })
  }
};

// Form response processor
app.formResponseProcessor = function(formId,requestPayload,responsePayload){
  console.log('c')

  var functionToCall = false;
  //console.log(requestPayload,'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy')
  // If account creation was successful, try to immediately log the user in
  if(formId == 'accountCreate'){
    // Take the phone and password, and use it to log the user in
    var newPayload = {
      'phoneNumber' : requestPayload.phone,
      'password' : requestPayload.password
    };

    app.client.request(undefined,'api/tokens','POST',undefined,newPayload,function(newStatusCode,newResponsePayload){
      // Display an error on the form if needed
      if(newStatusCode !== 200){

        // Set the formError field with the error text
        document.querySelector("#"+formId+" .formError").innerHTML = 'Sorry, an error has occured. Please try again.';

        // Show (unhide) the form error field on the form
        document.querySelector("#"+formId+" .formError").style.display = 'block';

      } else {
        // If successful, set the token and redirect the user
        app.setSessionToken(newResponsePayload);
        window.location = '/checks/all';
      }
    });
  }
  // If login was successful, set the token in localstorage and redirect the user
  if(formId == 'sessionCreate'){
    app.setSessionToken(responsePayload);
    window.location = '/checks/all';
  }

  // If forms saved successfully and they have success messages, show them
  var formsWithSuccessMessages = ['accountEdit1', 'accountEdit2'];
  if(formsWithSuccessMessages.indexOf(formId) > -1){
    document.querySelector("#"+formId+" .formSuccess").style.display = 'block';
  }

  // If the user just deleted their account, redirect them to the account-delete page
  if(formId == 'accountEdit3'){
    app.logUserOut(false);
    window.location = '/account/deleted';
  }

};

// Get the session token from localstorage and set it in the app.config object
app.getSessionToken = function(){
  console.log('d')
  var tokenString = localStorage.getItem('token');
  if(typeof(tokenString) == 'string'){
    try{
      var token = JSON.parse(tokenString);
      app.config.sessionToken = token;
      if(typeof(token) == 'object'){
        app.setLoggedInClass(true);
      } else {
        app.setLoggedInClass(false);
      }
    }catch(e){
      app.config.sessionToken = false;
      app.setLoggedInClass(false);
    }
  }
};

// Bind the logout button
app.bindLogoutButton = function(){
  console.log('e')
  console.log('hey')
  document.getElementById("logoutButton").addEventListener("click", function(e){

    // Stop it from redirecting anywhere
    e.preventDefault();

    // Log the user out
    app.logUserOut();

  });
};

// Log the user out then redirect them
app.logUserOut = function(){
  console.log('f')
  console.log('damn')
  // Get the current token id
  var tokenId = typeof(app.config.sessionToken.token) == 'string' ? app.config.sessionToken.token : false;

  // Send the current token to the tokens endpoint to delete it
  var queryStringObject = {
    'id' : tokenId
  };
  app.client.request(undefined,'api/tokens','DELETE',queryStringObject,undefined,function(statusCode,responsePayload){
    // Set the app.config token as false
    app.setSessionToken(false);

    // Send the user to the logged out page
    window.location = '/session/deleted';

  });
};

// Set (or remove) the loggedIn class from the body
app.setLoggedInClass = function(add){
  console.log('g')
  var target = document.querySelector("body");
  if(add){
    target.classList.add('loggedIn');
  } else {
    target.classList.remove('loggedIn');
  }
};

// Load data on the page
app.loadDataOnPage = function(){
  console.log('h')
  // Get the current page from the body class
  var bodyClasses = document.querySelector("body").classList;
  var primaryClass = typeof(bodyClasses[0]) == 'string' ? bodyClasses[0] : false;

  // Logic for account settings page
  if(primaryClass == 'accountEdit'){
    app.loadAccountEditPage();
  }
};

// Load the account edit page specifically
app.loadAccountEditPage = function(){
  console.log('i')
  console.log('here')
  // Get the phone number from the current token, or log the user out if none is there
  var phone = typeof(app.config.sessionToken.phoneNumber) == 'string' ? app.config.sessionToken.phoneNumber : false;
  var tokenString = localStorage.getItem('token')
  console.log(app.config.sessionToken,tokenString,phone,typeof(app.config.sessionToken.phoneNumber),'gloria blo')
  if(phone){
    // Fetch the user data
    var queryStringObject = {
      'phoneNumber' : phone
    };
    app.client.request(undefined,'api/users','GET',queryStringObject,undefined,function(statusCode,responsePayload){
      if(statusCode == 200){
        // Put the data into the forms as values where needed
        document.querySelector("#accountEdit1 .firstNameInput").value = responsePayload.firstName;
        document.querySelector("#accountEdit1 .lastNameInput").value = responsePayload.lastName;
        document.querySelector("#accountEdit1 .displayPhoneInput").value = responsePayload.phoneNumber;

        // Put the hidden phone field into both forms
        var hiddenPhoneInputs = document.querySelectorAll("input.hiddenPhoneNumberInput");
        for(var i = 0; i < hiddenPhoneInputs.length; i++){
            hiddenPhoneInputs[i].value = responsePayload.phone;
        }

      } else {
        console.log(statusCode)
        // If the request comes back as something other than 200, log the user our (on the assumption that the api is temporarily down or the users token is bad)
        app.logUserOut();
      }
    });
  } else {
    console.log(statusCode)
    app.logUserOut();
  }



};


// Set the session token in the app.config object as well as localstorage
app.setSessionToken = function(token){
  console.log('j')
  app.config.sessionToken = token;
  var tokenString = JSON.stringify(token);
  localStorage.setItem('token',tokenString);
  if(typeof(token) == 'object'){
    app.setLoggedInClass(true);
  } else {
    app.setLoggedInClass(false);
  }
};

// Renew the token
app.renewToken = function(callback){
  console.log('k')
  var currentToken = typeof(app.config.sessionToken) == 'object' ? app.config.sessionToken : false;
  if(currentToken){
    // Update the token with a new expiration
    var payload = {
      'id' : currentToken.id,
      'extend' : true,
    };
    app.client.request(undefined,'api/tokens','PUT',undefined,payload,function(statusCode,responsePayload){
      // Display an error on the form if needed
      if(statusCode == 200){
        // Get the new token details
        var queryStringObject = {'id' : currentToken.id};
        app.client.request(undefined,'api/tokens','GET',queryStringObject,undefined,function(statusCode,responsePayload){
          // Display an error on the form if needed
          if(statusCode == 200){
            app.setSessionToken(responsePayload);
            callback(false);
          } else {
            app.setSessionToken(false);
            callback(true);
          }
        });
      } else {
        app.setSessionToken(false);
        callback(true);
      }
    });
  } else {
    app.setSessionToken(false);
    callback(true);
  }
};

// Loop to renew token often
app.tokenRenewalLoop = function(){
  console.log('l')
  setInterval(function(){
    app.renewToken(function(err){
      if(!err){
        console.log("Token renewed successfully @ "+Date.now());
      }
    });
  },1000 * 60);
};

// Init (bootstrapping)
app.init = function(){
  console.log('m')

  // Bind all form submissions
  app.bindForms();

  // Bind logout logout button
  app.bindLogoutButton();

  // Get the token from localstorage
  app.getSessionToken();

  // Renew token
  app.tokenRenewalLoop();

  // Load data on page
  app.loadDataOnPage();

};

// Call the init processes after the window loads
window.onload = function(){
  app.init();
};
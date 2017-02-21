/* template:
{
  name: "",
  perceivedGender: "",
  age: ,
  perceivedEthnicity: "",
  imgUri: "",
  landmarks: []
}

imgUri prefix: http://www.code4rights.com/

landmarks key:
left-eye-x  left-eye-y
right-eye-x  right-eye-x
nose-x  nose-y
left-mouth-corner-x   left-mouth-corner-y
right-mouth-corner-x right-mouth-corner-y

*/

function loader(URI, callback){
  httpRequest = new XMLHttpRequest();

  function loadResource( URI ) {
    httpRequest.onreadystatechange = handleResponse;
    httpRequest.open('GET', URI);
    httpRequest.send();
  }

  function handleResponse(){
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        var response = JSON.parse(httpRequest.responseText);
        callback(response);
      } else {
        callback('There was a problem with the request.');
      }
    }
  }

  loadResource( URI );
}

   

var objectValues = function(data) {
      var newArray = [];
      for (var key in data) {
        newArray.push(data[key]);
      }
      return newArray;
};


var keysToString = function(data) {
      var stringArray = [];
      for (var key in data) {
        stringArray.push(key);
      }
       return stringArray.toString().replace(/,/g, " ");
};

var valuesToString = function(data) {
      var valuesArray = [];
      for (var key in data) {
          if (typeof data[key] === 'string') {
          valuesArray.push(data[key]);
          }
      }
      return valuesArray.join(" ");
};
       

var arrayOrObject = function(data) {
     if(Array.isArray(data)) return("array");
     if(typeof data === 'object') return("object");
};       

var capitalizeWord = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

var capitalizeAllWords = function(string) {
    var capArray = (string.split(' '));
    for (var i = 0; i < capArray.length; i ++) {
      capArray[i] = capArray[i].charAt(0).toUpperCase() + capArray[i].substr(1);
    }
    return(capArray.join(' '));
};

var welcomeMessage = function(data) {
    return ("Welcome " + capitalizeWord(data.name) + "!");
};

var profileInfo = function(data) {
    return (capitalizeWord(data.name) + " is a " + capitalizeWord(data.species));
};

var maybeNoises = function(data) {
      for (var key in data) 
      var noisesArray = []; {
          if (key === 'noises' && data.noises.length > 0) {
          noisesArray.push(data.noises);
          return noisesArray.toString().replace(/,/g, " ");
          }
          else if (key === 'noises' && data.noises.length === 0) {
          return "there are no noises";
          }
          else if (Object.getOwnPropertyNames(data).length === 0) {
          return "there are no noises";
          }
      }
      
};

var hasWord = function(string, word) {
    var stringSearch = string.search(word);
    if (stringSearch > -1) {
        return true;
    }
    else  {
        return false;
    }
    //ugh. if the first is set tp strict does not equal -1 it fails and the strict equal in the second passes
    //but if this first is set to greater than -1 it passes, even though it shouldn't! b/c the index should be 0 and up if it's in there
    //and in that scenario the strict equl in the second fails
    //just making the second a plain old else/return false doesn't work either
};

    
var addFriend = function(name, object) {
      object.friends.push(name);
      return object;
};
 
var isFriend = function(name, object) {
    if (Object.getOwnPropertyNames(object).length === 0) {
       return false;
    }
    else if (object.friends.indexOf(name) >= 0) {
       return true;
    }
    else if (object.friends.indexOf(name) === -1) {
       return false;    
    }
};

var nonFriends = function(name1, data) {
    var friendsList = [];

    for (var i = 0; i < data.length; i++) {
      friendsList.push(data[i].name);
      }
    //this is making a list of possible friends based on all the names in that array

    var index = friendsList.indexOf(name1);
    friendsList.splice(index, 1);
    //this removes the person's name from the friendsList
  
    var testFriends = data[index].friends;
    //this pulls the person's friends array from data
    
    var newFriendsList = [];
  
    for (var j = 0; j < friendsList.length; j++) {
        var indexx = friendsList[j];
            if (testFriends.indexOf(indexx) === -1) {
                newFriendsList.push(friendsList[j]); 
                }
            }
    return(newFriendsList);
};

var updateObject = function(object, key, value) {
    object[key] = value;
    return object;
};

var removeProperties = function(object, strings) {
    for (var i = 0; i < strings.length; i++) {
      var index = strings[i];
      delete object[index];
    }
    return object;
};

var dedup = function(array) {
  var newArray = [];
  for (var i = 0; i < array.length; i++) {
    if (newArray.indexOf(array[i]) < 0) newArray.push(array[i]);
  }
  return newArray;
};

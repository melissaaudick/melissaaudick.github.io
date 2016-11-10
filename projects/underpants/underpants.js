// This is the proper way to start a javascript library
(function() {
  
// This makes the arguments variable behave the way we want it to and a few
// other things. For more info: 
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
'use strict';

// This allows us to use our "_" anywhere. In a web browser, properties of window
// are available everywhere without having to type "window."
/* global _ */
window._ = {};

/**
* START OF OUR LIBRARY!
* Implement each function below it's instructions
*/

/** _.identity()
* Arguments:
*   1) Anything
* Objectives:
*   1) Returns <anything> unchanged
* Examples:
*   _.identity(5) === 5
*   _.identity({a: "b"}) === {a: "b"}
*/

_.identity = function(value) {
  return value;  
}; 

//oi you have to use this in one or two test cases: if a function is undefined you assign it to identity
//or if you pass it nothing it'll return as false (for undefined)

/** _.typeOf()
* Arguments:
*   1) Anything
* Objectives:
*   1) Return the type of <anything> as a string
*       Types are one of: 
*          - "string"
*          - "array"
*          - "object"
*          - "undefined"
*          - "number"
*          - "boolean"
*          - "null"
*          - "function"
* Examples:
* _.typeOf(134) -> "number"
* _.typeOf("javascript") -> "string"
* _.typeOf([1,2,3]) -> "array"
*/

_.typeOf = function(value) {
    if (Array.isArray(value)) return 'array';
    if (value === null) return 'null';
    if (value instanceof Date) return 'date';
    return typeof value;
};

/** _.first()
* Arguments:
*   1) An array
*   2) A number
* Objectives:
*   1) If <array> is not an array, return []
*   2) If <number> is not given or not a number, return just the first element in <array>.
*   3) Otherwise, return the first <number> items of <array>
* Gotchas:
*   1) What if <number> is negative?
*   2) What if <number> is greater than <array>.length?
* Examples:
*   _.first(["a","b","c"], 1) -> "a"
*   _.first(["a","b","c"], 2) -> ["a", "b"]
*   _.first(["a", "b", "c"], "ponies") -> ["a","b","c"]
*/

_.first = function(array, number) {
    if (!(Array.isArray(array)) || (number < 0)) return [];
    if ((isNaN(number)) || (number === undefined)) return array[0];
    if (number > array.length) return array;
    return array.slice(0, number);
};

/** _.last()
* Arguments:
*   1) An array
*   2) A number
* Objectives:
*   1) If <array> is not an array, return []
*   2) If <number> is not given or not a number, return just the last element in <array>.
*   3) Otherwise, return the last <number> items of <array>
* Gotchas:
*   1) What if <nubmer> is negative?
*   2) What if <number> is greater than <array>.length?
* Examples:
*   _.last(["a","b","c"], 2) -> ["b","c"]
*   _.last(["a", "b", "c"], "ponies") -> ["a","b","c"]
*/

_.last = function(array, number) {
    if (!(Array.isArray(array)) || (number < 0)) return [];
    if ((isNaN(number)) || (number === undefined)) return array[(array.length - 1)];
    if (number > array.length) return array;
    return array.slice((number - 1), array.length);
};

/** _.each()
* Arguments:
*   1) A collection
*   2) A function
* Objectives:
*   1) if <collection> is an array, call <function> once for each element
*      with the arguments: 
*         the element, it's index, <collection>
*   2) if <collection> is an object, call <function> once for each property
*      with the arguments:
*         the property's value, it's key, <collection>
* Examples:
*   _.each(["a","b","c"], function(e,i,a){ console.log(e)}); 
*      -> should log "a" "b" "c" to the console
*/

_.each = function(collection, action) {
    if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    }
    else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
};


/** _.indexOf()
* Arguments:
*   1) An array
*   2) A value
* Objectives:
*   1) Return the index of <array> that is the first occurrance of <value>
*   2) Return -1 if <value> is not in <array>
*   3) Do not use [].indexOf()!
* Gotchas:
*   1) What if <array> has multiple occurances of val?
*   2) What if <val> isn't in <array>?
* Examples:
*   _.indexOf(["a","b","c"], "c") -> 2
*   _.indexOf(["a","b","c"], "d") -> -1
*/

_.indexOf = function(array, value) {
    var notHere = "";
    var len;
    if (array.length === 0) {
        len = 1;
    } //this is in here so i could use this function with empty arrays i.e. in _.unique below
    else {
        len = array.length;
    }
    for (var i = 0; i < len; i++) {
        if (array[i] === value) {
            return i;
        }
        else {
            notHere = true;
        }
    }
    if (notHere === true) {
        return -1;
    }
};

/** _.filter()
* Arguments:
*   1) An array
*   2) A function
* Objectives:
*   1) call <function> for each element in <array> passing the arguments:
*      the element, it's index, <array>
*   2) return a new array of elements for which calling <function> returned true
* Gotchas:
*   1) What if <function> returns something other than true or false?
* Examples:
*   _.filter([1,2,3,4,5], function(x){return x%2 === 0}) -> [2,4]
* Extra Credit:
*   use _.each in your implementation
* 
*/

 _.filter = function(array, test) {
     var newArray = [];
     _.each(array, function(item, index, collection) {
         if (test(item, index, collection) === true) {
             newArray.push(item);
         }
     });
     return newArray;
 };
 

/** _.reject()
* Arguments:
*   1) An array
*   2) A function
* Objectives:
*   1) call <function> for each element in <array> passing the arguments:
*      the element, it's index, <array>
*   2) return a new array of elements for which calling <function> returned false
*   3) This is the logical inverse if _.filter(), you must use _.filter() in your implementation
* Examples:
*   _.reject([1,2,3,4,5], function(e){return e%2 === 0}) -> [1,3,5]
* 
*/

_.reject = function(array, test) {
    return _.filter(array, function(item, index, collection) {
        return !test(item, index, collection);
    });
};

/** _.partition()
* Arguments:
*   1) An array
*   2) A function
* Objectives:
*   1) Call <function> for each element in <array> passing it the arguments:
*       element, key, <array>
*   2) Return an array that is made up of 2 sub arrays:
*       0) An array that contains all the values for which <function> returned something truthy
*       1) An array that contains all the values for which <function> returned something falsy
* Gotchas:
*   1) This is going to return an array of arrays.
* Examples:
*   _.partition([1,2,3,4,5], function(element,index,arr){
*     return element % 2 === 0;
*   }); -> [[2,4],[1,3,5]]
}
*/


_.partition = function(collection, funtion) {
    var newArray = _.filter(collection, funtion);
    var newArray2 = _.reject(collection, funtion);
    var newArray3 = [newArray, newArray2];
    return newArray3;
};


/** _.unique()
* Arguments:
*   1) An array
* Objectives:
*   1) Return a new array of all elements from <array> with duplicates removed
*   2) Use _.indexOf() from above
* Examples:
*   _.unique([1,2,2,4,5,6,5,2]) -> [1,2,4,5,6]
*/


_.unique = function(array) {
    var newArray = [];
    _.each(array, function(item, index, collection) {
        if (_.indexOf(newArray, item) === -1) {
            newArray.push(item);
        }
    });
    return newArray;
};
   

/** _.map()
* Arguments:
*   1) A collection
*   2) a function
* Objectives:
*   1) call <function> for each element in <collection> passing the arguments:
*        if <collection> is an array:
*            the element, it's index, <collection>
*        if <collection> is an object:
*            the value, it's key, <collection>
*   2) save the return value of each <function> call in a new array
*   3) return the new array
* Examples:
*   _.map([1,2,3,4], function(e){return e * 2}) -> [2,4,6,8]
*/

_.map = function(collection, mapfunc) {

    var newArray = [];
    if (Array.isArray(collection) === true) {
        _.each(collection, function(item, index, collection) {
            newArray.push(mapfunc(item, index, collection));
        });
        return newArray;
    }
    else if (typeof collection === 'object') {
        _.each(collection, function(value, key, collection) {
            newArray.push(mapfunc(value, key, collection));
        });
        return newArray;
    }
};

/** _.pluck()
* Arguments:
*   1) An array of objects
*   2) A property
* Objectives:
*   1) Return an array containing the value of <property> for every element in <array>
*   2) You must use _.map() in your implementation.
* Examples:
*   _.pluck([{a: "one"}, {a: "two"}], "a") -> ["one", "two"]
*/

_.pluck = function(array, property) {
    var newArray = [];
    _.map(array, function(item, index, collection) {
        newArray.push(item[property]);
    });
    return newArray;
};

/** _.contains()
* Arguments:
*   1) An array
*   2) A value
* Objectives:
*   1) Return true if <array> contains <value>
*   2) Return false otherwise
*   3) You must use the ternary operator in your implementation.
* Gotchas:
*   1) did you use === ?
*   2) what if no <value> is given?
* Examples:
*   _.contains([1,"two", 3.14], "two") -> true
*/

_.contains = function(array, value) {
    return _.indexOf(array, value) === -1 ? false : true;
};

/** _.every()
* Arguments:
*   1) A collection
*   2) A function
* Objectives:
*   1) Call <function> for every element of <collection> with the paramaters:
*      if <collection> is an array:
*          current element, it's index, <collection>
*      if <collection> is an object:
*          current value, current key, <collection>
*   2) If the return value of calling <function> for every element is true, return true
*   3) If even one of them returns false, return false
*   4) If <function> is not provided, return true if every element is truthy, otherwise return false
* Gotchas:
*   1) what if <function> doesn't return a boolean
*   2) What if <function> is not given?
* Examples:
*   _.every([2,4,6], function(e){return e % 2 === 0}) -> true
*   _.every([1,2,3], function(e){return e % 2 === 0}) -> false
*/

_.every = function(collection, everyfunc) {
    var type = _.typeOf(collection);
    var funcType = _.typeOf(everyfunc);
    var result = true;

    if (funcType === 'function') {
        if (type === 'array' || type === 'object') {
            _.each(collection, function(value, key, object) {
                if (everyfunc(value, key, object) !== true) {
                    return result = false;
                }
            });
        }
    }
    if (funcType !== 'function') {
        //_.each(collection, function(item, index, collection) {
        //eachin' thru our collection was not cooperating so i lamed out with a for loop
        for (var i = 0; i < collection.length; i++) {
            if (!collection[i]) {
                return false;
            }
            else {
                return true;
            }
        }
    }
    return result;
};

/** _.some()
* Arguments:
*   1) A collection
*   2) A function
* Objectives:
*   1) Call <function> for every element of <collection> with the paramaters:
*       if <collection> is an array:
*        current element, it's index, <collection>
*       if <collection> is an object:
*        current value, current key, <collection>
*   2) If the return value of calling <function> is true for at least one element, return true
*   3) If it is false for all elements, return false
*   4) If <function> is not provided return true if at least one element is truthy, otherwise return false
* Gotchas:
*   1) what if <function> doesn't return a boolean
*   2) What if <function> is not given?
* Examples:
*   _.some([1,3,5], function(e){return e % 2 === 0}) -> false
*   _.some([1,2,3], function(e){return e % 2 === 0}) -> true
*/


_.some = function(collection, somefunc) {
    var type = _.typeOf(collection);
    var funcType = _.typeOf(somefunc);
    var result = false;

    if (funcType === 'function') {
        if (type === 'array' || 'object') {
            _.each(collection, function(item, index, array) {
                if (somefunc(item, index, array) === true) {
                    result = true;
                }
            });
        }
    }
    if (funcType !== 'function') {
        for (var i = 0; i < collection.length; i++) {
            if (!collection[i]) {
                return false;
            }
            else {
                return true;
            }
        }
    }
    return result;
};

/** _.reduce()
* Arguments:
*   1) An array
*   2) A function
*   3) A seed
* Objectives:
*   1) Call <function> for every element in <collection> passing the arguments:
*         previous result, element, index
*   2) Use the return value of <function> as the "previous result"
*      for the next iteration
*   3) On the very first iteration, use <seed> as the "previous result"
*   4) If no <seed> was given, use the first element/value of <collection> as <seed>
*   5) After the last iteration, return the return value of the final <function> call
* Gotchas:
*   1) What if <seed> is not given?
* Examples:
*   _.reduce([1,2,3], function(prev, curr){ return prev + curr}) -> 
* 
*/

_.reduce = function(array, reducefunc, seed) {
    let counter = seed;

    if (seed === undefined) {
        counter = array[0]; 
    }
    _.each(array, function(element, index, collection) {
        if (seed === undefined && index === 0) {
            return;
        }
        counter = reducefunc(counter, element, index);
    });
    return counter;
};

/** _.extend()
* Arguments:
*   1) An Object
*   2) An Object
*   ...Possibly more objects
* Objectives:
*   1) Copy properties from <object 2> to <object 1>
*   2) If more objects are passed in, copy their properties to <object 1> as well, in the order they are passed in.
*   3) Return the update <object 1>
* Examples:
*   var data = {a:"one"};
*   _.extend(data, {b:"two"}); -> data now equals {a:"one",b:"two"}
*   _.extend(data, {a:"two"}); -> data now equals {a:"two"}
*/

_.extend = function(input) {

    for (var i = 0; i < arguments.length; i++) {
        Object.assign(input, arguments[i]);
    }
    return input;
};


// This is the proper way to end a javascript library
}());

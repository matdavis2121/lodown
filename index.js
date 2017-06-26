'use strict';

// // YOU KNOW WHAT TO DO //


/** 
 * identity: returns value of whatever argument was provided
 * 
 * param@ {Any Type} x: Any type of argument
 * 
 * return@ {Argument Provided}: returns value of whatever 
 */
function identity(x){
    return x
    }
module.exports.identity = identity;

/** 
 * typeOf: takes an argument and returns a string representing the 
 * 
 * param@ {Any Type} x: variable or data type to be 
 * 
 * return@ {String}: a string that represents the data 
 */
function typeOf(x){
    if(Array.isArray(x)){
        return "array"
    } else if (x === null){
        return "null"
    } else if(x instanceof Date){
        return "date"
    } else {
        return typeof x
    }
}
module.exports.typeOf = typeOf;


/** 
 * first: takes the first N elements from the beginning of an array.
 * 
 * param@ {Array} arr: array used as collection for 
 * function to be executed on.
 * param@ {Number} num: number value used to determine 
 * the amount of elements to be returned.
 * 
 * return@ {Array}:  function returns a certain 
 * number of elements from the beginning of the array based on the 
 * number argument provided. If the array argument is not an 
 * array or the number argument is negative, a blank array is 
 * returned. If the number argument is undefined or NaN then 
 * the 1st element of the array is returned. If the number 
 * argument is greater than the length of the array, the 
 * entire array is returned.
 */
function first(arr, num){
    if(!Array.isArray(arr) || num < 0){
        return []
    } else if(num === undefined || isNaN(num)){
        return arr[0]
    } else if(num) {
        return arr.slice(0, num)
    }
}
module.exports.first = first;


/** 
 * last: takes the last N elements from the beginning of an array.
 * 
 * param@ {Array} arr: array used as collection for 
 * function to be executed on.
 * param@ {Number} num: number value used to determine 
 * the amount of elements to be returned
 * 
 * return@ {Array}:  function returns a certain 
 * number of elements from the end of the array based on the 
 * number argument provided. If the array argument is not an 
 * array or the number argument is negative, a blank array is 
 * returned. If the number argument is undefined or NaN then 
 * the 1st element of the array is returned. If the number 
 * argument is greater than the length of the array, the 
 * entire array is returned.
 */
function last(arr, num){
    if(!Array.isArray(arr) || num < 0){
        return [];
    } else if(num === undefined || isNaN(num)){
        return arr[arr.length -1];
    } else if(num > arr.length){
        return arr;
    } else {
        return arr.slice(num -1);
    }
}

module.exports.last = last;


/** 
 * each: executes a function for each element in a collection.
 * 
 * param@ {Array or Object} collection: the collection that the function 
 * will be executed on per iteration.
 * param@ {Function} fun: the function, whether a declared 
 * function or function expression, that will be ran for each 
 * iteration on the collection
 * 
 * return@ {NONE}: no value is returned for this 
 * function, however, variables can be assigned values and 
 * other actions can still be performed for each iteration on 
 * the collection.
 */
function each(coll, fun){
    var objArr = [];
    
    if(Array.isArray(coll)){
        for(var i = 0; i < coll.length; i++){
            fun(coll[i], i, coll)
        }
    } else if(typeof coll === "object"){
        for(var key in coll){
            fun(coll[key], key, coll)
        }
    }
}    

module.exports.each = each;


/** 
 * indexOf: finds the index of a given value in a given array.
 * 
 * param@ {Array} arr: array which may or may not 
 * contain the given value.
 * param@ {Any Type} v: value that will be used to 
 * compare to all elements in the array.
 * 
 * return@ {Number}: the index of the 1st occurrence 
 * of the given value will be returned if the given value 
 * exist in the array. If it does not, -1 will be 
 * returned.
 */
function indexOf(arr, v){
var iArr = [];    
    each(arr, function(e, i, arr){
        if(e === v){
            iArr.push(i);
        } 
    });
    
/*returns index of all matches*/
    //had to update to !== undefined or
    //every 0 index would equate to false
    if(iArr[0] !== undefined){
        return iArr[0]
    } else {
        return -1
    }
}

module.exports.indexOf = indexOf;


/** 
 * filter: returns the elements in an array that pass a given test.
 * 
 * param@ {Array} arr: array which is filtered.
 * param@ {Function} func: function which will run on each 
 * element of the array.
 * 
 * return@ {Array}: an array is returned which will 
 * include each element in the given array that has passed a 
 * given test.
 */
function filter(arr, func){
    var newArr = [];
    each(arr, function(val, i, eArr){
        if(func(val, i, eArr)){
            newArr.push(val)
        }
    }) 
    return newArr
}
module.exports.filter = filter;


/** 
 * reject: returns the elements in an array that fail a given test.
 * 
 * param@ {Array} arr: array which the given function 
 * will run on.
 * param@ {Function} func: function expression or declared 
 * function to be ran on each element in the array.
 * 
 * return@ {Array}: an array will be returned which 
 * will include each element in the given array that has 
 * failed a given test.
 */
function reject(arr, func){
    var newArr = [];
    
    filter(arr, function(val, i, array){
        if(!func(val, i, array)){
            newArr.push(val);
        }
    });
    return newArr;
};

module.exports.reject = reject;


/** 
 * partition: returns an array with 2 arrays as 
 * its elements. One array contains all elements that have 
 * passed a given test. The other array contains all elements 
 * that have failed a given test.
 * 
 * param@ {Array} array: the array in which the given 
 * function will be executed on for each element.
 * param@ {Function} func: function to be executed for each 
 * element in the array
 * 
 * return@ {Array}: returns an array of arrays, one 
 * array containing elements that have passed a test and the 
 * other array containing elements that have failed a 
 * test.
 */
function partition(array, func){
    var subArr1 = [];
    var subArr2 = [];
    var finalArray = [];
    for(var i = 0; i < array.length; i++){
        //THIS IS ALL: that is needed when making the FUNCTION AS PARAM definition
        //func(val, i, array) = a function that returns a value
        if(func(array[i], i, array)){
            subArr1.push(array[i])
        } else {
            subArr2.push(array[i])
        }
    } 
    finalArray.push(subArr1)
    finalArray.push(subArr2)
    return finalArray
}

module.exports.partition = partition;


/** 
 * unique: given an array with duplicate values, unique returns an 
 * array with no duplicate values.
 * 
 * param@ {Array} array: array which may or may not 
 * contain duplicate values
 * 
 * return@ {Array}: returns an array with only unique values
 */
function unique(array){
    var newArr = [];
    //USES: each and an anonymous function
    //
    each(array, function(val, i, array){
        if(indexOf(array, val) === i){
            newArr.push(val)
        }
    })
    return newArr
}

module.exports.unique = unique;


/** 
 * map: returns an array that stores the 
 * return value from a function that is executed on each 
 * element.
 * 
 * param@ {Array or Object} coll: an array or object that the given 
 * function will be executed on.
 * param@ {Function} func: function which will run for each 
 * element of the collection and return a value for each 
 * element.
 * 
 * return@ {Array}: an array which contains the 
 * return value of the given function after it has executed 
 * for each element in the collection.
 */
function map(coll, func){
    var newArr = [];

        _.each(coll, function(val, i, arr){
            if(val){
                newArr.push(func(val, i, arr))
            }
        });
    return newArr
}

module.exports.map = map;


/** 
 * pluck: returns an array that contains 
 * the values of a given property for every object in an array 
 * of objects
 * 
 * param@ {Array} arrayofObjs: an array containing objects for 
 * each of its elements
 * param@ {String} property: string that is used to compare to 
 * properties of objects in an array of objects
 * 
 * return@ {Array}: returns an array of the property 
 */
 function pluck(arrayofObjs, property){
    return map(arrayofObjs, function(eachObject){
             return eachObject[property]
     })
 }
module.exports.pluck = pluck;


/** 
 * contains: returns a boolean based off if the value exists in the array.
 * 
 * param@ {Array} array: array in which the given value 
 * may or may not exist in.
 * param@ {Any Type} valArg: a given value that is compared to 
 * each object in the array.
 * 
 * return@ {Boolean}: a value of true or false is 
 * returned. If the given value exist in the given array then 
 * true is returned. If the given value does not exist in the 
 * given array, false is returned.
 */
function contains(array, valArg){
    var valExist
        each(array, function(val){
            if(val === valArg){
                valExist = true
            }
        })
        return (valExist === true) ? true : false
}
module.exports.contains = contains;


/** 
 * every: returns true or false based on 
 * the return value of the given function and if even one of 
 * those values are false or all of those values are 
 * true.
 * 
 * param@ {Array or Object} c: collection which the given 
 * function will be executed on.
 * param@ {Function} f: the function which will be ran 
 * for every given element and evaluated to true or false for 
 * each iteration.
 * 
 * return@ {Boolean}: if no function was given, a 
 * return value of true or false is returned based off if even 
 * one of those elements are falsy or if all the elements are 
 * truthy. If a function is provided then the each function 
 * returns true or false based off even one of the return 
 * values from the given function being false or if all values 
 * returned from the given function were true.
 */
function every(c, f){
//1. ARE elements all true? - Run each and set to false if even ONE is false
//ELSE they're all true
var noFunctionBoolean = true
each(c, function(x){if(!x){noFunctionBoolean = false}})

//2. NO FUNCTION CHECK - control flow
if(typeof f !== "function" && noFunctionBoolean === true){return true} 
else if (typeof f !== "function" && noFunctionBoolean === false){return false}    

//3. RUN Function Argument on every element
var truetest = false
var falsetest = true
    each(c, function(v, i, c){
        if(!f(v, i, c)){falsetest = false} 
        else {truetest = true}
    })

//4. BOOLEAN RESULTS
//What to return based off running the function on each element    
    if (!falsetest) {return false} 
    else if(truetest) {return true}
} //FUNCTION END*/

module.exports.every = every;


/** 
 * some: returns true or false based on 
 * the return value of the given function and if even one of 
 * those values are true or all of those values are 
 * false.
 * 
 * param@ {Array or Object} c: collection which the given 
 * function will be executed on.
 * param@ {Function} f: the function which will be ran 
 * for every given element and evaluated to true or false for 
 * each iteration.
 * 
 * return@ {Boolean}: if no function was given, a 
 * return value of true or false is returned based off if even 
 * one of those elements are truthy or if all the elements are 
 * falsy. If a function is provided then the each function 
 * returns true or false based off even one of the return 
 * values from the given function being true or if all values 
 * returned from the given function were false.
 */
function some(c, f){
//1. ARE elements all true? - Run each and set to false if even ONE is false
//ELSE they're all true
var noFunctionBoolean = false

//SOME-now testing for if x === true
each(c, function(x){if(x){noFunctionBoolean = true}})

//2. NO FUNCTION CHECK - control flow
if(typeof f !== "function" && noFunctionBoolean === true){return true} 
else if (typeof f !== "function" && noFunctionBoolean === false){return false}    

//3. RUN Function Argument on every element
var truetest = false
var falsetest = true
    each(c, function(v, i, c){
        if(!f(v, i, c)){falsetest = false} 
        else {truetest = true}
    })

//4. BOOLEAN RESULTS
//What to return based off running the function on each element    
//SOME same as EVERY except flipped the truetest and falsetest below
    if(truetest) {return true}
    else if(!falsetest) {return false} 
} //FUNCTION END*/
module.exports.some = some;


/** 
 * reduce: reduces all the elements in an array 
 * to a single value then returns that value.
 * 
 * param@ {Array} array: array which will be used to execute 
 * the given function.
 * param@ {Function} f: the given function which will be 
 * executed on each element.
 * param@ {Any Type} seed: an initial value to be provided 
 * to the function. This value can be most, if not all, data 
 * types. Those data types are converted to a string or number.
 * 
 * return@ {String or Number}: based off the given function, a 
 * single value is returned for each iteration of the loop 
 * with the final loop returning that value to the parent 
 * function. The return value produced undergoes a 
 * similar process as the result of  +=, -=, *=, /= unary 
 * operators.
 */
function reduce(array, f, seed){
var previous 
var seedExist = true
    if(seed || seed !== undefined){previous = seed } 
    else if(!seed){previous = array[0]; seedExist = false}
    
    each(array, function(v, i, a){
        if(i > 0 || seedExist){previous = f(previous, v, i)}
    })
    return previous
}

module.exports.reduce = reduce;


/** 
 * extend: extends the properties and values 
 * of the initial argument, which is an object, by assigning 
 * the property and property values of the subsequent 
 * arguments, which are also objects.
 * 
 * param@ {Object} parentOb: the object which all properties 
 * and values of the subsequent objects will be assigned 
 * to.
 * param@ {Object} o2: represents one or more objects 
 * that will be supplied as arguments in order for their 
 * properties and values to be assigned to the parent 
 * object.
 * 
 * return@ {Object}: an object is returned that has all 
 * the properties and values of the given argument objects 
 * supplied when the parent function is first called. The 
 * return value is dependent on how many objects have been 
 * supplied as arguments.
 */
function extend(parentOb, o2){

      each(arguments, function(obj, index, args){
        if(index > 0){ each(obj, function(v, k, o) { parentOb[k] = v })}
      })
    return parentOb
}

module.exports.extend = extend;






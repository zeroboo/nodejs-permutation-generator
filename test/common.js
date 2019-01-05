'use strict';
const os = require('os-utils');
const unorderedArrayMatch = require('unordered-array-match');
function isArrayEqualJSON(arrA, arrB)
{
    return JSON.stringify(arrA) === JSON.stringify(arrB);
}
function isArrayEqual(arrA, arrB){
    // if the other array is a falsy value, return
    if (!arrB)
        return false;

    // compare lengths - can save a lot of time 
    if (arrA.length != arrB.length)
        return false;

    for (var i = 0, l=arrA.length; i < l; i++) {
        // Check if we have nested arrays
        if (arrA[i] instanceof Array && arrB[i] instanceof Array) {
            // recurse into the nested arrays
            if(isArrayEqual(arrA[i], arrB[i])){
                    return false;       
            }
        }           
        else if (arrA[i] != arrB[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}

async function sleep(ms) {
    console.log("sleep", ms)
    var p = new Promise(resolve => setTimeout(resolve, ms));
    await p;
}
function isIterableContainDuplicateResult(generator)
{
    let counter = new Map();
    for(let permu of generator)
    {
        let cur = counter.get(permu);
        if(cur != null){
            counter.set(permu, cur + 1);
        }
        else{
            counter.set(permu, 1);
        }
    }
    var dupKey = [];
    counter.forEach((value, key) => {
        if(value>1){
            dupKey.push(key);
        }
    });
    console.log("checkIterableGeneratorProduceDuplicateResult.Done", generator.getSourceElements(), dupKey);
    
    return dupKey.length > 0;
}

function isIteratorContainDuplicateResult(generator)
{
    let counter = new Map();
    var it = generator.next();
    while(!it.done)
    {
        let cur = counter.get(it.value);
        if(cur != null){
            counter.set(it.value, cur + 1);
        }
        else{
            counter.set(it.value, 1);
        }

        it = generator.next();
    }
    var dupKey = [];
    counter.forEach((value, key) => {
        if(value>1){
            dupKey.push(key);
        }
    });
    console.log("isIteratorContainDuplicateResult.Done", generator.getSourceElements(), dupKey);
    return dupKey.length > 0;
}

function isIterableContainInvalidPermutation(generator)
{
    var invalid = [];
    for(let permu of generator)
    {
        if(!unorderedArrayMatch(permu, generator.getSourceElements()))
        {
            invalid.push(permu);
        }
    }
    
    console.log("isIterableContainInvalidPermutation.Done", generator.getSourceElements(), invalid);
    return invalid.length > 0;
}
function isIterableContainInvalidPartialPermutation(generator)
{
    var invalid = new Map();
    var validElements = {};
    for(let validE of generator.getSourceElements())
    {
        validElements[validE] = 1;
    }
    console.log("isIterableContainInvalidPartialPermutation:", validElements);
    for(let permu of generator)
    {
        if(permu.length > generator.getSourceElements().length)
        {
            invalid.set(permu, "longer than source");
        }
        else if(permu.length == 0){
            invalid.set(permu, "empty");
        }
        else{
            permuElement.forEach(x => {
                if(!validElements.hasOwnProperty(x))
                {
                    invalid.set(permu, "invalid element: " + x);
                }
            });
        }
    }
    
    console.log("isIterableContainInvalidPermutation.Done", generator.getSourceElements(), invalid);
    return invalid.length > 0;
}
function isIteratorContainInvalidPermutation(generator, source)
{
    var invalid = [];
    let it = generator.next();
    while(!it.done)
    {
        if(!unorderedArrayMatch(it.value, generator.getSourceElements()))
        {
            invalid.push(it.value);
        }
        it=generator.next();
    }
    
    console.log("isIteratorContainInvalidPermutation.Done", generator.getSourceElements(), invalid);
    return invalid.length > 0;
}

exports.isArrayEqualJSON = isArrayEqualJSON;
exports.isArrayEqual = isArrayEqual;
exports.isIterableContainDuplicateResult = isIterableContainDuplicateResult;
exports.isIterableContainInvalidPermutation = isIterableContainInvalidPermutation;

exports.isIteratorContainDuplicateResult = isIteratorContainDuplicateResult;
exports.isIteratorContainInvalidPermutation = isIteratorContainInvalidPermutation;

exports.isIterableContainInvalidPartialPermutation = isIterableContainInvalidPartialPermutation;
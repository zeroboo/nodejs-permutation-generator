'use strict';
require('./common');
const unorderedArrayMatch = require('unordered-array-match');
const deepEqualInAnyOrder = require('deep-equal-in-any-order');

const PermutationGenerator = require('./../index');

const chai = require('chai');
chai.use(deepEqualInAnyOrder);
const assert = chai.assert;
const expect = chai.expect; 
const os = require('os');
const osUtil = require('os-utils');


describe('Test constructing', function(){
    // before(function() {
    //     console.log("BeforeSuite!");
    // });

    // beforeEach(function() {
        
    // });

    // after(function() {
    //     console.log("AfterSuite!");

    // });
    // afterEach(function() {
        
    // });

    it("Construct with valid input: no error", function(){
        var generator = new PermutationGenerator([1, 2, 3]);
    });
    it("Construct with null", function(){
        assert.throws(function(){
                var generator = new PermutationGenerator(null);
            }   
            , Error
            , "");    
    });
    it("Construct with undefined: has error", function(){
        assert.throws(function(){
                var generator = new PermutationGenerator(undefined);
            }
            , Error
            , "");    
    });
    it("Construct with an non array object: has error", function(){
        assert.throws(function(){
                var generator = new PermutationGenerator("[1, 2, 3]");
            }
            , Error
            , "");    
    });
    it("Construct with empty array: has no error", function(){
        var generator = new PermutationGenerator([]);
    });

    it("Construct with invalid permutation size: has error", function(){
        assert.throws(function(){
            var generator = new PermutationGenerator([1, 2, 3]);
        }
        , Error
        , "");    
    });
});
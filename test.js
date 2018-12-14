'use strict';
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const chai = require('chai');
chai.use(deepEqualInAnyOrder);
const assert = chai.assert;
const expect = chai.expect; 
const unorderedArrayMatch = require('unordered-array-match');



const PermutationGenerator = require('./index');
describe('Test constructor', function(){
    before(function() {
        console.log("BeforeSuite!");
    });

    beforeEach(function() {
        
    });

    after(function() {
        console.log("AfterSuite!");

    });
    afterEach(function() {
        
    });
    it("Construct with valid input: no error", function(){
        var generator = new PermutationGenerator([1, 2, 3]);
    });
    it("Construct with null", function(){
        assert.throws(function(){}
            , Error
            , "");    
    });
    it("Construct with undefined: has error", function(){
        assert.throws(function(){

            }
            , Error
            , "");    
    });
    it("Construct with not array: has error", function(){
        assert.throws(function(){}
            , Error
            , "");    
    });
    it("Construct with empty array: has no error", function(){
        var generator = new PermutationGenerator([]);
    });
});

describe('Test generating as stream', function(){
    it("Generating empty: empty result", function(){
        var generator = new PermutationGenerator([]);
        assert.equal(false, true);
    });
    
    it("Generating single element: correct", function(){
        assert.isTrue(false);
    });
    
    it("Generating 10 elements: correct", function(){
        assert.isTrue(false);
    });

    it("Generating 1000 elements: correct", function(){
        assert.isTrue(false);
    });

    it("Generating 10000 elements: correct", function(){
        assert.isTrue(false);
    });
});
describe('Test generating', function(){
    it("Generating stream and all must share same result", function(){
        assert.isTrue(false);
    });
});
function isArrayEqual(arrA, arrB)
{
    return JSON.stringify(arrA) === JSON.stringify(arrB);
}
describe('Test generating all', function(){
    it("Generating empty: empty result", function(){
        var generator = new PermutationGenerator();
        assert.deepEqual([], generator.generateAll());
    });
    
    it("Generating single element: correct", function(){
        var generator = new PermutationGenerator([1]);
        assert.deepEqual([[1]], generator.generateAll());
    });

    it("Generating from double elements: correct", function(){
        var generator = new PermutationGenerator([1, 2]);
        assert.deepEqual([[1, 2], [2, 1]], generator.generateAll());
    });

    it("Generating 3 from 3 elements: correct amount and no duplication", function(){
        this.timeout(3000);
        var generator = new PermutationGenerator([1, 2, 3, ]);
        var allValues = generator.generateAll();
        var counts = allValues.map(function(x, idx, curr){
            var res = {};
            res.index = idx;
            res.value = x;
            res.count = 0;
            allValues.forEach(function(y){
                if(isArrayEqual(x, y))
                    res.count++
            });
            return res;
        });
        counts.forEach(function(c){
            if(c.count!==1)
            {
                console.log("Invalid count", c);
            }
        });
        counts.forEach(function(c){
            assert.equal(1, c.count);
        });
        assert.equal(60, counts.length);
    });

    it.only("Generating 3 from 5 elements: correct amount and no duplicate", function(){
        this.timeout(30000);
        var source = [1, 2, 3, 4, 5];
        var size = 3;
        var generator = new PermutationGenerator(source, size);

        var allValues = generator.generateAll();
        var counts = allValues.map(function(x, idx, curr){
            var res = {};
            res.index = idx;
            res.value = x;
            res.count = 0;
            allValues.forEach(function(y){
                if(isArrayEqual(x, y))
                    res.count++
            });
            return res;
        });
        counts.forEach(function(c){
            if(c.count!==1)
            {
                console.log("Invalid count", c);
            }
        });
        counts.forEach(function(c){
            assert.equal(1, c.count);
        });
        assert.equal(60, counts.length);
    });
    it.only("Generating 3 from 5 elements: qualified elements only", function(){
        this.timeout(30000);
        var source = [1, 2, 3, 4, 5];
        var size = 3;
        var generator = new PermutationGenerator(source,);
        var allValues = generator.generateAll();
        var counts = allValues.map(function(x, idx, curr){
            var res = {};
            res.index = idx;
            res.len = x.length;
            res.match = unorderedArrayMatch(x, source);
            return res;
        });

       counts.forEach(function(e){
           ///console.log("Generated: ", e);
            if(!e.match)
            {
                console.log("Invalid generated element: ", e);
            }
        });
        counts.forEach(function(e){
            assert.isTrue(e.match);
        });
    });
    it("Generating 5 from 5 elements: correct amount and no duplicate", function(){
        this.timeout(30000);
        var generator = new PermutationGenerator([1, 2, 3, 4, 5]);
        var allValues = generator.generateAll();
        var counts = allValues.map(function(x, idx, curr){
            var res = {};
            res.index = idx;
            res.value = x;
            res.count = 0;
            allValues.forEach(function(y){
                if(isArrayEqual(x, y))
                    res.count++
            });
            return res;
        });
        counts.forEach(function(c){
            if(c.count!==1)
            {
                console.log("Invalid count", c);
            }
        });
        counts.forEach(function(c){
            assert.equal(1, c.count);
        });
        assert.equal(120, counts.length);
    });
    it("Generating 5 from 5 elements: qualified elements only", function(){
        this.timeout(30000);
        var source = [1, 2, 3, 4, 5];
        var generator = new PermutationGenerator(source);
        var allValues = generator.generateAll();
        var counts = allValues.map(function(x, idx, curr){
            var res = {};
            res.index = idx;
            res.len = x.length;
            res.match = unorderedArrayMatch(x, source);
            return res;
        });

       counts.forEach(function(e){
           ///console.log("Generated: ", e);
            if(!e.match)
            {
                console.log("Invalid generated element: ", e);
            }
        });
        counts.forEach(function(e){
            assert.isTrue(e.match);
        });
    });

    ///----------
    it("Generating all from 10 elements: qualified elements only", function(){
        this.timeout(30000);
        var source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        var generator = new PermutationGenerator(source);
        var allValues = generator.generateAll();
        var counts = allValues.map(function(x, idx, curr){
            var res = {};
            res.index = idx;
            res.len = x.length;
            res.match = unorderedArrayMatch(x, source);
            return res;
        });

       counts.forEach(function(e){
           ///console.log("Generated: ", e);
            if(!e.match)
            {
                console.log("Invalid generated element: ", e);
            }
        });
        counts.forEach(function(e){
            assert.isTrue(e.match);
        });
    });

    it("Generating all from 10000 elements: correct", function(){
        assert.isTrue(false);
    });

    it("Generating all from 10000 elements: correct", function(){
        assert.isTrue(false);
    });
    
});
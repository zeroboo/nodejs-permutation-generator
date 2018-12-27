'use strict';
const deepEqualInAnyOrder = require('deep-equal-in-any-order');
const chai = require('chai');
chai.use(deepEqualInAnyOrder);
const assert = chai.assert;
const expect = chai.expect; 
const unorderedArrayMatch = require('unordered-array-match');



const PermutationGenerator = require('./index');
describe('Test constructor', function(){
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
describe('Test generating permutation all', function(){
    it("Generating empty: empty result", function(){
        var generator = new PermutationGenerator([]);
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
        var generator = new PermutationGenerator([1, 2, 3]);
        var allValues = generator.generateAll();
        var counts = allValues.map(function(x, idx, curr){
            var res = {};
            res.index = idx;
            res.value = x;
            res.count = 0;
            allValues.forEach(function(y){
                if(isArrayEqualJSON(x, y))
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
        assert.equal(6, counts.length);
    });

    it("Generating 5 from 5 elements: correct amount and no duplicate", function(){
        this.timeout(30000);
        var source = [1, 2, 3, 4, 5];
        var generator = new PermutationGenerator(source, size);

        var allValues = generator.generateAll();
        console.log("AllValues: ", counts);
        var counts = allValues.map(function(x, idx, curr){
            var res = {};
            res.index = idx;
            res.value = x;
            res.count = 0;
            allValues.forEach(function(y){
                if(isArrayEqualJSON(x, y))
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
        console.log(counts);
        assert.equal(60, counts.length);
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
                if(isArrayEqualJSON(x, y))
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
        var counts = allValues.foreach(function(x, idx, curr){
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

describe.only('Test generating full permutation all at once: ', function(){
    var permu10;
    var source10;
    before(function(){
        this.source10 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        var generator = new PermutationGenerator(this.source10);
        this.permu10 = generator.generateAll();
        console.log("Generated 10 permutations");
    });
    it("Generating from double elements: correct", function(){
        var generator = new PermutationGenerator([1, 2]);
        assert.deepEqual([[1, 2], [2, 1]], generator.generateAll());
    });

    it("Generating 3 elements: correct amount and no duplication", function(){
        var generator = new PermutationGenerator([1, 2, 3]);
        var allValues = generator.generateAll();
        var counts = allValues.map(function(x, idx, curr){
            var res = {};
            res.index = idx;
            res.value = x;
            res.count = 0;
            allValues.forEach(function(y){
                if(isArrayEqualJSON(x, y))
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
        if(6 != counts.length)
        {
            console.log("Invalid generating", counts);
        }
        assert.equal(6, counts.length);
    });

    
    it("Generating 3 elements: qualified elements only", function(){
        this.timeout(30000);
        var source = [1, 2, 3];
        var size = 3;
        var generator = new PermutationGenerator(source,size);
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
    it("Generating 5 elements: correct amount and no duplicate", function(){
        this.timeout(30000);
        var generator = new PermutationGenerator([1, 2, 3, 4, 5]);
        var allValues = generator.generateAll();
        var counts = allValues.map(function(x, idx, curr){
            var res = {};
            res.index = idx;
            res.value = x;
            res.count = 0;
            allValues.forEach(function(y){
                if(isArrayEqualJSON(x, y))
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
    it("Generating 5 elements: qualified elements only", function(){
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
    it("Generating 10 elements: qualified elements only", function(){
        this.timeout(30000);
        var allValues = this.permu10;
        var source = this.source10;
        var counts = allValues.forEach(function(x, idx){
            var genEqual = unorderedArrayMatch(x, source);
            if(!genEqual)
            {
                console.log("generated value not equal ", x, source)
            }
            assert.isTrue(genEqual);
            if(idx%1000000==0)
            {
                ///console.log("\rCurrent Index: ", idx);
            }
        });
    });

    it("Generating 10 elements: no duplicate", function(){
        this.timeout(60000);
        var allValues = this.permu10;

        var counters = new Map();
        allValues.forEach(function(x, idx){
            let count = 0;
            if(counters.has(x))
            {
                console.log("Duplicate generated value ", count);
                counters.set(x, counters.get(x)+1);
            } else {
                counters.set(x, 1);
            }
            if(idx%1000==0)
            {
                ///console.log("\rCurrent Index: ", idx);
            }
        });
        
    });
    it("Generating 10 elements: correct amount", function(){
        this.timeout(60000);
        var allValues = this.permu10;
        assert.equal(3628800, allValues.length);
    });
    
});
describe('Test generating combination', function(){
    it("Generating combination 3 from 10 elements: correct length", function(){
        var source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        var generator = new PermutationGenerator(source);
        var coms = generator.generateCombination(source, 3);
        ///console.log("Combinations: ", coms);
        assert.equal(120, coms.length);
    });
    it("Generating combination 2 from 3 elements: no duplication, no invalid element", function(){
        var source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        var generator = new PermutationGenerator(source);
        var coms = generator.generateCombination(source, 3);
        ///console.log("Combinations: ", coms);
        var counts = coms.map(function(x, idx, curr){
            var res = {};
            res.index = idx;
            res.len = x.length;
            res.value = x;
            res.match = 0;
            coms.forEach(function(y){
                if(isArrayEqualJSON(x, y)){
                    res.match++;
                }
            });
            res.elements = x;
            res.invalidElement = [];
            res.elements.forEach(function(x){
                if(!source.includes(x))
                {
                    res.invalidElement.push(x);
                }
            });
            
            return res;
        });
        counts.forEach(function(c){
            if(c.match > 1)
            {
                console.log("Duplicate value: ", c);
            }

            assert.equal(1, c.match);
            if(c.invalidElement.length > 0)
            {
                console.log("Invalid value: ", c);
            }
            assert.equal(0, c.invalidElement.length);
        });
    });
    it("Generating combination 2 from 3 elements: correct length", function(){
        var source = [1, 2, 3];
        var generator = new PermutationGenerator(source);
        var coms = generator.generateCombination(source, 2);
        ///console.log("Combinations: ", coms);
        assert.equal(3, coms.length);
    });
    it("Generating combination 2 from 3 elements: no duplication, no invalid element", function(){
        var source = [1, 2, 3];
        var generator = new PermutationGenerator(source);
        var coms = generator.generateCombination(source, 2);
        ///console.log("Combinations: ", coms);
        var counts = coms.map(function(x, idx, curr){
            var res = {};
            res.index = idx;
            res.len = x.length;
            res.value = x;
            res.match = 0;
            coms.forEach(function(y){
                if(isArrayEqualJSON(x, y)){
                    res.match++;
                }
            });
            res.elements = x;
            res.invalidElement = [];
            res.elements.forEach(function(x){
                if(!source.includes(x))
                {
                    res.invalidElement.push(x);
                }
            });
            
            return res;
        });
        counts.forEach(function(c){
            if(c.match > 1)
            {
                console.log("Duplicate value: ", c);
            }

            assert.equal(1, c.match);
            if(c.invalidElement.length > 0)
            {
                console.log("Invalid value: ", c);
            }
            assert.equal(0, c.invalidElement.length);
        });
    });
});
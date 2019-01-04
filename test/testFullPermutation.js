'use strict';
require('./common');
const unorderedArrayMatch = require('unordered-array-match');
const deepEqualInAnyOrder = require('deep-equal-in-any-order');

const PermutationGenerator = require('./../index');

const chai = require('chai');
chai.use(deepEqualInAnyOrder);
const assert = chai.assert;
const expect = chai.expect; 
const common = require("./common");
var os = require('os');


describe('Test generating full permutation as iterator', function(){
    it("Generating empty: only 1 empty permutation", function(){
        var generator = new PermutationGenerator([]);
        let count = 0;
        let it = generator.next();
        while(!it.done)
        {
            it = generator.next();
            count++;
        }
        assert.equal(count, 1);
    });
    
    it("Generating single element: only 1 permutation", function(){
        var generator = new PermutationGenerator([1]);
        let count = 0;
        let it = generator.next();
        while(!it.done)
        {
            it = generator.next();
            count++;
        }
        assert.equal(count, 1);
    });

    it("Generating 5 from 5 elements: correct amount", function(){
        var generator = new PermutationGenerator([1,2,3,4,5]);
        let it = generator.next();
        let count = 0;
        while(!it.done)
        {
            it = generator.next();
            count++;
        }
        assert.equal(120, count);
    });

    it("Generating 10 from 10 elements: correct amount", function(){
        var generator = new PermutationGenerator([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
        let it = generator.next();
        let count = 0;
        generator.hasDebug = false;
        while(!it.done)
        {
            if(count%1000000 == 0)
            {
                console.log(count);
            }
            it = generator.next();

            count++;
        }
        console.log(count, "done");
        assert.equal(3628800, count);
    });

});
describe.only('Test generating full permutation as iterable', function(){
    it("Generating empty: empty result", function(){
        var generator = new PermutationGenerator([]);
        let count = 0;
        for(let permu of generator)
        {
            console.log("Generated: ", count, permu);
            count++;
        }
        assert.equal(count, 1);
    });
    
    it("Generating single element: correct", function(){
        var generator = new PermutationGenerator([1]);
        let count = 0;
        for(let permu of generator)
        {
            console.log("Generated: ", count, permu);
            count++;
        }
        assert.equal(count, 1);
    });

    it("Generating 5 from 5 elements: correct amount", function(){
        var generator = new PermutationGenerator([1, 2, 3, 4, 5]);
        let count = 0;
        for(let permu of generator[Symbol.iterator]())
        {
            ///console.log("Generated: ", count, permu, generator.heapIndex);
            count++;
        }
        assert.equal(count, 120);
    });

    it("Generating 10 from 10 elements: correct amount", function(){
        var generator = new PermutationGenerator([1, 2, 3, 4, 5, 6, 7, 8, 9, 0,]);
        let count = 0;
        for(let permu of generator)
        {
            count++;
        }
        assert.equal(3628800, count);
    });
    it("Generating 10 from 10 elements: no duplicate", function(){
        this.timeout(5000);
        var generator = new PermutationGenerator([1, 2, 3, 4, 5, 6, 7, 8, 9, 0,]);
        let counter = new Map();
        assert.isFalse(common.isIterableContainDuplicateResult(generator, true));
    });

    it("Generating 10 from 10 elements: all elements valid", function(){
        this.timeout(5000);
        var generator = new PermutationGenerator([1, 2, 3, 4, 5, 6, 7, 8, 9, 0,]);
        assert.isFalse(common.isIterableContainInvalidPermutation(generator));
    });
});

describe('Test generating', function(){
    it("Generating stream and all must share same result", function(){
        assert.isTrue(false);
    });
});


describe('Test generating permutation all at once', function(){
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
                if(common.isArrayEqualJSON(x, y))
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
        var generator = new PermutationGenerator([1, 2, 3, 4, 5]);
        var allValues = generator.generateAll();
        var counts = allValues.map(function(x, idx, curr){
            var res = {};
            res.index = idx;
            res.value = x;
            res.count = 0;
            allValues.forEach(function(y){
                if(common.isArrayEqualJSON(x, y))
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
        var counts = new Map();
        allValues.forEach(function(x, idx, curr){
            var count = {};
            count.index = idx;
            count.len = x.length;
            count.match = unorderedArrayMatch(x, source);
            
            counts.set(x, count);
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
});

describe('Test generating full permutation all at once: ', function(){
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
                if(common.isArrayEqualJSON(x, y))
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
                if(common.isArrayEqualJSON(x, y))
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

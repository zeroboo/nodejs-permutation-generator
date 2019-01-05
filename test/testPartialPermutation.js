require('./common');
const unorderedArrayMatch = require('unordered-array-match');
const deepEqualInAnyOrder = require('deep-equal-in-any-order');

const PermutationGenerator = require('../index');

const chai = require('chai');
chai.use(deepEqualInAnyOrder);
const assert = chai.assert;
const expect = chai.expect; 
const common = require('./common');
describe('Test generating partial all at once', function(){
    
    it("Generating combination 3 from 10 elements: correct amount", function(){
        var source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        var generator = new PermutationGenerator(source);
        var coms = generator.generateCombination(source, 1);
        ///console.log("Combinations: ", coms);
        assert.equal(10, coms.length);
    });
    
    it("Generating combination empty: correct amount", function(){
        var source = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        var generator = new PermutationGenerator(source);
        var coms = generator.generateCombination(source, 0);
        ///console.log("Combinations: ", coms);
        assert.equal(1, coms.length);
    });
    
    it("Generating combination single: correct amount", function(){
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
                if(common.isArrayEqualJSON(x, y)){
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
                if(common.isArrayEqualJSON(x, y)){
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

describe('Test generating partial iterator', function(){
    it("Generating partial permutation 1 from 5 elements", function(){
        assert.isFalse(true);
    });
    it("Generating partial permutation 0: error", function(){
        assert.isFalse(true);
    });
    it("Generating partial permutation from 1 element: return one", function(){
        assert.isFalse(true);
    });

    it("Generating partial permutation half size: no duplicate", function(){
        assert.isFalse(true);
    });
    it("Generating partial permutation half size: correct amount", function(){
        assert.isFalse(true);
    });
    it("Generating partial permutation half size: all elements valid", function(){
        assert.isFalse(true);
    });

    it("Generating partial permutation max size: no duplicate", function(){
        assert.isFalse(true);
    });
    it("Generating partial permutation max size: correct amount", function(){
        assert.isFalse(true);
    });
    it("Generating partial permutation max size: all elements valid", function(){
        assert.isFalse(true);
    });
});

describe.only('Test generating partial iterable', function(){
    it("Generating partial permutation 1 from 5 elements", function(){
        assert.isFalse(true);
    });
    it("Generating partial permutation 0: error", function(){
        assert.isFalse(true);
    });
    it("Generating partial permutation from 1 element: return one", function(){
        assert.isFalse(true);
    });
    
    it("Generating partial permutation half size: no duplicate", function(){
        assert.isFalse(true);
    });
    it("Generating partial permutation half size: correct amount", function(){
        var generator = new PermutationGenerator([0, 1, 2, 3, 4], 3);
        let count = 0;
        for(let permu in generator)
        {
            count++;
        }
        assert.equal(60, count);
    });
    it("Generating partial permutation half size: all elements valid", function(){
        var generator = new PermutationGenerator([0, 1, 2, 3, 4], 3);
        assert.isFalse(common.isIterableContainInvalidPartialPermutation(generator));
    });

    it("Generating partial permutation max size: no duplicate", function(){
        var generator = new PermutationGenerator([0, 1, 2, 3, 4], 3);
        assert.isFalse(common.isIterableContainDuplicateResult(generator));
    });
    it("Generating partial permutation max size: correct amount", function(){
        assert.isFalse(true);
    });
    it("Generating partial permutation max size: all elements valid", function(){
        assert.isFalse(true);
    });
});
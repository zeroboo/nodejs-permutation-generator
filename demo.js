const PermutationGenerator=require('./index');
var generator = new PermutationGenerator([1, 2, 3, 5]);
console.log(generator.generateAll());
# pipe-sort
Compose comparator functions to JavaScript native sort()

Pretty straightforward, say you want to sort by arbitrary comparators, starting with the most important one. Instead of running sort x
amount of times relative to the number of comparators, you can compose comparators with pipeC(). 

If any comparator returns 0, the value of the next comparator function is called. So in this example, if the ages are equal, they are sorted by name, then if the names are equal they are sorted by size, etc.

```javascript

const pipeComparators = (...fns) => (a, b) => {
  const compare = (a, b, f = 0) => fns[f](a, b) ? fns[f](a, b) : fns[f](b, a) ? fns[f](b, a) : (f !== fns.length - 1) ? compare(a, b, f + 1) : 0;
  return compare(a, b);
};
```

Example usage:

```javascript
import { comparator, pipeC } from 'pipe-sort';

const person = (name, age, size) => ({name, age, size});

const people = [
  person('zylon', 4000, 1), 
  person('apple', 4000), 
  person('apple', 4000, 10), 
  person('bobcat', 4000, 1), 
  person('apple', 4000, 1),  
  person('bobcat', 69, 1), 
  person('bobcat', 1001, 1), 
  person('aaba', 90, 1)
];

const byName = comparator((a, b) => a.name < b.name);
const byAge = comparator((a, b) => a.age < b.age);
const bySize = comparator((a, b) => a.size < b.size);

const criteria = pipeC(
  byAge, 
  byName,
  bySize
);

const newPeople = people.sort(criteria);

console.log(newPeople);

// output:

[ { name: 'bobcat', age: 69, size: 1 },
  { name: 'aaba', age: 90, size: 1 },
  { name: 'bobcat', age: 1001, size: 1 },
  { name: 'apple', age: 4000, size: undefined },
  { name: 'apple', age: 4000, size: 10 },
  { name: 'apple', age: 4000, size: 1 },
  { name: 'bobcat', age: 4000, size: 1 },
  { name: 'zylon', age: 4000, size: 1 } ]
```

# pipe-sort
Compose comparator functions (in descending order of importance) to JavaScript native sort()

Say you want to sort by multiple arbitrary comparators, in descending order of importance. Instead of calling sort() multiple times for each comparator, you can compose comparators with pipeC(), making your code more efficient and easier to read.

Deliberately did not include a general purpose "compose" function for combining comparators without order of importance, it is more general, and Ramda, lodash, Underscore, etc. already have this functionality.

Also includes a helper function ```comparator()```, this is just to write cleaner comparator functions to return boolean values instead of -1, 1, 0, not necessary for use with pipeC(), just a convenience.

It's very simple, if any comparator fn returns 1 or -1, then that value is returned, if 0 is returned, then the next comparator function is called:

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

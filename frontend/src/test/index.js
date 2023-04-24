const arrOfArrays = [
  { name: "Alice", age: 20 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 30 },
  { name: "Dave", age: 35 },
  { name: "Emily", age: 40 },
  { name: "Frank", age: 45 },
  { name: "Grace", age: 50 },
  { name: "Henry", age: 55 },
  { name: "Ivy", age: 60 },
  { name: "John", age: 65 },
  { name: "Karen", age: 70 },
  { name: "Laura", age: 75 },
  { name: "Mark", age: 80 },
  { name: "Nancy", age: 85 },
  { name: "Oliver", age: 90 },
  { name: "Patty", age: 95 },
  { name: "Quentin", age: 100 },
  { name: "Rachel", age: 105 },
  { name: "Steve", age: 110 },
  { name: "Tina", age: 115 },
];

const result = arrOfArrays.sort((a, b) => b.age - a.age).slice(0, 10);

console.log(result);

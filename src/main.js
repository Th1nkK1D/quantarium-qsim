import Qubit from './qubit'
import Gate from './gate'

let q = new Qubit()

let h = new Gate('H', [[1/Math.sqrt(2),1/Math.sqrt(2)],[1/Math.sqrt(2),-1/Math.sqrt(2)]])

console.log(q.getCurrentState())
console.log(h.operation)
console.log(q.pushGates([h]))
console.log(q.pushGates([h, h]))
console.log(q.popGates(2))
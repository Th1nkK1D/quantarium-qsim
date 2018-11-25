import * as math from 'mathjs'

// Qubit class
class Qubit {
  constructor() {
    this.reset()
  }

  // Reset Qubit
  reset() {
    this.stateHistory = [[math.complex(1), math.complex(0)]]
    this.appliedGates = []
    this.collapsed = false

    return this.getQubitSummary()
  }

  // Get current (lastest) state
  getCurrentState() {
    return this.stateHistory[this.stateHistory.length-1]
  }

  // Get symbol list of applied gate
  getAppliedGatesSymbol() {
    return this.appliedGates.map(g => g.symbol)
  }

  getStateHistoryAsString() {
    return this.stateHistory.map(s => s.map(z => z.toString()))
  }

  // Get overall qubit summary
  getQubitSummary() {
    return {
      states: this.getStateHistoryAsString(),
      gates: this.getAppliedGatesSymbol(),
      collapsed: this.collapsed
    }
  }

  // Operation and state matrix multiplication
  calculateOperation(op) {
    const state = this.getCurrentState()

    return [
      math.add(math.multiply(state[0],op[0][0]), math.multiply(state[1],op[0][1])),
      math.add(math.multiply(state[0],op[1][0]), math.multiply(state[1],op[1][1]))
    ]
  }

  // Push gates from array
  pushGates(gates) {
    if (this.collapsed) {
      return false
    }

    for (let g in gates) {
      this.appliedGates.push(gates[g])
      this.stateHistory.push(this.calculateOperation(gates[g].operation))
    }

    return this.getQubitSummary()
  }

  // Pop lastest amount of gate
  popGates(amount = 1) {
    if (this.collapsed) {
      return false
    }
  
    this.appliedGates.splice(this.appliedGates.length-amount, amount)
    this.stateHistory.splice(this.stateHistory.length-amount, amount)

    return this.getQubitSummary()
  }

  // Measure qubit (standard basis projection measurement)
  measure(batch_size) {
    if (this.collapsed) {
      return false
    }
    const alpha = this.getCurrentState()[0]
    const cutoff = math.multiply(alpha, math.conj(alpha))

    let res = [0,0]
    let batchRes
    
    for(let b = 0; b < batch_size; b++) {
      batchRes = Math.random() < cutoff ? 0 : 1
      res[batchRes]++
    }

    this.collapsed = batchRes === 0
      ? [[math.complex(1), math.complex(0)]]
      : [[math.complex(0), math.complex(1)]]

    return { res, batch_size }
  }

  // Unmeasure, reverse collapsation
  unmeasure() {
    if(!this.collapsed) {
      return false
    }

    this.collapsed = false

    return this.getQubitSummary()
  }
}

export default Qubit
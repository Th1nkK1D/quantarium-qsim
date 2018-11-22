// Qubit class
class Qubit {
  constructor() {
    this.stateHistory = [[1,0]]
    this.appliedGates = []
    this.collapsed = false
  }

  // Operation and state matrix multiplication
  calculateOperation(op) {
    const state = this.getCurrentState()

    return [
      state[0]*op[0][0]+state[1]*op[0][1],
      state[0]*op[1][0]+state[1]*op[1][1],
    ]
  }

  // Get current (lastest) state
  getCurrentState() {
    return this.stateHistory[this.stateHistory.length-1]
  }

  // Get symbol list of applied gate
  getAppliedGatesSymbol() {
    return this.appliedGates.map(g => g.symbol)
  }

  // Get overall qubit summary
  getQubitSummary() {
    return {
      states: this.stateHistory,
      gates: this.getAppliedGatesSymbol(),
      collapsed: this.collapsed
    }
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

    const cutoff = Math.pow(this.getCurrentState()[0], 2)
    let res = [0,0]
    let batchRes
    
    for(let b = 0; b < batch_size; b++) {
      batchRes = Math.random() < cutoff ? 0 : 1
      res[batchRes]++
    }

    this.collapsed = batchRes === 0 ? [1,0] : [0,1]

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
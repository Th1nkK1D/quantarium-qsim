// Qubit class
class Qubit {
  constructor() {
    this.stateHistory = [[1,0]]
    this.appliedGates = []
    this.isCollapsed = false
  }

  // Operation and state matrix multiplication
  calculateOperation(op) {
    const state = this.stateHistory[this.stateHistory.length-1]

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
      isCollapsed: this.isCollapsed
    }
  }

  // Push gates from array
  pushGates(gates) {
    for (let g in gates) {
      this.appliedGates.push(gates[g])
      this.stateHistory.push(this.calculateOperation(gates[g].operation))
    }

    return this.getQubitSummary()
  }

  // Pop lastest amount of gate
  popGates(amount = 1) {
    this.appliedGates.splice(this.appliedGates.length-amount, amount)
    this.stateHistory.splice(this.stateHistory.length-amount, amount)

    return this.getQubitSummary()
  }

}

export default Qubit
import * as math from 'mathjs'

import Qubit from './qubit'
import Gate from './gate'

// Pre-defined basic gate
const BasicGate = {
  H: new Gate('H', [
    [math.complex(1/math.sqrt(2)), math.complex(1/math.sqrt(2))],
    [math.complex(1/math.sqrt(2)), math.complex(-1/math.sqrt(2))]
  ]),
  X: new Gate('X', [
    [math.complex(0), math.complex(1)],
    [math.complex(1), math.complex(0)]
  ]),
  Y: new Gate('Y', [
    [math.complex(0), math.multiply(-1, math.i)],
    [math.i, math.complex(0)]
  ]),
  Z: new Gate('Z', [
    [math.complex(1), math.complex(0)],
    [math.complex(0), math.complex(-1)]
  ])
}

export { Qubit, Gate, BasicGate }

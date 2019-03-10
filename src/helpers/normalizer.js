import * as math from 'mathjs'

function normalizeState (state) {
  const z1 = math.complex(state[0])
  const z2 = math.complex(state[1])

  const a = math.sqrt(z1.re*z1.re + z1.im*z1.im)
  const alpha = math.atan2(z1.im, z1.re)

  const b = math.sqrt(z2.re*z2.re + z2.im*z2.im)
  const beta = math.atan2(z2.im, z2.re)

  const theta = 2*math.acos(a)
  const phi = (beta - alpha)

  return {
    state: [
      a,
      b
    ],
    sphericalCoord: [
      theta < 0 ? (2*math.pi) + theta : theta,
      phi < 0 ? (2*math.pi) + phi : phi
    ]
  }
}

export default normalizeState
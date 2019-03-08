import * as math from 'mathjs'

function normalizeState (state) {
  console.log('NORMALIZING')
  const z1 = math.complex(state[0])
  const z2 = math.complex(state[1])

  const a = math.sqrt(z1.re*z1.re + z1.im*z1.im)
  const alpha = math.atan(z1.im/z1.re)

  const b = math.sqrt(z2.re*z2.re + z2.im*z2.im)
  const beta = math.atan(z1.im/z1.re)

  const theta = 2*math.acos(a)
  const phi = (alpha + beta)

  // console.log(`z1 = ${z1}`)
  // console.log(`z2 = ${z2}`)
  // console.log(`a = ${a}`)
  // console.log(`alpha = arctan(${z1.im}/${z1.re}) = ${alpha}`)
  // console.log(`b = ${b}`)
  // console.log(`beta = arctan(${z2.im}/${z2.re}) = ${beta}`)
  // console.log(`theta = ${theta}`)
  // console.log(`phi = ${phi}`)


  return {
    state: [a, b],
    sphericalCoord: [
      theta < 0 ? (2*math.pi) + theta : theta,
      phi < 0 ? (2*math.pi) + phi : phi
    ]
  }
}

export default normalizeState
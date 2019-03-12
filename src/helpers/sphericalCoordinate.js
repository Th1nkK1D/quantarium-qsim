import * as math from 'mathjs'

function getSphericalCoordinate (state) {
  if (state[0] == 0) {
    return [math.pi, 0]
  } else if (state[1] == 0) {
    return [0, 0]
  }

  const z1 = math.complex(state[0])
  const z2 = math.complex(state[1])

  const a = math.sqrt(z1.re*z1.re + z1.im*z1.im)
  const alpha = math.atan2(z1.im, z1.re)

  // const b = math.sqrt(z2.re*z2.re + z2.im*z2.im)
  const beta = math.atan2(z2.im, z2.re)

  const theta = 2*math.acos(a)
  const phi = (beta - alpha)

  // console.log(`alpha => (${z1.im}/${z1.re}) = ${alpha}`)
  // console.log(`beta => (${z2.im}/${z2.re}) = ${beta}`)

  return [
    theta, //theta < 0 ? (2*math.pi) + theta : theta,
    phi //phi < 0 ? (2*math.pi) + phi : phi
  ]
}

function getCoordinatesDistance (c1, c2) {
  return math.pow(c1[0] - c2[0], 2) + math.pow(c1[1] - c2[1], 2)
}

function checkSameState (s1, s2) {
  const maxError = 0.1
  const error = getCoordinatesDistance(getSphericalCoordinate(s1), getSphericalCoordinate(s2))

  if (error <= maxError) {
    return true
  } else {
    return false
  }
}

export { getSphericalCoordinate, checkSameState }
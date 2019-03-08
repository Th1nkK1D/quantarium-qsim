import * as math from 'mathjs'

function getThetaFromA (a) {
  console.log(`a = ${a}`)
  // return math.multiply(2, math.acos(a))
  return 2*math.acos(a)
}

function getPhiFromBandTheta (b, theta) {
  console.log(`b = ${b}`)
  return math.multiply(-1, math.multiply(math.i, math.log(b / math.sin(theta/2)))) % (2 * math.pi)
}

function getSphericalFromState (state) {
  const theta = getThetaFromA(state[0])
  const phi = getPhiFromBandTheta(state[1], theta)

  console.log([theta, phi])

  return [theta, phi]
}

export default getSphericalFromState
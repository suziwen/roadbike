class Vec2 {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  
  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  scalarMultiple(k) {
    return new Vec2(k * this.x, k * this.y)
  }

  normalize() {
    return this.scalarMultiple(1 / this.magnitude())
  }

  add(v2) {
    return new Vec2(this.x + v2.x, this.y + v2.y)
  }

  subtract(v2) {
    return this.add(v2.scalarMultiple(-1))
  }
}

class SVGCommands {
  constructor() {
    this.commands = []
  }

  toString() {
    return this.commands.join(' ')
  }

  //svg move to command
  M(vec2) {
    this.commands.push(`M${vec2.x} ${vec2.y}`)
    return this
  }

  //svg draw line to point from current position command
  L(vec2) {
    this.commands.push(`L${vec2.x} ${vec2.y}`)
    return this
  }

  //svg bezier quadratic curve command
  Q(controlVec2, endVec2) {
    this.commands.push(`Q${controlVec2.x} ${controlVec2.y} ${endVec2.x} ${endVec2.y}`)
    return this
  }

  //svg shortcut close path command
  Z() {
    this.commands.push('Z')
    return this
  }
}

//returns the path's "d" attribute for the hexagon
export function generateHexSVG(sideLength, borderRadius) {
  //from geometry of a hexagon
  var width = Math.sqrt(3) * sideLength
  var height = 2 * sideLength

  //a, b, c, d, e and f represent the vertices
  var a, b, c, d, e, f
  //start at the top point
  a = new Vec2(width / 2, 0)
  b = new Vec2(width, height / 4)
  c = new Vec2(width, 3 * height / 4)
  d = new Vec2(width / 2, height)
  e = new Vec2(0, 3 * height / 4)
  f = new Vec2(0, height / 4)

  if(borderRadius == 0) {
    var pointyHexagon = new SVGCommands()
    return pointyHexagon.M(a).L(b).L(c).L(d).L(e).L(f).Z().toString()
  }

  /*for hexagons with curved corners, we use the quadratic curve command
  the vertex itself will be the control point
  the start point will be a point slightly to the left of the vertex along the perimeter of the hexagon
  and the end point will be a point slightly to the right of the vertex along the perimeter of the hexagon
  the distance that the start and end points are along the adjacent sides is given by the curve radius*/
  var dl = f.subtract(a).normalize().scalarMultiple(borderRadius)
  var dr = b.subtract(a).normalize().scalarMultiple(borderRadius)
  var dd = new Vec2(0, borderRadius)

  var roundedHexagon = new SVGCommands()
  roundedHexagon
    .M(a.add(dl))
    .Q(a, a.add(dr))
    .L(b.subtract(dr))
    .Q(b, b.add(dd))
    .L(c.subtract(dd))
    .Q(c, c.add(dl))
    .L(d.subtract(dl))
    .Q(d, d.subtract(dr))
    .L(e.add(dr))
    .Q(e, e.subtract(dd))
    .L(f.add(dd))
    .Q(f, f.subtract(dl))
    .Z()

  return roundedHexagon.toString()
}

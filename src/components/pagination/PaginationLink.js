import React from "react"
import { Link } from "gatsby"
import { colors } from "../../utils/presets"

const PaginationLink = ({ to, children, ...props }) => {
  if (to) {
    return (
      <Link to={to} {...props}>
        {children}
      </Link>
    )
  }
  return null
}

export default PaginationLink

import { render, screen } from "@testing-library/react"
import Header from "./Header"
import { BrowserRouter as Router } from "react-router-dom"

describe("Header unit tests", () => {
  test("renders header title", () => {
    render(
      <Router>
        <Header title="header_title_test" />
      </Router>
    )
    const linkElement = screen.getByText(/header_title_test/i)
    expect(linkElement).toBeInTheDocument()
  })
})

import { calculateAssignment } from "utils/calculations"

describe("Calculation test", () => {
  test("check assign algorithm", () => {
    const appState = {
      desks: [
        { number: 1, name: "desk1" },
        { number: 2, name: "desk2" },
        { number: 3, name: "desk3" },
        { number: 4, name: "desk4" },
      ],
      employees: [
        {
          id: 1,
          name: "E1",
          email: "email1@email.com",
          preferredDesks: [1, 2],
        },
        {
          id: 2,
          name: "E2",
          email: "email2@email.com",
          preferredDesks: [1],
        },
        {
          id: 3,
          name: "E3",
          email: "email3@email.com",
          preferredDesks: [],
        },

        {
          id: 4,
          name: "E4",
          email: "email4@email.com",
          preferredDesks: [],
        },
        {
          id: 5,
          name: "E5",
          email: "email5@email.com",
          preferredDesks: [1, 2, 3],
        },
        {
          id: 6,
          name: "E6",
          email: "email6@email.com",
          preferredDesks: [1, 2, 3],
        },
      ],
      assignment: null,
    }

    const assignment = calculateAssignment(appState)

    expect(JSON.stringify(assignment)).toBe(
      JSON.stringify({ "1": 2, "2": 1, "3": 4, "4": null, "5": 3, "6": null })
    )
  })
})

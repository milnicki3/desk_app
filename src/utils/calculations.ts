import { IAppState } from "types/IAppState"
import { IDesk } from "types/IDesk"
import { IEmployee } from "types/IEmployee"

export const calculateAssignment = (
  appState: IAppState
): Record<number, number | null> => {
  const employeesToAssign = [...appState.employees]
  const assignment: Record<number, number | null> = {}

  const { competitiveDesks, uncompetitiveDesks } = findDeskCompetition(appState)

  // for competitive desks - make queue according to algorithm
  // 1. priority for given desk - higher is better
  // 2. alternative desks count - lower is better
  // 3. position on employees list - lower is better

  competitiveDesks.forEach((desk) => {
    const employeesInterested = employeesToAssign
      .filter((employee) => {
        return employee.preferredDesks.includes(desk.number)
      })
      .map((employee, index) => {
        const deskPosition = employee.preferredDesks.indexOf(desk.number)
        const alternatives = employee.preferredDesks.length - 1

        return { ...employee, index, deskPosition, alternatives }
      })

    if (employeesInterested.length === 0) {
      uncompetitiveDesks.push(desk)
      return
    }

    const employeesQueue = sortCompetingUsers(employeesInterested)

    const winner = employeesQueue[0]

    const winnerIndex = employeesToAssign.findIndex((employee) => {
      return employee.id === winner.id
    })

    employeesToAssign.splice(winnerIndex, 1)
    assignment[winner.id] = desk.number
  })

  // for uncompetitive desks - make queue based on position on list only
  uncompetitiveDesks.forEach((desk) => {
    if (employeesToAssign.length === 0) return

    const employees = employeesToAssign.map((employee, index) => {
      return { ...employee, index }
    })

    const employeesQueue = sortNotCompetingUsers(employees)
    const winner = employeesQueue[0]

    const winnerIndex = employeesToAssign.findIndex((employee) => {
      return employee.id === winner.id
    })

    employeesToAssign.splice(winnerIndex, 1)
    assignment[winner.id] = desk.number
  })

  if (employeesToAssign.length > 0) {
    employeesToAssign.forEach((employee) => {
      assignment[employee.id] = null
    })
  }

  return assignment
}

const sortCompetingUsers = (
  employees: Array<
    IEmployee & {
      index: number
      deskPosition: number
      alternatives: number
    }
  >
) => {
  employees.sort((e1, e2) => {
    if (e1.deskPosition < e2.deskPosition) {
      return -1
    }

    if (e1.deskPosition > e2.deskPosition) {
      return 1
    }

    if (e1.deskPosition === e2.deskPosition) {
      if (e1.alternatives < e2.alternatives) {
        return -1
      }

      if (e1.alternatives > e2.alternatives) {
        return 1
      }

      if (e1.alternatives === e2.alternatives) {
        if (e1.index < e2.index) {
          return -1
        }

        if (e1.index > e2.index) {
          return 1
        }
      }
    }

    return 0
  })

  return employees
}

const sortNotCompetingUsers = (
  employees: Array<
    IEmployee & {
      index: number
    }
  >
) => {
  employees.sort((e1, e2) => {
    if (e1.index < e2.index) {
      return -1
    }

    if (e1.index > e2.index) {
      return 1
    }
    return 0
  })

  return employees
}

const findDeskCompetition = (appState: IAppState) => {
  const competitiveDesks: Array<IDesk & { competition: number }> = []
  const uncompetitiveDesks: Array<IDesk> = []
  appState.desks.forEach((desk) => {
    const interestedUsers = appState.employees.filter((employee) => {
      return employee.preferredDesks.includes(desk.number)
    })

    if (interestedUsers.length === 0) {
      uncompetitiveDesks.push({ ...desk })
    } else {
      competitiveDesks.push({ ...desk, competition: interestedUsers.length })
    }
  })

  return { competitiveDesks, uncompetitiveDesks }
}

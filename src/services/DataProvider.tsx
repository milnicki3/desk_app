import React, { useState, useCallback, ReactElement } from "react"

import { IAppState } from "types/IAppState"
import { IEmployee } from "types/IEmployee"
import { IDesk } from "types/IDesk"
import { calculateAssignment } from "utils/calculations"

const { createContext, useContext } = React

interface IData {
  state: IAppState
  addEmployee: (employee: IEmployee) => void
  editEmployee: (employee: IEmployee) => void
  addDesk: (desk: IDesk) => void
  editDesk: (desk: IDesk) => void
  assign: () => void
}

const DataContext = createContext<IData>({
  state: {
    employees: [],
    desks: [],
    assignment: null,
  },

  addEmployee: () => {
    //
  },
  editEmployee: () => {
    //
  },
  addDesk: () => {
    //
  },
  editDesk: () => {
    //
  },
  assign: () => {
    //
  },
})

interface IProps {
  children: ReactElement
}

export const DataProvider: React.FC<IProps> = ({ children }: IProps) => {
  const [appState, setAppState] = useState<IAppState>({
    desks: [],
    employees: [],
    assignment: null,
  })

  const addEmployee = useCallback(
    (employee: IEmployee) => {
      const ids = appState.employees.map((employee: IEmployee) => {
        return employee.id
      })

      const maxId = ids.length > 0 ? Math.max(...ids) : 0

      setAppState({
        ...appState,
        employees: [...appState.employees, { ...employee, id: maxId + 1 }],
      })
    },
    [appState]
  )

  const editEmployee = useCallback(
    (employee: IEmployee) => {
      const index = appState.employees.findIndex((employeeItem: IEmployee) => {
        return employeeItem.id === employee.id
      })
      if (index !== -1) {
        const copiedEmployees = [...appState.employees]
        copiedEmployees.splice(index, 1, employee)
        setAppState({
          ...appState,
          employees: copiedEmployees,
        })
      }
    },
    [appState]
  )

  const addDesk = useCallback(
    (desk: IDesk) => {
      setAppState({ ...appState, desks: [...appState.desks, desk] })
    },
    [appState]
  )

  const editDesk = useCallback(
    (desk: IDesk) => {
      const index = appState.desks.findIndex((deskItem: IDesk) => {
        return deskItem.number === desk.number
      })
      if (index !== -1) {
        const copiedDesks = [...appState.desks]
        copiedDesks.splice(index, 1, desk)
        setAppState({
          ...appState,
          desks: copiedDesks,
        })
      }
    },
    [appState]
  )

  const assign = useCallback(() => {
    const assignment = calculateAssignment(appState)
    setAppState({
      ...appState,
      assignment,
    })
  }, [appState])

  return (
    <DataContext.Provider
      value={{
        state: appState,
        addEmployee,
        addDesk,
        editEmployee,
        editDesk,
        assign,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export const useData = (): IData => {
  return useContext(DataContext)
}

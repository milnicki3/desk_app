import React, { useState } from "react"
import { Grid, List, ListItem, Typography, Button, IconButton } from "@mui/material"
import Page from "ui/components/Page"
import { useData } from "services/DataProvider"
import { IDesk } from "types/IDesk"
import EditIcon from "@mui/icons-material/Edit"
import Modal from "ui/components/Modal"
import ListContainer from "ui/components/ListContainer"
import { IEmployee } from "types/IEmployee"
import EditEmployee from "ui/components/EditEmployee"

const Employees: React.FC = () => {
  const { state, addEmployee, editEmployee, assign } = useData()
  const { employees, desks, assignment } = state

  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false)
  const [editedEmployee, setEditedEmployee] = useState<IEmployee | null>(null)

  const closeModal = () => {
    setEditedEmployee(null)
    setIsOpenAddModal(false)
  }

  return (
    <Page title="Employees">
      <>
        <ListContainer>
          <>
            <List sx={{ width: "100%" }}>
              <ListItem key={"header"}>
                <Grid container spacing={3}>
                  <Grid item xs={2}>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      Name
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      Email
                    </Typography>
                  </Grid>

                  <Grid item xs={3}>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      Preferred Desks
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      Assigned desk
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              {employees.map((employee: IEmployee, index: number) => {
                const employeeDesks = employee.preferredDesks
                  .map((deskNumber) => {
                    return desks.find((desk) => {
                      return desk.number === deskNumber
                    })
                  })
                  .filter((desk?) => {
                    return !!desk
                  }) as IDesk[]

                let assignedDeskName = "None"

                if (assignment && assignment[employee.id]) {
                  const assignedDesk = desks.find((desk) => {
                    return assignment[employee.id] === desk.number
                  })
                  if (assignedDesk) {
                    assignedDeskName = assignedDesk.name
                  }
                }

                return (
                  <ListItem key={index}>
                    <Grid container spacing={3}>
                      <Grid item xs={2}>
                        <Typography variant="body1">{employee.name}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="body1">{employee.email}</Typography>
                      </Grid>

                      <Grid item xs={3}>
                        <Typography variant="body1">
                          {employeeDesks
                            .map((desk: IDesk) => {
                              return desk.name
                            })
                            .join(", ")}
                        </Typography>
                      </Grid>

                      <Grid item xs={2}>
                        <Typography variant="body1">{assignedDeskName}</Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <IconButton
                          onClick={() => {
                            setEditedEmployee(employee)
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </ListItem>
                )
              })}
            </List>

            <Grid item xs={12}>
              <Grid container direction="row" spacing={2} justifyContent="flex-end">
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      assign()
                    }}
                  >
                    Assign
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() => {
                      setIsOpenAddModal(true)
                    }}
                  >
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </>
        </ListContainer>
        {editedEmployee && (
          <Modal isOpen={true} handleClose={closeModal} title="Edit employee">
            <EditEmployee
              handleClose={closeModal}
              editedEmployee={editedEmployee}
              desks={desks}
              usedEmails={employees.map((employee) => {
                return employee.email
              })}
              onSubmit={(employee: IEmployee) => {
                editEmployee(employee)
                closeModal()
              }}
            ></EditEmployee>
          </Modal>
        )}
        {isOpenAddModal && (
          <Modal isOpen={true} handleClose={closeModal} title="Add new employee">
            <EditEmployee
              handleClose={closeModal}
              desks={desks}
              usedEmails={employees.map((employee) => {
                return employee.email
              })}
              onSubmit={(employee: IEmployee) => {
                addEmployee(employee)
                editEmployee(employee)
                closeModal()
              }}
            ></EditEmployee>
          </Modal>
        )}
      </>
    </Page>
  )
}
export default Employees

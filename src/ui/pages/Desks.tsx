import React, { useState } from "react"
import {
  Grid,
  List,
  ListItem,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material"
import Page from "ui/components/Page"
import { useData } from "services/DataProvider"
import { IDesk } from "types/IDesk"
import EditIcon from "@mui/icons-material/Edit"
import Modal from "ui/components/Modal"
import EditDesk from "ui/components/EditDesk"
import ListContainer from "ui/components/ListContainer"

const Desks: React.FC = () => {
  const { state, addDesk, editDesk } = useData()
  const { desks } = state

  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false)
  const [editedDesk, setEditedDesk] = useState<IDesk | null>(null)

  const closeModal = () => {
    setEditedDesk(null)
    setIsOpenAddModal(false)
  }

  return (
    <Page title="Desks">
      <>
        <ListContainer>
          <>
            <List sx={{ width: "100%" }}>
              <ListItem key={"header"}>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      No.
                    </Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      Name
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              {desks.map((desk: IDesk) => {
                return (
                  <ListItem key={desk.number}>
                    <Grid container spacing={2}>
                      <Grid item xs={1}>
                        <Typography variant="body1">{desk.number}</Typography>
                      </Grid>
                      <Grid item xs={10}>
                        <Typography variant="body1">{desk.name}</Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <IconButton
                          onClick={() => {
                            setEditedDesk(desk)
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
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  setIsOpenAddModal(true)
                }}
              >
                Add
              </Button>
            </Box>
          </>
        </ListContainer>
        {editedDesk && (
          <Modal isOpen={true} handleClose={closeModal} title="Edit desk">
            <EditDesk
              editedDesk={editedDesk}
              handleClose={closeModal}
              usedNumbers={desks.map((desk: IDesk) => {
                return desk.number
              })}
              onSubmit={(desk: IDesk) => {
                editDesk(desk)
                closeModal()
              }}
            ></EditDesk>
          </Modal>
        )}
        {isOpenAddModal && (
          <Modal isOpen={true} handleClose={closeModal} title="Add desk">
            <EditDesk
              handleClose={closeModal}
              usedNumbers={desks.map((desk: IDesk) => {
                return desk.number
              })}
              onSubmit={(desk: IDesk) => {
                addDesk(desk)
                closeModal()
              }}
            ></EditDesk>
          </Modal>
        )}
      </>
    </Page>
  )
}
export default Desks

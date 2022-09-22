import { ChangeEvent, useCallback } from "react"
import {
  Box,
  Button,
  TextField,
  Grid,
  List,
  ListItem,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material"
import { useForm, FormProvider, Controller } from "react-hook-form"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { IEmployee } from "types/IEmployee"
import { IDesk } from "types/IDesk"

interface IProps {
  handleClose: () => void
  onSubmit: ({
    id,
    name,
    email,
    preferredDesks,
  }: {
    id: number
    name: string
    email: string
    preferredDesks: number[]
  }) => void
  editedEmployee?: IEmployee
  usedEmails: string[]
  desks: IDesk[]
}

const EditEmployee: React.FC<IProps> = ({
  handleClose,
  onSubmit,
  editedEmployee,
  usedEmails,
  desks,
}: IProps) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required field"),
    email: Yup.string()
      .required("Required field")
      .email("Invalid email")
      .test("unique-email", "Email is not unique", (value?: string) => {
        if (!value) return true
        if (usedEmails.includes(value)) {
          if (editedEmployee && editedEmployee.email === value) return true
          return false
        }

        return true
      }),
  })

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: "onBlur",
    mode: "onBlur",
    defaultValues: editedEmployee
      ? {
          id: editedEmployee.id,
          name: editedEmployee.name,
          email: editedEmployee.email,
          preferredDesks: editedEmployee.preferredDesks,
        }
      : { id: -1, name: "", email: "", preferredDesks: [] },
  })

  const { handleSubmit, control, watch, setValue } = methods

  const preferredDesks = watch("preferredDesks")

  const handleDeskChange = useCallback(
    (deskNumber: number) => (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked === false) {
        const index = preferredDesks.indexOf(deskNumber)
        const newDesks = [...preferredDesks]
        newDesks.splice(index, 1)
        setValue("preferredDesks", newDesks)
      } else {
        setValue("preferredDesks", [...preferredDesks, deskNumber])
      }
    },
    [preferredDesks, setValue]
  )

  const handleDeskOrderChange = useCallback(
    (deskNumber: number) => (e: ChangeEvent<HTMLInputElement>) => {
      const currentPosition = preferredDesks.indexOf(deskNumber)
      const value = e.target.value ? (e.target.value as unknown as number) * 1 : null
      const newPosition = value && value > 0 ? value - 1 : null

      if (newPosition !== null) {
        const newDesks = [...preferredDesks]
        const element = newDesks.splice(currentPosition, 1)[0]
        newDesks.splice(newPosition, 0, element)

        setValue("preferredDesks", newDesks)
      }
    },
    [preferredDesks, setValue]
  )

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Grid container rowSpacing={4} sx={{ margin: 0 }}>
            <Grid item xs={12}>
              <Controller
                name={"name"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    label={"Name"}
                    error={!!error}
                    helperText={error ? error.message : ""}
                    {...field}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name={"email"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    sx={{ width: "100%" }}
                    size="small"
                    label={"Email"}
                    error={!!error}
                    helperText={error ? error.message : ""}
                    {...field}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <List sx={{ width: "100%" }}>
                <ListItem key={"header"}>
                  <Grid container direction="row" sx={{ width: "100%" }}>
                    <Grid item xs={10}>
                      <Typography variant="body1" sx={{ fontWeight: 700 }}>
                        Desks
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="body1" sx={{ fontWeight: 700 }}>
                        Order
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>

                {desks.map((desk, index) => {
                  const deskIndex = preferredDesks.findIndex(
                    (deskNumber: number) => {
                      return desk.number === deskNumber
                    }
                  )
                  return (
                    <ListItem key={index}>
                      <Grid container direction="row" sx={{ width: "100%" }}>
                        <Grid item xs={10}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                name={`desk_checkbox_${desk.number}`}
                                checked={deskIndex !== -1}
                                onChange={handleDeskChange(desk.number)}
                              />
                            }
                            label={desk.name}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          {deskIndex !== -1 && (
                            <TextField
                              name={`desk_name_${desk.number}`}
                              onChange={handleDeskOrderChange(desk.number)}
                              size="small"
                              type="number"
                              value={deskIndex + 1}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </ListItem>
                  )
                })}
              </List>
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="row" spacing={2} justifyContent="center">
                <Grid item>
                  <Button variant="outlined" color="primary" onClick={handleClose}>
                    CANCEL
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" type="submit">
                    SAVE
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </form>
    </FormProvider>
  )
}

export default EditEmployee

import { Box, Button, TextField, Grid } from "@mui/material"
import { useForm, FormProvider, Controller } from "react-hook-form"
import * as Yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { IDesk } from "types/IDesk"

interface IProps {
  handleClose: () => void
  onSubmit: ({ name, number }: { name: string; number: number }) => void
  editedDesk?: IDesk
  usedNumbers: number[]
}
const EditDesk: React.FC<IProps> = ({
  handleClose,
  onSubmit,
  editedDesk,
  usedNumbers,
}: IProps) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required field"),
    number: Yup.number()
      .required("Required field")
      .test("unique-number", "Number is not unique", (value?: number) => {
        if (!value) return true
        if (usedNumbers.includes(value)) {
          if (editedDesk && editedDesk.number === value) return true
          return false
        }

        return true
      }),
  })

  const methods = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: "onBlur",
    mode: "onBlur",
    defaultValues: editedDesk
      ? { name: editedDesk.name, number: editedDesk.number }
      : { name: "", number: Math.max(...usedNumbers) + 1 },
  })

  const { handleSubmit, control } = methods

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
                name={"number"}
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    sx={{ width: "100%" }}
                    disabled={!!editedDesk}
                    size="small"
                    type="number"
                    label={"Unique number"}
                    error={!!error}
                    helperText={error ? error.message : ""}
                    {...field}
                  />
                )}
              />
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

export default EditDesk

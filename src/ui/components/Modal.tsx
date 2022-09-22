import React, { ReactElement } from "react"
import CloseIcon from "@mui/icons-material/Close"
import { Box, Modal as ModalMui, IconButton, Typography } from "@mui/material"
import { useTheme, styled } from "@mui/material/styles"

export interface IProps {
  isOpen: boolean
  handleClose: () => void
  children?: ReactElement
  title?: string
}

const ModalHeader = styled(Box)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingLeft: 16,
  "& svg": {
    color: theme.palette.common.white,
  },
}))

const Modal: React.FC<IProps> = ({
  isOpen,
  handleClose,
  title,
  children,
}: IProps) => {
  const theme = useTheme()

  return (
    <ModalMui open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: theme.palette.common.white,
        }}
      >
        <ModalHeader>
          <Typography variant="h6" component="div">
            {title ? title : ""}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </ModalHeader>

        <Box sx={{ padding: theme.spacing(2) }}>{children ?? null}</Box>
      </Box>
    </ModalMui>
  )
}
export default Modal

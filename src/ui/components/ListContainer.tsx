import React, { ReactElement } from "react"
import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"

const StyledContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    minWidth: "600px",
  },
}))

interface IProps {
  children: ReactElement
}

const ListContainer: React.FC<IProps> = ({ children }: IProps) => {
  return <StyledContainer>{children}</StyledContainer>
}

export default ListContainer

import React, { ReactElement } from "react"
import { styled } from "@mui/material/styles"
import { Grid } from "@mui/material"
import Footer from "ui/components/Footer"
import Header from "ui/components/Header"

const PageContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  minWidth: "100%",
  minHeight: "100vh",
}))

interface IProps {
  children: ReactElement
  title?: string
}

const Page: React.FC<IProps> = ({ children, title }: IProps) => {
  return (
    <PageContainer
      container
      direction="column"
      justifyContent="space-between"
      alignItems="stretch"
    >
      <Header title={title} />
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ width: "100%", flexGrow: 1 }}
      >
        {children}
      </Grid>
      <Footer />
    </PageContainer>
  )
}

export default Page

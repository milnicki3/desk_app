import React, { useCallback } from "react"
import { AppBar, Grid, Link, Toolbar, Typography, Box } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { useLocation, matchPath, NavLink } from "react-router-dom"

interface IProps {
  title?: string
}

const Header: React.FC<IProps> = ({ title }) => {
  const theme = useTheme()
  const loc = useLocation()

  const isActiveLink = useCallback((location: typeof loc, path: string): boolean => {
    return !!matchPath(location.pathname, path)
  }, [])

  return (
    <AppBar position="static" color="primary">
      <Toolbar variant="dense">
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" component="div">
            {title ? title : ""}
          </Typography>
          <Grid
            container
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Grid item>
              <Link
                component={NavLink}
                to="/"
                sx={{
                  color: theme.palette.common.white,
                  fontWeight: isActiveLink(loc, "/") ? 700 : 500,
                }}
              >
                EMPLOYEES
              </Link>
            </Grid>
            <Grid item>
              <Link
                component={NavLink}
                to="/desks"
                sx={{
                  color: theme.palette.common.white,

                  fontWeight: isActiveLink(loc, "/desks") ? 700 : 500,
                }}
              >
                DESKS
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header

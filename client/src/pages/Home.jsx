import { Grid } from "@mui/material";
import UserMenu from "../components/UserMenu";
import FolderList from "../components/FolderList";
import { Outlet, useLoaderData } from "react-router-dom";

export default function Home() {
    const { folders } = useLoaderData();

    return (
        <>
            <UserMenu />
            <Grid container sx={{ height: '93vh' }}>
                <Grid item xs={3} sx={{ height: '100%', background: '#3e3ea4' }}>
                    <FolderList folders={folders} />
                </Grid>
                <Grid item xs={9} sx={{ height: '100%' }}>
                    <Outlet />
                </Grid>
            </Grid>
        </>
    )
}

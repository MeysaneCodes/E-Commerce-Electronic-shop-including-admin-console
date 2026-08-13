import {Card, Tab, TabPanel, Tabs, TabsBody, TabsHeader} from "@material-tailwind/react";
import {CircularProgress, Typography} from "@mui/material";
import * as React from "react";

export default function Tab_Custom({Headers, Content}: {Headers:string[], Content:JSX.Element[] | string[]}) {


    let content;





    const data = {
        tab_headers : Headers,
        tabs_content : Content,
    }


    return (
        <div
            className="w-full"
        >

            <Tabs value={0}>

                <TabsHeader>
                    {data.tab_headers.map((v,i)=>{
                        return(
                            <Tab key={i} value={i}>
                                {v}
                            </Tab>
                        )
                    })}
                </TabsHeader>

                <TabsBody>

                    {data.tabs_content ? (data.tabs_content.map((v,i)=>{
                        return(
                            <TabPanel   key={i} value={i}>
                                {v}
                            </TabPanel>
                        )
                    })) : <div className="h-screen  w-full flex justify-center items-center ">
                        <CircularProgress thickness={5.6} size={20} sx={{
                            color: "red",
                        }}/>
                    </div> }
                </TabsBody>
            </Tabs>

        </div>
    )
}

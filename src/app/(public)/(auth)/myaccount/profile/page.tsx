"use client"

import {Dispatch, useEffect, useMemo, useState} from "react";
import {Breadcrumbs, CircularProgress, Link, Typography} from "@mui/material";
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    TabPanel,
    Tabs,
    Tab,
    TabsHeader,
    TabsBody
} from "@material-tailwind/react";
import * as React from "react";
import FetchTimeout from "@/utils/timeout";
import {TabsList, TabsTrigger} from "@radix-ui/react-tabs";
import {getUser} from "@/lib/api/user_api";
import {SignupUser} from "@/types/user_information_type";
import {getSession} from "@/lib/server/session/session_manager";
import {NextResponse} from "next/server";
import {useRouter} from "next/navigation";
import {ObjectId} from "mongodb";

const ICONS = {
    info_Icon : "/icons/info_icon.svg"
}


/*
const NavigationTabs  = ({data,activatedTab, setActivatedTab}:{data:any, activatedTab:number, setActivatedTab:Dispatch<React.SetStateAction<number>>})=>{



    return (
        <div className="w-full h-auto flex bg-gray-100 mb-5">
           {/!* <div role="tablist" className="tabs tabs-border ">
                <a role="tab" onClick={()=>setActivatedTab(0)} className={`tab ${activatedTab === 0 ? "tab-active" : ""}`}>Profile</a>
                <a role="tab" onClick={()=>setActivatedTab(1)} className={`tab ${activatedTab === 1 ? "tab-active" : ""}`}>Addressbuch</a>
                <a role="tab" onClick={()=>setActivatedTab(2)} className={`tab ${activatedTab === 2 ? "tab-active" : ""}`}>Zahlungsarten</a>
                <a role="tab" onClick={()=>setActivatedTab(3)} className={`tab ${activatedTab === 3 ? "tab-active" : ""}`}>Einwilligung</a>
            </div>*!/}



            <Tabs value={"Dashboard"}>
                <TabsHeader>
                    {data.map((item, index) =>{
                        return (
                            <Tab key={item.value} value={item.value}>
                                <div className="flex items-center gap-2">{item.value}</div>
                            </Tab>
                        )
                    })}
                </TabsHeader>

                <TabsBody>
                    {data.map((item, index) =>{
                        return (
                            <Tab key={item.value} value={item.value}>
                                {item.content}
                            </Tab>
                        )
                    })}
                </TabsBody>
            </Tabs>
        </div>
    )
}
*/


function formate_date(inDate:Date){
    const date = new Date(inDate);
   return Intl.DateTimeFormat("de-DE").format(date);
}

function Account_Container ({user}:{user:SignupUser | undefined}):JSX.Element{




    let content;
    const headers = ["Profil", "Addressbuch","Zahlungsarten","Einwilligung"];

    if(user)
        content =  [

            //Profile
            (<div key={"0"} className="w-full  flex flex-rows-3 gap-x-5 gap-y-10 mt-5">
                {/*Persönliche Daten*/}
                <Card className={"min-w-80 w-auto  max-w-lg max-h-[200px]  border-gray-300 grid grid-rows-3  p-5 pb-0"}>

                    <div className="">
                        <Typography fontWeight={"bold"} variant={"h6"} className={"font-bold"}>
                            Persönliche Daten
                        </Typography>
                    </div>

                    <div className="">
                        <div className="">
                            <Typography fontWeight={"bold"} variant={"body2"} className={"mt-8"}>
                                {user.name.first} {user.name.last}
                            </Typography>
                        </div>

                        <div className="">
                            <Typography variant={"body2"} className={"mb-8"}>
                                {user.name.birthday ?  formate_date(user.name.birthday) : ""}
                            </Typography>
                        </div>
                    </div>

                    <div
                        onClick={() => {
                        }}
                        className="font-bold cursor-pointer flex items-center ">
                        <Typography fontWeight={"bold"} variant={"body2"}>
                            bearbeiten
                        </Typography>
                    </div>
                </Card>
                {/*Email*/}
                <Card className={"min-w-80 w-auto max-w-lg  max-h-[200px] border-gray-300 grid grid-rows-3  p-5 pb-0"}>

                    <div className="">
                        <Typography fontWeight={"bold"} variant={"h6"} className={"font-bold"}>
                            Email
                        </Typography>
                    </div>

                    <div className="">
                        <div className="">
                            <Typography fontWeight={"bold"} variant={"body2"} className={"mt-8"}>
                                {user.email}
                            </Typography>
                        </div>
                    </div>

                    <div
                        onClick={() => {
                        }}
                        className="font-bold cursor-pointer flex items-center ">
                        <Typography fontWeight={"bold"} variant={"body2"}>
                            bearbeiten
                        </Typography>
                    </div>
                </Card>

                {/*Password*/}
                <Card className={"min-w-80 w-auto max-w-lg max-h-[200px] border-gray-300 grid grid-rows-3  p-5 pb-0"}>

                    <div className="">
                        <Typography fontWeight={"bold"} variant={"h6"} className={"font-bold"}>
                            Passwort
                        </Typography>
                    </div>

                    <div className="">
                        <div className="">
                            <Typography fontWeight={"bold"} variant={"body2"} className={"mt-8"}>
                                * * * * * * * * *
                            </Typography>
                        </div>
                    </div>

                    <div
                        onClick={() => {
                        }}
                        className="font-bold cursor-pointer flex items-center ">
                        <Typography fontWeight={"bold"} variant={"body2"}>
                            bearbeiten
                        </Typography>
                    </div>
                </Card>
                {/*MY APP ID*/}
                <Card className={"min-w-80 w-auto max-w-lg max-h-[200px] border-gray-300 grid grid-rows-3  p-5 pb-0"}>

                    <div className="mb-5">
                        <Typography fontWeight={"bold"} variant={"h6"} className={"font-bold"}>
                            My App
                        </Typography>
                    </div>

                    <div className="mb-5">
                        <div className="mb-5">
                            <Typography fontWeight={"bold"} variant={"body2"} className={"mt-8"}>
                                My App ID
                            </Typography>

                            <Typography variant={"body2"} className={"mb-8"}>
                                {user._id ? user._id.toString() : "" }
                            </Typography>

                        </div>

                        <div>
                            <Typography fontWeight={"bold"} variant={"body2"} className={"mt-8"}>
                                Mitglied seit
                            </Typography>

                            <Typography variant={"body2"} className={"mb-8"}>
                                {user.createdAt ? formate_date(user.createdAt) : "" }
                            </Typography>
                        </div>

                    </div>
                </Card>


            </div>),

            (<div key={"1"}  className="w-full flex flex-row-3 gap-x-5 mt-5">
                {/*Current Addresse*/}
                <Card className={"min-w-80 w-auto max-w-lg h-auto border-gray-300   p-5 pb-0"}>

                    <div className="">
                        <Typography fontWeight={"bold"} variant={"h6"} className={"font-bold"}>
                            Addresse
                        </Typography>
                    </div>

                    <div className="mt-5 mb-5">
                        <div className="">
                            <Typography fontWeight={"bold"} variant={"body2"} className={"mt-8"}>
                                First & Last Name
                            </Typography>
                        </div>

                        <div className="">
                            <Typography variant={"body2"} className={"mb-8"}>
                                Street and House number
                            </Typography>
                        </div>

                        <div className="">
                            <Typography variant={"body2"} className={"mb-8"}>
                                City , PLZ
                            </Typography>
                        </div>

                        <div className="">
                            <Typography variant={"body2"} className={"mb-8"}>
                                Country
                            </Typography>
                        </div>

                        <div className="">
                            <Typography variant={"body2"} className={"mb-8"}>
                                Phone Number
                            </Typography>
                        </div>
                    </div>

                    <div
                        onClick={() => {
                        }}
                        className="font-bold cursor-pointer flex items-center mb-5 ">
                        <Typography fontWeight={"bold"} variant={"body2"}>
                            bearbeiten
                        </Typography>
                    </div>
                </Card>
                {/*Add Adresse*/}
                <Card className={"max-w-xs border-gray-300 grid grid-rows-2  p-5 pb-0"}>

                    <div className="">
                        <Typography fontWeight={"bold"} variant={"h6"} className={"font-bold"}>
                            Neue Adresse/DHL Packstation
                        </Typography>
                    </div>


                    <div
                        onClick={() => {
                        }}
                        className="font-bold cursor-pointer flex  items-end mb-5 ">
                        <Typography fontWeight={"bold"} variant={"body2"}>
                            bearbeiten
                        </Typography>
                    </div>
                </Card>


            </div>),

            (<div key={"2"} className="w-full mt-5">
                <div className="flex mb-5">

                    <img className="mr-2" color={"blue"} src={ICONS.info_Icon}/>
                    <Typography variant={"body2"}>
                        Aktuell wird hier nur deine zuletzt verwendete Kreditkarte angezeigt, falls du diese beim
                        Zahlungsvorgang verwendet hast.
                    </Typography>
                </div>
                {/*Add Adresse*/}
                <Card className={"max-w-xs border-gray-300 grid grid-rows-2  p-5"}>

                    <div className={"shadow-none border-none p-0 m-0"}>
                        <Typography  fontWeight={"bold"}  variant={"body1"}>
                            Weitere Zahlungsmethoden
                        </Typography>
                    </div>

                    <div>
                        <Typography variant={"body2"}>
                            Neue Zahlungsmethoden können beim nächsten Einkauf im Bestellprozess hinzugefügt werden.
                        </Typography>
                    </div>
                </Card>


            </div>),

            (<div key={"tabs"}></div>),
        ];




    const data = {
        tab_headers : headers,
        tabs_content : content,
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

                    {user && data.tabs_content ? (data.tabs_content.map((v,i)=>{
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
/*
const TabContent = ({data,activatedTab, isLoading, user}:{activatedTab:number, isLoading:boolean, user:any}) => {
    let tabs:JSX.Element[] = [];
    if(user) {
        const createdAt = new Date(user.createdAt);
        tabs = [
            (<div className="w-full grid grid-cols-3 gap-x-0 gap-y-10 mt-5">
                {/!*Persönliche Daten*!/}
                <Card className={"max-w-xs border-gray-300 grid grid-rows-3  p-5 pb-0"}>

                    <div className="">
                        <Typography fontWeight={"bold"} variant={"h6"} className={"font-bold"}>
                            Persönliche Daten
                        </Typography>
                    </div>

                    <div className="">
                        <div className="">
                            <Typography fontWeight={"bold"} variant={"body2"} className={"mt-8"}>
                                {user.name.first} {user.name.last}
                            </Typography>
                        </div>

                        <div className="">
                            <Typography variant={"body2"} className={"mb-8"}>
                                {user.birthDate}
                            </Typography>
                        </div>
                    </div>

                    <div
                        onClick={() => {
                        }}
                        className="font-bold cursor-pointer flex items-center ">
                        <Typography fontWeight={"bold"} variant={"body2"}>
                            bearbeiten
                        </Typography>
                    </div>
                </Card>
                {/!*Email*!/}
                <Card className={"max-w-xs border-gray-300 grid grid-rows-3  p-5 pb-0"}>

                    <div className="">
                        <Typography fontWeight={"bold"} variant={"h6"} className={"font-bold"}>
                            Email
                        </Typography>
                    </div>

                    <div className="">
                        <div className="">
                            <Typography fontWeight={"bold"} variant={"body2"} className={"mt-8"}>
                                {user.email}
                            </Typography>
                        </div>
                    </div>

                    <div
                        onClick={() => {
                        }}
                        className="font-bold cursor-pointer flex items-center ">
                        <Typography fontWeight={"bold"} variant={"body2"}>
                            bearbeiten
                        </Typography>
                    </div>
                </Card>

                {/!*Password*!/}
                <Card className={"max-w-xs border-gray-300 grid grid-rows-3  p-5 pb-0"}>

                    <div className="">
                        <Typography fontWeight={"bold"} variant={"h6"} className={"font-bold"}>
                            Passwort
                        </Typography>
                    </div>

                    <div className="">
                        <div className="">
                            <Typography fontWeight={"bold"} variant={"body2"} className={"mt-8"}>
                                * * * * * * * * *
                            </Typography>
                        </div>
                    </div>

                    <div
                        onClick={() => {
                        }}
                        className="font-bold cursor-pointer flex items-center ">
                        <Typography fontWeight={"bold"} variant={"body2"}>
                            bearbeiten
                        </Typography>
                    </div>
                </Card>
                {/!*MY APP ID*!/}
                <Card className={"max-w-xs h-auto border-gray-300 p-5 pb-0"}>

                    <div className="mb-5">
                        <Typography fontWeight={"bold"} variant={"h6"} className={"font-bold"}>
                            My App
                        </Typography>
                    </div>

                    <div className="mb-5">
                        <div className="mb-5">
                            <Typography fontWeight={"bold"} variant={"body2"} className={"mt-8"}>
                                My App ID
                            </Typography>

                            <Typography variant={"body2"} className={"mb-8"}>
                                {user._id}
                            </Typography>

                        </div>

                        <div>
                            <Typography fontWeight={"bold"} variant={"body2"} className={"mt-8"}>
                                Kunden seit
                            </Typography>

                            <Typography variant={"body2"} className={"mb-8"}>
                                {createdAt.toLocaleDateString()}
                            </Typography>
                        </div>

                    </div>
                </Card>
            </div>),

            (<div className="w-full flex mt-5">
                {/!*Current Addresse*!/}
                <Card className={"max-w-xs border-gray-300  p-5 pb-0 mr-5"}>

                    <div className="">
                        <Typography fontWeight={"bold"} variant={"h6"} className={"font-bold"}>
                            Addresse
                        </Typography>
                    </div>

                    <div className="mt-5 mb-5">
                        <div className="">
                            <Typography fontWeight={"bold"} variant={"body2"} className={"mt-8"}>
                                First & Last Name
                            </Typography>
                        </div>

                        <div className="">
                            <Typography variant={"body2"} className={"mb-8"}>
                                Street and House number
                            </Typography>
                        </div>

                        <div className="">
                            <Typography variant={"body2"} className={"mb-8"}>
                                City , PLZ
                            </Typography>
                        </div>

                        <div className="">
                            <Typography variant={"body2"} className={"mb-8"}>
                                Country
                            </Typography>
                        </div>

                        <div className="">
                            <Typography variant={"body2"} className={"mb-8"}>
                                Phone Number
                            </Typography>
                        </div>
                    </div>

                    <div
                        onClick={() => {
                        }}
                        className="font-bold cursor-pointer flex items-center mb-5 ">
                        <Typography fontWeight={"bold"} variant={"body2"}>
                            bearbeiten
                        </Typography>
                    </div>
                </Card>
                {/!*Add Adresse*!/}
                <Card className={"max-w-xs border-gray-300 grid grid-rows-2  p-5 pb-0"}>

                    <div className="">
                        <Typography fontWeight={"bold"} variant={"h6"} className={"font-bold"}>
                            Neue Adresse/DHL Packstation
                        </Typography>
                    </div>


                    <div
                        onClick={() => {
                        }}
                        className="font-bold cursor-pointer flex  items-end mb-5 ">
                        <Typography fontWeight={"bold"} variant={"body2"}>
                            bearbeiten
                        </Typography>
                    </div>
                </Card>


            </div>),

            (<div className="w-full mt-5">
                <div className="flex mb-5">

                    <img className="mr-2" color={"blue"} src={ICONS.info_Icon}/>
                    <Typography variant={"body2"}>
                        Aktuell wird hier nur deine zuletzt verwendete Kreditkarte angezeigt, falls du diese beim
                        Zahlungsvorgang verwendet hast.
                    </Typography>
                </div>
                {/!*Add Adresse*!/}
                <Card className={"max-w-xs border-gray-300 grid grid-rows-2  p-5"}>

                    <CardHeader className={"p-0 m-0"}>
                        <Typography variant={"body1"}>
                            Weitere Zahlungsmethoden
                        </Typography>
                    </CardHeader>

                    <CardBody>
                        <Typography variant={"body2"}>
                            Neue Zahlungsmethoden können beim nächsten Einkauf im Bestellprozess hinzugefügt werden.
                        </Typography>
                    </CardBody>
                </Card>


            </div>)


        ]
    }






    return(
        isLoading ? (<div className={`fixed inset-0 w-full h-full z-50 bg-teal-50 opacity-40 flex items-center justify-center`}>
            <span className="loading loading-ring loading-lg w-25 h-25 bg-red-500 text-black"></span>
        </div>) : (tabs[activatedTab])
    )
}
*/


//Fetch the user Data


async function delete_user_request (id:ObjectId):Promise<boolean> {
   try {
       const res = await fetch("/api/auth/user/delete_user_request", {
           method: "DELETE",
           headers: {
               "Content-Type": "application/json",
           },
           credentials: "include",
           body: JSON.stringify({user_id: id})
       });

       const {success, message, status} = await res.json();

       return !!success;

   }catch (e){
       console.error(e);
       return false;
   }
}

export default function ClientPage () {
    const navigate = useRouter();
    const [activeStateIndex, setActiveStateIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState<SignupUser | undefined >(undefined);
    const {start:startLoadingPage} = FetchTimeout({setLoading:setIsLoading, delay:3000});

    let createdAt = new Date();

    if(userData && userData.createdAt){
         createdAt = new Date(userData.createdAt);
    }


    //const [page_content, setPage_content] = useState<[]>(undefined);




    useEffect(() => {
        setIsLoading(true);

        const getnow= async ()=>{
            const res = await getUser();
            setUserData(res);
        }
        getnow().then((value)=>{
            console.log("values is here " + JSON.stringify(value));
        });

    /*    getUserData().then((r) => {

            console.log("data is " + (r.name.first));
            startLoadingPage();
            setUserData(r);
        });*/


    }, []);

    return(
       <div className="w-full h-full">
           <div className="relative pl-40 pr-40 pt-10">
               <div className="absolute w-full top-2 left-[5%]">
                   <Breadcrumbs aria-label="breadcrumbs" className="text-gray-500">
                       <Link underline="hover" color="inherit" href="/public">
                           Home
                       </Link>
                       <Link className="select-none" underline="hover" color="inherit">
                           Mein Profil
                       </Link>
                   </Breadcrumbs>
               </div>

               <div className="w-full h-auto mt-10">
                   <div className={"mb-6"}>
                       <Typography variant="h5">
                           My Profile
                       </Typography>
                   </div>

                   <div className={"mb-5"}>
                       <Typography variant="body1" className="text-black">
                           Hier kannst du deine persönlichen Daten ändern oder ergänzen.
                       </Typography>
                   </div>
               </div>

               <Account_Container user={userData}/>
               {/*<NavigationTabs data={data} activatedTab={activeStateIndex} setActivatedTab={setActiveStateIndex}/>*/}
               {/*<TabContent activatedTab={activeStateIndex} isLoading={isLoading} user={userData} />*/}
           </div>

           <div className="w-full h-auto bg-gray-100 mt-10 pl-40 pr-40 pt-10 pb-10">
                <div className="flex flex-col gap-5 mb-10">
                    <Typography fontWeight={"bold"}>
                        Keine Lust mehr auf uns ?
                    </Typography>

                    <Typography variant="body2">
                        Wenn du dein MyTemplate Konto entfernen möchtest, klicke auf den unteren Link. Ein ggf. vorhandenes myTemplate-Profil bleibt weiter bestehen.
                    </Typography>

                    <Typography
                        onClick={()=>{
                            if( userData && userData?._id)
                                delete_user_request(userData?._id).then(()=>navigate.push("/"));
                            else return;
                        }}
                        className="cursor-pointer select-none" variant="body2" fontWeight="bold">
                        Konto Entfernen
                    </Typography>
                </div>

               <div className="flex flex-col gap-5">
                   <Typography fontWeight={"bold"}>
                       Du möchtest deine Daten löschen?
                   </Typography>

                   <Typography variant={"body1"} className="text-wrap">
                       Um deine Daten in unseren Systemen zu löschen, benötigen wir von dir eine eindeutige Mitteilung, dass du die Löschung deiner Daten bei uns wünschst. Dies führt auch zur Löschung eines ggf. vorhandenen myTemplate-Kontos. Du kannst dann auch nicht mehr von den myTemplate-Vorteilen profitieren.
                       Nach erfolgter Rückmeldung löschen wir deine Daten.
                       Sende uns gerne deine Löschanfrage unter Verwendung der von dir bei uns hinterlegten E-Mail-Adresse an {" "}

                    <span className="cursor-pointer underline">
                      datenschutz@myTemplate.de.
                    </span>
                   </Typography>

                   <Typography variant={"body1"} className="text-wrap">
                       Weitere Informationen findest du in unseren {" "}

                       <span className="cursor-pointer underline">
                      Datenschutzbestimmungen.
                    </span>
                   </Typography>


               </div>
           </div>
       </div>
    )
}
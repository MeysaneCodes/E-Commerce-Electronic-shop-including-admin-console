"use client"

import {Button, Typography} from "@material-tailwind/react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';



//ICONS
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import TypeSpecimenOutlinedIcon from '@mui/icons-material/TypeSpecimenOutlined';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';

import BlurOnOutlinedIcon from '@mui/icons-material/BlurOnOutlined';

import {TextField} from "@mui/material";
import Divider from "@mui/material/Divider";
import {useParams, useRouter} from "next/navigation";
import {useEffect, useRef, useState} from "react";
import {
    getAccountStatus,
    getAccountTypeMeta,
    getRoleTypeMeta,
    getUsers
} from "@/lib/api/admin/super_admin/users/users_calls";
import {UserMeta,AccountTypeValues} from "@/types/super_admin_meta/users_meta/type";
import {DropDown_Custom} from "@/components/ui/DropDown";
import {AccountTypeMeta} from "@/types/super_admin_meta/account_type/type";
import {RoleMeta} from "@/types/super_admin_meta/roles_type/type";
import dayjs from "dayjs";




export default function Current_user(){
    const {slug} = useParams<{ slug: string }>();
    const [User, setUser] = useState<UserMeta | undefined>(undefined);

    const [UserDraft, setUserDraft] = useState<UserMeta | undefined>(undefined);
    
    
    const [UserAccountTypeMeta, setUserAccountTypeMeta] = useState<string[] | undefined>(undefined);
    const [UserRoleTypeMeta, setUserRoleTypeMeta] = useState<string[]|undefined>(undefined);
    const [UserAccountStatus, setUserAccountStatus] = useState<string[] | undefined>(undefined);

    const navigate = useRouter();





    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {

        async function fetch_roles (){
            try{
                const acc_type_res = await getAccountTypeMeta();
                const roles = await getRoleTypeMeta({filter:UserDraft?.account_type.toLowerCase()});
                const status = await getAccountStatus();
                setUserAccountTypeMeta(acc_type_res.data.map((e:{name:string},i:number)=>e.name));
                setUserRoleTypeMeta(roles.data.map((e:{name:string},i:number)=>e.name))
                setUserAccountStatus(status.data.map((e:{name:string},i:number)=>e.name)[0]);

                console.log("da", status.data.map((e:{name:string},i:number)=>e.name))
            }catch (e) {
                console.warn(e);
            }finally {
                setIsLoading(false);
            }
            
        }

        if(!UserDraft)return;
        fetch_roles();



    }, [UserDraft]);


        useEffect(() => {
            let active = true;

            async function fetch_users (){

                try {
                    setIsLoading(true);
                    const users_resp = await  getUsers({user_id:slug});
                    setUser(users_resp.data[0]);
                    setUserDraft(users_resp.data[0]);
                    //Get Roles and Permission, Account type and Status.

                    //const roles = await getRoleTypeMeta({filter:User?.account_type});
                    //console.log("acc ty", User?.account_type)
                    //setUserRoleTypeMeta(roles.data.map((e:{name:string},i:number)=>e.name))



                }catch (e){

                }finally {
                   //setIsLoading(false);
                }

            }

            fetch_users();

            return () => {
                active = false;
            };
        }, []);





    return(
        <div>
            {isLoading ?

                <div className={"w-full h-screen flex flex-row gap-8 opacity-30 duration-30 transition-all fade-in"}>
                <div className={"w-full h-full flex flex-col gap-8 "}>
                    <div className={"w-[100%] h-[10%] bg-gray-300  rounded-2xl animate-pulse"}/>
                    <div className={"w-full h-[40%] flex flex-rpw gap-4 "}>
                        <div className={"w-full h-full flex flex-col gap-10"}>
                            <div className={"w-[100%] h-[25%] bg-gray-300  rounded-2xl animate-pulse"}/>
                            <div className={"w-[100%] h-[25%] bg-gray-300  rounded-2xl animate-pulse"}/>
                            <div className={"w-[100%] h-[25%] bg-gray-300  rounded-2xl animate-pulse"}/>
                            <div className={"w-[100%] h-[25%] bg-gray-300  rounded-2xl animate-pulse"}/>
                        </div>
                        <div className={"w-full h-full"}>
                            <div className={"w-[100%] h-[100%] bg-gray-300  rounded-2xl animate-pulse"}/>
                        </div>
                    </div>
                    <div className={"w-[100%] h-[10%] bg-gray-300  rounded-2xl animate-pulse"}/>
                    <div className={"w-[100%] h-[10%] bg-gray-300  rounded-2xl animate-pulse"}/>
                    <div className={"w-[100%] h-[10%] bg-gray-300  rounded-2xl animate-pulse"}/>




                </div>

                <div className={"w-full h-full "}>
                    <div className={"w-[100%] h-[100%] bg-gray-300  rounded-2xl animate-pulse"}/>
                </div>

            </div> : (<div>
                <div className={"p-2 flex justify-between"}>
                    <div className={""}>
                        <Typography variant={"h5"} className={"font-bold mb-2"}>
                            Edit User
                        </Typography>
                        <Typography variant={"small"} className={"text-gray-600"}>
                            Update user information, role, and account settings.
                        </Typography>
                    </div>

                    <div className={"flex items-center"}>
                        <div className={"inline-flex gap-4"}>
                            <Button className={"inline-flex bg-[#ff0000]"}>
                                Save Changes
                            </Button>
                            <Button onClick={()=>navigate.back()} className={"inline-flex"}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>

                <div className={"w-full grid grid-cols-3 gap-4"}>
                    <div className={"flex flex-col gap-4 col-span-2"}>

                        {/*User Info*/}

                        <div className={"w-full flex flex-col p-6 border-2 border-gray-100 rounded-xl gap-8 bg-white"}>

                            {/*title*/}
                            <div className={"w-full inline-flex "}>
                                <Person2OutlinedIcon sx={{
                                    backgroundColor: "ghostwhite",
                                    color: "#ff0000",
                                    borderRadius: "16px",
                                    padding: "4px",
                                    marginRight: "10px"
                                }}/>
                                <Typography variant={"paragraph"} className={"font-semibold"}>
                                    User Information
                                </Typography>
                            </div>

                            {/*Body*/}

                            <div className={"grid grid-cols-3 gap-4 items-start "}>
                                <div className={"flex flex-col gap-4 col-span-1"}>
                                    <Typography className={" text-gray-500 font-semibold"}>
                                        Profile Photo
                                    </Typography>

                                    <div className={"w-full  flex items-center justify-center"}>
                                        <PermIdentityOutlinedIcon sx={{
                                            backgroundColor: "ghostwhite",
                                            borderRadius: "50%",

                                            padding: "4px",
                                            width: "150px",
                                            height: "150px",
                                            color: "#ff0000",
                                        }}/>
                                    </div>

                                    <div className={"inline-flex justify-center"}>
                                        <Button  className={"inline-flex items-center gap-2 bg-white  border-2 border-gray-100 shadow-none hover:shadow-none hover:bg-gray-50"}>
                                            <FileUploadOutlinedIcon sx={{width:"20px", height:"20px" , color:"black"}}/>
                                            <Typography  className={"font-semibold text-black text-[12px]"}>
                                                Upload Image
                                            </Typography>
                                        </Button>
                                    </div>

                                    <Typography variant={"small"} className={"w-full text-center text-gray-500"}>
                                        JPG, PNG up to 2MB
                                    </Typography>
                                </div>
                                <div className={"col-span-2"}>
                                    <div className={"w-full flex flex-row gap-4 "}>
                                        <div className={"w-full flex flex-col gap-4 "}>
                                            <div className={"w-full "}>
                                                <Typography className="mb-2 text-gray-500 font-semibold" variant={"small"}>
                                                    Full Name
                                                </Typography>
                                                <TextField value={UserDraft?.name ?? ""} onChange={(e)=>setUserDraft((prev)=>prev ? {...prev, name:e.target.value}: prev)} className={"w-full"}/>
                                            </div>
                                            <div>
                                                <Typography className="mb-2 text-gray-500 font-semibold" variant={"small"}>
                                                    Phone Number
                                                </Typography>
                                                <TextField value={UserDraft?.phone ?? ""} onChange={(e)=>setUserDraft((prev)=>prev ? {...prev, phone:e.target.value}: prev)} className={"w-full"}/>
                                            </div>
                                        </div>
                                        <div className={"w-full flex flex-col gap-4"}>
                                            <div>
                                                <Typography className="mb-2 text-gray-500 font-semibold" variant={"small"}>
                                                    Email Address
                                                </Typography>
                                                <TextField value={UserDraft?.email ?? ""} onChange={(e)=>setUserDraft((prev)=>prev ? {...prev, email:e.target.value}: prev)} className={"w-full"}/>
                                            </div>
                                            <div>
                                                <Typography className="mb-2 text-gray-500 font-semibold" variant={"small"}>
                                                    Date of Birth
                                                </Typography>
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker label={""} format={"YYYY-MM-DD"} onChange={()=>{}} value={User?.date_of_birth ? dayjs(User.date_of_birth) : null}/>
                                                </LocalizationProvider>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={"w-full mt-4"}>
                                        <Typography className="mb-2 text-gray-500 font-semibold" variant={"small"}>
                                            Bio
                                        </Typography>

                                        <TextField value={UserDraft?.bio ?? ""} onChange={(e)=>setUserDraft((prev)=>prev ? {...prev, email:e.target.value}: prev)}  aria-valuemax={200} rows={4} multiline={true} className={"w-full"}/>
                                    </div>
                                </div>


                            </div>

                        </div>


                        <div className={"w-full flex flex-col p-6 border-2 border-gray-100 rounded-xl gap-8 bg-white"}>

                            {/*title*/}
                            <div className={"w-full inline-flex "}>
                                <LockOutlinedIcon sx={{
                                    backgroundColor: "ghostwhite",
                                    color: "#ff0000",
                                    borderRadius: "16px",
                                    padding: "4px",
                                    marginRight: "10px"
                                }}/>
                                <Typography variant={"paragraph"} className={"font-semibold"}>
                                    Account Details
                                </Typography>
                            </div>

                            {/*Body*/}

                            <div className={"flex flex-row gap-4 items-start "}>
                                <div className={"w-full "}>
                                    <Typography className="mb-2 text-gray-500 font-semibold" variant={"small"}>
                                        Account Type
                                    </Typography>
                                    <DropDown_Custom VariantStyle={"outlined"} onClick={() => {
                                    }} SelectedItem={UserDraft?.account_type ?? ""}
                                                     MenuItems={UserAccountTypeMeta ?? []} input_label={null} />
                                </div>


                                <div className={"w-full "}>
                                    <Typography className="mb-2 text-gray-500 font-semibold" variant={"small"}>
                                        Role
                                    </Typography>
                                    <DropDown_Custom VariantStyle={"outlined"} onClick={() => {
                                    }} SelectedItem={UserDraft?.role ?? ""} MenuItems={UserRoleTypeMeta ?? []}
                                                     input_label={null} />
                                </div>


                                <div className={"w-full "}>
                                    <Typography className="mb-2 text-gray-500 font-semibold" variant={"small"}>
                                        Status
                                    </Typography>
                                    <DropDown_Custom VariantStyle={"outlined"} onClick={() => {
                                    }} SelectedItem={UserDraft?.status ?? ""} MenuItems={UserAccountStatus ?? []}
                                                     input_label={null} />
                                </div>

                            </div>

                            <Button  className={"inline-flex items-center gap-2 bg-[#ff0000]  border-2 border-gray-100 shadow-none hover:shadow-none hover:opacity-80"}>
                                <Typography className={"w-full font-semibold text-white text-[12px] text-center"}>
                                    Send Password Reset Link
                                </Typography>
                            </Button>

                            <div className={"flex flex-row gap-2"}>
                                <InfoOutlinedIcon sx={{
                                    color: "#ff0000",
                                    width: "20px",
                                    height: "20px"

                                }}/>
                                <Typography variant={"small"}>
                                    A secure password reset link will be sent to this user’s registered email address.
                                </Typography>
                            </div>

                        </div>

                        <div className={"w-full flex items-center justify-between p-6 border-2 border-gray-100 rounded-xl gap-8 bg-white"}>

                            <div>

                                {/*title*/}
                                <div className={"w-full flex flex-row gap-2"}>
                                    <div className={"flex items-center"}>
                                        <LockOutlinedIcon sx={{
                                            backgroundColor: "ghostwhite",
                                            color: "#ff0000",
                                            borderRadius: "16px",
                                            padding: "4px",
                                            marginRight: "10px"
                                        }}/>
                                    </div>

                                    <div>
                                        <Typography variant={"paragraph"} className={"font-semibold"}>
                                            Permissions
                                        </Typography>
                                        <Typography variant={"small"} className={""}>
                                            Manage what this user can access and do in the system.
                                        </Typography>
                                    </div>

                                </div>

                            </div>


                            <Button  className={"inline-flex items-center gap-2 bg-white  border-2 border-gray-100 shadow-none hover:shadow-none hover:bg-gray-50"}>
                                <Typography  className={"font-semibold text-[#ff0000] text-[12px]"}>
                                    Manage Permissions
                                </Typography>
                            </Button>

                            {/*Body*/}

                        </div>


                    </div>

                    {/*Summary*/}

                    <div className={"inline-flex flex-col p-6 gap-6 border-2 border-gray-100 rounded-xl bg-white col-span-1"}>
                        {/*title*/}
                        <div className={"w-full inline-flex mb-4 "}>
                            <BlurOnOutlinedIcon sx={{
                                backgroundColor: "ghostwhite",
                                color: "#ff0000",
                                borderRadius: "16px",
                                padding: "4px",
                                marginRight: "10px"
                            }}/>
                            <Typography variant={"paragraph"} className={"font-semibold"}>
                                User Summary
                            </Typography>
                        </div>

                        {/*Body*/}
                        <div className={"w-full flex justify-between"}>
                            <div className={"flex flex-row gap-4 "}>
                                <Person2OutlinedIcon/>

                                <div>
                                    User ID
                                </div>
                            </div>

                            <Typography>
                                {User?._id}
                            </Typography>
                        </div>
                        <Divider/>
                        <div className={"w-full flex justify-between"}>
                            <div className={"flex flex-row gap-4 "}>
                                <DateRangeOutlinedIcon/>

                                <div>
                                    Account Created
                                </div>
                            </div>

                            <Typography>
                                {User?.created_at ? dayjs(User?.created_at).format("YYYY-MM-DD") : null}
                            </Typography>
                        </div>
                        <Divider/>
                        <div className={"w-full flex justify-between"}>
                            <div className={"flex flex-row gap-4 "}>
                                <AccessTimeOutlinedIcon/>

                                <div>
                                    Last Login
                                </div>
                            </div>

                            <Typography>
                                {User?.last_login ? dayjs(User?.last_login).format("YYYY-MM-DD HH:mm") : null}
                            </Typography>
                        </div>
                        <Divider/>
                        <div className={"w-full flex justify-between"}>
                            <div className={"flex flex-row gap-4 "}>
                                <Person2OutlinedIcon/>

                                <div>
                                    Account Type
                                </div>
                            </div>

                            <Typography>
                                {User?.account_type}
                            </Typography>
                        </div>
                        <Divider/>
                        <div className={"w-full flex justify-between"}>
                            <div className={"flex flex-row gap-4 "}>
                                <TypeSpecimenOutlinedIcon/>

                                <div>
                                    Role
                                </div>
                            </div>

                            <Typography>
                                {User?.role}
                            </Typography>
                        </div>
                        <Divider/>
                        <div className={"w-full flex justify-between"}>
                            <div className={"flex flex-row gap-4 "}>
                                <ToggleOnOutlinedIcon/>

                                <div>
                                    Status
                                </div>
                            </div>

                            <div style={{
                                backgroundColor: User?.status == "Active" ?  "#30c48d" : "#ff0000",
                            }} className={" p-2 rounded-2xl"}>
                                <Typography className={"text-white font-semibold"} variant={"small"}>
                                    {User?.status}
                                </Typography>
                            </div>

                        </div>
                        <Divider/>


                        <div className={"w-full flex justify-between"}>
                            <div className={"flex flex-row gap-4 "}>
                                <VerifiedUserOutlinedIcon/>

                                <div>
                                    Email Verified
                                </div>
                            </div>

                            <div className={" p-2 rounded-2xl"} style={{
                                backgroundColor: User?.email_verified?  "#30c48d" : "#FF7518",
                            }}>
                                <Typography variant={"small"} className={"text-white font-semibold"}>
                                    {User?.email_verified ? "Verified" : "Not verified"}
                                </Typography>
                            </div>

                        </div>
                        <Divider/>


                        <div className={"w-full flex justify-between"}>
                            <div className={"flex flex-row gap-4 "}>
                                <DoneAllOutlinedIcon/>

                                <div>
                                    Two-Factor Auth
                                </div>
                            </div>

                            <Typography>
                                {User?.two_factor_enabled ? "Enabled": "Disabled"}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>) }
        </div>
    )
}
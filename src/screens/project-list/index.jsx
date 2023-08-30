import React from "react"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useEffect,useState } from "react"
import { cleanObject } from "utils"
import * as qs from "qs"


const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
    const[list, setList] = useState([])

    const[param, setParam] = useState({
        name:'',
        personId:''
    })

    const [users, setUsers] = useState([])

    //根据输入的参数获取结果列表List
    useEffect(() =>{
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response => {
            if(response.ok){
                setList(await response.json())
            }
        })
    },[param])

    // useEffect(() =>{
    //     fetch(`${apiUrl}/projects?name=${param.name}&personId=${param.personId}`).then(async response => {
    //         if(response.ok){
    //             setList(await response.json())
    //         }
    //     })

    // },[param])

    //获取负责人列表Users
    useEffect(() =>{
        fetch(`${apiUrl}/users`).then(async response => {
            if(response.ok){
                setUsers(await response.json())
            }
        })

    },[])




    
    return <div>
        <SearchPanel users={users} param={param} setParam={setParam} />

        <List users={users} list={list}/>
    </div>
}
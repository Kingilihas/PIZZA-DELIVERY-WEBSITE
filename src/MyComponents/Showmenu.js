import React, { useState, useEffect } from 'react'
import Menu from './Menu';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../CSS/items.css'
const Showmenu = () => {

    const host = "http://localhost:5000"
    const menuintial = []
    const [northmenu, setnorthmenu] = useState(menuintial);
    const [southmenu, setsouthmenu] = useState(menuintial)


    const getmenu = async () => {

        const temp1 = await fetch(`${host}/api/menu/north:1`);
        const temp2 = await fetch(`${host}/api/menu/south:1`);
        const json1 = await temp1.json();
        const json2 = await temp2.json();
        // console.log(json);

        setnorthmenu(json1.data);
        setsouthmenu(json2.data);



    }



    useEffect(() => {
        getmenu()

    }, [])


    // console.log(northmenu);



    return (


        <div className="row my-1 mx-3 items">


            <Menu menu={northmenu} />

        </div>

    )
}

export default Showmenu

import React from 'react'
import Display from './Display'

const Menu = (props) => {
    const { menu } = props
    return (
        menu.map((element) => {

            return (

                <Display key={menu._id} element={element} />
            )
        })
    )
}

export default Menu

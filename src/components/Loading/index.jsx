import React from 'react'
import FontAwesome from 'react-fontawesome'


//试玩内联样式
//内联样式定义
const loading_box={
    textAlign: "center",
}

export default function Loading(props){
    return (
        <div style={loading_box}>
                <FontAwesome size="lg" name='spinner' pulse/>
        </div>
    )
}
import React, { useState, useEffect } from 'react';
import { db } from "./firebase";
import "./Orders.css";
import { useStateValue } from "./StateProvider";
import Order from "./Order.js";

function Orders() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [orders, setOrders] = useState([]);
    
    useEffect(() => {
        if (user){

            db
            .collection('users')
            .doc(user?.uid)
            .colletion('orders')
            .orderBy('created', 'desc')
            .onSnapShot(snapshot => (
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            ))
        } else {
            setOrders([])
        }
    }, [user]);

    return (
        <div className="orders">
            <h1>Your Orders</h1>
            <div className="orders__orderContainer">
                {orders?.map(order => (
                    <Order order={order} />
                ))}
            </div>
        </div>
    )
}

export default Orders

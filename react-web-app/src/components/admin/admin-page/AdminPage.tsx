import React from "react";
import { Outlet } from "react-router-dom";




export default function AdminPage() {
    return (
        <div className="admin-page">
                 <h4>Welcome to the Admin Area</h4>
                 <Outlet />
            </div>
    );
}
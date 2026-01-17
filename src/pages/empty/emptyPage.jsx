import React from "react";
import Header from "../../components/layout/Header.jsx";

export default function EmptyPage() {

    return (
        <>
            <Header title="BeachHouseBooking" />
            <div className="app-layout">
                <main>
                    Welcome
                </main>
            </div>

            <div className="app-manage">
                <button className="btn">Manage</button>
            </div>
        </>
    )
}
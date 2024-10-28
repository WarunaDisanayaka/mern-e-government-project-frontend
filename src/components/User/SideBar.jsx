import React, { useState } from "react";

const SideBar = () => {
    const [style, setStyle] = useState(
        "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    );

    const changeStyle = () => {
        if (
            style == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        ) {
            setStyle(
                "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
            );
        } else {
            setStyle("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
        }
    };

    return (
        <ul className={style} id="accordionSidebar">

            {/*  <!-- Sidebar - Brand --> */}
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="#">

                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle" onClick={changeStyle}></button>
                </div>
            </a>

            {/*  <!-- Nav Item - Dashboard --> */}
            <li className="nav-item active">
                <a className="nav-link" href="/">
                    <i className="fas fa-fw fa-tachometer-alt"></i>
                    <span>Dashboard</span></a>
            </li>

            {/*  <!-- Nav Item - Pages Collapse Menu --> */}
            <li className="nav-item">
                <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseOne"
                    aria-expanded="true" aria-controls="collapseOne">
                    <i class="fas fa-certificate"></i>
                    <span>Request Certifications</span>
                </a>
                <div id="collapseOne" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div className="bg-white py-2 collapse-inner rounded">
                        <a className="collapse-item" href="/request-certificate"> Create Request</a>
                        <a className="collapse-item" href="/my-requests">My Requests</a>
                    </div>
                </div>
            </li>


            {/* <!-- Divider --> */}
            <hr className="sidebar-divider d-none d-md-block" />


        </ul>
    )
}

export default SideBar
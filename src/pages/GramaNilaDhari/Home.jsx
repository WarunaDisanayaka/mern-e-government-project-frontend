import React from 'react'
import SideBar from '../../components/SideBar';
import TopBar from '../../components/TopBar';

const Home = () => {
    return (
        <div>
            <body id="page-top">
                {/*  <!-- Page Wrapper --> */}
                <div id="wrapper">
                    {/*  <!-- Sidebar --> */}
                    <SideBar />
                    {/*  <!-- End of Sidebar --> */}

                    {/*  <!-- Content Wrapper --> */}
                    <div id="content-wrapper" className="d-flex flex-column">
                        {/*  <!-- Main Content --> */}
                        <div id="content">
                            {/*  <!-- Topbar --> */}
                            <TopBar />
                            {/*  <!-- End of Topbar --> */}

                            {/* <!-- Begin Page Content --> */}
                            <div className="container-fluid">
                                {/*  <!-- Page Heading --> */}
                                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                    <h1 className="h3 mb-0 text-gray-800">Home</h1>
                                </div>

                                {/*  <!-- Content Row --> */}
                                <div className="row">
                                    {/*  <!-- Earnings (Monthly) Card Example --> */}
                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-primary shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                            Earnings (Monthly)
                                                        </div>
                                                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                            $40,000
                                                        </div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/*  <!-- Earnings (Monthly) Card Example --> */}
                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-success shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                            Earnings (Annual)
                                                        </div>
                                                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                            $215,000
                                                        </div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/*  <!-- Earnings (Monthly) Card Example --> */}
                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-info shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                            Tasks
                                                        </div>
                                                        <div className="row no-gutters align-items-center">
                                                            <div className="col-auto">
                                                                <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">
                                                                    50%
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                                <div className="progress progress-sm mr-2">
                                                                    <div
                                                                        className="progress-bar bg-info a1"
                                                                        role="progressbar"
                                                                    ></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/*  <!-- Pending Requests Card Example --> */}
                                    <div className="col-xl-3 col-md-6 mb-4">
                                        <div className="card border-left-warning shadow h-100 py-2">
                                            <div className="card-body">
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col mr-2">
                                                        <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                            Pending Requests
                                                        </div>
                                                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                            18
                                                        </div>
                                                    </div>
                                                    <div className="col-auto">
                                                        <i className="fas fa-comments fa-2x text-gray-300"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*   <!-- /.container-fluid --> */}
                        </div>
                        {/*   <!-- End of Main Content -->

                                        <!-- Footer --> */}
                        <footer className="sticky-footer bg-white">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto"></div>
                            </div>
                        </footer>
                        {/* <!-- End of Footer --> */}
                    </div>
                    {/*  <!-- End of Content Wrapper --> */}
                </div>
                {/*  <!-- End of Page Wrapper -->

                                <!-- Scroll to Top Button--> */}
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up"></i>
                </a>

                {/*  <!-- Logout Modal--> */}
                <div
                    className="modal fade"
                    id="logoutModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Ready to Leave?
                                </h5>
                                <button
                                    className="close"
                                    type="button"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Select "Logout" below if you are ready to end your current
                                session.
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    type="button"
                                    data-dismiss="modal"
                                >
                                    Cancel
                                </button>
                                <a className="btn btn-primary" href="login.html">
                                    Logout
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </div>
    )
}

export default Home
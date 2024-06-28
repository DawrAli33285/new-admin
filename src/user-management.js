import "./assets/stylesheets/usermanagment.css";
import React, { useState } from 'react';
import { Table, Pagination, Button, Modal, Form } from 'react-bootstrap';
import { FaCheck, FaTimes, FaEllipsisV, FaEllipsisH } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UserManagement() {
    const data = [
        { id: 1, coachName: 'John Doe', email: 'john@example.com', mobile: '1234567890', position: 'Head Coach', location: 'NY', registrationDate: '2023-06-01', status: 'Active', image: 'https://static.vecteezy.com/system/resources/thumbnails/008/846/297/small_2x/cute-boy-avatar-png.png' },
        { id: 2, coachName: 'Jane Smith', email: 'jane@example.com', mobile: '0987654321', position: 'Assistant Coach', location: 'CA', registrationDate: '2023-05-15', status: 'Pending', image: 'https://static.vecteezy.com/system/resources/thumbnails/008/846/297/small_2x/cute-boy-avatar-png.png' },

    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleEllipsisClick = (row) => {
        setModalContent(row);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setModalContent(null);
    };

    const handleStatusFilter = (status) => {
        setSelectedStatus(status);
        setCurrentPage(1);
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setCurrentPage(1);
    };

    const filteredData = data.filter(row =>
        (selectedStatus === 'All' || row.status === selectedStatus) &&
        (row.coachName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.mobile.includes(searchQuery) ||
            row.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
            row.location.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentRows = filteredData.slice(startIndex, endIndex);

    return (
        <div className="w-full overflow-x-auto p-[20px]">
            <div className="flex lg:flex-row flex-col justify-between py-[21px] px-[24px] bg-[#E9E9E9] rounded-t-[12px] border-t-[1px] border-b-0 ">
                <div className="lg:flex lg:flex-row grid grid-cols-2 lg:mb-0 mb-[10px] items-center gap-[12px]">
                    <p className="text-[18px] font-[500] m-0">Coaches list</p>
                    <span
                        className={`py-[9px] px-[22px] rounded-[10px] ${selectedStatus === 'All' ? 'bg-[#F33] text-white' : 'bg-white'} hover:cursor-pointer flex justify-center items-center`}
                        onClick={() => handleStatusFilter('All')}
                    >
                        All
                    </span>
                    <span
                        className={`py-[9px] px-[22px] rounded-[10px] ${selectedStatus === 'Pending' ? 'bg-[#F33] text-white' : 'bg-white'} hover:cursor-pointer flex justify-center items-center`}
                        onClick={() => handleStatusFilter('Pending')}
                    >
                        Pending
                    </span>
                    <span
                        className={`py-[9px] px-[22px] rounded-[10px] ${selectedStatus === 'Active' ? 'bg-[#F33] text-white' : 'bg-white'} hover:cursor-pointer flex justify-center items-center`}
                        onClick={() => handleStatusFilter('Active')}
                    >
                        Active
                    </span>
                </div>
                <div className="flex lg:flex-row flex-col items-center gap-[20px]">
                    <Form.Control
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-[200px]"
                    />
                    <Form.Select value={rowsPerPage} onChange={handleRowsPerPageChange} className="w-[100px]">
                        <option value={5}>Show 5</option>
                        <option value={10}>Show 10</option>
                        <option value={20}>Show 20</option>
                        <option value={30}>Show 30</option>
                    </Form.Select>
                </div>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="text-left text-[16px] font-normal font-sfPro">S-No</th>
                        <th className="text-left text-[16px] font-normal font-sfPro">Coach Name</th>
                        <th className="text-left text-[16px] font-normal font-sfPro">Email</th>
                        <th className="text-left text-[16px] font-normal font-sfPro">Mobile Number</th>
                        <th className="text-left text-[16px] font-normal font-sfPro">Position</th>
                        <th className="text-left text-[16px] font-normal font-sfPro">Location</th>
                        <th className="text-left text-[16px] font-normal font-sfPro">Registration Date</th>
                        <th className="text-left text-[16px] font-normal font-sfPro">Status</th>
                        <th className="text-left text-[16px] font-normal font-sfPro">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRows.map((row, index) => (
                        <tr key={row.id} className={index % 2 === 0 ? 'bg-[#F8FAFC]' : ''}>
                            <td className="text-center">{startIndex + index + 1}</td>
                            <td className="text-[14px] font-sfPro text-center flex items-center">
                                <img src={row.image} className="m-0 w-[37px] h-[37px] rounded-[100%] lg:block hidden" />
                                {row.coachName}
                            </td>
                            <td className="text-[14px] font-sfPro text-center">{row.email}</td>
                            <td className="text-[14px] font-sfPro text-center">{row.mobile}</td>
                            <td className="text-[14px] font-sfPro text-center">{row.position}</td>
                            <td className="text-[14px] font-sfPro text-center">{row.location}</td>
                            <td className="text-[14px] font-sfPro text-center">{row.registrationDate}</td>
                            <td className="text-[14px] font-sfPro text-center">{row.status}</td>
                            <td className="text-[14px] font-sfPro text-center">
                                {row.status === 'Pending' ? (
                                    <span className="flex items-center justify-between w-full">
                                        <span className="hover:cursor-pointer rounded-[100%] w-[30px] flex m-0 items-center bg-[#F33] h-[30px] justify-center">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M16.334 2.75H7.665C4.644 2.75 2.75 4.889 2.75 7.916V16.084C2.75 19.111 4.635 21.25 7.665 21.25H16.333C19.364 21.25 21.25 19.111 21.25 16.084V7.916C21.25 4.889 19.364 2.75 16.334 2.75Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M8.43945 12L10.8135 14.373L15.5595 9.62695" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                        <span className="hover:cursor-pointer bg-white rounded-[100%] w-[30px] flex m-0 items-center h-[30px] justify-center">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.3955 9.59375L9.60352 14.3857" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M14.3976 14.3888L9.60156 9.5918" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M16.335 2.75H7.66598C4.64498 2.75 2.75098 4.889 2.75098 7.916V16.084C2.75098 19.111 4.63598 21.25 7.66598 21.25H16.334C19.365 21.25 21.251 19.111 21.251 16.084V7.916C21.251 4.889 19.365 2.75 16.335 2.75Z" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                    </span>
                                ) : row.status === 'Active' ? (
                                    <span className="flex w-full justify-center items-center mt-[6px] hover:cursor-pointer" onClick={() => handleEllipsisClick(row)}><FaEllipsisH /></span>
                                ) : null}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination className="justify-content-end">
                <Pagination.Prev onClick={handlePrevPage} disabled={currentPage === 1} />
                <Pagination.Item>{currentPage}</Pagination.Item>
                <Pagination.Next onClick={handleNextPage} disabled={endIndex >= filteredData.length} />
            </Pagination>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalContent && (
                        <>
                            <p><strong>Coach Name:</strong> {modalContent.coachName}</p>
                            <p><strong>Email:</strong> {modalContent.email}</p>
                            <p><strong>Mobile Number:</strong> {modalContent.mobile}</p>
                            <p><strong>Position:</strong> {modalContent.position}</p>
                            <p><strong>Location:</strong> {modalContent.location}</p>
                            <p><strong>Registration Date:</strong> {modalContent.registrationDate}</p>
                            <p><strong>Status:</strong> {modalContent.status}</p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

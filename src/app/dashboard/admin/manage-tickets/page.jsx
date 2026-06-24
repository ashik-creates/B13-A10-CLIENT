import ManageTicketsTable from '@/components/admin/ManageTicketsTable';
import { getAllTicketsForAdmin } from '@/lib/api/ticket';
import React from 'react';

const ManageTicketPage = async() => {
    const tickets = await getAllTicketsForAdmin();
    return (
        <div className='my-5'>
           <ManageTicketsTable tickets={tickets} /> 
        </div>
    );
};

export default ManageTicketPage;
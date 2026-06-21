import ManageUsersTable from '@/components/admin/ManageUsersTable';
import { getAllUsers } from '@/lib/api/user';

const ManageUsersPage = async() => {
    const users = await getAllUsers();
    return (
        <div>
           <ManageUsersTable users={users} /> 
        </div>
    );
};

export default ManageUsersPage;
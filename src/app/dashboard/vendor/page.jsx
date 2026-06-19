import ProfileCard from '@/components/shared/ProfileCard';
import { getUserSession } from '@/lib/getSession';

const DashBoardVendorPage = async() => {
     const user = await getUserSession()
    return (
        <div className='my-10 mx-2'>
            <ProfileCard user={user}></ProfileCard>
        </div>
    );
};

export default DashBoardVendorPage;
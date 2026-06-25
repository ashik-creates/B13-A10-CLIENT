import DashboardSidebar from "@/components/dashboard/DashboardSidebar";


const layout = ({children}) => {
    return (
        <div className="flex md:flex-row flex-col gap-4">
            <DashboardSidebar></DashboardSidebar>
            <div className="flex-1">{children}</div>
        </div>
    );
};

export default layout;
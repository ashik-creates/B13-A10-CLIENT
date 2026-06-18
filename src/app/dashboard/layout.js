import DashboardSidebar from "@/components/dashbaoard/DashboardSidebar";

const layout = ({children}) => {
    return (
        <div className="flex gap-2">
            <DashboardSidebar></DashboardSidebar>
            <div className="flex-1">{children}</div>
        </div>
    );
};

export default layout;
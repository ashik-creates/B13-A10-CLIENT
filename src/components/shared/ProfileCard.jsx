import { Avatar, Card, Chip } from "@heroui/react";
import { MdEmail } from "react-icons/md";
import { FaUserTie } from "react-icons/fa";

const ProfileCard = ({ user }) => {
  return (
    <Card className="overflow-hidden border border-divider bg-content1">
      <div className="h-24 bg-linear-to-r from-[#9C27B0] via-[#E91E63] to-[#FF3B30]" />

      <div className="px-6 pb-6">
        <div className="-mt-12 flex flex-col items-center">
          <Avatar className="relative h-25 w-25 overflow-hidden rounded-full border-4 border-background">
            <Avatar.Image src={user?.image} alt={user?.name} />
            <Avatar.Fallback>{user?.name?.charAt(0)}</Avatar.Fallback>
          </Avatar>

          <h2 className="mt-4 text-2xl font-bold">{user?.name}</h2>

          <p className="text-sm text-default-500">{user?.email}</p>

          <Chip variant="flat" color="secondary" className="mt-3 capitalize">
            {user?.role || "Vendor"}
          </Chip>
        </div>

        <div className="mt-8 space-y-3">
          <div className="flex items-center gap-3 rounded-xl bg-default-100 p-4">
            <FaUserTie size={18} className="text-[#9C27B0]" />

            <div>
              <p className="text-xs text-default-500">Account Type</p>
              <p className="font-medium capitalize">{user?.role || "Vendor"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-default-100 p-4">
            <MdEmail size={18} className="text-[#9C27B0]" />

            <div className="min-w-0 flex-1">
              <p className="text-xs text-default-500">Email Address</p>
              <p className="truncate font-medium">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;

"use client";

import { useState } from "react";
import {
  Modal,
  Button,
  Input,
  Select,
  Checkbox,
  Label,
  TextField,
  FieldError,
  ListBox,
  Form,
} from "@heroui/react";
import toast from "react-hot-toast";
import { FaCloudUploadAlt, FaPlus } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { imageUpload } from "@/lib/imageUpload";
import { updateTicket } from "@/lib/action/ticket";
import { useRouter } from "next/navigation";

const UpdateTicketModal = ({ ticket, isRejected }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const user = authClient.useSession()?.data?.user;

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "";
    try {
      return new Date(dateTimeString).toISOString().slice(0, 16);
    } catch (e) {
      return "";
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(file.name);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    data.perks = formData.getAll("perks");

    const image = await imageUpload(imageFile);

    data.image = imageFile ? image.url : ticket?.image;

    const res = await updateTicket(ticket._id, data);

    setIsLoading(false);

    if (res.modifiedCount > 0) {
      toast.success("Ticket updated successfully");
      setOpen(false);
      router.refresh();
    } else {
      toast.error(res.message || "Failed to update ticket. Please try again.");
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setOpen}>
      <Button
        onClick={() => setOpen(true)}
        className="flex-1 bg-linear-to-r from-[#9C27B0] to-[#E91E63] text-white rounded-md animate-none"
        isDisabled={isRejected}
      >
        Update
      </Button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="max-w-2xl">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>Update Ticket</Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <Form onSubmit={handleUpdate} className="flex flex-col gap-5">
                <TextField
                  isRequired
                  name="title"
                  defaultValue={ticket?.title}
                  className="flex flex-col gap-1.5 w-full"
                >
                  <Label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Ticket Title
                  </Label>
                  <Input
                    placeholder="e.g., Dhaka to Cox's Bazar Express"
                    className="w-full h-11 px-3.5 rounded-xl border border-divider bg-background/50 placeholder-muted-foreground focus:outline-none focus:border-[#9C27B0] transition-all duration-200"
                  />
                  <FieldError className="text-xs text-danger font-medium mt-0.5" />
                </TextField>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 w-full">
                  <TextField
                    isRequired
                    name="from"
                    defaultValue={ticket?.from}
                    className="flex flex-col gap-1.5 w-full"
                  >
                    <Label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      From (Location)
                    </Label>
                    <Input
                      placeholder="Starting point"
                      className="w-full h-11 px-3.5 rounded-xl border border-divider bg-background/50 placeholder-muted-foreground focus:outline-none focus:border-[#9C27B0] transition-all duration-200"
                    />
                    <FieldError className="text-xs text-danger font-medium mt-0.5" />
                  </TextField>

                  <TextField
                    isRequired
                    name="to"
                    defaultValue={ticket?.to}
                    className="flex flex-col gap-1.5 w-full"
                  >
                    <Label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      To (Location)
                    </Label>
                    <Input
                      placeholder="Destination"
                      className="w-full h-11 px-3.5 rounded-xl border border-divider bg-background/50 placeholder-muted-foreground focus:outline-none focus:border-[#9C27B0] transition-all duration-200"
                    />
                    <FieldError className="text-xs text-danger font-medium mt-0.5" />
                  </TextField>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 w-full items-start">
                  <Select
                    isRequired
                    name="transportType"
                    defaultSelectedKey={ticket?.transportType}
                    className="flex flex-col gap-1.5 w-full"
                  >
                    <Label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Transport Type
                    </Label>
                    <Select.Trigger className="flex items-center justify-between w-full h-11 px-3.5 rounded-xl border border-divider bg-background/50 text-sm text-left focus:outline-none focus:border-[#9C27B0] transition-all duration-200">
                      <Select.Value placeholder="Select type" />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover className="border border-divider bg-background rounded-xl shadow-xl overflow-hidden mt-1">
                      <ListBox className="p-1.5 flex flex-col gap-0.5">
                        {[
                          { key: "bus", label: "Bus" },
                          { key: "train", label: "Train" },
                          { key: "plane", label: "Plane" },
                          { key: "ship", label: "Ship" },
                        ].map((item) => (
                          <ListBox.Item
                            key={item.key}
                            id={item.key}
                            textValue={item.label}
                            className="flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors hover:bg-default-100 data-[selected=true]:bg-[#9C27B0]/10 data-[selected=true]:text-[#9C27B0]"
                          >
                            <Label className="font-medium cursor-pointer">
                              {item.label}
                            </Label>
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                    <FieldError className="text-xs text-danger font-medium mt-0.5" />
                  </Select>

                  <TextField
                    isRequired
                    name="price"
                    defaultValue={ticket?.price?.toString()}
                    className="flex flex-col gap-1.5 w-full"
                  >
                    <Label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Price (per unit)
                    </Label>
                    <div className="relative flex items-center w-full">
                      <span className="absolute left-3.5 text-sm text-muted-foreground">
                        ৳
                      </span>
                      <Input
                        type="number"
                        placeholder="0.00"
                        className="w-full h-11 pl-8 pr-3.5 rounded-xl border border-divider bg-background/50 placeholder-muted-foreground focus:outline-none focus:border-[#9C27B0] transition-all duration-200"
                      />
                    </div>
                    <FieldError className="text-xs text-danger font-medium mt-0.5" />
                  </TextField>

                  <TextField
                    isRequired
                    name="quantity"
                    defaultValue={ticket?.quantity?.toString()}
                    className="flex flex-col gap-1.5 w-full"
                  >
                    <Label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Ticket Quantity
                    </Label>
                    <Input
                      type="number"
                      placeholder="Available seats"
                      className="w-full h-11 px-3.5 rounded-xl border border-divider bg-background/50 placeholder-muted-foreground focus:outline-none focus:border-[#9C27B0] transition-all duration-200"
                    />
                    <FieldError className="text-xs text-danger font-medium mt-0.5" />
                  </TextField>
                </div>

                <TextField
                  isRequired
                  name="departureDateTime"
                  defaultValue={formatDateTime(ticket?.departureDateTime)}
                  className="flex flex-col gap-1.5 w-full"
                >
                  <Label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Departure Date & Time
                  </Label>
                  <Input
                    type="datetime-local"
                    className="w-full h-11 px-3.5 rounded-xl border border-divider bg-background/50 text-muted-foreground focus:outline-none focus:border-[#9C27B0] transition-all duration-200"
                  />
                  <FieldError className="text-xs text-danger font-medium mt-0.5" />
                </TextField>

                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Perks Available
                  </Label>

                  <div className="flex flex-wrap gap-2">
                    {["AC", "Breakfast", "Wifi", "Blanket", "Charging"].map(
                      (perk) => (
                        <label
                          key={perk}
                          htmlFor={`perk-${perk}`}
                          className="flex items-center gap-2 px-4 py-2 rounded-full border border-divider bg-background text-sm transition-all duration-200 cursor-pointer hover:border-default-300 hover:bg-default-50 has-[:checked]:border-[#534AB7]"
                        >
                          <Checkbox
                            id={`perk-${perk}`}
                            name="perks"
                            value={perk}
                            defaultSelected={ticket?.perks?.includes(perk)}
                            className="flex flex-row items-center gap-2"
                          >
                            <Checkbox.Control>
                              <Checkbox.Indicator>
                                {({ isSelected }) => (
                                  <div
                                    className={`w-2 h-2 rounded-full transition-all ${
                                      isSelected
                                        ? "bg-[#534AB7]"
                                        : "bg-default-300"
                                    }`}
                                  />
                                )}
                              </Checkbox.Indicator>
                            </Checkbox.Control>
                            <Checkbox.Content>
                              <Label
                                htmlFor={`perk-${perk}`}
                                className="cursor-pointer text-sm font-medium text-foreground"
                              >
                                {perk}
                              </Label>
                            </Checkbox.Content>
                          </Checkbox>
                        </label>
                      ),
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <Label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Upload Image
                  </Label>
                  <label className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-divider bg-background/50 border-dashed transition-all duration-200 hover:border-[#9C27B0] hover:bg-default-50">
                    <div className="flex flex-col items-center justify-center gap-1 text-center">
                      <FaCloudUploadAlt
                        size={24}
                        className="text-muted-foreground"
                      />
                      <p className="text-sm font-medium text-foreground">
                        {imagePreview
                          ? imagePreview
                          : "Click to select or drag ticket asset"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG, or WEBP formats
                      </p>
                    </div>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-4 border-t border-divider pt-6 md:grid-cols-2 w-full">
                  <TextField
                    isReadOnly
                    className="flex flex-col gap-1.5 w-full opacity-80"
                  >
                    <Label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Vendor Name
                    </Label>
                    <Input
                      value={user?.name || ""}
                      className="w-full h-11 px-3.5 rounded-xl border border-divider bg-default-100/70 text-muted-foreground pointer-events-none"
                    />
                  </TextField>

                  <TextField
                    isReadOnly
                    className="flex flex-col gap-1.5 w-full opacity-80"
                  >
                    <Label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                      Vendor Email
                    </Label>
                    <Input
                      value={user?.email || ""}
                      className="w-full h-11 px-3.5 rounded-xl border border-divider bg-default-100/70 text-muted-foreground pointer-events-none"
                    />
                  </TextField>
                </div>

                <Button
                  type="submit"
                  isDisabled={isLoading}
                  className="w-full h-11 text-sm font-semibold text-white bg-linear-to-r from-[#9C27B0] to-[#E91E63] shadow-lg shadow-purple-500/20 rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2 mt-4"
                >
                  {!isLoading && <FaPlus size={14} />}
                  {isLoading ? "Updating Ticket..." : "Update Ticket"}
                </Button>
              </Form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default UpdateTicketModal;

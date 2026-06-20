"use client";

import { addTicket } from "@/lib/action/ticket";
import { authClient } from "@/lib/auth-client";
import { imageUpload } from "@/lib/imageUpload";
import {
  Button,
  Card,
  Form,
  TextField,
  Label,
  Input,
  Select,
  ListBox,
  Checkbox,
  FieldError,
} from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCloudUploadAlt, FaPlus, FaCheck } from "react-icons/fa";

const AddTicketPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    data.perks = formData.getAll("perks");
    data.quantity = Number(data.quantity);
    data.price = Number(data.price);

    if(!imageFile) {
      toast.error("Please upload an image for the ticket.");
      setIsLoading(false);
      return;
    }

    const image = await imageUpload(data.image);

    const ticket = {
      ...data,
      image: image?.url,
      status: "pending",
      vendorId: user.id,
    };
    const resData = await addTicket(ticket);
    setIsLoading(false);

    if (resData.insertedId) {
      toast.success("Ticket added successfully");
      router.push("/dashboard/vendor/my-added-tickets");
    }
  };

  if (isPending) {
    return (
      <div className="flex h-96 items-center justify-center text-sm font-medium">
        Loading Vendor Context...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Card className="border border-divider bg-background p-6 shadow-md md:p-8">
        <div className="mb-6">
          <h1 className="font-serif text-2xl font-bold tracking-tight text-foreground">
            Add New Ticket
          </h1>
          <p className="text-sm text-muted-foreground">
            Fill out the details below to list a new travel ticket route.
          </p>
        </div>

        <Form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <TextField
            isRequired
            name="title"
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
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-divider bg-background text-sm transition-all duration-200 cursor-pointer hover:border-default-300 hover:bg-default-50  has-[:checked]:border-[#534AB7]"
                  >
                    <Checkbox
                      id={`perk-${perk}`}
                      name="perks"
                      value={perk}
                      className="flex flex-row items-center gap-2"
                    >
                      <Checkbox.Control>
                        <Checkbox.Indicator>
                          {({ isSelected }) => (
                            <div
                              className={`w-2 h-2 rounded-full transition-all ${
                                isSelected ? "bg-[#534AB7]" : "bg-default-300"
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
                <FaCloudUploadAlt size={24} className="text-muted-foreground" />
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
            {isLoading ? "Publishing Ticket..." : "Add Ticket"}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default AddTicketPage;
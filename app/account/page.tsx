"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import Navbar from "../components/pashm-navbar/Navbar";

type Tab = "orders" | "info" | "address";
type OrderStatus = "depart" | "shipped" | "delivered";

interface OrderItem {
  id: string;
  title: string;
  price: number;
  qty: number;
  address: string;
  image: string;
  status: OrderStatus;
  statusLabel: string;
}

const ORDERS: OrderItem[] = [
  {
    id: "1",
    title: "Saffron Oil",
    price: 6500,
    qty: 4,
    address: "Lorem Ipsum seit utsi, 500471",
    image: "/assets/products/saronoil.png",
    status: "delivered",
    statusLabel: "DELIVERED",
  },
  {
    id: "2",
    title: "Saffron Oil",
    price: 6500,
    qty: 4,
    address: "Lorem Ipsum seit utsi, 500471",
    image: "/assets/products/saronoil.png",
    status: "shipped",
    statusLabel: "IN SHIPPING",
  },
];

function formatINR(n: number) {
  return `RS. ${n.toLocaleString("en-IN")}`;
}

type AccountForm = {
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;

  firstName: string;
  lastName: string;
  phone: string;
  address: string;

  city: string;
  state: string;
  pincode: string;
  country: string;
};

const INITIAL_FORM: AccountForm = {
  email: "youremail@gmail.com",
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",

  firstName: "",
  lastName: "",
  phone: "",
  address: "",

  city: "",
  state: "",
  pincode: "",
  country: "India",
};

import { useToast } from "../../context/ToastContext";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>("orders");
  const [mobileOrdersOpen, setMobileOrdersOpen] = useState(true);
  const [mobileInfoOpen, setMobileInfoOpen] = useState(true);
  const [mobileAddressOpen, setMobileAddressOpen] = useState(false);

  // local “functional” state for Account Info
  const [form, setForm] = useState<AccountForm>(INITIAL_FORM);
  const [isEditingLogin, setIsEditingLogin] = useState(false);
  const [isEditingPersonal, setIsEditingPersonal] = useState(true);
  const [isEditingAddress, setIsEditingAddress] = useState(true);

  const { showToast } = useToast();

  const saveLogin = () => {
    if (!form.email.trim()) return showToast("Please enter your email.");
    if (!form.currentPassword.trim()) return showToast("Enter current password.");
    if (form.newPassword.length < 8) return showToast("New password must be 8+ chars.");
    if (form.newPassword !== form.confirmPassword) return showToast("Passwords do not match.");

    // TODO: connect your API here
    setForm((p) => ({ ...p, currentPassword: "", newPassword: "", confirmPassword: "" }));
    setIsEditingLogin(false);
    showToast("Login info saved.");
  };

  const savePersonal = () => {
    if (!form.firstName.trim()) return showToast("First name is required.");
    if (!form.lastName.trim()) return showToast("Last name is required.");
    if (!form.phone.trim()) return showToast("Phone number is required.");
    showToast("Personal info saved.");
    setIsEditingPersonal(false);
  };

  const saveAddress = () => {
    if (!form.address.trim()) return showToast("Address is required.");
    if (!form.city.trim()) return showToast("City is required.");
    if (!form.state.trim()) return showToast("State is required.");
    if (!form.pincode.trim()) return showToast("Pincode is required.");
    showToast("Address saved.");
    setIsEditingAddress(false);
  };

  const resetAll = () => {
    setForm(INITIAL_FORM);
    setIsEditingLogin(false);
    setIsEditingPersonal(true);
    setIsEditingAddress(true);
    showToast("Changes discarded.");
  };

  return (
    <section className="min-h-screen bg-[#F6F1E6]">
      <Navbar />

      <div className="mx-auto w-full max-w-[1180px] px-4 pb-24 pt-40 sm:px-6 lg:px-8 lg:pt-56">
        <div className="flex items-end justify-between gap-6">
          <h1 className="font-serif text-[35px] leading-none text-[#12385C]">
            Account
          </h1>
        </div>

        <div className="mt-8 h-px w-full bg-black/10" />

        <div className="mt-12 lg:grid lg:grid-cols-[250px_1fr] lg:gap-16">
          {/* LEFT NAV (desktop) */}
          <aside className="hidden lg:flex flex-col justify-between">
            <nav className="space-y-12">
              <button
                onClick={() => setActiveTab("orders")}
                className={`block text-left text-[18px] font-medium uppercase transition-colors ${
                  activeTab === "orders"
                    ? "text-[#12385C]"
                    : "text-[#12385C]/40 hover:text-[#12385C]/70"
                }`}
              >
                Order History
              </button>
              <button
                onClick={() => setActiveTab("info")}
                className={`block text-left text-[18px] font-medium uppercase transition-colors ${
                  activeTab === "info"
                    ? "text-[#12385C]"
                    : "text-[#12385C]/40 hover:text-[#12385C]/70"
                }`}
              >
                Account Information
              </button>
              <button
                onClick={() => setActiveTab("address")}
                className={`block text-left text-[18px] font-medium uppercase transition-colors ${
                  activeTab === "address"
                    ? "text-[#12385C]"
                    : "text-[#12385C]/40 hover:text-[#12385C]/70"
                }`}
              >
                Address
              </button>
            </nav>

            <button className="mt-20 block py-4 text-left text-[12px] font-bold uppercase tracking-widest text-[#2E3A43]/60 underline underline-offset-4 decoration-[#2E3A43]/20 transition-colors hover:text-[#12385C]">
              Log Out
            </button>
          </aside>

          {/* CONTENT */}
          <main className="lg:border-l lg:border-black/5 lg:pl-16">
            {/* MOBILE: accordions */}
            <div className="lg:hidden space-y-4">
              {/* Order History */}
              <div className="overflow-hidden rounded-[2px] border border-black/5 bg-[#FAF7F0]">
                <button
                  onClick={() => setMobileOrdersOpen(!mobileOrdersOpen)}
                  className="flex w-full items-center justify-between px-6 py-6 text-[14px] font-bold uppercase tracking-wider text-[#12385C]"
                >
                  Order History
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`transition-transform duration-300 ${
                      mobileOrdersOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {mobileOrdersOpen && (
                  <div className="space-y-16 px-6 pb-12">
                    {ORDERS.map((order, idx) => (
                      <OrderCard key={order.id} order={order} index={idx + 1} isMobile />
                    ))}
                  </div>
                )}
              </div>

              {/* Account Info */}
              <div className="overflow-hidden rounded-[2px] border border-black/5 bg-[#FAF7F0]">
                <button
                  onClick={() => setMobileInfoOpen(!mobileInfoOpen)}
                  className="flex w-full items-center justify-between px-6 py-6 text-[14px] font-bold uppercase tracking-wider text-[#12385C]"
                >
                  Account Information
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`transition-transform duration-300 ${
                      mobileInfoOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {mobileInfoOpen && (
                  <div className="px-6 pb-12">
                    <AccountInfoView
                      form={form}
                      setForm={setForm}
                      isEditingLogin={isEditingLogin}
                      setIsEditingLogin={setIsEditingLogin}
                      isEditingPersonal={isEditingPersonal}
                      setIsEditingPersonal={setIsEditingPersonal}
                      onSaveLogin={saveLogin}
                      onSavePersonal={savePersonal}
                      onDiscard={resetAll}
                      isMobile
                    />
                  </div>
                )}
              </div>

              {/* Address */}
              <div className="overflow-hidden rounded-[2px] border border-black/5 bg-[#FAF7F0]">
                <button
                  onClick={() => setMobileAddressOpen(!mobileAddressOpen)}
                  className="flex w-full items-center justify-between px-6 py-6 text-[14px] font-bold uppercase tracking-wider text-[#12385C]"
                >
                  Address
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`transition-transform duration-300 ${
                      mobileAddressOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                {mobileAddressOpen && (
                  <div className="px-6 pb-12">
                    <AddressView
                      form={form}
                      setForm={setForm}
                      isEditingAddress={isEditingAddress}
                      setIsEditingAddress={setIsEditingAddress}
                      onSaveAddress={saveAddress}
                      onDiscard={resetAll}
                      isMobile
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-center pb-10 pt-16">
                <button className="text-[14px] font-bold uppercase tracking-widest text-[#2E3A43]/60 underline underline-offset-8 decoration-[#2E3A43]/20">
                  Log Out
                </button>
              </div>
            </div>

            <div className="hidden lg:block">
              {activeTab === "orders" && (
                <div className="space-y-8">
                  {ORDERS.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              )}

              {activeTab === "info" && (
                <AccountInfoView
                  form={form}
                  setForm={setForm}
                  isEditingLogin={isEditingLogin}
                  setIsEditingLogin={setIsEditingLogin}
                  isEditingPersonal={isEditingPersonal}
                  setIsEditingPersonal={setIsEditingPersonal}
                  onSaveLogin={saveLogin}
                  onSavePersonal={savePersonal}
                  onDiscard={resetAll}
                />
              )}

              {activeTab === "address" && (
                <AddressView
                  form={form}
                  setForm={setForm}
                  isEditingAddress={isEditingAddress}
                  setIsEditingAddress={setIsEditingAddress}
                  onSaveAddress={saveAddress}
                  onDiscard={resetAll}
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}

function OrderCard({
  order,
  index,
  isMobile,
}: {
  order: OrderItem;
  index?: number;
  isMobile?: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col rounded-[2px] border border-black/5 bg-[#FAF7F0] shadow-sm ${
        !isMobile ? "lg:flex-row lg:items-start lg:gap-12 lg:p-10" : "gap-6 p-6"
      }`}
    >
      {isMobile && (
        <div className="absolute left-6 top-4 text-[11px] font-bold text-[#2E3A43]/40">
          #{index}
        </div>
      )}

      <div className={`${isMobile ? "relative w-full mb-8 mt-10 px-2" : "relative w-[60px] h-[160px]"}`}>
        {isMobile ? (
          <div className="flex flex-col gap-4">
            <div className="relative mt-2 h-[1px] w-full bg-black/10">
              <div
                className="absolute left-0 top-0 h-full bg-[#12385C]"
                style={{
                  width:
                    order.status === "delivered"
                      ? "100%"
                      : order.status === "shipped"
                      ? "50%"
                      : "0%",
                }}
              />

              <div className="absolute left-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#B79F58]" />
              <div
                className={`absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-y-1/2 -ml-1 rounded-full ${
                  order.status === "shipped" || order.status === "delivered"
                    ? "bg-[#B79F58]"
                    : "bg-black/10"
                }`}
              />
              <div
                className={`absolute right-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full ${
                  order.status === "delivered" ? "bg-[#2EAD51]" : "bg-black/10"
                }`}
              />
            </div>
            <div className="flex justify-between text-[11px] text-[15px] text-[#2E3A43]/40">
              <span className={order.status === "depart" ? "text-[#12385C]" : ""}>
                Depart
              </span>
              <span className={order.status === "shipped" ? "text-[#12385C]" : ""}>
                Shipped
              </span>
              <span className={order.status === "delivered" ? "text-[#12385C]" : ""}>
                Delivered
              </span>
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center pr-2">
            <div className="relative h-full w-[1px] bg-black/10">
              <div
                className="absolute left-0 top-0 w-full bg-[#12385C]"
                style={{
                  height:
                    order.status === "delivered"
                      ? "100%"
                      : order.status === "shipped"
                      ? "50%"
                      : "0%",
                }}
              />
              <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-[#B79F58]" />
              <div
                className={`absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                  order.status === "shipped" || order.status === "delivered"
                    ? "bg-[#B79F58]"
                    : "bg-black/10"
                }`}
              />
              <div
                className={`absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full ${
                  order.status === "delivered" ? "bg-[#2EAD51]" : "bg-black/10"
                }`}
              />
            </div>

            <div className="absolute left-6 top-0 bottom-0 flex flex-col justify-between py-[2px] text-[15px] text-[#2E3A43]/40 whitespace-nowrap">
              <span className={order.status === "depart" ? "text-[#12385C]" : ""}>
                Depart
              </span>
              <span className={order.status === "shipped" ? "text-[#12385C]" : ""}>
                Shipped
              </span>
              <span
                className={order.status === "delivered" ? "text-[#12385C]" : ""}
              >
                Delivered
              </span>
            </div>
          </div>
        )}
      </div>

      <div className={`flex flex-1 gap-8 ${isMobile ? "flex-col" : "items-start"}`}>
        <div
          className={`relative shrink-0 overflow-hidden rounded-[2px] bg-black/5 ${
            isMobile ? "mx-auto h-[180px] w-[180px]" : "h-[120px] w-[120px]"
          }`}
        >
          <Image src={order.image} alt={order.title} fill className="object-contain" />
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex items-start justify-between gap-4">
            <h2
              className={`font-serif leading-none text-[#12385C] ${
                isMobile ? "text-[26px]" : "text-[28px]"
              } mb-4`}
            >
              {order.title}
            </h2>
            <button className="text-[11px] font-medium text-[#2E3A43]/40 underline underline-offset-2 transition-colors hover:text-[#12385C]">
              Need help?
            </button>
          </div>

          <div className={`space-y-1 text-[#2E3A43]/70 ${isMobile ? "text-[12px]" : "text-[13px]"}`}>
            <div>
              <span className="font-bold text-[#1A2D3A]">Price:</span>{" "}
              {formatINR(order.price)}
            </div>
            <div>
              <span className="font-bold text-[#1A2D3A]">Qty:</span> {order.qty}
            </div>
            <div className="max-w-[260px]">
              <span className="font-bold text-[#1A2D3A]">Address:</span>{" "}
              {order.address}
            </div>
          </div>

          <div className="mt-6">
            <span
              className={`inline-block rounded-[2px] px-5 py-2 text-[10px] font-bold tracking-widest ${
                order.status === "delivered"
                  ? "bg-[#A9D6A9] text-[#12385C]"
                  : "bg-[#E1D1AD] text-[#12385C]"
              }`}
            >
              {order.statusLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Account Info ----------------------------- */

function AccountInfoView({
  isMobile,
  form,
  setForm,
  isEditingLogin,
  setIsEditingLogin,
  isEditingPersonal,
  setIsEditingPersonal,
  onSaveLogin,
  onSavePersonal,
  onDiscard,
}: {
  isMobile?: boolean;
  form: AccountForm;
  setForm: React.Dispatch<React.SetStateAction<AccountForm>>;
  isEditingLogin: boolean;
  setIsEditingLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isEditingPersonal: boolean;
  setIsEditingPersonal: React.Dispatch<React.SetStateAction<boolean>>;
  onSaveLogin: () => void;
  onSavePersonal: () => void;
  onDiscard: () => void;
}) {
  return (
    <div className="w-full max-w-[760px]">
      <div className={`grid ${isMobile ? "gap-12" : "gap-16 md:grid-cols-2"}`}>
        {/* LOGIN */}
        <div className="space-y-10">
          <div className="flex items-end justify-between border-b border-black/5 pb-4">
            <h3 className="text-[16px] font-bold uppercase text-[#12385C]/60">
              Login Information
            </h3>

            <button
              type="button"
              onClick={() => setIsEditingLogin((v) => !v)}
              className="text-[11px] font-bold uppercase tracking-widest text-[#2E3A43]/55 underline underline-offset-4 decoration-[#2E3A43]/20 hover:text-[#12385C] transition-colors"
            >
              {isEditingLogin ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="space-y-8">
            <InputGroup
              label="Email"
              placeholder="name@email.com"
              value={form.email}
              onChange={(v) => setForm((p) => ({ ...p, email: v }))}
              type="email"
              disabled={!isEditingLogin}
            />

            {/* Password change fields */}
            <InputGroup
              label="Current Password"
              placeholder="Enter current password"
              value={form.currentPassword}
              onChange={(v) => setForm((p) => ({ ...p, currentPassword: v }))}
              type="password"
              disabled={!isEditingLogin}
              bg={isEditingLogin ? "bg-transparent" : "bg-[#EAE4D3]"}
            />

            <InputGroup
              label="New Password"
              placeholder="Minimum 8 characters"
              value={form.newPassword}
              onChange={(v) => setForm((p) => ({ ...p, newPassword: v }))}
              type="password"
              disabled={!isEditingLogin}
              bg={isEditingLogin ? "bg-transparent" : "bg-[#EAE4D3]"}
            />

            <InputGroup
              label="Confirm Password"
              placeholder="Re-enter new password"
              value={form.confirmPassword}
              onChange={(v) => setForm((p) => ({ ...p, confirmPassword: v }))}
              type="password"
              disabled={!isEditingLogin}
              bg={isEditingLogin ? "bg-transparent" : "bg-[#EAE4D3]"}
            />

            <div className="flex gap-3 pt-2">
              <ActionBtn
                onClick={onSaveLogin}
                disabled={!isEditingLogin}
                variant="primary"
              >
                Save
              </ActionBtn>
              <ActionBtn onClick={onDiscard} variant="ghost">
                Discard
              </ActionBtn>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div className="flex items-end justify-between border-b border-black/5 pb-4">
            <div>
              <h3 className="text-[16px] font-bold uppercase text-[#12385C]/60">
                Personal Information
              </h3>
              <div className="mt-2 text-[8px] font-medium uppercase tracking-widest text-[#2E3A43]/30">
                * Required information
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsEditingPersonal((v) => !v)}
              className="text-[11px] font-bold uppercase tracking-widest text-[#2E3A43]/55 underline underline-offset-4 decoration-[#2E3A43]/20 hover:text-[#12385C] transition-colors"
            >
              {isEditingPersonal ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="space-y-8">
            <InputGroup
              label="First Name *"
              placeholder="Enter first name"
              value={form.firstName}
              onChange={(v) => setForm((p) => ({ ...p, firstName: v }))}
              disabled={!isEditingPersonal}
            />
            <InputGroup
              label="Last Name *"
              placeholder="Enter last name"
              value={form.lastName}
              onChange={(v) => setForm((p) => ({ ...p, lastName: v }))}
              disabled={!isEditingPersonal}
            />
            <InputGroup
              label="Phone No *"
              placeholder="Enter phone number"
              value={form.phone}
              onChange={(v) => setForm((p) => ({ ...p, phone: v }))}
              disabled={!isEditingPersonal}
            />
            <InputGroup
              label="Address"
              placeholder="Street, building, area"
              value={form.address}
              onChange={(v) => setForm((p) => ({ ...p, address: v }))}
              disabled={!isEditingPersonal}
            />

            <div className="flex gap-3 pt-2">
              <ActionBtn
                onClick={onSavePersonal}
                disabled={!isEditingPersonal}
                variant="primary"
              >
                Save
              </ActionBtn>
              <ActionBtn onClick={onDiscard} variant="ghost">
                Discard
              </ActionBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Address View ------------------------------ */

function AddressView({
  isMobile,
  form,
  setForm,
  isEditingAddress,
  setIsEditingAddress,
  onSaveAddress,
  onDiscard,
}: {
  isMobile?: boolean;
  form: AccountForm;
  setForm: React.Dispatch<React.SetStateAction<AccountForm>>;
  isEditingAddress: boolean;
  setIsEditingAddress: React.Dispatch<React.SetStateAction<boolean>>;
  onSaveAddress: () => void;
  onDiscard: () => void;
}) {
  return (
    <div className="w-full max-w-[760px]">
      <div className="flex items-end justify-between border-b border-black/5 pb-4">
        <h3 className="text-[13px] font-bold uppercase tracking-[0.05em] text-[#12385C]/60">
          Address
        </h3>

        <button
          type="button"
          onClick={() => setIsEditingAddress((v) => !v)}
          className="text-[11px] font-bold uppercase tracking-widest text-[#2E3A43]/55 underline underline-offset-4 decoration-[#2E3A43]/20 hover:text-[#12385C] transition-colors"
        >
          {isEditingAddress ? "Cancel" : "Edit"}
        </button>
      </div>

      <div className={`mt-10 grid ${isMobile ? "gap-8" : "gap-8 md:grid-cols-2"}`}>
        <InputGroup
          label="Address *"
          placeholder="House no, street, area"
          value={form.address}
          onChange={(v) => setForm((p) => ({ ...p, address: v }))}
          disabled={!isEditingAddress}
        />
        <InputGroup
          label="City *"
          placeholder="e.g., Hyderabad"
          value={form.city}
          onChange={(v) => setForm((p) => ({ ...p, city: v }))}
          disabled={!isEditingAddress}
        />
        <InputGroup
          label="State *"
          placeholder="e.g., Telangana"
          value={form.state}
          onChange={(v) => setForm((p) => ({ ...p, state: v }))}
          disabled={!isEditingAddress}
        />
        <InputGroup
          label="Pincode *"
          placeholder="e.g., 500001"
          value={form.pincode}
          onChange={(v) => setForm((p) => ({ ...p, pincode: v }))}
          disabled={!isEditingAddress}
        />
        <InputGroup
          label="Country"
          placeholder="India"
          value={form.country}
          onChange={(v) => setForm((p) => ({ ...p, country: v }))}
          disabled={!isEditingAddress}
        />
      </div>

      <div className="mt-10 flex gap-3">
        <ActionBtn onClick={onSaveAddress} disabled={!isEditingAddress} variant="primary">
          Save
        </ActionBtn>
        <ActionBtn onClick={onDiscard} variant="ghost">
          Discard
        </ActionBtn>
      </div>
    </div>
  );
}

/* ------------------------------ Small UI bits ----------------------------- */

function ActionBtn({
  children,
  onClick,
  disabled,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "ghost";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "h-[42px] rounded-[2px] px-6 text-[11px] font-bold uppercase tracking-widest transition-colors",
        disabled ? "opacity-40 cursor-not-allowed" : "",
        variant === "primary"
          ? "bg-[#12385C] text-white hover:bg-[#12385C]/92"
          : "border border-black/10 bg-transparent text-[#2E3A43]/70 hover:bg-black/5",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function InputGroup({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled,
  bg = "bg-transparent",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  bg?: string;
}) {
  return (
    <div className="relative pt-2">
      <div className="absolute left-4 top-0 z-10 flex items-center bg-[#FAF7F0] px-1.5">
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#2E3A43]/50">
          {label}
        </span>
        <div className="ml-1 h-[1px] w-1 bg-[#2E3A43]/10" />
      </div>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={[
          "h-[44px] w-full rounded-[2px] border border-black/10 px-4 text-[13px] font-medium text-[#1A2D3A] transition-all",
          bg,
          disabled ? "cursor-not-allowed text-[#1A2D3A]/55" : "focus:border-[#12385C]/40",
          "placeholder:text-[#2E3A43]/35 focus:outline-none",
        ].join(" ")}
      />
    </div>
  );
}

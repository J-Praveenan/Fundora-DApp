"use client";

import { useState } from "react";
import {
  CalendarDays,
  FileText,
  ImagePlus,
  Target,
  Type,
  Rocket,
  X,
  UploadCloud,
} from "lucide-react";
import { motion } from "framer-motion";
import { useWallet } from "@meshsdk/react";
import { resolvePaymentKeyHash } from "@meshsdk/core";
import { CampaignStatus, createCampaignDatum } from "@/utils/campaignDatum";
import { txBuilder } from "@/config/mesh";
import { scriptAddress } from "@/config/contract";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "@/utils/toast";
import { handleWalletError } from "@/utils/walletError";


export default function CreateCampaignSection() {
  const [open, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    deadline: "",
  });

  const{connected, wallet} = useWallet();
  const [loading, setLoading] = useState(false);
  const[txHash, setTxHash] = useState("");

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const uploadImageToIPFS = async () => {
    if (!selectedImage) {
      throw new Error("Please upload campaign image");
    }

    const formData = new FormData();
    formData.append("file", selectedImage);

    const response = await fetch("/api/upload-to-ipfs", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Image upload failed");
    }

    setImageUrl(data.imageUrl);
    return data.imageUrl;
  };

  const handleCreateCampaign  = async () => {
    if(!connected){
      showWarningToast("Caonnect your wallet first");
      return;
    }

    if(!formData.title || !formData.description || !formData.goal || !formData.deadline){
      showWarningToast("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      setTxHash("");

      const utxos = await wallet.getUtxos();
      const changeAddress = await wallet.getChangeAddress();

      const creatorPubKeyHash = resolvePaymentKeyHash(changeAddress);

      const targetAmount = Number(formData.goal) * 1000000;
      const deadlineTimestamp = new Date(formData.deadline).getTime();

      const uploadedImageUrl = await uploadImageToIPFS();

      const campaignId = `campaign-${Date.now()}`;

      const datum = createCampaignDatum(
        campaignId,
        creatorPubKeyHash,
        formData.title,
        formData.description,
        uploadedImageUrl,
        targetAmount,
        0,
        deadlineTimestamp,
        CampaignStatus.Active,
      );

      const unsignedTx = await txBuilder
        .txOut(
          scriptAddress,[{
            unit: "lovelace",
            quantity: "5000000"
          }]
        )
        .txOutInlineDatumValue(datum)
        .changeAddress(changeAddress)
        .selectUtxosFrom(utxos)
        .complete();
      
      const signedTx = await wallet.signTx(unsignedTx);
      const txHash = await wallet.submitTx(signedTx);

      setTxHash(txHash);

      showSuccessToast("Compaign created successfully.");
    } catch (error) {
      console.log("Error in creating campaign: ", error);
      handleWalletError(error);
    }finally{
      setLoading(false);
      setFormData({
        title: "",
        description: "",
        goal: "",
        deadline: "",
      });
      setPreviewImage(null);
      setOpen(false);
    }

  }

  return (
    <section id="create" className="relative bg-slate-950 py-24">
      <div className="mx-auto max-w-5xl px-5 text-center lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">
          Create Campaign
        </p>

        <h2 className="mt-4 text-4xl font-black text-white md:text-5xl">
          Ready to Launch Your
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            {" "}
            Campaign?
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
          Start a transparent Cardano-powered crowdfunding campaign using your
          wallet and smart contract logic.
        </p>

        <button
          onClick={() => setOpen(true)}
          className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-500 px-8 py-4 text-lg font-bold text-slate-950 transition hover:scale-105"
        >
          <Rocket size={22} />
          Launch Your Campaign
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 py-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative w-full max-w-5xl rounded-3xl border border-white/10 bg-slate-950 p-5 shadow-2xl md:p-6"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-xl border border-white/10 bg-white/5 p-2 text-white hover:bg-red-500/20"
            >
              <X size={20} />
            </button>

            <div className="mb-6 pr-12">
              <h3 className="text-2xl font-black text-white">
                Create New Campaign
              </h3>

              <p className="mt-1 text-sm text-slate-400">
                Fill campaign details. MeshJS functionality will be connected
                later.
              </p>
            </div>

            <form className="grid items-start gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-slate-300">
                    <Type size={15} className="text-emerald-400" />
                    Campaign Title
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Clean Water for Rural Schools"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-400/40"
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-slate-300">
                    <FileText size={15} className="text-emerald-400" />
                    Campaign Description
                  </label>

                  <textarea
                    rows={5}
                    placeholder="Describe your campaign purpose..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                    className="w-full resize-none rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-emerald-400/40"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-slate-300">
                      <Target size={15} className="text-cyan-400" />
                      Funding Goal ADA
                    </label>

                    <input
                      type="number"
                      placeholder="5000"
                      value={formData.goal}
                      onChange={(e) =>
                        setFormData({ ...formData, goal: e.target.value })
                      }
                      className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/40"
                    />
                  </div>

                  <div>
                    <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-slate-300">
                      <CalendarDays size={15} className="text-cyan-400" />
                      Deadline
                    </label>

                    <input
                      type="date"
                      value={formData.deadline}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          deadline: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/40"
                    />
                  </div>
                </div>
              </div>

              <div className="flex h-full flex-col">
                <label className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-slate-300">
                  <ImagePlus size={15} className="text-emerald-400" />
                  Campaign Image
                </label>

                <label className="flex h-[260px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-emerald-400/30 bg-slate-900 text-center transition hover:border-emerald-400/60 hover:bg-emerald-400/5">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Campaign preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="px-6">
                      <UploadCloud className="mx-auto mb-3 h-10 w-10 text-emerald-400" />
                      <p className="text-sm font-semibold text-white">
                        Upload campaign image
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        PNG, JPG, JPEG or WEBP
                      </p>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  className="mt-5 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 px-6 py-3 text-base font-bold text-slate-950 transition hover:scale-[1.02]"
                  onClick={handleCreateCampaign}
                >
                  <Rocket size={19} />
                  {loading ? "Creating Campaign..." : "Create Campaign"}
                </button>
                {txHash && (
                  <p className="mt-3 break-all rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-xs text-emerald-300">
                    Transaction Hash: {txHash}
                  </p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
}